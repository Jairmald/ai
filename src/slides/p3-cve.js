/** Slides 12-17: Project 03 — CVE-to-Patch Automation. The headliner. */
const { C, T, G, SHADOW, ON_RED, ON_INK } = require('../tokens');
const K = require('../chrome');
const { PROJECTS } = require('../content');

const P = PROJECTS.three;

function divider(pptx) {
  return require('./divider').divider(pptx, {
    num: '03', label: P.label, blurb: P.blurb, slideNum: 15,
  });
}

// ---------------------------------------------------------------------------
// 13 — The problem: 117 flaws, each looked up by hand.
// ---------------------------------------------------------------------------
function problem(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Problem',
    title: 'Every flaw needed its own patch, found by hand',
    section: 'CVE-to-Patch Automation',
    num: 16,
  });

  // left — the headline number
  K.stat(s, {
    value: P.flaws, label: 'known flaws flagged this cycle,\neach needing its own specific patch',
    x: G.M, y: 2.36, w: 4.2, valueStyle: T.statXL, gap: 1.3,
  });

  s.addShape('rect', { x: G.M, y: 4.34, w: 0.62, h: 0.05, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'Kevlar is the tool the team uses to track which machines are exposed to which flaw.', {
    x: G.M, y: 4.56, w: 4.05, h: 0.7, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.25,
  });

  // right — plain-language framing + the manual cost
  const x0 = 5.5, w = G.W - G.M - x0;

  const defs = [
    ['WHAT A "KNOWN FLAW" IS', 'A publicly published weakness in software that attackers already know about. Each one has a matching fix released by the vendor.'],
    ['WHY IT IS SLOW', 'Finding the right fix means searching the vendor\'s patch catalogue for that exact flaw, on that exact software version — then repeating it.'],
  ];
  let y = 2.34;
  defs.forEach(([h, d]) => {
    K.text(s, h, { x: x0, y, w, h: 0.24, ...T.micro, color: C.red });
    K.text(s, d, { x: x0, y: y + 0.28, w, h: 0.76, ...T.body, lineSpacingMultiple: 1.24 });
    K.hairline(s, { x: x0, y: y + 1.14, w });
    y += 1.42;
  });

  // the manual cost, stated darkly
  const by = 5.22;
  s.addShape('roundRect', {
    x: x0, y: by, w, h: 1.32, rectRadius: 0.06,
    fill: { color: C.inkDeep }, line: { type: 'none' }, shadow: SHADOW.soft,
  });
  K.text(s, 'BEFORE', { x: x0 + 0.3, y: by + 0.18, w: 3, h: 0.22, ...T.micro, color: ON_INK.accent });
  K.text(s, [
    { text: P.manual, options: { fontFace: 'Montserrat ExtraBold', fontSize: 26, color: C.white, charSpacing: -0.8 } },
    { text: '   of analyst time, every cycle', options: { fontFace: 'Montserrat Medium', fontSize: 13, color: ON_INK.body } },
  ], { x: x0 + 0.3, y: by + 0.5, w: w - 0.6, h: 0.46 });
  K.text(s, 'None of it automated — 0% matched without a person doing the searching.', {
    x: x0 + 0.3, y: by + 1.0, w: w - 0.6, h: 0.24,
    fontFace: 'Montserrat Medium', fontSize: 10, color: ON_INK.muted,
  });

  return s;
}

// ---------------------------------------------------------------------------
// 14 — Manual to seconds: 0% -> 100% matched.
// ---------------------------------------------------------------------------
function match(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Result',
    title: 'From hours of manual lookup to seconds',
    section: 'CVE-to-Patch Automation',
    num: 17,
  });

  K.text(s, 'I built a script that searches Microsoft\'s official patch catalogue automatically and returns the exact fix for each flaw.', {
    x: G.M, y: 2.14, w: 11, h: 0.34, ...T.lead, color: C.muted,
  });

  // proportion pair
  const artW = 6.4, artY = 2.72;
  const artH = K.placeImage(s, 'chart-match', { x: G.M - 0.05, y: artY, w: artW });
  K.text(s, 'Share of the 117 flaws matched to their correct patch automatically', {
    x: G.M, y: artY + artH + 0.08, w: artW - 0.2, h: 0.3, align: 'center',
    ...T.caption, color: C.muted,
  });

  // supporting proof stack
  const x0 = 8.0, w = G.W - G.M - x0;
  const proof = [
    { v: '117/117', l: 'flaws matched to the correct patch' },
    { v: P.runtime, l: 'total runtime, start to finish' },
    { v: P.spotChecked, l: 'independently spot-checked and confirmed correct' },
  ];
  let y = 2.66;
  proof.forEach((p, i) => {
    K.card(s, { x: x0, y, w, h: 1.2, fill: i === 2 ? C.redTint : C.white, line: i === 2 ? C.red : C.hairLight });
    K.text(s, p.v, {
      x: x0 + 0.3, y: y + 0.19, w: w - 0.6, h: 0.48,
      fontFace: 'Montserrat ExtraBold', fontSize: 27, color: C.red, charSpacing: -0.9,
    });
    K.text(s, p.l, {
      x: x0 + 0.3, y: y + 0.71, w: w - 0.6, h: 0.42, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.18,
    });
    y += 1.36;
  });

  return s;
}

// ---------------------------------------------------------------------------
// 15 — What 209 means, and the rule that collapses it.
// ---------------------------------------------------------------------------
function granularity(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  Going Deeper',
    title: 'Matching the flaws was only half the job',
    section: 'CVE-to-Patch Automation',
    num: 18,
  });

  const cardW = 5.66, gap = 0.31, top = 2.22, cardH = 2.42;

  // card A — why 209 is a different number from 117
  K.card(s, { x: G.M, y: top, w: cardW, h: cardH, fill: C.white });
  K.text(s, 'WHY 209 IS NOT 117', {
    x: G.M + 0.34, y: top + 0.3, w: cardW - 0.68, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, [
    { text: '117', options: { fontFace: 'Montserrat ExtraBold', fontSize: 30, color: C.inkDeep, charSpacing: -1 } },
    { text: '  flaws  →  ', options: { fontFace: 'Montserrat Medium', fontSize: 14, color: C.muted } },
    { text: '209', options: { fontFace: 'Montserrat ExtraBold', fontSize: 30, color: C.red, charSpacing: -1 } },
    { text: '  fix-actions', options: { fontFace: 'Montserrat Medium', fontSize: 14, color: C.muted } },
  ], { x: G.M + 0.34, y: top + 0.6, w: cardW - 0.68, h: 0.5 });
  K.text(s, 'After matching, I cross-referenced against Kevlar\'s real per-machine tracking data. One flaw can need patching on many machines, and one patch can fix several flaws — so the real count of individual fix-actions across the fleet was 209.', {
    x: G.M + 0.34, y: top + 1.18, w: cardW - 0.68, h: 1.0, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // card B — the supersedence rule
  const bx = G.M + cardW + gap;
  K.card(s, { x: bx, y: top, w: cardW, h: cardH, fill: C.white });
  K.text(s, 'THE RULE THAT COLLAPSES IT', {
    x: bx + 0.34, y: top + 0.3, w: cardW - 0.68, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Newest patch wins', {
    x: bx + 0.34, y: top + 0.6, w: cardW - 0.68, h: 0.42,
    fontFace: 'Montserrat ExtraBold', fontSize: 24, color: C.inkDeep, charSpacing: -0.7,
  });
  K.text(s, 'Windows patches supersede each other — the newest one already contains every older fix for that software. So we keep only the newest patch for each machine-and-software pair. It silently covers the rest, with nothing left unpatched.', {
    x: bx + 0.34, y: top + 1.18, w: cardW - 0.68, h: 1.0, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // flow strip
  const fy = 5.12;
  K.text(s, 'THE FULL CHAIN', { x: G.M, y: fy, w: 6, h: 0.22, ...T.micro, color: C.red });

  const steps = [
    { v: '117', l: 'flaws matched' },
    { v: '209', l: 'real fix-actions' },
    { v: 'RULE', l: 'newest patch only' },
    { v: '46', l: 'tickets opened' },
  ];
  const sw = 2.72, sgap = (G.contentW - sw * 4) / 3, sy = fy + 0.34, sh = 1.02;
  steps.forEach((st, i) => {
    const x = G.M + i * (sw + sgap);
    const isLast = i === 3;
    const isRule = st.v === 'RULE';
    s.addShape('roundRect', {
      x, y: sy, w: sw, h: sh, rectRadius: 0.06,
      fill: { color: isLast ? C.red : C.card },
      line: { color: isLast ? C.red : C.hairLight, width: 0.75 },
      shadow: isLast ? SHADOW.red : SHADOW.none,
    });
    K.text(s, st.v, {
      x: x + 0.2, y: sy + 0.16, w: sw - 0.4, h: 0.46, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: isRule ? 17 : 26,
      color: isLast ? C.white : C.inkDeep, charSpacing: isRule ? 1.2 : -0.9,
      valign: 'middle',
    });
    K.text(s, st.l, {
      x: x + 0.16, y: sy + 0.66, w: sw - 0.32, h: 0.28, align: 'center',
      ...T.caption, color: isLast ? ON_RED.eyebrow : C.muted,
    });
    if (i < 3) {
      K.text(s, '›', {
        x: x + sw + sgap / 2 - 0.2, y: sy + 0.28, w: 0.4, h: 0.46, align: 'center', valign: 'middle',
        fontFace: 'Montserrat', fontSize: 26, color: C.hair, bold: true,
      });
    }
  });

  return s;
}

// ---------------------------------------------------------------------------
// 16 — The ROI: 209 fix-actions become 46 tickets.
// ---------------------------------------------------------------------------
function roi(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Payoff',
    title: '209 fix-actions became 46 tickets',
    section: 'CVE-to-Patch Automation',
    num: 19,
  });

  // headline stat row
  const stats = [
    { v: P.fixActions, l: 'individual fix-actions\nidentified across the fleet', tone: 'plain' },
    { v: P.tickets, l: 'tickets actually opened\nafter consolidation', tone: 'red' },
    { v: P.reduction, l: 'fewer tickets for the\nteam to work through', tone: 'red' },
  ];
  const sw = 3.62, sgap = (G.contentW - sw * 3) / 2, sy = 2.2, sh = 1.62;
  stats.forEach((st, i) => {
    const x = G.M + i * (sw + sgap);
    const red = st.tone === 'red';
    K.card(s, { x, y: sy, w: sw, h: sh, fill: red ? C.redTint : C.card, line: red ? C.red : C.hairLight });
    K.text(s, st.v, {
      x: x + 0.24, y: sy + 0.2, w: sw - 0.48, h: 0.74, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: 46, color: red ? C.red : C.inkDeep, charSpacing: -1.8,
    });
    K.text(s, st.l, {
      x: x + 0.24, y: sy + 0.98, w: sw - 0.48, h: 0.56, align: 'center',
      ...T.caption, color: C.muted, lineSpacingMultiple: 1.2,
    });
  });

  // waffle: every cell is one real fix-action
  const wy = 4.16;
  K.text(s, 'EVERY SQUARE IS ONE REAL FIX-ACTION', {
    x: G.M, y: wy, w: 7, h: 0.22, ...T.micro, color: C.red,
  });
  const artH = K.placeImage(s, 'chart-consolidation', { x: G.M, y: wy + 0.32, w: G.contentW });

  const ly = wy + 0.42 + artH;
  K.text(s, '46 opened as tickets', {
    x: G.M, y: ly, w: 5, h: 0.28,
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.red,
  });
  K.text(s, '163 absorbed by a newer patch already being installed', {
    x: G.W - G.M - 6, y: ly, w: 6, h: 0.28, align: 'right',
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.muted,
  });

  // verification line — the part a security audience cares about
  K.text(s, [
    { text: 'Zero coverage loss', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: `  —  verified across ${P.combos} machine-and-software combinations.`, options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 6.4, w: G.contentW, h: 0.3 });

  return s;
}

// ---------------------------------------------------------------------------
// 17 — Where it goes next: one unified dashboard.
// ---------------------------------------------------------------------------
function future(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  What Comes Next',
    title: 'Four systems, one screen',
    section: 'CVE-to-Patch Automation',
    num: 20,
  });

  const x0 = G.M, w = 4.55;
  K.text(s, 'Today these four systems each hold one piece of the story, and someone has to stitch them together by hand. The next step is a single view where the whole path is visible at once.', {
    x: x0, y: 2.2, w, h: 1.0, ...T.body, color: C.muted, lineSpacingMultiple: 1.28,
  });

  const chain = [
    ['Tenable', 'finds the flaw'],
    ['Kevlar', 'tracks which machines are exposed'],
    ['ServiceNow', 'opens the ticket'],
    ['Wiz', 'confirms the machine is real and reachable'],
  ];
  let y = 3.34;
  chain.forEach(([name, role], i) => {
    s.addShape('ellipse', {
      x: x0 + 0.02, y: y + 0.07, w: 0.2, h: 0.2,
      fill: { color: C.redTint }, line: { color: C.red, width: 1.5 },
    });
    s.addShape('ellipse', {
      x: x0 + 0.08, y: y + 0.13, w: 0.08, h: 0.08,
      fill: { color: C.red }, line: { type: 'none' },
    });
    if (i < chain.length - 1) {
      s.addShape('rect', {
        x: x0 + 0.115, y: y + 0.29, w: 0.012, h: 0.5,
        fill: { color: C.hair }, line: { type: 'none' },
      });
    }
    K.text(s, name, {
      x: x0 + 0.4, y, w: w - 0.4, h: 0.28,
      fontFace: 'Montserrat SemiBold', fontSize: 13.5, color: C.inkDeep,
    });
    K.text(s, role, {
      x: x0 + 0.4, y: y + 0.28, w: w - 0.45, h: 0.3, ...T.bodySm, color: C.muted,
    });
    y += 0.72;
  });

  K.text(s, 'Flaw found → fix identified → ticket opened → patch confirmed, all in one place.', {
    x: x0, y: 6.16, w, h: 0.5,
    fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.red, lineSpacingMultiple: 1.2,
  });

  // dashboard mockup
  const artX = 5.86, artW = G.W - G.M - artX, artY = 2.3;
  const artH = K.placeImage(s, 'dashboard-mock', { x: artX, y: artY, w: artW });
  K.text(s, 'Concept — not a live system', {
    x: artX, y: artY + artH + 0.16, w: artW, h: 0.26, align: 'center', ...T.caption, color: C.hair,
  });

  return s;
}

module.exports = { divider, problem, match, granularity, roi, future };
