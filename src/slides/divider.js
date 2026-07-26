/**
 * Full-red section divider. These are deliberate reset points in the talk —
 * they announce the project before it starts. Required; do not remove.
 */
const { C, T, G, ON_RED } = require('../tokens');
const K = require('../chrome');

function divider(pptx, { num, label, blurb, slideNum }) {
  const s = pptx.addSlide();
  s.addImage({ path: K.img('panel-red'), x: 0, y: 0, w: G.W, h: G.H });
  s.addImage({ path: K.img('mark-slash-faint'), x: 9.0, y: 0.4, w: 5.6, h: 5.6 });

  // oversized ghosted numeral — the visual anchor for the reset
  K.text(s, num, {
    x: 7.4, y: 0.62, w: 5.2, h: 4.6, align: 'right',
    fontFace: 'Montserrat ExtraBold', fontSize: 210, color: ON_RED.ghost,
    charSpacing: -8, transparency: 62,
  });

  K.text(s, `PROJECT ${num}`, {
    x: G.M, y: 2.62, w: 7, h: 0.28, ...T.eyebrow, color: ON_RED.eyebrow,
  });
  K.text(s, label, {
    x: G.M, y: 3.0, w: 7.4, h: 1.4,
    fontFace: 'Montserrat ExtraBold', fontSize: 41, color: C.white,
    charSpacing: -0.9, lineSpacingMultiple: 0.98,
  });
  K.rule(s, { x: G.M, y: 4.5, w: 0.7, h: 0.055, color: C.white });
  K.text(s, blurb, {
    x: G.M, y: 4.8, w: 6.9, h: 0.8, ...T.lead, color: ON_RED.body, lineSpacingMultiple: 1.25,
  });

  K.logo(s, { variant: 'white' });
  K.footer(s, { section: `Project ${num}`, num: slideNum, dark: true });
  return s;
}

module.exports = { divider };
