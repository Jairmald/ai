#!/usr/bin/env python3
"""
Splice slides from one .pptx into another, in place of a range of its slides.

Written because the presentation is edited by hand in PowerPoint between
revisions, so a full rebuild from source would throw those edits away. This
replaces only the slides named on the command line and leaves every other part
of the target file — including PowerPoint's own revision metadata — untouched.

    python3 tools/splice-section.py \
        --into MAIN.pptx --from out/slides/AEGIS_Section.pptx \
        --replace 10-12 --out out/MAIN_updated.pptx [--renumber]

`--replace A-B` is a 1-indexed, inclusive slide range in the target. The source
deck's slides are inserted at position A and the old A..B are dropped.

`--renumber` rewrites every footer slide number to match the new running order,
which is otherwise easy to forget once slides have been added or cut.

Works at the package level rather than through python-pptx, because python-pptx
has no supported way to copy a slide between presentations: the slide part, its
relationships, its images and its notes slide all have to be carried across and
re-pointed by hand.
"""
import argparse
import hashlib
import posixpath
import re
import shutil
import sys
import zipfile
from xml.etree import ElementTree as ET

NS = {
    'p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'rel': 'http://schemas.openxmlformats.org/package/2006/relationships',
    'ct': 'http://schemas.openxmlformats.org/package/2006/content-types',
}
for k, v in NS.items():
    ET.register_namespace('' if k == 'rel' else k, v)

R_ID = f"{{{NS['r']}}}id"
SLIDE_CT = ('application/vnd.openxmlformats-officedocument'
            '.presentationml.slide+xml')
NOTES_CT = ('application/vnd.openxmlformats-officedocument'
            '.presentationml.notesSlide+xml')
SLIDE_RT = ('http://schemas.openxmlformats.org/officeDocument/2006/'
            'relationships/slide')
NOTES_RT = ('http://schemas.openxmlformats.org/officeDocument/2006/'
            'relationships/notesSlide')
LAYOUT_RT = ('http://schemas.openxmlformats.org/officeDocument/2006/'
             'relationships/slideLayout')
MASTER_RT = ('http://schemas.openxmlformats.org/officeDocument/2006/'
             'relationships/notesMaster')
IMAGE_RT = ('http://schemas.openxmlformats.org/officeDocument/2006/'
            'relationships/image')


DECL = b'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n'


def serialize(tree):
    """Office is picky: parts need the declaration with standalone="yes"."""
    body = ET.tostring(tree, encoding='UTF-8')
    if body.startswith(b'<?xml'):
        body = body.split(b'?>', 1)[1].lstrip()
    return DECL + body


class Package:
    """A .pptx read fully into memory, so parts can be rewritten freely."""

    def __init__(self, path):
        self.parts = {}
        with zipfile.ZipFile(path) as z:
            for info in z.infolist():
                if not info.filename.endswith('/'):
                    self.parts[info.filename] = z.read(info.filename)

    def xml(self, name):
        return ET.fromstring(self.parts[name])

    def set_xml(self, name, tree):
        self.parts[name] = serialize(tree)

    def save(self, path):
        with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as z:
            # [Content_Types].xml must be the first part in the archive
            first = '[Content_Types].xml'
            z.writestr(first, self.parts[first])
            for name, data in self.parts.items():
                if name != first:
                    z.writestr(name, data)

    # -- relationship helpers -------------------------------------------------

    def rels_name(self, part):
        d, f = posixpath.split(part)
        return posixpath.join(d, '_rels', f + '.rels')

    def rels(self, part):
        name = self.rels_name(part)
        return self.xml(name) if name in self.parts else None

    def slide_order(self):
        """Slide part names in presentation order."""
        pres = self.xml('ppt/presentation.xml')
        rels = self.rels('ppt/presentation.xml')
        by_id = {r.get('Id'): r.get('Target') for r in rels}
        out = []
        for sld in pres.find('p:sldIdLst', NS):
            target = by_id[sld.get(R_ID)]
            out.append(posixpath.normpath(posixpath.join('ppt', target)))
        return out


def next_free(parts, pattern):
    """Lowest unused index for a part name pattern like 'ppt/slides/slide%d.xml'."""
    i = 1
    while pattern % i in parts:
        i += 1
    return i


def next_rid(rels):
    used = {int(m.group(1)) for r in rels
            if (m := re.fullmatch(r'rId(\d+)', r.get('Id')))}
    i = 1
    while i in used:
        i += 1
    return f'rId{i}'


def add_override(dst, part, content_type):
    """Register a part's content type.

    Done as a byte-level insert on purpose. Re-serialising
    [Content_Types].xml through ElementTree turns its default namespace into a
    prefixed one, which is still well-formed XML but which both PowerPoint and
    LibreOffice reject outright.
    """
    data = dst.parts['[Content_Types].xml']
    tag = f'PartName="/{part}"'.encode()
    if tag in data:
        return
    entry = (f'<Override PartName="/{part}" '
             f'ContentType="{content_type}"/>').encode()
    dst.parts['[Content_Types].xml'] = data.replace(
        b'</Types>', entry + b'</Types>')


def ensure_media(dst, data, ext, media_index):
    """Copy a media blob into dst, reusing an identical one if already present."""
    digest = hashlib.sha1(data).hexdigest()
    if digest in media_index:
        return media_index[digest]
    n = next_free(dst.parts, 'ppt/media/image%d' + ext)
    name = f'ppt/media/image{n}{ext}'
    while name in dst.parts:
        n += 1
        name = f'ppt/media/image{n}{ext}'
    dst.parts[name] = data
    media_index[digest] = name
    ext_ct = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
              '.gif': 'image/gif', '.svg': 'image/svg+xml'}
    add_override(dst, name, ext_ct.get(ext.lower(), 'image/png'))
    return name


def index_media(dst):
    return {hashlib.sha1(d).hexdigest(): n
            for n, d in dst.parts.items() if n.startswith('ppt/media/')}


def target_layout(dst):
    """The layout new slides should hang off — the deck only has one."""
    layouts = sorted(n for n in dst.parts
                     if re.fullmatch(r'ppt/slideLayouts/slideLayout\d+\.xml', n))
    if not layouts:
        sys.exit('target deck has no slide layout')
    return layouts[0]


def notes_master(dst):
    masters = sorted(n for n in dst.parts
                     if re.fullmatch(r'ppt/notesMasters/notesMaster\d+\.xml', n))
    return masters[0] if masters else None


def copy_slide(src, dst, src_slide, media_index, layout, nmaster):
    """Copy one slide part (plus images and notes) into dst. Returns part name."""
    n = next_free(dst.parts, 'ppt/slides/slide%d.xml')
    new_slide = f'ppt/slides/slide{n}.xml'
    dst.parts[new_slide] = src.parts[src_slide]
    add_override(dst, new_slide, SLIDE_CT)

    src_rels = src.rels(src_slide)
    out = ET.Element(f"{{{NS['rel']}}}Relationships")
    notes_src = None

    for r in src_rels:
        rtype, rid = r.get('Type'), r.get('Id')
        tgt = r.get('Target')
        if rtype == LAYOUT_RT:
            new_tgt = posixpath.relpath(layout, 'ppt/slides')
        elif rtype == IMAGE_RT:
            abs_src = posixpath.normpath(posixpath.join('ppt/slides', tgt))
            ext = posixpath.splitext(abs_src)[1]
            placed = ensure_media(dst, src.parts[abs_src], ext, media_index)
            new_tgt = posixpath.relpath(placed, 'ppt/slides')
        elif rtype == NOTES_RT:
            notes_src = posixpath.normpath(posixpath.join('ppt/slides', tgt))
            new_tgt = None  # filled in below, once the notes part is placed
        else:
            new_tgt = tgt
        ET.SubElement(out, f"{{{NS['rel']}}}Relationship",
                      {'Id': rid, 'Type': rtype, 'Target': new_tgt or tgt})

    if notes_src and nmaster:
        m = next_free(dst.parts, 'ppt/notesSlides/notesSlide%d.xml')
        new_notes = f'ppt/notesSlides/notesSlide{m}.xml'
        dst.parts[new_notes] = src.parts[notes_src]
        add_override(dst, new_notes, NOTES_CT)

        nrels = ET.Element(f"{{{NS['rel']}}}Relationships")
        for r in src.rels(notes_src):
            rtype, rid = r.get('Type'), r.get('Id')
            if rtype == MASTER_RT:
                tgt = posixpath.relpath(nmaster, 'ppt/notesSlides')
            elif rtype == SLIDE_RT:
                tgt = posixpath.relpath(new_slide, 'ppt/notesSlides')
            else:
                tgt = r.get('Target')
            ET.SubElement(nrels, f"{{{NS['rel']}}}Relationship",
                          {'Id': rid, 'Type': rtype, 'Target': tgt})
        dst.parts[dst.rels_name(new_notes)] = serialize(nrels)

        for rel in out:
            if rel.get('Type') == NOTES_RT:
                rel.set('Target', posixpath.relpath(new_notes, 'ppt/slides'))

    dst.parts[dst.rels_name(new_slide)] = serialize(out)
    return new_slide


def drop_slide_parts(dst, part):
    """Remove a slide and anything only it referenced."""
    rels = dst.rels(part)
    if rels is not None:
        for r in rels:
            if r.get('Type') == NOTES_RT:
                notes = posixpath.normpath(
                    posixpath.join('ppt/slides', r.get('Target')))
                dst.parts.pop(notes, None)
                dst.parts.pop(dst.rels_name(notes), None)
    dst.parts.pop(part, None)
    dst.parts.pop(dst.rels_name(part), None)


def rewrite_sldidlst(dst, order):
    """Point presentation.xml at exactly `order`, in that sequence.

    Byte-level for the same reason as add_override: everything outside the
    slide list — font subsetting flags, the notes master, sizing — is left
    exactly as PowerPoint wrote it.
    """
    rels_name = dst.rels_name('ppt/presentation.xml')
    rels_data = dst.parts[rels_name].decode('utf-8')

    # drop the existing slide relationships, keep every other one untouched
    kept = re.sub(r'<Relationship\b[^>]*?Type="' + re.escape(SLIDE_RT)
                  + r'"[^>]*?/>', '', rels_data)
    used = {int(m) for m in re.findall(r'Id="rId(\d+)"', kept)}

    rids, nxt = [], 1
    for _ in order:
        while nxt in used:
            nxt += 1
        used.add(nxt)
        rids.append(f'rId{nxt}')

    added = ''.join(
        f'<Relationship Id="{rid}" Type="{SLIDE_RT}" '
        f'Target="{posixpath.relpath(part, "ppt")}"/>'
        for rid, part in zip(rids, order))
    dst.parts[rels_name] = kept.replace(
        '</Relationships>', added + '</Relationships>').encode('utf-8')

    lst = ''.join(f'<p:sldId id="{256 + i}" r:id="{rid}"/>'
                  for i, rid in enumerate(rids))
    pres = dst.parts['ppt/presentation.xml'].decode('utf-8')
    pres, n = re.subn(r'<p:sldIdLst>.*?</p:sldIdLst>',
                      f'<p:sldIdLst>{lst}</p:sldIdLst>', pres, flags=re.S)
    if n != 1:
        sys.exit('could not locate the slide list in presentation.xml')
    dst.parts['ppt/presentation.xml'] = pres.encode('utf-8')


def renumber_footers(path):
    """Rewrite each slide's footer number to match the new running order.

    Run as a pass over the saved file through python-pptx, which edits the XML
    with lxml and so preserves every namespace declaration the original part
    carried. The footer number is identified by geometry — the only text box in
    the bottom-right corner whose entire content is a number — rather than by
    shape name, which PowerPoint rewrites.
    """
    from pptx import Presentation
    from pptx.util import Emu

    prs = Presentation(path)
    changed = []
    for i, slide in enumerate(prs.slides, 1):
        hit = None
        for shape in slide.shapes:
            if not shape.has_text_frame or shape.left is None:
                continue
            if Emu(shape.left).inches < 10 or Emu(shape.top).inches < 6.5:
                continue
            runs = [r for para in shape.text_frame.paragraphs for r in para.runs]
            if len(runs) == 1 and re.fullmatch(r'\d{1,3}', runs[0].text.strip()):
                hit = runs[0]
        if hit is None:
            continue
        was = hit.text.strip()
        want = f'{i:02d}' if len(was) == 2 else str(i)
        if was != want:
            hit.text = want
            changed.append((i, was, want))
    if changed:
        prs.save(path)
    return changed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--into', required=True)
    ap.add_argument('--source', '--from', dest='source', required=True)
    ap.add_argument('--replace', required=True,
                    help='1-indexed inclusive slide range in --into, e.g. 10-12')
    ap.add_argument('--out', required=True)
    ap.add_argument('--renumber', action='store_true')
    args = ap.parse_args()

    lo, _, hi = args.replace.partition('-')
    lo, hi = int(lo), int(hi or lo)

    dst = Package(args.into)
    src = Package(args.source)

    order = dst.slide_order()
    if not 1 <= lo <= hi <= len(order):
        sys.exit(f'--replace {args.replace} outside 1-{len(order)}')

    media_index = index_media(dst)
    layout, nmaster = target_layout(dst), notes_master(dst)

    inserted = [copy_slide(src, dst, s, media_index, layout, nmaster)
                for s in src.slide_order()]

    dropped = order[lo - 1:hi]
    new_order = order[:lo - 1] + inserted + order[hi:]
    for part in dropped:
        drop_slide_parts(dst, part)

    rewrite_sldidlst(dst, new_order)

    dst.save(args.out)
    changed = renumber_footers(args.out) if args.renumber else []

    print(f'{len(order)} slides in, {len(new_order)} out '
          f'({len(dropped)} replaced by {len(inserted)})')
    for pos, was, now in changed:
        print(f'  slide {pos}: footer {was} -> {now}')


if __name__ == '__main__':
    main()
