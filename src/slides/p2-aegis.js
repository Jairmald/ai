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

  K.text(s, 'In a supply-chain attack, an attacker hides malicious code inside a legitimate open-source package. Everyone who installs it inherits the compromise — including us. Real campaigns in 2025 and 2026 worked this way.', {
    x: G.M, y: 2.16, w: 11.4, h: 0.62, ...T.lead, color: C.muted, lineSpacingMultiple: 1.22,
  });

  // Sized so the art, its stage labels and the callout band all clear each
  // other: at the full content width the art ran 3.15in tall and pushed the
  // labels underneath the band, where they were invisible.
  const artW = 8.5, artX = (G.W - artW) / 2, artY = 2.88;
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
      // the art carries transparent padding below the last row of cubes, so
      // the labels are pulled back up into it rather than left floating
      x: cxc - 1.35, y: artY + artH - 0.26, w: 2.7, h: 0.32, align: 'center',
      ...T.caption, color: C.ink, lineSpacingMultiple: 1.15,
    });
  });

  const gy = 5.84, gh = 0.86;
  s.addShape('roundRect', {
    x: G.M, y: gy, w: G.contentW, h: gh, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: gy, w: 0.055, h: gh, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'WHY EXISTING TOOLS WERE NOT ENOUGH', {
    x: G.M + 0.26, y: gy + 0.13, w: 8, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Most scanners cry wolf: "you have 500 flaws." But our code never touches most of them, so nobody can tell what is urgent. AEGIS separates signal from noise by checking whether our code actually calls the vulnerable part.', {
    x: G.M + 0.26, y: gy + 0.37, w: G.contentW - 0.55, h: 0.42,
    ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.18,
  });

  s.addNotes(NOTES.p2Problem);
  return s;
}

// ---------------------------------------------------------------------------
// 11 — What I built.
//
// Left column states the shift in framing; right column defines the three
// answers by name. Slide 13 then shows a real run landing in exactly those
// three buckets, so the vocabulary has to be established here.
//
// The 5,675 figure used to be the headline. It is an *earlier version's*
// number, and leading with it now reads as a step backwards next to slide 13's
// real 1,518-package run, so it is demoted to a supporting scale fact.
// ---------------------------------------------------------------------------
function built(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  What I Built',
    title: 'A scanner that checks if the flaw is reachable',
    section: 'AEGIS',
    num: 12,
  });

  K.text(s, 'Knowing a flawed package is installed is not the same as knowing you are exposed.', {
    x: G.M, y: 2.16, w: 11.4, h: 0.34, ...T.lead, color: C.muted,
  });

  const colL = G.M, colLW = 5.4;
  const colR = 6.63, colRW = G.W - G.M - colR;

  // ---- left: the shift in framing -----------------------------------------
  K.text(s, 'THE SHIFT', { x: colL, y: 2.72, w: 4, h: 0.22, ...T.micro, color: C.muted });

  const shift = [
    { tag: 'MOST SCANNERS', q: '"This package has a known flaw."',
      d: 'True, but the list runs to hundreds and everything on it looks equally urgent.',
      tint: C.card, bar: C.hair, tagColor: C.muted },
    { tag: 'AEGIS', q: '"Does our code actually call the flawed part?"',
      d: 'The list collapses to the few that can genuinely be reached — and those get worked first.',
      tint: C.redTint, bar: C.red, tagColor: C.red },
  ];
  shift.forEach((b, i) => {
    const y = 3.0 + i * 1.35;
    s.addShape('roundRect', {
      x: colL, y, w: colLW, h: 1.05, rectRadius: 0.06,
      fill: { color: b.tint }, line: { type: 'none' },
    });
    s.addShape('rect', { x: colL, y, w: 0.055, h: 1.05, fill: { color: b.bar }, line: { type: 'none' } });
    K.text(s, b.tag, { x: colL + 0.26, y: y + 0.13, w: 3.4, h: 0.2, ...T.micro, color: b.tagColor });
    K.text(s, b.q, {
      x: colL + 0.26, y: y + 0.35, w: colLW - 0.5, h: 0.26,
      fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep,
    });
    K.text(s, b.d, {
      x: colL + 0.26, y: y + 0.63, w: colLW - 0.5, h: 0.36,
      fontFace: 'Montserrat', fontSize: 9.5, color: C.ink, lineSpacingMultiple: 1.16,
    });
  });
  K.connector(s, { x: colL + colLW / 2, y: 4.08, len: 0.24, dir: 'down', color: C.hair, weight: 0.03 });

  // scale, stated as supporting evidence rather than the headline
  const sy = 5.72;
  K.hairline(s, { x: colL, y: sy, w: colLW });
  K.text(s, 'PROVEN AT SCALE', { x: colL, y: sy + 0.16, w: 4, h: 0.2, ...T.micro, color: C.muted });
  K.text(s, P.packagesScanned, {
    x: colL, y: sy + 0.38, w: 1.5, h: 0.42,
    fontFace: 'Montserrat ExtraBold', fontSize: 24, color: C.red, charSpacing: -0.6,
  });
  K.text(s, 'packages read in a single production run,\nby an earlier version of the tool.', {
    x: colL + 1.6, y: sy + 0.4, w: colLW - 1.6, h: 0.42,
    fontFace: 'Montserrat', fontSize: 10, color: C.muted, lineSpacingMultiple: 1.2,
  });

  // ---- right: the three answers, by name ----------------------------------
  K.text(s, 'THREE HONEST ANSWERS  ·  NEVER COLLAPSED INTO ONE "SAFE"', {
    x: colR, y: 2.72, w: colRW, h: 0.22, ...T.micro, color: C.red,
  });

  const answers = [
    { name: 'REACHABLE', bar: C.red,
      d: 'Our code does call the vulnerable part. This one is real exposure, and it gets worked.' },
    { name: 'NO CALL SITE FOUND', bar: C.hair,
      d: 'Nothing in our code reaches it. Read with a real code parser rather than a text search, so it is a confident answer.' },
    { name: 'CAN\'T PROVE', bar: C.ink,
      d: 'The tool cannot be certain either way — so it says exactly that, and a person makes the call.' },
  ];
  answers.forEach((a, i) => {
    const y = 3.0 + i * 1.17;
    K.card(s, { x: colR, y, w: colRW, h: 1.05, fill: C.white });
    s.addShape('rect', { x: colR, y, w: 0.055, h: 1.05, fill: { color: a.bar }, line: { type: 'none' } });
    K.text(s, a.name, {
      x: colR + 0.28, y: y + 0.16, w: colRW - 0.5, h: 0.26,
      fontFace: 'Montserrat ExtraBold', fontSize: 13, color: C.inkDeep, charSpacing: 0.4,
    });
    K.text(s, a.d, {
      x: colR + 0.28, y: y + 0.47, w: colRW - 0.56, h: 0.46,
      fontFace: 'Montserrat', fontSize: 9.5, color: C.muted, lineSpacingMultiple: 1.16,
    });
  });

  K.text(s, 'The third answer is why the other two can be trusted.', {
    x: colR, y: 6.5, w: colRW, h: 0.26,
    fontFace: 'Montserrat SemiBold', fontSize: 10.5, color: C.ink,
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

  s.addNotes(NOTES.p2Pipeline);
  return s;
}

// ---------------------------------------------------------------------------
// 13 — A real run, framed by what the team has to do about it.
//
// An earlier version of this slide gave "2 could not be proven either way" its
// own card, which read to a business audience as a failed test. The honest
// finding has not changed — it is simply no longer the headline, because it
// does not change the work: all three remaining findings are the same Angular
// version bump, so being unable to rule two of them out costs nothing. The
// caveat now sits in the closing band, where it reads as discipline.
// ---------------------------------------------------------------------------
function proving(pptx) {
  const V = P.verification;
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  A Real Run',
    title: '28 flagged. 25 need nothing. 3 are one upgrade.',
    section: 'AEGIS',
    num: 14,
  });

  K.text(s, [
    { text: 'A read-only scan of the ', options: { fontFace: 'Montserrat Medium', fontSize: 14, color: C.muted } },
    { text: V.repo, options: { fontFace: 'Montserrat SemiBold', fontSize: 14, color: C.inkDeep } },
    { text: ' repository. Real code, real flaws, pulled live.', options: { fontFace: 'Montserrat Medium', fontSize: 14, color: C.muted } },
  ], { x: G.M, y: 2.14, w: 11.4, h: 0.34 });

  // the funnel: what went in, what came back, what needs a person
  const fw = 3.62, fgap = (G.contentW - fw * 3) / 2, fy = 2.6, fh = 1.16;
  V.funnel.forEach(([v, l], i) => {
    const x = G.M + i * (fw + fgap);
    const isLast = i === 2;
    K.card(s, {
      x, y: fy, w: fw, h: fh,
      fill: isLast ? C.redTint : C.card, line: isLast ? C.red : C.hairLight,
    });
    K.text(s, v, {
      x: x + 0.2, y: fy + 0.16, w: fw - 0.4, h: 0.58, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: 34, color: isLast ? C.red : C.inkDeep, charSpacing: -1.2,
    });
    K.text(s, l, {
      x: x + 0.2, y: fy + 0.78, w: fw - 0.4, h: 0.28, align: 'center',
      ...T.caption, color: C.muted,
    });
    if (i < 2) {
      K.text(s, '›', {
        x: x + fw + fgap / 2 - 0.2, y: fy + 0.36, w: 0.4, h: 0.46,
        align: 'center', valign: 'middle',
        fontFace: 'Montserrat', fontSize: 26, color: C.hair, bold: true,
      });
    }
  });

  // what the team actually does with the result
  K.text(s, 'WHAT THAT MEANS FOR THE TEAM', {
    x: G.M, y: 4.02, w: 6, h: 0.22, ...T.micro, color: C.muted,
  });

  const bars = [C.hair, C.red, C.ink];
  const ow = (G.contentW - 0.3 * 2) / 3, oy = 4.3, oh = 1.42;
  V.outcomes.forEach(([t, d], i) => {
    const x = G.M + i * (ow + 0.3);
    K.card(s, { x, y: oy, w: ow, h: oh, fill: C.white });
    s.addShape('rect', { x, y: oy, w: ow, h: 0.05, fill: { color: bars[i] }, line: { type: 'none' } });
    K.text(s, t, {
      x: x + 0.28, y: oy + 0.24, w: ow - 0.56, h: 0.28,
      fontFace: 'Montserrat ExtraBold', fontSize: 14.5, color: C.inkDeep, charSpacing: -0.2,
    });
    K.text(s, d, {
      x: x + 0.28, y: oy + 0.58, w: ow - 0.56, h: 0.8,
      fontFace: 'Montserrat', fontSize: 9.5, color: C.muted, lineSpacingMultiple: 1.2,
    });
  });

  // the payoff line, with the honest caveat kept underneath it rather than
  // given equal billing
  const by = 5.86, bh = 0.86;
  s.addShape('roundRect', {
    x: G.M, y: by, w: G.contentW, h: bh, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: by, w: 0.055, h: bh, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, V.impact, {
    x: G.M + 0.26, y: by + 0.11, w: G.contentW - 0.55, h: 0.28,
    fontFace: 'Montserrat SemiBold', fontSize: 13, color: C.inkDeep,
  });
  K.text(s, V.honesty, {
    x: G.M + 0.26, y: by + 0.42, w: G.contentW - 0.55, h: 0.4,
    fontFace: 'Montserrat', fontSize: 9.5, color: C.ink, lineSpacingMultiple: 1.18,
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

  K.text(s, 'Built, safety-rail tested, and already run against a real repository. Three things would take it further.', {
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
    { text: '  it works, and it has been run for real. What is left is widening what it can answer with certainty, and getting it into other hands.', options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 6.38, w: G.contentW, h: 0.3 });

  s.addNotes(NOTES.p2Next);
  return s;
}

module.exports = { divider, problem, built, pipeline, proving, next };
