# Internship Exit Presentation — Stewart Title

A 24-slide exit presentation for Jair Maldonado's Information Security Analyst internship,
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
| `build.js` | Assembles the 24 slides in order. |
| `tools/one-slide.js` | Builds any slide or run of slides into its own file. |
| `tools/splice-section.py` | Drops rebuilt slides into a hand-edited deck. |

## Updating the deck that is actually being presented

The working file is edited by hand in PowerPoint between revisions — slides get
cut, wording gets tightened — so it has drifted from what `build.js` produces
and a full rebuild would throw those edits away. Updates go in a slide at a
time instead:

```bash
node tools/one-slide.js aegis-problem aegis-built aegis-pipeline \
     aegis-proving aegis-next --name=AEGIS_Section

python3 tools/splice-section.py \
  --into MAIN.pptx --from out/slides/AEGIS_Section.pptx \
  --replace 10-12 --out out/merged/MAIN_updated.pptx --renumber
```

`--replace A-B` is a 1-indexed inclusive range in the target; the source deck's
slides land at position A and the old A..B are dropped. `--renumber` rewrites
every footer number to the new running order, which is otherwise the first
thing to go stale after slides are added or cut.

Two things the splice tool is deliberate about, and which are easy to get wrong
if it is ever rewritten:

- **Shared parts are edited as bytes, never re-serialised.**
  `[Content_Types].xml` and `presentation.xml` go through targeted string
  surgery. Round-tripping them through ElementTree turns the default namespace
  into a prefixed one — still well-formed XML, but PowerPoint and LibreOffice
  both refuse to open the result.
- **Footer renumbering runs afterwards, through python-pptx**, which edits with
  lxml and so keeps every namespace declaration the original part carried.

Always open the merged file before sending it. `soffice --headless
--convert-to pdf` failing is the reliable signal that a splice produced a
package Office will reject, even when python-pptx reads it happily.

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
5. Executive Summary — three problems, three solutions, three proofs
6. **Divider — Project 01**
7. Image Management Program — the problem (nine required tools)
8. Image Management Program — building the process
9. Image Management Program — what comes next
10. **Divider — Project 02**
11. AEGIS — the problem (supply-chain attacks)
12. AEGIS — what I built (the shift in framing, and the three answers by name)
13. AEGIS — the five stages
14. AEGIS — a real run (28 flagged, 25 need nothing, 3 are one upgrade)
15. AEGIS — what comes next
16. **Divider — Project 03**
17. CVE-to-Patch — the problem (117 flaws, manual baseline)
18. CVE-to-Patch — two days of work to twelve seconds
19. CVE-to-Patch — 52 of the 117 were already fixed (the cumulative-update fact)
20. CVE-to-Patch — why 65 flaws turn into 209 rows
21. CVE-to-Patch — 209 rows became 46 tickets (the same fact, per machine)
22. CVE-to-Patch — what comes next (dashboard as optional follow-up)
23. Summary — what this means for Stewart
24. Thank You — closing

Speaker notes carrying likely Q&A answers are attached to slides 5, 7, 9, 11,
12, 13, 14, 15, 17, 18, 19, 20 and 22.

## CVE-to-Patch accuracy

The numbers in this section are easy to get subtly wrong. What each one means:

- **117** — flaws Kevlar tracked this cycle. A *filtered* set, not a sample:
  every one was high or critical severity **and** directly affecting business
  operations. Say so — it is the reason the count is credible.
- **Manual baseline** (`~17.5 hours`) — a **reasoned estimate** at 8–10 minutes
  per flaw, not a timed measurement, and it must stay labelled that way on
  slide 16. It is *not* the old "18+ min" figure, which was the script's own
  first broken run against a TLS-inspecting proxy — never present that as
  analyst time.
- **52 / 65** — cross-referencing showed 52 of the 117 needed no action at all;
  only 65 were genuinely outstanding.
- **209** — came from Kevlar's own KB Priority tab. It was **found, not
  derived here**. The contribution was collapsing it, not discovering it.
  It is the **65 open flaws** split out per Windows version, not the 117.
- **2,658** — real host-and-product combinations. The chain is
  2,658 assignments → grouped by Kevlar into 209 rows → collapsed to 46.
- **78%** — measured against Kevlar's 209, not against the 117.

The whole section rests on one fact, stated on slide 19 and reused on 21:
**Windows updates are cumulative**, so the newest one already contains every
earlier fix. That is why 52 needed no action (fleet-wide) and why 209 rows
collapse to 46 (per machine). Do not cut it — without it neither number
makes sense.

## AEGIS accuracy

The AEGIS section describes the **current five-stage architecture**: SCAN,
REACH, BLAST, REGRESS, FIX. An earlier design (FORGE / LEDGER / WATCHTOWER) is
gone — do not reintroduce it.

Things the section is careful about, because a security audience will ask:

- The **5,675 packages** figure comes from a real production scan by an
  *earlier version* of the tool, and is labelled as such on slides 11 and 12.
  It is not mixed in with the current version's results.
- Slide 14 is the **current** version's evidence, and it is a real run against
  the `Stewart.STEPS.Frontend` repository, not a synthetic test:
  **1,518 packages → 28 carrying a known flaw → 3 needing a human decision.**
  Of the 28: 25 are confirmed not called by our code, 2 came back "can't
  prove". Those figures come straight from the scan report — do not round them
  and do not blend them with the 5,675.
- The **2 "can't prove" findings must not be given their own headline.** An
  earlier version of slide 14 put them on a card reading "2 could not be proven
  either way", which a business audience reads as a failed test. The finding is
  unchanged and still stated — it just is not the frame. Both are Angular
  packages the app genuinely uses; AEGIS knows the exact dangerous function for
  only about nine packages, Angular is not one of them yet, so it can confirm
  the package is used but not that the vulnerable function is reached. It said
  "unproven" rather than "safe", which is the core rule working. Never present
  those two as a false-positive rate or as a failure.
- **The reason the caution is affordable, and the slide's whole argument:** all
  three remaining findings are Angular packages on `20.3.18`, and all three are
  fixed by the same move to `20.3.22`. Being unable to rule two of them out
  changes nothing about the work — it is one version bump either way. That is
  why slide 14 is organised as *28 flagged / 25 need nothing / 3 are one
  upgrade* rather than by proof quality. If the underlying scan ever changes so
  that the three no longer share a fix, this framing has to be rebuilt, not
  patched.
- Nothing was **confirmed reachable** and nothing was confirmed reaching
  production. Worth saying out loud; it is not the same claim as "we are not
  exposed", and it should not be upgraded into one.
- **Live flaw-database lookups worked on this run.** The earlier "not yet
  proven on the corporate network" caveat is out of date as a blanket
  statement; what remains true is that the lookups still fail on networks where
  the security proxy inspects traffic, which is why the split-scan workaround
  stays. Slide 15 says exactly that.
- An earlier synthetic test (733 packages, two bugs found in my own code) is no
  longer on a slide. It lives in slide 14's speaker notes, where it belongs.
- **Slide 12 no longer leads with 5,675.** Next to slide 14's real 1,518-package
  run the bigger, older number read as a step backwards, so it is now a
  supporting "proven at scale" fact and the slide leads with the three answers
  instead. That is deliberate: slide 12 names REACHABLE / NO CALL SITE FOUND /
  CAN'T PROVE, and slide 14 then shows a real run landing in exactly those
  buckets. Cutting either half breaks the other.
- The summary slide's AEGIS line was updated to match. It used to cite 5,675;
  it now cites the real run.
