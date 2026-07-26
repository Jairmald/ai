/** Slides 8-11: Project 02 — AEGIS, supply-chain defense. */
const { C, T, G, SHADOW, ON_RED } = require('../tokens');
const K = require('../chrome');
const { PROJECTS } = require('../content');

const P = PROJECTS.two;

function divider(pptx) {
  return require('./divider').divider(pptx, {
    num: '02', label: P.label, blurb: P.blurb, slideNum: 8,
  });
}

// ---------------------------------------------------------------------------
// 9 — The problem: one poisoned package reaches everyone downstream.
// ---------------------------------------------------------------------------
function problem(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  The Problem',
    title: 'One poisoned package reaches everyone',
    section: 'AEGIS',
    num: 9,
  });

  K.text(s, 'In a supply-chain attack, an attacker hides malicious code inside a legitimate, widely-used open-source package. Everyone who installs it inherits the compromise — including us. Real campaigns in 2025 and 2026 worked exactly this way, including a self-spreading family that reused each victim to infect the next.', {
    x: G.M, y: 2.16, w: 11.4, h: 0.62, ...T.lead, color: C.muted, lineSpacingMultiple: 1.22,
  });

  // hero flow artwork
  const artX = 1.28, artW = 10.8, artY = 3.06;
  const artH = K.placeImage(s, 'supply-chain', { x: artX, y: artY, w: artW });

  // stage labels pinned to the artwork's stage centres
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

  // the gap in existing tooling
  const gy = 5.62;
  s.addShape('roundRect', {
    x: G.M, y: gy, w: G.contentW, h: 0.94, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: gy, w: 0.055, h: 0.94, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'WHY EXISTING TOOLS WERE NOT ENOUGH', {
    x: G.M + 0.26, y: gy + 0.15, w: 8, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Most scanners only say "you have a known flaw." They do not say whether our own code actually uses the flawed part — so teams cannot tell what is urgent and what is noise.', {
    x: G.M + 0.26, y: gy + 0.41, w: G.contentW - 0.55, h: 0.42,
    ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.18,
  });

  return s;
}

// ---------------------------------------------------------------------------
// 10 — What I built, and the scan volume behind it.
// ---------------------------------------------------------------------------
function built(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  What I Built',
    title: 'A scanner that checks if the flaw is reachable',
    section: 'AEGIS',
    num: 10,
  });

  // left — headline metric + supporting proof
  K.stat(s, {
    value: P.packagesScanned, label: 'real packages scanned in production',
    x: G.M, y: 2.26, w: 4.3, valueStyle: T.statXL, gap: 1.3,
  });

  const bullets = [
    ['Zero active compromise found', 'Nothing malicious was live in our dependencies.'],
    ['Full coverage', 'Every package our software depends on was checked, not a sample.'],
    ['Reachability, not just presence', 'AEGIS checks whether our code calls the flawed part, then prepares a fix ready for review.'],
  ];
  let by = 3.86;
  bullets.forEach(([t, d]) => {
    s.addShape('ellipse', { x: G.M + 0.02, y: by + 0.08, w: 0.12, h: 0.12, fill: { color: C.red }, line: { type: 'none' } });
    K.text(s, t, {
      x: G.M + 0.28, y: by, w: 4.1, h: 0.28,
      fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep,
    });
    K.text(s, d, {
      x: G.M + 0.28, y: by + 0.3, w: 4.05, h: 0.56, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.2,
    });
    by += 0.94;
  });

  // right — validation runs
  const cardX = 5.66, cardW = G.W - G.M - cardX;
  K.card(s, { x: cardX, y: 2.26, w: cardW, h: 4.16, fill: C.white });
  K.text(s, 'PACKAGES SCANNED PER VALIDATION RUN', {
    x: cardX + 0.34, y: 2.54, w: cardW - 0.68, h: 0.24, ...T.micro, color: C.red,
  });
  K.placeImage(s, 'chart-packages', { x: cardX + 0.26, y: 2.88, w: cardW - 0.52 });

  return s;
}

// ---------------------------------------------------------------------------
// 11 — The pipeline as a UML component diagram (native shapes, stays editable).
// ---------------------------------------------------------------------------
function pipeline(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 02  ·  How It Fits Together',
    title: 'Four parts, one rule: nothing grades itself',
    section: 'AEGIS',
    num: 11,
  });

  K.text(s, 'Built as four separate parts so no single component can both make a change and declare it safe.', {
    x: G.M, y: 2.16, w: 10.8, h: 0.34, ...T.lead, color: C.muted,
  });

  // narrower boxes buy enough gap for the hand-off labels to sit between them
  const boxW = 2.42, boxH = 2.04, top = 2.78;
  const gap = (G.contentW - boxW * 4) / 3;
  const centres = [];

  P.pipeline.forEach((comp, i) => {
    const x = G.M + i * (boxW + gap);
    centres.push(x + boxW / 2);

    // component body
    s.addShape('rect', {
      x, y: top, w: boxW, h: boxH,
      fill: { color: C.white }, line: { color: C.ink, width: 1 }, shadow: SHADOW.soft,
    });
    // header compartment
    s.addShape('rect', {
      x, y: top, w: boxW, h: 0.78,
      fill: { color: i === 0 ? C.red : C.card }, line: { color: C.ink, width: 1 },
    });
    K.text(s, `«${comp.stereo}»`, {
      x: x + 0.1, y: top + 0.12, w: boxW - 0.2, h: 0.22, align: 'center',
      fontFace: 'Montserrat Medium', fontSize: 9.5, color: i === 0 ? ON_RED.eyebrow : C.muted,
    });
    K.text(s, comp.name, {
      x: x + 0.1, y: top + 0.36, w: boxW - 0.2, h: 0.32, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: 15, charSpacing: 0.4,
      color: i === 0 ? C.white : C.inkDeep,
    });

    // operations compartment
    comp.ops.forEach((op, j) => {
      K.text(s, op, {
        x: x + 0.16, y: top + 0.94 + j * 0.33, w: boxW - 0.32, h: 0.28,
        fontFace: 'Courier New', fontSize: 9.5, color: C.ink,
      });
    });
  });

  // hand-off arrows, each labelled inside its own gap so nothing overlaps a box
  const labels = ['findings', 'fix\nproposal', 'approved\nchange'];
  for (let i = 0; i < 3; i++) {
    const x1 = G.M + i * (boxW + gap) + boxW;
    K.connector(s, {
      x: x1 + 0.06, y: top + boxH / 2 + 0.18, len: gap - 0.12, dir: 'right', color: C.ink,
    });
    K.text(s, labels[i], {
      x: x1, y: top + boxH / 2 - 0.44, w: gap, h: 0.54, align: 'center', valign: 'bottom',
      fontFace: 'Montserrat Medium', fontSize: 8, color: C.muted, lineSpacingMultiple: 1.05,
    });
  }

  // dashed «verify» return loop: WATCHTOWER back to AEGIS
  const loopY = top + boxH + 0.46;
  const xEnd = centres[3], xStart = centres[0];
  const drop = loopY - (top + boxH);
  K.connector(s, { x: xEnd, y: top + boxH, len: drop, dir: 'down', color: C.red, head: false, dash: true });
  K.connector(s, { x: xStart, y: loopY, len: xEnd - xStart, dir: 'left', color: C.red, head: false, dash: true });
  K.connector(s, { x: xStart, y: top + boxH, len: drop, dir: 'up', color: C.red, head: true });
  K.text(s, '«verify»  —  only AEGIS may mark a finding RESOLVED', {
    x: xStart, y: loopY + 0.06, w: xEnd - xStart, h: 0.24, align: 'center',
    fontFace: 'Montserrat SemiBold', fontSize: 9.5, color: C.red,
  });

  // UML notes
  const noteY = 5.66, noteH = 0.92, noteW = 5.66;
  const note = (x, heading, body, tone) => {
    s.addShape('rect', {
      x, y: noteY, w: noteW, h: noteH,
      fill: { color: tone === 'warn' ? C.redTint : C.card },
      line: { color: tone === 'warn' ? C.red : C.hair, width: 0.75 },
    });
    K.text(s, heading, { x: x + 0.2, y: noteY + 0.13, w: noteW - 0.5, h: 0.22, ...T.micro, color: C.red });
    K.text(s, body, {
      x: x + 0.2, y: noteY + 0.38, w: noteW - 0.42, h: 0.46, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.15,
    });
  };

  note(G.M, 'THE INVARIANT',
    'FORGE never assigns severity. AEGIS never checks out a branch. Each part does one job.', 'plain');
  note(G.M + noteW + 0.31, 'CURRENT STATUS',
    'Built end to end; first full pipeline test just run. Results to be confirmed before rollout.', 'warn');

  return s;
}

module.exports = { divider, problem, built, pipeline };
