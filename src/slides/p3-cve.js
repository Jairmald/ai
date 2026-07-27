/** Slides 12-17: Project 03 — CVE-to-Patch Automation. The headliner. */
const { C, T, G, SHADOW, ON_RED, ON_INK } = require('../tokens');
const K = require('../chrome');
const { PROJECTS, NOTES } = require('../content');

const P = PROJECTS.three;

function divider(pptx) {
  return require('./divider').divider(pptx, {
    num: '03', label: P.label, blurb: P.blurb, slideNum: 16,
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
    num: 17,
  });

  // left — the headline number, with the selection criteria made explicit
  K.stat(s, {
    value: P.flaws, label: 'high and critical flaws tracked\nthis cycle, every one of them\ndirectly affecting the business',
    x: G.M, y: 2.3, w: 4.2, valueStyle: T.statXL, gap: 1.24,
  });

  s.addShape('rect', { x: G.M, y: 4.42, w: 0.62, h: 0.05, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, 'This is not a sample. Kevlar — the team\'s vulnerability tracker — flagged these because they met both bars: high or critical severity, and a direct effect on business operations.', {
    x: G.M, y: 4.64, w: 4.05, h: 1.1, ...T.bodySm, color: C.muted, lineSpacingMultiple: 1.25,
  });

  // right — plain-language framing + the manual cost
  const x0 = 5.5, w = G.W - G.M - x0;

  const defs = [
    ['WHAT A "KNOWN FLAW" IS', 'A publicly published weakness in software that attackers already know about. Each one has a matching fix released by the vendor.'],
    ['THE BOTTLENECK', 'Microsoft publishes the flaw and the fix in separate documents. Someone has to cross-reference them by hand, once per flaw, then check it against the real machine list. Do that 117 times and it is two days of work.'],
  ];
  let y = 2.28;
  defs.forEach(([h, d]) => {
    K.text(s, h, { x: x0, y, w, h: 0.24, ...T.micro, color: C.red });
    K.text(s, d, { x: x0, y: y + 0.28, w, h: 0.86, ...T.body, lineSpacingMultiple: 1.24 });
    K.hairline(s, { x: x0, y: y + 1.2, w });
    y += 1.46;
  });

  // the manual cost — an estimate, and labelled as one
  const by = 5.14;
  s.addShape('roundRect', {
    x: x0, y: by, w, h: 1.46, rectRadius: 0.06,
    fill: { color: C.inkDeep }, line: { type: 'none' }, shadow: SHADOW.soft,
  });
  K.text(s, 'BEFORE  ·  DOING IT BY HAND', {
    x: x0 + 0.3, y: by + 0.16, w: 4, h: 0.22, ...T.micro, color: ON_INK.accent,
  });
  K.text(s, [
    { text: P.manualTotal, options: { fontFace: 'Montserrat ExtraBold', fontSize: 26, color: C.white, charSpacing: -0.8 } },
    { text: `   ${P.manualDays}`, options: { fontFace: 'Montserrat Medium', fontSize: 12.5, color: ON_INK.body } },
  ], { x: x0 + 0.3, y: by + 0.46, w: w - 0.6, h: 0.44 });
  K.text(s, `Estimated at ${P.manualPerFlaw} per flaw from the steps above — a reasoned estimate based on the work involved, not a stopwatch measurement.`, {
    x: x0 + 0.3, y: by + 0.94, w: w - 0.6, h: 0.44,
    fontFace: 'Montserrat Medium', fontSize: 10, color: ON_INK.muted, lineSpacingMultiple: 1.2,
  });

  s.addNotes(NOTES.p3Problem);
  return s;
}

// ---------------------------------------------------------------------------
// 14 — Manual to seconds: 0% -> 100% matched.
// ---------------------------------------------------------------------------
function match(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Result',
    title: 'From about two days of work to twelve seconds',
    section: 'CVE-to-Patch Automation',
    num: 18,
  });

  K.text(s, 'I built a Python script that matches each flaw to its Microsoft patch automatically, using Microsoft\'s own public security feeds — no API key, no manual searching.', {
    x: G.M, y: 2.14, w: 11.2, h: 0.34, ...T.lead, color: C.muted,
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
    { v: P.spotChecked, l: 'spot-checked against Tenable, Rapid7 and public advisories — all confirmed correct' },
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

  s.addNotes(NOTES.p3Match);
  return s;
}

// ---------------------------------------------------------------------------
// 18 — The finding that mattered most: half the work did not need doing.
// ---------------------------------------------------------------------------
function noAction(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Finding',
    title: '52 of the 117 needed no action at all',
    section: 'CVE-to-Patch Automation',
    num: 19,
  });

  K.text(s, 'Cross-referencing the matched patches against the real fleet turned up something better than a faster process: a large share of the work did not need doing in the first place.', {
    x: G.M, y: 2.14, w: 11.2, h: 0.34, ...T.lead, color: C.muted,
  });

  // two anchors: what was left, and what fell away
  const cw2 = 5.66, gapX = 0.31, sy = 2.66, sh = 1.44;
  const cards = [
    { v: P.outstanding, l: 'flaws genuinely outstanding', tone: 'red' },
    { v: P.noAction, l: 'flaws needing no action at all', tone: 'plain' },
  ];
  cards.forEach((c, i) => {
    const x = G.M + i * (cw2 + gapX);
    const red = c.tone === 'red';
    K.card(s, { x, y: sy, w: cw2, h: sh, fill: red ? C.redTint : C.card, line: red ? C.red : C.hairLight });
    K.text(s, c.v, {
      x: x + 0.34, y: sy + 0.26, w: 1.9, h: 0.76,
      fontFace: 'Montserrat ExtraBold', fontSize: 46, color: red ? C.red : C.inkDeep, charSpacing: -1.8,
    });
    K.text(s, c.l, {
      x: x + 2.3, y: sy + 0.5, w: cw2 - 2.64, h: 0.5,
      fontFace: 'Montserrat SemiBold', fontSize: 13, color: red ? C.inkDeep : C.muted, lineSpacingMultiple: 1.15,
    });
  });

  // 117 squares, one per tracked flaw
  const wy = 4.36;
  K.text(s, 'EVERY SQUARE IS ONE TRACKED FLAW', {
    x: G.M, y: wy, w: 7, h: 0.22, ...T.micro, color: C.red,
  });
  const artH = K.placeImage(s, 'chart-no-action', { x: G.M, y: wy + 0.28, w: G.contentW });

  const ly = wy + 0.38 + artH;
  K.text(s, '65 still needed patching', {
    x: G.M, y: ly, w: 5, h: 0.28,
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.red,
  });
  K.text(s, '52 already covered by routine monthly patching', {
    x: G.W - G.M - 6, y: ly, w: 6, h: 0.28, align: 'right',
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.muted,
  });

  K.text(s, [
    { text: 'Why: ', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: 'routine monthly patching had already carried every machine past the fix for those 52 — so the patching process is working better than we assumed. We were tracking work that was already done.', options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 6.22, w: G.contentW, h: 0.34 });

  s.addNotes(NOTES.p3NoAction);
  return s;
}

// ---------------------------------------------------------------------------
// 19 — Where 209 came from, and the rule that collapses it.
// ---------------------------------------------------------------------------
function granularity(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  Going Deeper',
    title: 'Matching the flaws was only half the job',
    section: 'CVE-to-Patch Automation',
    num: 20,
  });

  const cardW = 5.66, gap = 0.31, top = 2.22, cardH = 2.42;

  // card A — 209 was already in Kevlar's report; it was found, not derived
  K.card(s, { x: G.M, y: top, w: cardW, h: cardH, fill: C.white });
  K.text(s, 'WHERE 209 COMES FROM', {
    x: G.M + 0.34, y: top + 0.3, w: cardW - 0.68, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Kevlar\'s own report', {
    x: G.M + 0.34, y: top + 0.6, w: cardW - 0.68, h: 0.42,
    fontFace: 'Montserrat ExtraBold', fontSize: 24, color: C.inkDeep, charSpacing: -0.7,
  });
  K.text(s, 'Kevlar publishes its own prioritisation report, and its KB Priority tab already held 209 rows — one for each unique pairing of flaw-set and operating-system product. I found that number in the data; I did not calculate it.', {
    x: G.M + 0.34, y: top + 1.18, w: cardW - 0.68, h: 1.0, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // card B — the rule, and the fact that applying it was the contribution
  const bx = G.M + cardW + gap;
  K.card(s, { x: bx, y: top, w: cardW, h: cardH, fill: C.white });
  K.text(s, 'WHAT I ACTUALLY DID', {
    x: bx + 0.34, y: top + 0.3, w: cardW - 0.68, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Highest build wins', {
    x: bx + 0.34, y: top + 0.6, w: cardW - 0.68, h: 0.42,
    fontFace: 'Montserrat ExtraBold', fontSize: 24, color: C.inkDeep, charSpacing: -0.7,
  });
  K.text(s, 'Windows updates supersede every earlier fix on that branch, so for each machine-and-product pair only the highest fixed-build patch is needed. Applying that rule — and proving it lost nothing — collapsed the 209 rows to 46.', {
    x: bx + 0.34, y: top + 1.18, w: cardW - 0.68, h: 1.0, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // flow strip — ties the three numbers together
  const fy = 5.12;
  K.text(s, 'HOW THE NUMBERS RELATE', { x: G.M, y: fy, w: 6, h: 0.22, ...T.micro, color: C.red });

  const steps = [
    { v: P.combos, l: 'host and product\nassignments in the fleet' },
    { v: '209', l: 'rows Kevlar grouped\nthem into' },
    { v: 'RULE', l: 'highest build\nwins' },
    { v: '46', l: 'tickets actually\nopened' },
  ];
  const sw = 2.72, sgap = (G.contentW - sw * 4) / 3, sy = fy + 0.32, sh = 1.16;
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
      x: x + 0.16, y: sy + 0.64, w: sw - 0.32, h: 0.44, align: 'center',
      ...T.caption, color: isLast ? ON_RED.eyebrow : C.muted, lineSpacingMultiple: 1.15,
    });
    if (i < 3) {
      K.text(s, '›', {
        x: x + sw + sgap / 2 - 0.2, y: sy + 0.35, w: 0.4, h: 0.46, align: 'center', valign: 'middle',
        fontFace: 'Montserrat', fontSize: 26, color: C.hair, bold: true,
      });
    }
  });

  s.addNotes(NOTES.p3Granularity);
  return s;
}

// ---------------------------------------------------------------------------
// 16 — The ROI: 209 fix-actions become 46 tickets.
// ---------------------------------------------------------------------------
function roi(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  The Payoff',
    title: '209 rows became 46 tickets',
    section: 'CVE-to-Patch Automation',
    num: 21,
  });

  // headline stat row
  const stats = [
    { v: P.fixActions, l: 'rows in Kevlar\u2019s own\nKB Priority report', tone: 'plain' },
    { v: P.tickets, l: 'tickets actually opened\nafter applying the rule', tone: 'red' },
    { v: P.reduction, l: 'fewer than the report\nimplied \u2014 163 absorbed', tone: 'red' },
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
  K.text(s, 'EVERY SQUARE IS ONE ROW IN KEVLAR\u2019S REPORT', {
    x: G.M, y: wy, w: 7, h: 0.22, ...T.micro, color: C.red,
  });
  const artH = K.placeImage(s, 'chart-consolidation', { x: G.M, y: wy + 0.32, w: G.contentW });

  const ly = wy + 0.42 + artH;
  K.text(s, '46 opened as tickets', {
    x: G.M, y: ly, w: 5, h: 0.28,
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.red,
  });
  K.text(s, '163 absorbed by a higher build already being installed', {
    x: G.W - G.M - 6, y: ly, w: 6, h: 0.28, align: 'right',
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.muted,
  });

  // verification line — the part a security audience cares about
  K.text(s, [
    { text: 'Zero coverage loss', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: `  —  verified across all ${P.combos} host-and-product combinations, not a sample.`, options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
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
    num: 22,
  });

  const x0 = G.M, w = 4.55;
  K.text(s, 'Today these four systems each hold one piece of the story, and someone stitches them together by hand. A single view would close that gap.', {
    x: x0, y: 2.2, w, h: 0.8, ...T.body, color: C.muted, lineSpacingMultiple: 1.28,
  });

  const chain = [
    ['Tenable', 'finds the flaw'],
    ['Kevlar', 'tracks which machines are exposed'],
    ['Jira', 'opens the ticket'],
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

  K.text(s, [
    { text: 'To be clear: ', options: { fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.inkDeep } },
    { text: 'the scripts are done and tested. The dashboard is optional follow-up work for whoever picks up the pipeline — not a dependency.', options: { fontFace: 'Montserrat', fontSize: 11, color: C.muted } },
  ], { x: x0, y: 6.06, w, h: 0.62, lineSpacingMultiple: 1.2 });

  // dashboard mockup
  const artX = 5.86, artW = G.W - G.M - artX, artY = 2.3;
  const artH = K.placeImage(s, 'dashboard-mock', { x: artX, y: artY, w: artW });
  K.text(s, 'Concept — not a live system', {
    x: artX, y: artY + artH + 0.16, w: artW, h: 0.26, align: 'center', ...T.caption, color: C.hair,
  });

  s.addNotes(NOTES.p3Future);
  return s;
}

module.exports = { divider, problem, match, noAction, granularity, roi, future };
