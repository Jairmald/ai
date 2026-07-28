/**
 * Slide 23 — the close.
 *
 * Deliberately a thank-you, not a summary of contributions. The executive
 * summary on slide 3 already carries the "what I delivered" case, so the last
 * thing the room sees is gratitude rather than self-advocacy.
 */
const { C, T, G, ON_RED } = require('../tokens');
const K = require('../chrome');
const { THANKS } = require('../content');

function summary(pptx) {
  const s = pptx.addSlide();
  s.addImage({ path: K.img('panel-red'), x: 0, y: 0, w: G.W, h: G.H });
  s.addImage({ path: K.img('mark-slash-faint'), x: 9.4, y: 2.6, w: 5.6, h: 5.6 });

  K.logo(s, { variant: 'white' });

  K.text(s, 'IN CLOSING', { x: G.M, y: 0.78, w: 6, h: 0.26, ...T.eyebrow, color: ON_RED.eyebrow });
  K.text(s, 'Thank you', {
    x: G.M, y: 1.14, w: 8, h: 0.98,
    fontFace: 'Montserrat ExtraBold', fontSize: 46, color: C.white, charSpacing: -1.2,
  });
  K.rule(s, { x: G.M, y: 2.26, w: 0.7, h: 0.055, color: C.white });

  K.text(s, 'Everything in this deck exists because people here made room for an intern to do real work — and because plenty of them pushed back on it until it was right.', {
    x: G.M, y: 2.56, w: 8.6, h: 0.62, ...T.lead, color: ON_RED.body, lineSpacingMultiple: 1.3,
  });

  // the thank-yous themselves, set as an editorial list rather than cards
  const top = 3.42, rowH = 0.94;
  THANKS.forEach(([who, why], i) => {
    const y = top + i * rowH;
    s.addShape('rect', {
      x: G.M, y: y + 0.06, w: 0.05, h: 0.42, fill: { color: C.white }, line: { type: 'none' },
    });
    K.text(s, who, {
      x: G.M + 0.26, y, w: 10.6, h: 0.3,
      fontFace: 'Montserrat SemiBold', fontSize: 14, color: C.white,
    });
    K.text(s, why, {
      x: G.M + 0.26, y: y + 0.32, w: 10.2, h: 0.34,
      ...T.bodySm, color: ON_RED.body, lineSpacingMultiple: 1.2,
    });
    if (i < THANKS.length - 1) {
      s.addShape('rect', {
        x: G.M, y: y + 0.8, w: G.contentW, h: 0.008,
        fill: { color: ON_RED.muted }, line: { type: 'none' },
      });
    }
  });

  K.text(s, 'Happy to take any questions.', {
    x: G.M, y: 6.2, w: 7.6, h: 0.34,
    fontFace: 'Montserrat SemiBold', fontSize: 16, color: C.white,
  });
  K.text(s, 'Next up: the PWPA and PJPT certifications, heading toward penetration testing.', {
    x: G.M, y: 6.58, w: 8.4, h: 0.28, ...T.caption, color: ON_RED.body,
  });

  K.footer(s, { section: 'Thank You', num: 23, dark: true });
  return s;
}

module.exports = { summary };
