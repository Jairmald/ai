#!/usr/bin/env python3
"""
Export every diagram in the deck as a standalone, labelled file.

Two kinds of diagram come out of this:

  * Vector artwork  — generated from src/art.js. Exported as SVG (fully
    editable in Illustrator / Figma / Inkscape) alongside a 300 DPI PNG.
  * Native-shape diagrams — built from PowerPoint shapes in the slide itself.
    These are already editable directly in PowerPoint, so they are exported as
    300 DPI PNG crops for reference and mark-up.

Also writes a contact sheet and an INDEX.md.

Usage: python3 tools/export-diagrams.py
"""
import os
import re
import shutil
import subprocess
import sys

import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, "assets", "gen")
OUT = os.path.join(ROOT, "out", "diagrams")
PPTX = os.path.join(ROOT, "out", "Internship_Exit_Presentation_Stewart.pptx")
DPI = 300
FONT_DIR = os.path.expanduser("~/.fonts")

# Slide numbers here must track build.js. They are asserted against the deck's
# own footer numbering by check_slide_numbers() below.
#
# Vector artwork: (order, slide, section, slug, asset-name, description)
VECTOR = [
    (2, 6, "Project 01 — Image Management", "isometric-secure-image", "iso-machine",
     "Isometric stack: a base cloud image with three security layers and a shield crest."),
    (6, 10, "Project 02 — AEGIS", "supply-chain-attack-flow", "supply-chain",
     "Attacker to poisoned package to public registry to every downstream project."),
    (7, 11, "Project 02 — AEGIS", "packages-scanned-chart", "chart-packages",
     "Bar chart: 82 / 3,024 / 2,651 packages per run, from the earlier version."),
    (10, 17, "Project 03 — CVE-to-Patch", "match-rate-rings", "chart-match",
     "Before/after proportion rings: 0% matched by hand, 100% automated."),
    (11, 18, "Project 03 — CVE-to-Patch", "no-action-waffle", "chart-no-action",
     "117 squares: 65 still needing a patch (red), 52 already covered (grey)."),
    (13, 20, "Project 03 — CVE-to-Patch", "consolidation-waffle", "chart-consolidation",
     "209 squares, one per row in Kevlar's report; the 46 in red became tickets."),
    (15, 21, "Project 03 — CVE-to-Patch", "dashboard-mockup", "dashboard-mock",
     "Concept dashboard tying Tenable, Kevlar, Jira and Wiz into one view."),
]

# Native PowerPoint shapes: (order, slide, section, slug, crop box in inches, description)
NATIVE = [
    (1, 4, "Internship Overview", "three-rotations-timeline", (0.75, 2.95, 12.58, 6.25),
     "Timeline spine with three rotation cards."),
    (3, 6, "Project 01 — Image Management", "nine-required-tools", (4.52, 2.75, 12.58, 6.50),
     "3x3 grid of the nine required security tools, plus the gap callout."),
    (4, 7, "Project 01 — Image Management", "three-step-process", (0.75, 2.75, 12.58, 6.66),
     "Define the Tools / Define the Owners / Get It Adopted, plus the delivered band."),
    (5, 8, "Project 01 — Image Management", "image-mgmt-next-steps", (0.75, 2.76, 12.58, 6.10),
     "Adoption, owner handover, and a pre-deploy check."),
    (8, 12, "Project 02 — AEGIS", "aegis-five-stage-pipeline", (0.75, 1.96, 12.58, 6.56),
     "The core rule, stages SCAN/REACH/BLAST/REGRESS, and the gated FIX stage."),
    (9, 14, "Project 02 — AEGIS", "aegis-next-steps", (0.75, 2.66, 12.58, 6.72),
     "Unblock live lookups, read code structure, and get it installed elsewhere."),
    (12, 19, "Project 03 — CVE-to-Patch", "numbers-relate-flow", (0.75, 5.05, 12.58, 6.62),
     "2,658 host-product assignments to Kevlar's 209 rows to 46 tickets."),
    (16, 21, "Project 03 — CVE-to-Patch", "four-system-chain", (0.75, 3.30, 5.60, 6.70),
     "Tenable to Kevlar to Jira to Wiz, with each system's role."),
]

BRAND = [
    ("brand-logo-red", "logo-red", "Reconstructed Stewart mark, full colour (white slides)."),
    ("brand-logo-white", "logo-white", "Reconstructed Stewart mark, all white (red panels)."),
]


def font(name, size):
    p = os.path.join(FONT_DIR, name)
    return ImageFont.truetype(p, size) if os.path.exists(p) else ImageFont.load_default()


# Footer label expected on each slide, keyed by the section name used above.
# Guards against the slide numbers here drifting out of sync with build.js.
SECTION_FOOTER = {
    "Internship Overview": "INTERNSHIP OVERVIEW",
    "Project 01 — Image Management": "IMAGE MANAGEMENT PROGRAM",
    "Project 02 — AEGIS": "AEGIS",
    "Project 03 — CVE-to-Patch": "CVE-TO-PATCH AUTOMATION",
}


def _squash(s):
    """Drop all whitespace — footer labels are letterspaced, so PDF extraction
    breaks them into separate runs and a literal substring test would fail."""
    return re.sub(r"\s+", "", s).upper()


def check_slide_numbers(page_text):
    """Fail loudly if a slide number no longer points at the expected section."""
    bad = []
    for _, slide, section, slug, *_ in VECTOR + NATIVE:
        want = SECTION_FOOTER.get(section)
        if want and _squash(want) not in _squash(page_text.get(slide, "")):
            bad.append(f"  slide {slide} ({slug}): expected footer {want!r}")
    if bad:
        raise SystemExit(
            "Slide numbers are out of sync with the deck:\n"
            + "\n".join(bad)
            + "\n\nUpdate VECTOR/NATIVE in this file to match build.js."
        )


def render_slides():
    """Rasterize the deck once at DPI; return {slide_number: PIL.Image}."""
    render_dir = os.path.join(ROOT, "out", "_diagram_pdf")
    os.makedirs(render_dir, exist_ok=True)
    subprocess.run(
        ["soffice", "--headless", "--norestore", "--convert-to", "pdf",
         "--outdir", render_dir, PPTX],
        check=True, capture_output=True,
    )
    pdf = os.path.join(render_dir, os.path.basename(PPTX).replace(".pptx", ".pdf"))
    doc = fitz.open(pdf)
    pages, text = {}, {}
    for i, page in enumerate(doc, 1):
        pm = page.get_pixmap(dpi=DPI)
        pages[i] = Image.frombytes("RGB", (pm.width, pm.height), pm.samples)
        text[i] = page.get_text()
    doc.close()
    shutil.rmtree(render_dir, ignore_errors=True)
    check_slide_numbers(text)
    return pages


def main():
    if not os.path.exists(PPTX):
        print("build the deck first: node build.js", file=sys.stderr)
        return 1
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(OUT, exist_ok=True)

    pages = render_slides()
    entries = []

    # vector artwork -> SVG + PNG
    for order, slide, section, slug, asset, desc in VECTOR:
        base = f"{order:02d}-slide{slide:02d}-{slug}"
        shutil.copy(os.path.join(GEN, f"{asset}.svg"), os.path.join(OUT, base + ".svg"))
        src = Image.open(os.path.join(GEN, f"{asset}.png"))
        src.save(os.path.join(OUT, base + ".png"))
        entries.append((order, slide, section, base, "SVG + PNG", desc, base + ".png"))

    # native shapes -> cropped PNG
    for order, slide, section, slug, box, desc in NATIVE:
        base = f"{order:02d}-slide{slide:02d}-{slug}"
        img = pages[slide]
        l, t, r, b = (int(v * DPI) for v in box)
        img.crop((l, t, r, b)).save(os.path.join(OUT, base + ".png"))
        entries.append((order, slide, section, base, "PNG (editable in PowerPoint)", desc, base + ".png"))

    # brand marks
    for base, asset, desc in BRAND:
        shutil.copy(os.path.join(GEN, f"{asset}.svg"), os.path.join(OUT, base + ".svg"))
        shutil.copy(os.path.join(GEN, f"{asset}.png"), os.path.join(OUT, base + ".png"))
        entries.append((99, 0, "Brand", base, "SVG + PNG", desc, base + ".png"))

    entries.sort(key=lambda e: (e[0], e[3]))
    write_index(entries)
    contact_sheet(entries)
    print(f"exported {len(entries)} diagrams to {OUT}")
    return 0


def write_index(entries):
    lines = [
        "# Deck diagrams — export index",
        "",
        "Every diagram in the presentation, exported for manual editing.",
        "",
        "**SVG** files are true vector — open them in Illustrator, Figma, Inkscape or",
        "Affinity and edit any shape, colour or label directly. **PNG** files are 300 DPI.",
        "",
        "The vector artwork has a transparent background, so it drops onto any slide",
        "colour cleanly — a checkerboard in a preview window is transparency, not an error.",
        "",
        "Diagrams marked *editable in PowerPoint* are built from native PowerPoint shapes",
        "in the deck itself — you can click straight into them on the slide and edit the",
        "boxes and text without touching these files. The PNG is for reference and mark-up.",
        "",
        "Stewart red is `#942838`.",
        "",
        "| # | Slide | Section | Diagram | Formats | What it shows |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for order, slide, section, base, fmt, desc, _ in entries:
        num = "—" if order == 99 else str(order)
        sl = "—" if slide == 0 else str(slide)
        lines.append(f"| {num} | {sl} | {section} | `{base}` | {fmt} | {desc} |")
    lines += ["", "Regenerate with `python3 tools/export-diagrams.py`.", ""]
    with open(os.path.join(OUT, "INDEX.md"), "w") as f:
        f.write("\n".join(lines))


def contact_sheet(entries):
    """One labelled sheet showing every diagram, so the set is scannable."""
    COLS, CELL, PAD, CAP = 3, 620, 34, 92
    rows = (len(entries) + COLS - 1) // COLS
    W = COLS * CELL + PAD * (COLS + 1)
    H = rows * (CELL + CAP) + PAD * (rows + 1) + 120

    sheet = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(sheet)
    f_title = font("Montserrat-ExtraBold.ttf", 40)
    f_lbl = font("Montserrat-SemiBold.ttf", 21)
    f_sub = font("Montserrat-Medium.ttf", 18)

    d.text((PAD, 40), "Deck diagrams — all sections", font=f_title, fill="#2B2D30")
    d.rectangle([PAD, 98, PAD + 74, 104], fill="#942838")

    for i, (order, slide, section, base, fmt, desc, png) in enumerate(entries):
        r, c = divmod(i, COLS)
        x = PAD + c * (CELL + PAD)
        y = 120 + PAD + r * (CELL + CAP + PAD)

        # A white-on-transparent mark needs a dark tile to be visible at all.
        dark = "white" in base
        tile = (43, 45, 48, 255) if dark else (255, 255, 255, 255)

        # Flatten first — most of this artwork has an alpha channel, and a
        # straight RGB convert would render transparency as black.
        im = Image.open(os.path.join(OUT, png)).convert("RGBA")
        flat = Image.new("RGBA", im.size, tile)
        im = Image.alpha_composite(flat, im).convert("RGB")
        im.thumbnail((CELL, CELL - 40), Image.LANCZOS)
        box_y = y + (CELL - 40 - im.height) // 2
        d.rectangle([x, y, x + CELL, y + CELL - 40],
                    fill="#2B2D30" if dark else "#FAFAFA", outline="#E6E4E2")
        sheet.paste(im, (x + (CELL - im.width) // 2, box_y))

        tag = "Brand asset" if slide == 0 else f"Slide {slide}  ·  {section}"
        d.text((x, y + CELL - 26), tag, font=f_sub, fill="#942838")
        d.text((x, y + CELL + 2), base, font=f_lbl, fill="#2B2D30")

    sheet.save(os.path.join(OUT, "00-CONTACT-SHEET.png"))


if __name__ == "__main__":
    sys.exit(main())
