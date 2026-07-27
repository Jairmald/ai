/** Slides 1-4: Title, Table of Contents, About Me, Internship Overview. */
const { C, T, G, SHADOW, ON_RED } = require('../tokens');
const K = require('../chrome');
const { ABOUT, ROTATIONS, TOC, EXEC, NOTES } = require('../content');

// ---------------------------------------------------------------------------
// 1 — Title. Full-bleed red with the ghosted Stewart mark.
// ---------------------------------------------------------------------------
function title(pptx) {
  const s = pptx.addSlide();
  s.addImage({ path: K.img('panel-red'), x: 0, y: 0, w: G.W, h: G.H });
  s.addImage({ path: K.img('mark-slash'), x: 7.7, y: -0.9, w: 6.6, h: 6.6 });

  K.logo(s, { variant: 'white', w: 2.4, x: G.M, y: 0.62 });

  K.text(s, 'STEWART TITLE  ·  INFORMATION SECURITY', {
    x: G.M, y: 2.52, w: 9, h: 0.26, ...T.eyebrow, color: ON_RED.eyebrow,
  });
  K.text(s, 'Information Security\nAnalyst Internship', {
    x: G.M, y: 2.88, w: 9.4, h: 1.75, ...T.hero, lineSpacingMultiple: 0.96,
  });
  K.rule(s, { x: G.M, y: 4.78, w: 0.78, h: 0.06, color: C.white });

  K.text(s, ABOUT.name, {
    x: G.M, y: 5.08, w: 7, h: 0.4, fontFace: 'Montserrat SemiBold', fontSize: 19, color: C.white,
  });
  K.text(s, 'Exit Presentation  ·  Summer 2026', {
    x: G.M, y: 5.5, w: 7, h: 0.3, ...T.caption, color: ON_RED.body,
  });
  return s;
}

// ---------------------------------------------------------------------------
// 2 — Table of Contents. Editorial index: numeral, title, description, rule.
// ---------------------------------------------------------------------------
function toc(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Contents', title: 'What I will walk through', section: 'Table of Contents', num: 2,
  });

  const top = 2.28, rowH = 0.735;
  TOC.forEach((r, i) => {
    const y = top + i * rowH;
    K.text(s, r.n, {
      x: G.M, y: y + 0.04, w: 0.85, h: 0.42,
      fontFace: 'Montserrat ExtraBold', fontSize: 21, color: C.red, charSpacing: -0.5,
    });
    K.text(s, r.t, {
      x: G.M + 0.92, y: y + 0.02, w: 5.1, h: 0.34,
      fontFace: 'Montserrat SemiBold', fontSize: 15.5, color: C.inkDeep,
    });
    K.text(s, r.d, {
      x: G.M + 5.7, y: y + 0.06, w: 5.1, h: 0.34, ...T.bodySm, color: C.muted,
    });
    // no rule under the final row — the footer hairline closes the list
    if (i < TOC.length - 1) K.hairline(s, { y: y + 0.56 });
  });
  return s;
}

// ---------------------------------------------------------------------------
// 3 — Executive summary. Three problems, three solutions, three proofs.
//     Sits early so the room gets scale and outcome before any detail.
// ---------------------------------------------------------------------------
function execSummary(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Executive Summary',
    title: 'Three problems, three working solutions',
    section: 'Executive Summary',
    num: 3,
  });

  K.text(s, 'Three separate gaps, three things the team keeps using. This is the whole story on one slide.', {
    x: G.M, y: 2.14, w: 11.2, h: 0.34, ...T.lead, color: C.muted,
  });

  // column headers
  const colX = [G.M, 4.62, 8.86];
  const colW = [3.5, 4.0, G.W - G.M - 8.86];
  ['THE PROBLEM', 'WHAT I BUILT', 'THE PROOF'].forEach((h, i) => {
    K.text(s, h, { x: colX[i], y: 2.72, w: colW[i], h: 0.22, ...T.micro, color: C.red });
  });
  K.hairline(s, { y: 3.0 });

  const rowH = 1.24, top = 3.16;
  EXEC.forEach((r, i) => {
    const y = top + i * rowH;
    K.text(s, r.problem, {
      x: colX[0], y, w: colW[0], h: 0.9, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.24,
    });
    K.text(s, r.solution, {
      x: colX[1], y, w: colW[1] - 0.3, h: 0.9,
      fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.inkDeep, lineSpacingMultiple: 1.24,
    });
    // proof sits in a tinted well so the outcome column reads first
    s.addShape('roundRect', {
      x: colX[2] - 0.2, y: y - 0.12, w: colW[2] + 0.2, h: 0.94, rectRadius: 0.05,
      fill: { color: C.redTint }, line: { type: 'none' },
    });
    K.text(s, r.proof, {
      x: colX[2], y: y + 0.02, w: colW[2] - 0.2, h: 0.72,
      fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.red, lineSpacingMultiple: 1.24,
    });
    if (i < EXEC.length - 1) K.hairline(s, { y: y + 1.06 });
  });

  s.addNotes(NOTES.execSummary);
  return s;
}

// ---------------------------------------------------------------------------
// 4 — About Me. Asymmetric split: red identity panel + field stack.
// ---------------------------------------------------------------------------
function about(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.white };

  const panelW = 4.75;
  s.addImage({ path: K.img('panel-red-left'), x: 0, y: 0, w: panelW, h: G.H });
  s.addImage({ path: K.img('mark-slash-faint'), x: -0.7, y: 4.3, w: 4.2, h: 4.2 });

  K.text(s, 'ABOUT ME', {
    x: G.M, y: 1.5, w: 3.4, h: 0.26, ...T.eyebrow, color: ON_RED.eyebrow,
  });
  K.text(s, ABOUT.name, {
    x: G.M, y: 1.9, w: 3.6, h: 1.5,
    fontFace: 'Montserrat ExtraBold', fontSize: 33, color: C.white,
    charSpacing: -0.7, lineSpacingMultiple: 0.98,
  });
  K.rule(s, { x: G.M, y: 3.42, w: 0.6, h: 0.05, color: C.white });
  K.text(s, ABOUT.role, {
    x: G.M, y: 3.68, w: 3.5, h: 0.6, ...T.caption, color: ON_RED.eyebrow, lineSpacingMultiple: 1.2,
  });

  // right column — one row per template field
  const x = panelW + 0.85, w = G.W - x - G.M;
  K.text(s, 'BACKGROUND', { x, y: 0.95, w, h: 0.26, ...T.eyebrow });

  const top = 1.42, rowH = 1.03;
  ABOUT.fields.forEach(([label, value], i) => {
    const y = top + i * rowH;
    K.text(s, label.toUpperCase(), {
      x, y, w, h: 0.24, ...T.micro, color: C.red,
    });
    K.text(s, value, {
      x, y: y + 0.27, w, h: 0.52, ...T.body, lineSpacingMultiple: 1.2,
    });
    if (i < ABOUT.fields.length - 1) {
      K.hairline(s, { x, y: y + 0.86, w });
    }
  });

  K.logo(s, { variant: 'red' });
  // footer confined to the white column so the rule never crosses the red panel
  K.footer(s, { section: 'About Me', num: 4, x, w });
  return s;
}

// ---------------------------------------------------------------------------
// 4 — Internship Overview. Timeline spine with three rotation stations.
// ---------------------------------------------------------------------------
function overview(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Internship Overview',
    title: 'Three rotations across the security team',
    section: 'Internship Overview',
    num: 5,
  });

  K.text(s, 'I moved through three different areas of Information Security. Each rotation produced one project.', {
    x: G.M, y: 2.06, w: 9.9, h: 0.34, ...T.lead, color: C.muted,
  });

  // horizontal spine
  const spineY = 3.12;
  K.hairline(s, { y: spineY, w: G.contentW, color: C.hair });

  const cardW = 3.62, gap = (G.contentW - cardW * 3) / 2;
  ROTATIONS.forEach((r, i) => {
    const x = G.M + i * (cardW + gap);

    // station dot on the spine
    s.addShape('ellipse', {
      x: x + 0.28, y: spineY - 0.105, w: 0.22, h: 0.22,
      fill: { color: C.red }, line: { color: C.white, width: 2 },
    });

    K.card(s, { x, y: spineY + 0.5, w: cardW, h: 2.5, fill: C.white });
    // red top edge
    s.addShape('rect', {
      x, y: spineY + 0.5, w: cardW, h: 0.055,
      fill: { color: C.red }, line: { type: 'none' },
    });

    K.text(s, r.n, {
      x: x + 0.34, y: spineY + 0.78, w: 1, h: 0.42,
      fontFace: 'Montserrat ExtraBold', fontSize: 24, color: C.redTint === '' ? C.red : 'DFBEC4',
      charSpacing: -0.5,
    });
    K.text(s, r.name, {
      x: x + 0.34, y: spineY + 1.3, w: cardW - 0.68, h: 0.36,
      fontFace: 'Montserrat SemiBold', fontSize: 15, color: C.inkDeep, lineSpacingMultiple: 1.05,
    });
    K.text(s, r.plain, {
      x: x + 0.34, y: spineY + 1.76, w: cardW - 0.68, h: 0.85,
      ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.22,
    });
  });

  return s;
}

module.exports = { title, toc, execSummary, about, overview };
