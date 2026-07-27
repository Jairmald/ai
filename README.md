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

## Fonts — install these before opening the deck

The deck is set in real **Montserrat** and PowerPoint files do **not** carry
fonts with them. On a machine without Montserrat installed, every heading falls
back to a default sans: the layout still holds, but the deck loses its entire
weight hierarchy and looks flat.

The five weights it uses ship in `assets/fonts/`. Install all of them:

- **macOS** — select all five `.ttf` files, open, click *Install Font*
- **Windows** — select all five, right-click, *Install for all users*

They register as the families `Montserrat`, `Montserrat Medium`,
`Montserrat SemiBold` and `Montserrat ExtraBold` — the same names a standard
Google Fonts desktop install produces, so either route works.

The files are instanced from the Google variable font:

```bash
curl -sSL -o Montserrat.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf"
# then instance Regular/Medium/SemiBold/Bold/ExtraBold with fontTools
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
- **Draw connectors with `K.connector()`, never `addShape('line')`.** A
  horizontal or vertical line serialises to a zero-height/zero-width extent,
  which PowerPoint frequently drops or misdraws even though LibreOffice
  tolerates it. `connector()` builds shafts from rectangles and heads from
  triangles, so both renderers agree.
- **Stick to fonts that exist.** Montserrat for everything, `Courier New` for
  the monospace compartments. Avoid Consolas and other platform-specific faces.
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
8. Image Management Program — what comes next
9. **Divider — Project 02**
10. AEGIS — the problem (supply-chain attacks)
11. AEGIS — what I built (reachability, three honest answers)
12. AEGIS — the five stages
13. AEGIS — proving it works
14. AEGIS — what comes next
15. **Divider — Project 03**
16. CVE-to-Patch — the problem (117 flaws)
17. CVE-to-Patch — manual to seconds (0% to 100%)
18. CVE-to-Patch — what 209 means, and the rule that collapses it
19. CVE-to-Patch — the payoff (209 to 46 tickets, 78% fewer)
20. CVE-to-Patch — what comes next (one unified dashboard)
21. Summary

## AEGIS accuracy

The AEGIS section describes the **current five-stage architecture**: SCAN,
REACH, BLAST, REGRESS, FIX. An earlier design (FORGE / LEDGER / WATCHTOWER) is
gone — do not reintroduce it.

Two things the section is careful about, because a security audience will ask:

- The **5,675 packages** figure comes from a real production scan by an
  *earlier version* of the tool, and is labelled as such on slides 11 and 12.
  It is not mixed in with the current version's results.
- The current version's live flaw-database lookups are **not yet proven** on the
  corporate network, and slide 14 says so plainly. Do not soften that — the
  tool's own core rule is that unknown is never reported as safe.
