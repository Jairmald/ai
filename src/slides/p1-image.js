/** Slides 5-7: Project 01 — Image Management Program. */
const { C, T, G, SHADOW, ON_INK } = require('../tokens');
const K = require('../chrome');
const { AGENTS, PROJECTS } = require('../content');

const P = PROJECTS.one;

function divider(pptx) {
  return require('./divider').divider(pptx, {
    num: '01', label: P.label, blurb: P.blurb, slideNum: 5,
  });
}

// ---------------------------------------------------------------------------
// 6 — The problem. Nine required tools, and no process to install them.
// ---------------------------------------------------------------------------
function problem(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 01  ·  The Problem',
    title: 'Nine required tools. No process to install them.',
    section: 'Image Management Program',
    num: 6,
  });

  K.text(s, [
    { text: 'A ', options: {} },
    { text: 'Golden Image', options: { fontFace: 'Montserrat SemiBold', color: C.inkDeep } },
    { text: ' is the standard template every new virtual machine is built from — set it up once, and every machine created afterwards inherits it.', options: {} },
  ], { x: G.M, y: 2.22, w: 11.2, h: 0.36, ...T.lead, color: C.muted });

  // left — isometric artwork
  const isoH = K.placeImage(s, 'iso-machine', { x: 0.7, y: 2.74, w: 3.4 });
  K.text(s, 'Each layer is security tooling the image should carry before it is ever deployed.', {
    x: 0.65, y: 2.74 + isoH + 0.06, w: 3.5, h: 0.5, ...T.caption, align: 'center', lineSpacingMultiple: 1.2,
  });

  // right — the nine required tools
  const x0 = 4.62, colW = 2.42, gap = 0.2, rowH = 0.58, rowGap = 0.17;
  K.text(s, 'THE NINE REQUIRED TOOLS', {
    x: x0, y: 2.82, w: 7.9, h: 0.24, ...T.micro, color: C.red,
  });

  AGENTS.forEach((a, i) => {
    const r = Math.floor(i / 3), c = i % 3;
    const x = x0 + c * (colW + gap);
    const y = 3.2 + r * (rowH + rowGap);
    s.addShape('roundRect', {
      x, y, w: colW, h: rowH, rectRadius: 0.05,
      fill: { color: C.card }, line: { color: C.hairLight, width: 0.75 },
      shadow: SHADOW.soft,
    });
    s.addShape('rect', {
      x, y, w: 0.05, h: rowH, fill: { color: C.red }, line: { type: 'none' },
    });
    K.text(s, a, {
      x: x + 0.19, y: y + 0.08, w: colW - 0.32, h: rowH - 0.16,
      fontFace: 'Montserrat SemiBold', fontSize: 10.5, color: C.inkDeep,
      valign: 'middle', lineSpacingMultiple: 1.05,
    });
  });

  // the real gap — stated plainly
  const gy = 5.5;
  s.addShape('roundRect', {
    x: x0, y: gy, w: 7.86, h: 0.92, rectRadius: 0.05,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: x0, y: gy, w: 0.055, h: 0.92, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'THE ACTUAL GAP', {
    x: x0 + 0.24, y: gy + 0.14, w: 7.4, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'No dedicated process exists yet for installing these tools onto cloud images before deployment. My job was to define it.', {
    x: x0 + 0.24, y: gy + 0.4, w: 7.4, h: 0.44, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.18,
  });

  return s;
}

// ---------------------------------------------------------------------------
// 7 — Building the process. Three steps, then what was delivered.
// ---------------------------------------------------------------------------
function process(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 01  ·  What I Built',
    title: 'Building the process from scratch',
    section: 'Image Management Program',
    num: 7,
  });

  K.text(s, 'My role was to coordinate and bridge teams — define what is required, name who owns it, and get it signed off. I did not build or provision the machines myself.', {
    x: G.M, y: 2.14, w: 10.6, h: 0.36, ...T.lead, color: C.muted,
  });

  const cardW = 3.62, gap = (G.contentW - cardW * 3) / 2, top = 2.86, cardH = 2.42;

  P.steps.forEach((st, i) => {
    const x = G.M + i * (cardW + gap);
    K.card(s, { x, y: top, w: cardW, h: cardH, fill: C.white });

    // numeral in a tinted well
    s.addShape('roundRect', {
      x: x + 0.34, y: top + 0.34, w: 0.72, h: 0.72, rectRadius: 0.06,
      fill: { color: C.redTint }, line: { type: 'none' },
    });
    K.text(s, st.n, {
      x: x + 0.34, y: top + 0.34, w: 0.72, h: 0.72, align: 'center', valign: 'middle',
      fontFace: 'Montserrat ExtraBold', fontSize: 21, color: C.red, charSpacing: -0.5,
    });

    K.text(s, st.t, {
      x: x + 0.34, y: top + 1.24, w: cardW - 0.68, h: 0.36,
      fontFace: 'Montserrat SemiBold', fontSize: 15.5, color: C.inkDeep,
    });
    K.text(s, st.d, {
      x: x + 0.34, y: top + 1.68, w: cardW - 0.68, h: 0.72,
      ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.22,
    });

    // connector chevron between cards
    if (i < 2) {
      const cxArrow = x + cardW + gap / 2;
      K.text(s, '›', {
        x: cxArrow - 0.22, y: top + 0.9, w: 0.44, h: 0.6, align: 'center', valign: 'middle',
        fontFace: 'Montserrat', fontSize: 30, color: C.hair, bold: true,
      });
    }
  });

  // delivered band
  const by = 5.62;
  s.addShape('roundRect', {
    x: G.M, y: by, w: G.contentW, h: 0.94, rectRadius: 0.06,
    fill: { color: C.inkDeep }, line: { type: 'none' }, shadow: SHADOW.soft,
  });
  K.text(s, 'DELIVERED', {
    x: G.M + 0.32, y: by + 0.16, w: 2, h: 0.22, ...T.micro, color: ON_INK.accent,
  });
  K.text(s, 'A written Roles & Responsibilities framework — drafted, staged for review, and set for formal adoption once the policy manager returns in Q4.', {
    x: G.M + 0.32, y: by + 0.42, w: G.contentW - 0.64, h: 0.4,
    ...T.bodySm, color: 'FFFFFF', lineSpacingMultiple: 1.15,
  });

  return s;
}

// ---------------------------------------------------------------------------
// 8 — Where the programme goes from here.
// ---------------------------------------------------------------------------
function next(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 01  ·  What Comes Next',
    title: 'From a drafted framework to a standing process',
    section: 'Image Management Program',
    num: 8,
  });

  K.text(s, 'The framework exists on paper. Turning it into something the company runs without me is the next stretch.', {
    x: G.M, y: 2.16, w: 11.2, h: 0.36, ...T.lead, color: C.muted,
  });

  const cardW = (G.contentW - 0.31 * 2) / 3, top = 2.86, cardH = 2.52;
  P.next.forEach(([t, d], i) => {
    const x = G.M + i * (cardW + 0.31);
    K.card(s, { x, y: top, w: cardW, h: cardH, fill: C.white });
    s.addShape('rect', { x, y: top, w: cardW, h: 0.05, fill: { color: C.red }, line: { type: 'none' } });

    K.text(s, String(i + 1).padStart(2, '0'), {
      x: x + 0.34, y: top + 0.3, w: 1, h: 0.34,
      fontFace: 'Montserrat ExtraBold', fontSize: 20, color: 'DFBEC4', charSpacing: -0.3,
    });
    K.text(s, t, {
      x: x + 0.34, y: top + 0.74, w: cardW - 0.68, h: 0.4,
      fontFace: 'Montserrat SemiBold', fontSize: 15, color: C.inkDeep,
    });
    K.text(s, d, {
      x: x + 0.34, y: top + 1.22, w: cardW - 0.68, h: 1.6,
      ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.26,
    });
  });

  K.text(s, [
    { text: 'The honest status:', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: '  drafted and staged for review, not yet formally adopted. The decision sits with the policy manager in Q4.', options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 5.72, w: G.contentW, h: 0.3 });

  return s;
}

module.exports = { divider, problem, process, next };
