/** Slides 9-14: Project 02 — AEGIS, supply-chain defense. */
const { C, T, G, SHADOW, ON_RED, ON_INK } = require('../tokens');
const K = require('../chrome');
const { PROJECTS, NOTES } = require('../content');

const P = PROJECTS.two;

function divider(pptx) {
  return require('./divider').divider(pptx, {
    num: '02', label: P.label, blurb: P.blurb, slideNum: 10,
  });
}

// ---------------------------------------------------------------------------
// 10 — The problem: one poisoned package reaches everyone downstream.
// ---------------------------------------------------------------------------
function problem(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  The Problem',
    title: 'One poisoned package reaches everyone',
    section: 'AEGIS',
    num: 11,
  });

  K.text(s, 'In a supply-chain attack, an attacker hides malicious code inside a legitimate, widely-used open-source package. Everyone who installs it inherits the compromise — including us. Real campaigns in 2025 and 2026 worked exactly this way, including a self-spreading family that reused each victim to infect the next.', {
    x: G.M, y: 2.16, w: 11.4, h: 0.62, ...T.lead, color: C.muted, lineSpacingMultiple: 1.22,
  });

  const artX = 1.28, artW = 10.8, artY = 3.06;
  const artH = K.placeImage(s, 'supply-chain', { x: artX, y: artY, w: artW });

  const stages = [
    { f: 0.060, t: 'Attacker' },
    { f: 0.246, t: 'Poisoned package' },
    { f: 0.471, t: 'Public registry' },
    { f: 0.819, t: 'Every project that installs it' },
  ];
  stages.forEach((st) => {
    const cxc = artX + st.f * artW;
    K.text(s, st.t, {
      x: cxc - 1.35, y: artY + artH + 0.1, w: 2.7, h: 0.32, align: 'center',
      ...T.caption, color: C.ink, lineSpacingMultiple: 1.15,
    });
  });

  const gy = 5.62;
  s.addShape('roundRect', {
    x: G.M, y: gy, w: G.contentW, h: 0.94, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: gy, w: 0.055, h: 0.94, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'WHY EXISTING TOOLS WERE NOT ENOUGH', {
    x: G.M + 0.26, y: gy + 0.15, w: 8, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Most scanners cry wolf: "you have 500 flaws." But our code never touches most of them, so nobody can tell what is urgent. AEGIS separates signal from noise by checking whether our code actually calls the vulnerable part.', {
    x: G.M + 0.26, y: gy + 0.41, w: G.contentW - 0.55, h: 0.42,
    ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.18,
  });

  s.addNotes(NOTES.p2Problem);
  return s;
}

// ---------------------------------------------------------------------------
// 11 — What I built: reachability, three honest answers, production scale.
// ---------------------------------------------------------------------------
function built(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  What I Built',
    title: 'A scanner that checks if the flaw is reachable',
    section: 'AEGIS',
    num: 12,
  });

  // headline metric — explicitly attributed to the earlier version
  K.stat(s, {
    value: P.packagesScanned, label: 'packages scanned in production\nby an earlier version of the tool',
    x: G.M, y: 2.2, w: 4.3, valueStyle: T.statXL, gap: 1.24,
  });

  const bullets = [
    ['Reachability, not just presence',
     'Not "you have a flawed package" but "your code actually calls the flawed part".'],
    ['Three honest answers',
     'Reachable, no call site found, or can\'t prove. They are never collapsed together into a single "safe".'],
    ['Unknown is never "safe"',
     'If the tool cannot tell, it says so. It never reports a clean result it has not earned.'],
  ];
  let by = 3.86;
  bullets.forEach(([t, d]) => {
    s.addShape('ellipse', { x: G.M + 0.02, y: by + 0.08, w: 0.12, h: 0.12, fill: { color: C.red }, line: { type: 'none' } });
    K.text(s, t, {
      x: G.M + 0.28, y: by, w: 4.1, h: 0.28,
      fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep,
    });
    K.text(s, d, {
      x: G.M + 0.28, y: by + 0.28, w: 4.05, h: 0.6, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.2,
    });
    by += 0.84;
  });

  // right — validation runs from that earlier version
  const cardX = 5.66, cardW = G.W - G.M - cardX;
  K.card(s, { x: cardX, y: 2.26, w: cardW, h: 3.32, fill: C.white });
  K.text(s, 'PACKAGES SCANNED PER RUN  ·  EARLIER VERSION', {
    x: cardX + 0.34, y: 2.54, w: cardW - 0.68, h: 0.24, ...T.micro, color: C.red,
  });
  // sized to sit inside the card, leaving room for the example band below
  const chartW = 4.66;
  K.placeImage(s, 'chart-packages', { x: cardX + (cardW - chartW) / 2, y: 2.82, w: chartW });

  // a worked example, so the three answers land as something concrete
  const ey = 5.76;
  s.addShape('roundRect', {
    x: cardX, y: ey, w: cardW, h: 0.96, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: cardX, y: ey, w: 0.055, h: 0.96, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'IN PRACTICE', {
    x: cardX + 0.26, y: ey + 0.14, w: 4, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'A package we use has a known flaw. AEGIS answers three things: does our code actually call it, how much would be affected, and how risky is the fix. Then the team decides whether it is urgent — instead of guessing.', {
    x: cardX + 0.26, y: ey + 0.38, w: cardW - 0.5, h: 0.5,
    fontFace: 'Montserrat', fontSize: 10, color: C.ink, lineSpacingMultiple: 1.2,
  });

  s.addNotes(NOTES.p2Built);
  return s;
}

// ---------------------------------------------------------------------------
// 12 — The five stages. Four read-only and automatic; one gated behind a human.
// ---------------------------------------------------------------------------
function pipeline(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  How It Works',
    title: 'Five stages. Only one can change anything',
    section: 'AEGIS',
    num: 13,
  });

  // the core rule, given top billing
  const ry = 2.04;
  s.addShape('roundRect', {
    x: G.M, y: ry, w: G.contentW, h: 0.58, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: ry, w: 0.055, h: 0.58, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, [
    { text: 'THE CORE RULE   ', options: { fontFace: 'Montserrat SemiBold', fontSize: 9, charSpacing: 1.4, color: C.red } },
    { text: P.honestyRule, options: { fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep } },
  ], { x: G.M + 0.26, y: ry + 0.19, w: G.contentW - 0.5, h: 0.3 });

  // stages 0-3
  K.text(s, 'STAGES 00–03   ·   RUN AUTOMATICALLY, READ ONLY — NOTHING IS CHANGED', {
    x: G.M, y: 2.84, w: 9, h: 0.22, ...T.micro, color: C.muted,
  });

  const gap = 0.36, boxW = (G.contentW - gap * 3) / 4, top = 3.06, boxH = 1.9;
  P.pipeline.forEach((st, i) => {
    const x = G.M + i * (boxW + gap);
    K.card(s, { x, y: top, w: boxW, h: boxH, fill: C.white });
    s.addShape('rect', { x, y: top, w: boxW, h: 0.05, fill: { color: C.red }, line: { type: 'none' } });

    K.text(s, st.n, {
      x: x + 0.24, y: top + 0.18, w: 1, h: 0.24,
      fontFace: 'Montserrat ExtraBold', fontSize: 13, color: 'DFBEC4', charSpacing: 0.4,
    });
    K.text(s, st.name, {
      x: x + 0.24, y: top + 0.44, w: boxW - 0.48, h: 0.3,
      fontFace: 'Montserrat ExtraBold', fontSize: 16, color: C.inkDeep, charSpacing: 0.3,
    });
    K.text(s, st.d, {
      x: x + 0.24, y: top + 0.8, w: boxW - 0.48, h: 0.78,
      fontFace: 'Montserrat', fontSize: 9.5, color: C.muted, lineSpacingMultiple: 1.18,
    });
    // network badge pinned to the card's bottom edge, clear of the description
    K.text(s, st.net, {
      x: x + 0.24, y: top + boxH - 0.3, w: boxW - 0.48, h: 0.22,
      fontFace: 'Montserrat SemiBold', fontSize: 8.5, color: C.red, charSpacing: 0.6,
    });

    if (i < 3) {
      K.connector(s, {
        x: x + boxW + 0.05, y: top + boxH / 2, len: gap - 0.1, dir: 'right', color: C.ink,
      });
    }
  });

  // stage 4 sits below a gate
  const fy = 5.22, lastCx = G.M + 3 * (boxW + gap) + boxW / 2;
  K.connector(s, { x: lastCx, y: top + boxH + 0.02, len: fy - top - boxH - 0.04, dir: 'down', color: C.red });
  K.text(s, 'ONLY IF YOU ASK', {
    x: lastCx - 2.6, y: top + boxH + 0.12, w: 2.4, h: 0.22, align: 'right',
    ...T.micro, color: C.red,
  });

  s.addShape('roundRect', {
    x: G.M, y: fy, w: G.contentW, h: 1.24, rectRadius: 0.06,
    fill: { color: C.inkDeep }, line: { type: 'none' }, shadow: SHADOW.soft,
  });
  K.text(s, `STAGE ${P.fix.n}`, {
    x: G.M + 0.34, y: fy + 0.22, w: 1.6, h: 0.22, ...T.micro, color: ON_INK.accent,
  });
  K.text(s, P.fix.name, {
    x: G.M + 0.34, y: fy + 0.48, w: 2, h: 0.4,
    fontFace: 'Montserrat ExtraBold', fontSize: 22, color: C.white, charSpacing: 0.3,
  });
  K.text(s, P.fix.d, {
    x: G.M + 2.3, y: fy + 0.24, w: 3.5, h: 0.8,
    fontFace: 'Montserrat', fontSize: 10, color: ON_INK.body, lineSpacingMultiple: 1.2,
  });

  // the three rails that make stage 4 safe
  P.fix.rails.forEach((r, i) => {
    const rx = G.M + 6.1, ry2 = fy + 0.2 + i * 0.29;
    K.text(s, '—', {
      x: rx, y: ry2, w: 0.2, h: 0.24,
      fontFace: 'Montserrat SemiBold', fontSize: 10, color: ON_INK.accent,
    });
    K.text(s, r, {
      x: rx + 0.24, y: ry2, w: 5.1, h: 0.26,
      fontFace: 'Montserrat SemiBold', fontSize: 10.5, color: C.white,
    });
  });

  return s;
}

// ---------------------------------------------------------------------------
// 13 — Proving it works. The verification story a security audience wants.
// ---------------------------------------------------------------------------
function proving(pptx) {
  const V = P.verification;
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  Proving It Works',
    title: 'I tried to catch it lying, and it held',
    section: 'AEGIS',
    num: 14,
  });

  K.text(s, 'A security tool that quietly reports "clean" when it actually failed is worse than no tool at all. So I tested the failure paths, not just the happy path.', {
    x: G.M, y: 2.14, w: 11.2, h: 0.36, ...T.lead, color: C.muted,
  });

  // two stat anchors
  const stats = [[V.packages, 'packages read from a real\nproject\'s lockfile'], [V.bugs, 'real bugs found in my own\ncode, and fixed']];
  stats.forEach(([v, l], i) => {
    const x = G.M + i * 2.5;
    K.text(s, v, {
      x, y: 2.72, w: 2.3, h: 0.66,
      fontFace: 'Montserrat ExtraBold', fontSize: 40, color: C.red, charSpacing: -1.4,
    });
    K.text(s, l, {
      x, y: 3.42, w: 2.3, h: 0.56, ...T.caption, color: C.muted, lineSpacingMultiple: 1.2,
    });
  });

  K.hairline(s, { x: G.M, y: 4.22, w: 4.5 });
  K.text(s, 'The bugs are the interesting part: one was an honesty bug — a "can\'t prove" result was being described as if the flaw had been confirmed absent. Exactly the failure the tool exists to prevent.', {
    x: G.M, y: 4.42, w: 4.4, h: 1.1, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // what was actually tested
  const x0 = 5.86, w = G.W - G.M - x0;
  K.text(s, 'WHAT I ACTUALLY TESTED', { x: x0, y: 2.66, w, h: 0.22, ...T.micro, color: C.red });

  let y = 2.98;
  V.points.forEach(([t, d]) => {
    s.addShape('rect', { x: x0, y: y + 0.06, w: 0.05, h: 0.2, fill: { color: C.red }, line: { type: 'none' } });
    K.text(s, t, {
      x: x0 + 0.2, y, w: w - 0.2, h: 0.26,
      fontFace: 'Montserrat SemiBold', fontSize: 12, color: C.inkDeep,
    });
    K.text(s, d, {
      x: x0 + 0.2, y: y + 0.28, w: w - 0.24, h: 0.6, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.2,
    });
    y += 0.95;
  });

  s.addNotes(NOTES.p2Proving);
  return s;
}

// ---------------------------------------------------------------------------
// 14 — What is not finished yet, said plainly.
// ---------------------------------------------------------------------------
function next(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  What Comes Next',
    title: 'What is still open, and how I would close it',
    section: 'AEGIS',
    num: 15,
  });

  K.text(s, 'The pipeline is built and its safety rails are tested. Three things still need a real run before I would call it finished.', {
    x: G.M, y: 2.16, w: 11.2, h: 0.36, ...T.lead, color: C.muted,
  });

  const cardW = (G.contentW - 0.31 * 2) / 3, top = 2.76, cardH = 3.44;
  P.next.forEach(([t, d], i) => {
    const x = G.M + i * (cardW + 0.31);
    K.card(s, { x, y: top, w: cardW, h: cardH, fill: C.white });
    s.addShape('rect', { x, y: top, w: cardW, h: 0.05, fill: { color: C.red }, line: { type: 'none' } });

    K.text(s, String(i + 1).padStart(2, '0'), {
      x: x + 0.34, y: top + 0.3, w: 1, h: 0.34,
      fontFace: 'Montserrat ExtraBold', fontSize: 20, color: 'DFBEC4', charSpacing: -0.3,
    });
    K.text(s, t, {
      x: x + 0.34, y: top + 0.72, w: cardW - 0.68, h: 0.62,
      fontFace: 'Montserrat SemiBold', fontSize: 14.5, color: C.inkDeep, lineSpacingMultiple: 1.08,
    });
    K.text(s, d, {
      x: x + 0.34, y: top + 1.42, w: cardW - 0.68, h: 1.9,
      ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.26,
    });
  });

  // honest status line — kept to one line so it clears the footer rule
  K.text(s, [
    { text: 'Said plainly:', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: '  the parts that judge risk are built and tested. The parts that depend on the corporate network are not proven yet.', options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 6.38, w: G.contentW, h: 0.3 });

  s.addNotes(NOTES.p2Next);
  return s;
}

module.exports = { divider, problem, built, pipeline, proving, next };
