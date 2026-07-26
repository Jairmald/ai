/**
 * Design tokens for the Stewart Title internship exit presentation.
 * Single source of truth for color, type, grid, and depth.
 */

// ---------------------------------------------------------------------------
// COLOR
//
// Stewart red is sampled directly from the official logo artwork: #942838.
// It is a deep crimson with a blue undertone — deliberately NOT the warmer,
// orange-leaning red it is often mistaken for. Every red in the deck is
// derived from it so nothing drifts back toward orange.
// ---------------------------------------------------------------------------
const C = {
  red: '942838',        // Stewart red, sampled from the logo
  redDark: '79212E',    // depth / shadow
  redDeep: '5D1923',    // deepest gradient stop
  redTint: 'F6EEF0',    // light card tint
  ink: '43464A',        // charcoal, template theme dk1
  inkDeep: '2B2D30',    // headline ink
  wordmark: '1E1E1E',   // near-black of the official wordmark
  card: 'F5F4F3',       // neutral card bg
  muted: '6E7175',      // secondary text
  hair: 'C9C6C4',       // hairline rules
  hairLight: 'E6E4E2',  // lighter rule
  white: 'FFFFFF',
  // supporting accents used sparingly in data viz
  slate: '5B6470',
  sand: 'C6BFC1',
};

/**
 * Tints for type and rules placed ON a red panel. Each is Stewart red mixed
 * with white at a fixed ratio, so they stay in the same crimson family.
 */
const ON_RED = {
  eyebrow: 'E4C9CE',    // 75% white — kickers, labels
  body: 'DAB4BA',       // 65% white — supporting copy
  muted: 'CA949C',      // 50% white — captions, card edges
  ghost: 'B9737E',      // 35% white — oversized ghosted numerals
};

/** Accents for type on the charcoal callout bands. */
const ON_INK = {
  accent: 'D9A3AE',
  body: 'DED9DA',
  muted: 'C4BBBD',
};

// ---------------------------------------------------------------------------
// TYPE — Montserrat, instanced to static weights
// ---------------------------------------------------------------------------
const F = {
  black: 'Montserrat ExtraBold',
  bold: 'Montserrat',        // used with bold:true
  semi: 'Montserrat SemiBold',
  medium: 'Montserrat Medium',
  regular: 'Montserrat',
};

/** Type scale. Sizes in points, charSpacing in points. */
const T = {
  hero:      { fontFace: F.black,   fontSize: 50, charSpacing: -1.0, color: C.white },
  display:   { fontFace: F.black,   fontSize: 40, charSpacing: -0.8, color: C.inkDeep },
  title:     { fontFace: F.black,   fontSize: 29, charSpacing: -0.5, color: C.inkDeep },
  subtitle:  { fontFace: F.medium,  fontSize: 15, charSpacing: 0,    color: C.muted },
  eyebrow:   { fontFace: F.semi,    fontSize: 10, charSpacing: 2.2,  color: C.red },
  eyebrowLt: { fontFace: F.semi,    fontSize: 10, charSpacing: 2.2,  color: ON_RED.eyebrow },
  lead:      { fontFace: F.medium,  fontSize: 14, charSpacing: 0,    color: C.ink },
  body:      { fontFace: F.regular, fontSize: 12.5, charSpacing: 0,  color: C.ink },
  bodySm:    { fontFace: F.regular, fontSize: 11, charSpacing: 0,    color: C.ink },
  caption:   { fontFace: F.medium,  fontSize: 9.5, charSpacing: 0.3, color: C.muted },
  micro:     { fontFace: F.semi,    fontSize: 8.5, charSpacing: 1.4, color: C.muted },
  statXL:    { fontFace: F.black,   fontSize: 72, charSpacing: -2.5, color: C.red },
  statLg:    { fontFace: F.black,   fontSize: 44, charSpacing: -1.5, color: C.red },
  statMd:    { fontFace: F.black,   fontSize: 30, charSpacing: -1.0, color: C.red },
  cardTitle: { fontFace: F.semi,    fontSize: 13, charSpacing: 0.2,  color: C.inkDeep },
  mono:      { fontFace: 'Courier New', fontSize: 10, charSpacing: 0,   color: C.ink },
};

// ---------------------------------------------------------------------------
// GRID — 13.333 x 7.5in, 12 columns
// ---------------------------------------------------------------------------
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const M = 0.85;               // outer margin
const GUTTER = 0.28;
const COLS = 12;
const COL_W = (SLIDE_W - M * 2 - GUTTER * (COLS - 1)) / COLS;

/** x position of column index i (0-based) */
const cx = (i) => M + i * (COL_W + GUTTER);
/** width spanning n columns */
const cw = (n) => n * COL_W + (n - 1) * GUTTER;

const G = {
  W: SLIDE_W, H: SLIDE_H, M, GUTTER, COL_W, cx, cw,
  contentW: SLIDE_W - M * 2,
  // vertical rhythm
  eyebrowY: 0.72,
  titleY: 1.02,
  ruleY: 1.86,
  bodyTop: 2.12,
  footerY: 6.92,
};

// ---------------------------------------------------------------------------
// DEPTH — soft shadows so cards lift off the page
// ---------------------------------------------------------------------------
const SHADOW = {
  card:  { type: 'outer', color: '959092', blur: 14, offset: 3.5, angle: 90, opacity: 0.22 },
  soft:  { type: 'outer', color: '959092', blur: 9,  offset: 2,   angle: 90, opacity: 0.16 },
  lift:  { type: 'outer', color: '686264', blur: 22, offset: 6,   angle: 90, opacity: 0.28 },
  red:   { type: 'outer', color: '5D1923', blur: 16, offset: 4,   angle: 90, opacity: 0.34 },
  none:  { type: 'outer', color: 'FFFFFF', blur: 0,  offset: 0,   angle: 90, opacity: 0 },
};

module.exports = { C, F, T, G, SHADOW, ON_RED, ON_INK, SLIDE_W, SLIDE_H };
