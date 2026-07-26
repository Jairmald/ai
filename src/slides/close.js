/** Slide 18: Summary — why this mattered, tied to Stewart's mission. */
const { C, T, G, SHADOW, ON_RED } = require('../tokens');
const K = require('../chrome');
const { CLOSING } = require('../content');

function summary(pptx) {
  const s = pptx.addSlide();
  s.addImage({ path: K.img('panel-red'), x: 0, y: 0, w: G.W, h: G.H });
  s.addImage({ path: K.img('mark-slash-faint'), x: 9.4, y: 3.2, w: 5.2, h: 5.2 });

  K.logo(s, { variant: 'white' });

  K.text(s, 'SUMMARY', { x: G.M, y: 0.72, w: 6, h: 0.26, ...T.eyebrow, color: ON_RED.eyebrow });
  K.text(s, 'Not just a good intern for my team —\nfor the company', {
    x: G.M, y: 1.08, w: 10.4, h: 1.24,
    fontFace: 'Montserrat ExtraBold', fontSize: 32, color: C.white,
    charSpacing: -0.8, lineSpacingMultiple: 1.02,
  });
  K.rule(s, { x: G.M, y: 2.46, w: 0.7, h: 0.055, color: C.white });

  // four beats, two by two
  const cardW = 5.66, gapX = 0.31, cardH = 1.4, gapY = 0.26, top = 2.86;
  CLOSING.forEach((b, i) => {
    const r = Math.floor(i / 2), c = i % 2;
    const x = G.M + c * (cardW + gapX);
    const y = top + r * (cardH + gapY);

    s.addShape('roundRect', {
      x, y, w: cardW, h: cardH, rectRadius: 0.06,
      fill: { color: 'FFFFFF', transparency: 88 }, line: { color: ON_RED.muted, width: 0.75 },
    });
    s.addShape('rect', { x, y, w: 0.05, h: cardH, fill: { color: C.white }, line: { type: 'none' } });

    K.text(s, b.t, {
      x: x + 0.28, y: y + 0.22, w: cardW - 0.56, h: 0.3,
      fontFace: 'Montserrat SemiBold', fontSize: 13.5, color: C.white,
    });
    K.text(s, b.d, {
      x: x + 0.28, y: y + 0.56, w: cardW - 0.56, h: 0.66,
      ...T.bodySm, color: ON_RED.eyebrow, lineSpacingMultiple: 1.2,
    });
  });

  // close
  K.text(s, 'Thank you — happy to take questions.', {
    x: G.M, y: 6.14, w: 7.6, h: 0.36,
    fontFace: 'Montserrat SemiBold', fontSize: 16, color: C.white,
  });
  K.text(s, 'Next up: the PWPA and PJPT certifications, heading toward penetration testing.', {
    x: G.M, y: 6.54, w: 8.4, h: 0.28, ...T.caption, color: ON_RED.body,
  });

  K.footer(s, { section: 'Summary', num: 18, dark: true });
  return s;
}

module.exports = { summary };
