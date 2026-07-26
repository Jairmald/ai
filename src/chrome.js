/**
 * Reusable slide furniture: the "master" every slide is composed from.
 * Keeps the type hierarchy and margins identical across all 18 slides so the
 * art direction can vary per section without the grid drifting.
 */
const fs = require('fs');
const path = require('path');
const { C, T, G, SHADOW, ON_RED } = require('./tokens');

const GEN = path.join(__dirname, '..', 'assets', 'gen');
const img = (name) => path.join(GEN, `${name}.png`);

/** Read a PNG's pixel dimensions straight from its IHDR chunk. */
function pngSize(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

/** Measured from the trimmed asset, so placement never distorts the mark. */
function logoAspect(variant = 'red') {
  const { w, h } = pngSize(img(variant === 'white' ? 'logo-white' : 'logo-red'));
  return w / h;
}

/**
 * Place generated artwork by width alone — the height is derived from the
 * asset's real pixel dimensions. Artwork can then be re-authored at any size
 * without a stale ratio silently pushing a slide off the page.
 * Returns the placed height so callers can lay out what follows.
 */
function placeImage(slide, name, { x, y, w }) {
  const { w: pw, h: ph } = pngSize(img(name));
  const h = w * (ph / pw);
  slide.addImage({ path: img(name), x, y, w, h });
  return h;
}

// ---------------------------------------------------------------------------
// primitives
// ---------------------------------------------------------------------------

/** Text box with zero internal margin so x/y are exact. */
function text(slide, content, opts) {
  slide.addText(content, {
    margin: 0, valign: 'top', isTextBox: true, wrap: true, ...opts,
  });
}

/** Small letterspaced kicker above a title. */
function eyebrow(slide, label, { x = G.M, y = G.eyebrowY, style = T.eyebrow, w = 8 } = {}) {
  text(slide, label.toUpperCase(), { x, y, w, h: 0.24, ...style });
}

/** Slide headline. */
function title(slide, label, { x = G.M, y = G.titleY, w = 9.6, style = T.title, h = 0.95 } = {}) {
  text(slide, label, { x, y, w, h, lineSpacingMultiple: 0.98, ...style });
}

/** Short accent rule — the recurring divider under a title. */
function rule(slide, { x = G.M, y = G.ruleY, w = 0.62, h = 0.055, color = C.red } = {}) {
  slide.addShape('rect', { x, y, w, h, fill: { color }, line: { type: 'none' } });
}

/** Full-width hairline. */
function hairline(slide, { x = G.M, y, w = G.contentW, color = C.hairLight } = {}) {
  slide.addShape('rect', { x, y, w, h: 0.012, fill: { color }, line: { type: 'none' } });
}

/** Lifted card. */
function card(slide, { x, y, w, h, fill = C.white, shadow = SHADOW.card, line = C.hairLight, rounded = true }) {
  slide.addShape(rounded ? 'roundRect' : 'rect', {
    x, y, w, h,
    rectRadius: rounded ? 0.06 : 0,
    fill: { color: fill },
    line: line ? { color: line, width: 0.75 } : { type: 'none' },
    shadow,
  });
}

/** Logo lockup. Swap assets/gen/logo-*.png with the official file to replace. */
function logo(slide, { variant = 'red', w = 1.22, x = null, y = 0.5 } = {}) {
  const h = w / logoAspect(variant);
  slide.addImage({
    path: img(variant === 'white' ? 'logo-white' : 'logo-red'),
    x: x === null ? G.W - G.M - w : x,
    y, w, h,
  });
}

/**
 * Bottom chrome: hairline, section label, slide number.
 * `x`/`w` let a split-panel slide keep the rule inside its white column.
 */
function footer(slide, { section = '', num = null, dark = false, x = G.M, w = G.contentW } = {}) {
  const c = dark ? ON_RED.eyebrow : C.muted;
  if (!dark) hairline(slide, { x, y: G.footerY - 0.16, w });
  if (section) {
    text(slide, section.toUpperCase(), {
      x, y: G.footerY, w: 8, h: 0.22, ...T.micro, color: c,
    });
  }
  if (num !== null) {
    text(slide, String(num).padStart(2, '0'), {
      x: x + w - 1.2, y: G.footerY, w: 1.2, h: 0.22, align: 'right',
      ...T.micro, color: c,
    });
  }
}

/**
 * Standard white content slide: eyebrow, title, accent rule, footer chrome.
 *
 * Titles are written to sit on a single line at this width — the accent rule
 * lives at a fixed y, so a title that wraps would collide with it.
 */
function contentSlide(pptx, { eyebrow: eb, title: tl, section, num, titleW = 11.5, showLogo = true }) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  if (showLogo) logo(slide, { variant: 'red' });
  if (eb) eyebrow(slide, eb);
  if (tl) title(slide, tl, { w: titleW });
  rule(slide);
  footer(slide, { section, num });
  return slide;
}

/** Big number + caption block. */
function stat(slide, { value, label, x, y, w, valueStyle = T.statLg, labelStyle = T.caption, align = 'left', gap = 0.62 }) {
  text(slide, value, { x, y, w, h: gap, align, ...valueStyle });
  text(slide, label, { x, y: y + gap, w, h: 0.5, align, ...labelStyle, lineSpacingMultiple: 1.15 });
}

module.exports = {
  img, text, eyebrow, title, rule, hairline, card, logo, footer, contentSlide, stat,
  pngSize, logoAspect, placeImage,
};
