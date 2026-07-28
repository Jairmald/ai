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
    title: '52 of the 117 were already fixed',
    section: 'CVE-to-Patch Automation',
    num: 19,
  });

  // The single fact that explains this slide and the next two.
  const fy = 2.02;
  s.addShape('roundRect', {
    x: G.M, y: fy, w: G.contentW, h: 0.66, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: fy, w: 0.055, h: 0.66, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, [
    { text: 'THE ONE FACT   ', options: { fontFace: 'Montserrat SemiBold', fontSize: 9, charSpacing: 1.4, color: C.red } },
    { text: 'Windows updates are cumulative. Installing the newest one automatically includes every older fix — exactly like a phone update.', options: { fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep } },
  ], { x: G.M + 0.26, y: fy + 0.22, w: G.contentW - 0.5, h: 0.34 });

  // the fact, drawn
  const artW = 7.15, artY = 2.92;
  K.placeImage(s, 'cumulative-patch', { x: G.M, y: artY, w: artW });

  // what it meant across the fleet
  const x0 = 8.4, w = G.W - G.M - x0;
  K.text(s, 'SO WHEN WE CHECKED ALL 117', { x: x0, y: 2.96, w, h: 0.22, ...T.micro, color: C.red });

  const cards = [
    { v: P.noAction, l: 'were already fixed on every\nmachine — nothing to do', tone: 'plain' },
    { v: P.outstanding, l: 'were genuinely still open\nsomewhere', tone: 'red' },
  ];
  cards.forEach((c, i) => {
    const y = 3.32 + i * 1.06;
    const red = c.tone === 'red';
    K.card(s, { x: x0, y, w, h: 0.94, fill: red ? C.redTint : C.card, line: red ? C.red : C.hairLight });
    K.text(s, c.v, {
      x: x0 + 0.22, y: y + 0.16, w: 1.2, h: 0.62,
      fontFace: 'Montserrat ExtraBold', fontSize: 36, color: red ? C.red : C.inkDeep, charSpacing: -1.4,
    });
    K.text(s, c.l, {
      x: x0 + 1.5, y: y + 0.2, w: w - 1.72, h: 0.58,
      ...T.caption, color: C.muted, lineSpacingMultiple: 1.2,
    });
  });

  // proportion, one square per tracked flaw
  const wy = 5.5;
  const wArtH = K.placeImage(s, 'chart-no-action', { x: G.M, y: wy, w: G.contentW });
  const ly = wy + 0.08 + wArtH;
  K.text(s, '65 still needed patching', {
    x: G.M, y: ly, w: 5, h: 0.28,
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.red,
  });
  K.text(s, '52 already covered — nobody had to do anything for these', {
    x: G.W - G.M - 7, y: ly, w: 7, h: 0.28, align: 'right',
    fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.muted,
  });

  s.addNotes(NOTES.p3NoAction);
  return s;
}

// ---------------------------------------------------------------------------
// 19 — Where 209 came from, and the rule that collapses it.
// ---------------------------------------------------------------------------
function granularity(pptx) {
  const s = K.contentSlide(pptx, {
    eyebrow: 'Project 03  ·  Going Deeper',
    title: 'Why 65 flaws turn into 209 rows',
    section: 'CVE-to-Patch Automation',
    num: 20,
  });

  K.text(s, 'One flaw does not mean one patch. The same flaw needs a differently numbered patch on each version of Windows we run — so one flaw becomes several rows on the list.', {
    x: G.M, y: 2.14, w: 11.2, h: 0.34, ...T.lead, color: C.muted,
  });

  // the fan-out, drawn
  const artW = 6.5, artY = 2.68;
  K.placeImage(s, 'one-flaw-many-patches', { x: G.M - 0.1, y: artY, w: artW });

  // where 209 actually came from
  const x0 = 7.6, w = G.W - G.M - x0;
  K.card(s, { x: x0, y: 2.68, w, h: 2.42, fill: C.white });
  K.text(s, 'WHERE 209 COMES FROM', {
    x: x0 + 0.32, y: 2.94, w: w - 0.64, h: 0.22, ...T.micro, color: C.red,
  });
  K.text(s, 'Kevlar’s own report', {
    x: x0 + 0.32, y: 3.22, w: w - 0.64, h: 0.42,
    fontFace: 'Montserrat ExtraBold', fontSize: 22, color: C.inkDeep, charSpacing: -0.7,
  });
  K.text(s, 'Do that fan-out for all 65 open flaws, across every Windows version in the fleet, and it adds up to 209 rows. Kevlar already publishes that list — I opened it and counted, I did not calculate it.', {
    x: x0 + 0.32, y: 3.76, w: w - 0.64, h: 1.1, ...T.bodySm, color: C.ink, lineSpacingMultiple: 1.26,
  });

  // the whole chain, in order
  const fy = 5.3;
  K.text(s, 'THE WHOLE CHAIN', { x: G.M, y: fy, w: 6, h: 0.22, ...T.micro, color: C.red });

  const steps = [
    { v: P.flaws, l: 'flaws tracked' },
    { v: P.outstanding, l: 'still open' },
    { v: P.fixActions, l: 'rows once split\nby Windows version' },
    { v: P.tickets, l: 'tickets, after the\nnext slide’s rule' },
  ];
  const sw = 2.72, sgap = (G.contentW - sw * 4) / 3, sy = fy + 0.32, sh = 1.02;
  steps.forEach((st, i) => {
    const x = G.M + i * (sw + sgap);
    const isLast = i === 3;
    s.addShape('roundRect', {
      x, y: sy, w: sw, h: sh, rectRadius: 0.06,
      fill: { color: isLast ? C.red : C.card },
      line: { color: isLast ? C.red : C.hairLight, width: 0.75 },
      shadow: isLast ? SHADOW.red : SHADOW.none,
    });
    K.text(s, st.v, {
      x: x + 0.2, y: sy + 0.12, w: sw - 0.4, h: 0.44, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: 25,
      color: isLast ? C.white : C.inkDeep, charSpacing: -0.9, valign: 'middle',
    });
    K.text(s, st.l, {
      x: x + 0.16, y: sy + 0.58, w: sw - 0.32, h: 0.4, align: 'center',
      ...T.caption, color: isLast ? ON_RED.eyebrow : C.muted, lineSpacingMultiple: 1.15,
    });
    if (i < 3) {
      K.text(s, '›', {
        x: x + sw + sgap / 2 - 0.2, y: sy + 0.28, w: 0.4, h: 0.46, align: 'center', valign: 'middle',
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

  // the same fact as slide 19, now applied to a single machine
  const fy = 2.02;
  s.addShape('roundRect', {
    x: G.M, y: fy, w: G.contentW, h: 0.66, rectRadius: 0.06,
    fill: { color: C.redTint }, line: { type: 'none' },
  });
  s.addShape('rect', { x: G.M, y: fy, w: 0.055, h: 0.66, fill: { color: C.red }, line: { type: 'none' } });
  K.text(s, [
    { text: 'THE SAME FACT AGAIN   ', options: { fontFace: 'Montserrat SemiBold', fontSize: 9, charSpacing: 1.4, color: C.red } },
    { text: 'Only now applied to one machine at a time — because the newest patch already contains the older ones, most of those rows are the same job twice.', options: { fontFace: 'Montserrat SemiBold', fontSize: 12.5, color: C.inkDeep } },
  ], { x: G.M + 0.26, y: fy + 0.22, w: G.contentW - 0.5, h: 0.34 });

  // a worked example on one server
  const ex = 2.88, exW = 6.1;
  K.card(s, { x: G.M, y: ex, w: exW, h: 1.78, fill: C.white });
  K.text(s, 'ONE SERVER, THREE ROWS ON THE LIST', {
    x: G.M + 0.3, y: ex + 0.24, w: exW - 0.6, h: 0.22, ...T.micro, color: C.red,
  });
  const items = [
    ['March patch', 'for flaw 1', false],
    ['June patch', 'for flaw 2', false],
    ['September patch', 'for flaw 3', true],
  ];
  items.forEach(([t, d, keep], i) => {
    const y = ex + 0.56 + i * 0.34;
    K.text(s, keep ? '✓' : '—', {
      x: G.M + 0.3, y, w: 0.24, h: 0.26,
      fontFace: 'Montserrat SemiBold', fontSize: 12, color: keep ? C.red : C.hair,
    });
    K.text(s, [
      { text: t, options: { fontFace: keep ? 'Montserrat SemiBold' : 'Montserrat', fontSize: 12, color: keep ? C.inkDeep : C.muted } },
      { text: `   ${d}`, options: { fontFace: 'Montserrat', fontSize: 11, color: C.muted } },
    ], { x: G.M + 0.6, y, w: exW - 0.9, h: 0.26 });
  });
  K.text(s, 'September already contains March and June — one action, not three.', {
    x: G.M + 0.3, y: ex + 1.44, w: exW - 0.6, h: 0.26,
    fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.red,
  });

  // the result
  const x0 = 7.4, w = G.W - G.M - x0;
  const stats = [
    { v: P.fixActions, l: 'rows on Kevlar’s list', tone: 'plain' },
    { v: P.tickets, l: 'tickets actually opened', tone: 'red' },
    { v: P.reduction, l: 'fewer — 163 absorbed', tone: 'red' },
  ];
  const sw = (w - 0.24 * 2) / 3;
  stats.forEach((st, i) => {
    const x = x0 + i * (sw + 0.24);
    const red = st.tone === 'red';
    K.card(s, { x, y: ex, w: sw, h: 1.78, fill: red ? C.redTint : C.card, line: red ? C.red : C.hairLight });
    K.text(s, st.v, {
      x: x + 0.14, y: ex + 0.42, w: sw - 0.28, h: 0.7, align: 'center',
      fontFace: 'Montserrat ExtraBold', fontSize: 40, color: red ? C.red : C.inkDeep, charSpacing: -1.6,
    });
    K.text(s, st.l, {
      x: x + 0.14, y: ex + 1.2, w: sw - 0.28, h: 0.5, align: 'center',
      ...T.caption, color: C.muted, lineSpacingMultiple: 1.2,
    });
  });

  // proportion, one square per row on the list — 46 red, 163 absorbed
  const wy = 4.88, wafW = 10.4;
  K.text(s, 'EVERY SQUARE IS ONE ROW ON KEVLAR’S LIST  ·  RED BECAME A TICKET', {
    x: G.M, y: wy, w: 8, h: 0.22, ...T.micro, color: C.red,
  });
  K.placeImage(s, 'chart-consolidation', { x: G.M + (G.contentW - wafW) / 2, y: wy + 0.3, w: wafW });

  K.text(s, [
    { text: 'Nothing was skipped. ', options: { fontFace: 'Montserrat SemiBold', fontSize: 11.5, color: C.inkDeep } },
    { text: ` Checked across all ${P.combos} machine-and-product combinations, not a sample.`, options: { fontFace: 'Montserrat', fontSize: 11.5, color: C.muted } },
  ], { x: G.M, y: 6.46, w: G.contentW, h: 0.3 });

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
  K.text(s, 'Two views would close the gap: an SLA remediation dashboard showing whether flaws are fixed inside their deadline, and a patching dashboard showing how much of the fleet is current.', {
    x: x0, y: 2.2, w, h: 0.9, ...T.body, color: C.muted, lineSpacingMultiple: 1.28,
  });

  const chain = [
    ['Tenable', 'finds the flaw'],
    ['Kevlar', 'tracks which machines are exposed'],
    ['Jira', 'opens the ticket'],
    ['Wiz', 'confirms the machine is real and reachable'],
  ];
  let y = 3.26;
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
    y += 0.64;
  });

  K.text(s, [
    { text: 'To be clear: ', options: { fontFace: 'Montserrat SemiBold', fontSize: 11, color: C.inkDeep } },
    { text: 'the scripts are done and tested. The dashboard is optional follow-up work for whoever picks up the pipeline — not a dependency.', options: { fontFace: 'Montserrat', fontSize: 11, color: C.muted } },
  ], { x: x0, y: 5.96, w, h: 0.6, lineSpacingMultiple: 1.2 });

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
