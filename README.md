# Internship Exit Presentation — Stewart Title

An 18-slide exit presentation for Jair Maldonado's Security Analyst internship,
built programmatically so it can be re-rendered and revised from source.

Audience is mixed technical / non-technical, so every security term is explained
in plain language and abbreviations are avoided.

## Build

```bash
npm install
node build.js                 # regenerates artwork, writes out/*.pptx
node build.js --no-art        # skip SVG regeneration (faster iteration)
bash tools/render.sh          # render every slide to out/render/slide-NN.png
```

Requires Node, plus Python with `cairosvg`, `pillow` and `pymupdf`, and
LibreOffice **with Impress** (`libreoffice-impress`) for rendering previews.

Fonts: the deck uses real **Montserrat**. `tools/` expects the static weights to
be installed — they are instanced from the Google variable font:

```bash
curl -sSL -o Montserrat.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf"
# then instance Regular/Medium/SemiBold/Bold/ExtraBold into ~/.fonts with fontTools
```

## Layout

| Path | Purpose |
| --- | --- |
| `src/tokens.js` | Colour, type scale, 12-column grid, shadows. Single source of truth. |
| `src/content.js` | All deck copy and every verified number, in one place. |
| `src/art.js` | Custom SVG artwork generators. |
| `src/genart.js` | Writes the SVGs and rasterizes them to high-DPI PNGs. |
| `src/chrome.js` | Reusable slide furniture — eyebrow, title, rule, cards, footer, logo. |
| `src/slides/*.js` | One module per section. |
| `build.js` | Assembles the 18 slides in order. |

## Brand

Stewart red is **`#942838`**, sampled directly from the official logo artwork.
It is a deep crimson with a blue undertone — *not* the warmer, orange-leaning
red it is often mistaken for. Every other red in the deck is derived from it, so
nothing drifts back toward orange. Tints for type on red panels live in
`ON_RED`; tints for the charcoal callout bands live in `ON_INK`.

### Logo

`src/art.js:logo()` **reconstructs** the Stewart mark from measured geometry —
three red slashes whose rightmost forms the left face of a roof peak, with a
charcoal right face, followed by the lowercase wordmark. It is a stand-in, not
the trademarked asset.

To use the real thing, drop the official artwork into **`assets/brand/`** as
`logo-red.png` (for white slides) and `logo-white.png` (for red panels). Those
files are copied over the generated stand-ins on every build, so regenerating
never clobbers them. Nothing else needs to change — placement reads each PNG's
real pixel dimensions, so any size or aspect ratio works and the mark is never
distorted.

## Conventions worth knowing

- **Artwork is placed by width only.** `K.placeImage()` derives height from the
  asset's real pixel size. Never hardcode an aspect ratio in a slide file — a
  stale ratio silently pushes content off the page.
- **Titles must fit one line.** The accent rule sits at a fixed `y`; a title that
  wraps will collide with it.
- **Numbers are verified.** Everything in `src/content.js` was checked against
  real project files. If a number is missing, ask — do not estimate.
- **Divider slides stay.** They are deliberate reset points in the talk.

## Slide order

1. Title
2. Table of Contents
3. About Me
4. Internship Overview — three rotations
5. **Divider — Project 01**
6. Image Management Program — the problem (nine required tools)
7. Image Management Program — building the process
8. **Divider — Project 02**
9. AEGIS — the problem (supply-chain attacks)
10. AEGIS — what I built (5,675 packages scanned)
11. AEGIS — the pipeline, as a UML component diagram
12. **Divider — Project 03**
13. CVE-to-Patch — the problem (117 flaws)
14. CVE-to-Patch — manual to seconds (0% → 100%)
15. CVE-to-Patch — what 209 means, and the rule that collapses it
16. CVE-to-Patch — the payoff (209 → 46 tickets, 78% fewer)
17. CVE-to-Patch — what comes next (one unified dashboard)
18. Summary

## Open item

Slide 11 carries a **CURRENT STATUS** note for the AEGIS pipeline: built end to
end, first full test just run, results still to be confirmed. Update that note
once the real result is known.
