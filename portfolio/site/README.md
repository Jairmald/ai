# Portfolio website

A static site — three files, no build step, no dependencies. Open `index.html` to work on it.

```
index.html    markup and all copy
styles.css    tokens, layout, components
main.js       triage strip, theme toggle, nav highlighting
```

---

## Deploy to GitHub Pages

**First, rename the Pages repository.** A GitHub user site only serves at the root URL if the
repository is named exactly `<username>.github.io`. Yours is currently
`jairmaldonado.github.io`, which does not match `Jairmald` and will never work. Rename it to
**`Jairmald.github.io`** (Settings → General → Repository name).

Then:

```bash
git clone https://github.com/Jairmald/Jairmald.github.io.git
cd Jairmald.github.io
cp /path/to/portfolio/site/{index.html,styles.css,main.js} .
git add -A
git commit -m "Add portfolio site"
git push -u origin main
```

Settings → Pages → Source: **Deploy from a branch** → `main` / `root`. Live at
`https://jairmald.github.io` within a couple of minutes.

No Jekyll config is needed — plain HTML is served as-is, and nothing here starts with an
underscore.

---

## Before you publish — the internship section

Section 03 describes three internship projects. It is written to the rules in
[`../INTERNSHIP-REDACTION-RULES.md`](../INTERNSHIP-REDACTION-RULES.md): no employer name, no
internal system or tool names, no version numbers, no CVEs, no findings, and every figure given as
a ratio or magnitude rather than a raw count.

**Two things to settle before this goes live:**

1. **Clear it with your manager.** Ask, show them the section, get a yes. It takes one email and
   converts the whole question into someone else's sign-off. This matters more than usual given
   that the source deck was briefly public — see audit §1.
2. **Replace my draft with your real notes.** I wrote section 03 from the presentation in this
   repository. It is accurate as far as that goes, but it is my summary of your work, not your
   account of it. Send me the notes and I will rewrite it properly.

If your manager says no, delete the `<section id="internship">` block and remove `Internship` from
the nav. The rest of the site stands on its own.

The employer is described as *"a Fortune-1000 title insurance and real-estate services company."*
If you get explicit clearance to name them, swap that line — but name them on your résumé and
LinkedIn regardless, which is where a recruiter expects to find it.

---

## Editing

**Copy** lives in `index.html`. There is no CMS and no templating; edit the markup directly.

**Colour and type** are CSS custom properties at the top of `styles.css`. Change them there and
they propagate. Both themes are defined — light under `:root`, dark under `:root[data-theme="dark"]`
and the `prefers-color-scheme` block. If you change a colour, keep all three in sync.

Every text/background pair currently passes WCAG AA (4.5:1) in both themes. The light-mode amber
`#9A6512` and slate `#696F7E` are close to the limit — if you lighten either, re-check the
contrast before shipping.

**Adding a lab** — copy an `<li>` inside the relevant `.labgroup`, and bump the `.count` badge.
Groups are ordered so the two-column grid packs evenly (6/5, 4/4, 2/1); if you add several, check
it still balances.

---

## Design notes

**The triage strip** in the hero is the one piece of signal in the design. A band of tick marks,
mostly muted noise, five of them amber and full height. It is the shape of the work — most findings
need no action, and the job is knowing which ones do. It is generated in `main.js` from a fixed set
of positions, so it is the same pattern on every visit rather than random.

**Amber is the accent** for a reason worth keeping: green means safe, red means critical, and amber
is the bucket that needs a human decision. That bucket is where the actual analysis happens, so it
is the colour the site is built around.

**Type** is Archivo for display, Source Serif 4 for body, IBM Plex Mono for labels and data. The
serif body is deliberate — the content is lab reports, and reports read as documents.

## Browser support

Modern evergreen browsers. Uses `color-mix()`, `text-wrap: balance`, and `IntersectionObserver`;
all degrade without breaking layout. No polyfills, no framework, ~14 KB total before fonts.
