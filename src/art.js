/**
 * Custom SVG artwork generators.
 *
 * Each function returns an SVG string. build.js writes these to assets/gen/*.svg
 * and tools/rasterize.py converts them to high-DPI PNGs for embedding.
 *
 * Pure graphics live here. Most *text* is placed with native pptx text boxes
 * instead, so it stays crisp and editable in PowerPoint.
 */
const { C } = require('./tokens');

const hex = (h) => `#${h}`;

// ---------------------------------------------------------------------------
// Backgrounds & marks
// ---------------------------------------------------------------------------

/** Full-bleed red panel with depth: diagonal gradient + soft radial bloom. */
function redPanel(w = 1333, h = 750) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="${hex(C.red)}"/>
      <stop offset="55%"  stop-color="${hex(C.redDark)}"/>
      <stop offset="100%" stop-color="${hex(C.redDeep)}"/>
    </linearGradient>
    <radialGradient id="bloom" cx="0.22" cy="0.18" r="0.75">
      <stop offset="0%"   stop-color="#FFFFFF" stop-opacity="0.16"/>
      <stop offset="60%"  stop-color="#FFFFFF" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#bloom)"/>
</svg>`;
}

/** Oversized ghosted "///" mark — the recurring Stewart motif. */
function slashMark(w = 900, h = 900, opacity = 0.07, color = '#FFFFFF') {
  const bar = (x) =>
    `<path d="M ${x} ${h * 0.94} L ${x + h * 0.42} ${h * 0.06} L ${x + h * 0.42 + 118} ${h * 0.06} L ${x + 118} ${h * 0.94} Z" fill="${color}" opacity="${opacity}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${bar(20)}${bar(220)}${bar(420)}
</svg>`;
}

/** Subtle diagonal hairline texture for large neutral areas. */
function hairTexture(w = 800, h = 800) {
  let lines = '';
  for (let i = -h; i < w; i += 26) {
    lines += `<line x1="${i}" y1="${h}" x2="${i + h}" y2="0" stroke="${hex(C.hair)}" stroke-width="1" opacity="0.30"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${lines}</svg>`;
}

// ---------------------------------------------------------------------------
// Logo lockup
// ---------------------------------------------------------------------------

/**
 * Typographic Stewart lockup. This is a PLACEHOLDER built from type, not the
 * official trademarked asset — swap assets/logo-red.png / logo-white.png with
 * the real files and the deck picks them up with no code changes.
 * Aspect ratio held at ~4.18 to match the official mark.
 */
function logo(variant = 'red') {
  // Reconstructed from the official logo artwork: three red slashes whose
  // rightmost forms the left face of a roof peak, with a charcoal right face,
  // followed by the lowercase wordmark.
  //
  // Geometry measured from the source file — slash height 71, horizontal width
  // 23, pitch 29, and a 0.507 rightward lean per unit of height.
  //
  // This is a reconstruction, not the trademarked asset. Drop the official
  // file in as assets/gen/logo-red.png / logo-white.png and the deck will use
  // it unchanged — placement reads the PNG's real dimensions at build time.
  const H = 71, W = 23, PITCH = 29, LEAN = 0.507;
  const yTop = 32, yBot = yTop + H;
  const xBot = 47;
  const dx = LEAN * H;

  const white = variant === 'white';
  const markCol = white ? '#FFFFFF' : hex(C.red);
  const roofCol = white ? 'rgba(255,255,255,0.55)' : hex(C.wordmark);
  const wordCol = white ? '#FFFFFF' : hex(C.wordmark);

  const slash = (i) => {
    const bl = xBot + i * PITCH;
    return `<path d="M ${bl} ${yBot} L ${bl + W} ${yBot} L ${bl + W + dx} ${yTop} L ${bl + dx} ${yTop} Z" fill="${markCol}"/>`;
  };

  // right face of the peak, springing from the apex of the third slash
  const apexX = xBot + 2 * PITCH + W + dx;   // 164
  const roof = `<path d="M ${apexX} ${yTop} L ${apexX + 17} ${yTop + 32} L ${apexX - 7} ${yTop + 32} Z" fill="${roofCol}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="200" viewBox="0 0 900 200">
  ${slash(0)}${slash(1)}${slash(2)}
  ${roof}
  <text x="192" y="${yBot}" font-family="Montserrat Bold, Montserrat" font-size="79"
        font-weight="700" letter-spacing="-0.5" fill="${wordCol}">stewart</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// Slide 6 — isometric "secure machine": a VM built from stacked agent layers
// ---------------------------------------------------------------------------
function isoMachine(w = 680, h = 660) {
  // Isometric projection tuned so the whole composition fits the canvas with
  // even margins: base image slab at the bottom, three security layers stacked
  // above it warming from neutral to Stewart red, shield crest floating on top.
  const ox = 340, oy = 318, sx = 260, sy = 130;
  const H = 52;   // vertical gap between slabs
  const TH = 19;  // slab thickness

  const P = (u, v, z) => [ox + (u - v) * sx, oy + (u + v) * sy - z];
  const poly = (pts, fill, stroke, sw = 1.2) =>
    `<polygon points="${pts.map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;

  /** One isometric slab at height z with thickness t. */
  const slab = (z, t, top, left, right) => {
    const a = P(0, 0, z), b = P(1, 0, z), c = P(1, 1, z), d = P(0, 1, z);
    const a2 = P(0, 0, z - t), d2 = P(0, 1, z - t), c2 = P(1, 1, z - t);
    return (
      poly([d, c, c2, d2], right, 'rgba(0,0,0,0.16)') +
      poly([a, d, d2, a2], left, 'rgba(0,0,0,0.16)') +
      poly([a, b, c, d], top, 'rgba(255,255,255,0.6)', 1.4)
    );
  };

  /** Small chips on a slab's top face — the installed agents. */
  const chips = (z, color, coords) =>
    coords.map(([u, v]) => {
      const p = P(u, v, z);
      return `<ellipse cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" rx="13" ry="6.5" fill="${color}" opacity="0.85"/>`;
    }).join('');

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="sh" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <linearGradient id="shieldG" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="${hex(C.red)}"/>
      <stop offset="100%" stop-color="${hex(C.redDeep)}"/>
    </linearGradient>
  </defs>
  <ellipse cx="${ox}" cy="${oy + 2 * sy + 12}" rx="232" ry="46" fill="#8A8480" opacity="0.28" filter="url(#sh)"/>`;

  // base slab — the raw cloud image, deliberately neutral/unsecured
  out += slab(0, TH + 8, '#C6BFC1', '#A0989A', '#8C8486');

  // three security layers, deepening toward Stewart crimson as coverage builds
  const layers = [
    { z: H,     top: '#F5E3E7', l: '#D9BFC5', r: '#C8AAB1', chip: '#C08E98' },
    { z: H * 2, top: '#EFC9D0', l: '#C98F9B', r: '#B57C89', chip: '#AF6373' },
    { z: H * 3, top: '#C25668', l: hex(C.red), r: '#79212E', chip: '#FFFFFF' },
  ];
  layers.forEach((L) => {
    out += slab(L.z, TH, L.top, L.l, L.r);
    out += chips(L.z, L.chip, [[0.28, 0.3], [0.62, 0.36], [0.42, 0.68]]);
  });

  // shield crest floating above the secured stack
  const cys = oy - H * 3 - 92;
  out += `<line x1="${ox}" y1="${cys + 72}" x2="${ox}" y2="${(oy - H * 3 - 8).toFixed(1)}"
            stroke="${hex(C.red)}" stroke-width="2.2" opacity="0.4" stroke-dasharray="5 5"/>`;
  out += `<g transform="translate(${ox},${cys})">
    <path d="M 0 -56 L 46 -36 L 46 6 C 46 40 24 60 0 72 C -24 60 -46 40 -46 6 L -46 -36 Z"
          fill="url(#shieldG)" stroke="#FFFFFF" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M -19 4 L -5 19 L 21 -14" fill="none" stroke="#FFFFFF" stroke-width="7.5"
          stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  return out + `</svg>`;
}

// ---------------------------------------------------------------------------
// Slide 9 — supply-chain attack flow
// ---------------------------------------------------------------------------
function supplyChain(w = 960, h = 280) {
  // Attacker -> poisoned package -> public registry -> every project that
  // installs it. The final grid carries the point: one compromise, many victims.
  const y = 140;
  const xAtk = 58, xPkg = 236, xReg = 452;

  const pkg = (x, yy, s, fill, stroke, sw = 2.4) =>
    `<g transform="translate(${x},${yy}) scale(${s})">
       <path d="M -34 -20 L 0 -38 L 34 -20 L 34 20 L 0 38 L -34 20 Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw / s}" stroke-linejoin="round"/>
       <path d="M -34 -20 L 0 -2 L 34 -20 M 0 -2 L 0 38" fill="none" stroke="${stroke}" stroke-width="${(sw * 0.7) / s}" opacity="0.5"/>
     </g>`;

  const arrow = (x1, x2, yy, color) =>
    `<line x1="${x1}" y1="${yy}" x2="${x2 - 12}" y2="${yy}" stroke="${color}" stroke-width="2.8"/>
     <path d="M ${x2} ${yy} L ${x2 - 13} ${yy - 6.5} L ${x2 - 13} ${yy + 6.5} Z" fill="${color}"/>`;

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="glow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="10" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

  // 1. attacker
  out += `<g transform="translate(${xAtk},${y})">
    <circle r="38" fill="${hex(C.inkDeep)}"/>
    <circle r="12.5" cy="-9" fill="#FFFFFF" opacity="0.92"/>
    <path d="M -18 19 C -18 1 18 1 18 19 Z" fill="#FFFFFF" opacity="0.92"/>
  </g>`;

  // 2. poisoned package
  out += arrow(xAtk + 46, xPkg - 44, y, hex(C.red));
  out += `<g filter="url(#glow)">${pkg(xPkg, y, 1, hex(C.red), hex(C.redDeep), 2.6)}</g>`;

  // 3. public registry
  out += arrow(xPkg + 44, xReg - 54, y, hex(C.red));
  out += `<g transform="translate(${xReg},${y})">
    <rect x="-52" y="-44" width="104" height="88" rx="8" fill="#FFFFFF" stroke="${hex(C.ink)}" stroke-width="2.4"/>
    <line x1="-52" y1="-18" x2="52" y2="-18" stroke="${hex(C.ink)}" stroke-width="2"/>
    <circle cx="-36" cy="-31" r="5" fill="${hex(C.red)}"/>
    <circle cx="-20" cy="-31" r="5" fill="${hex(C.hair)}"/>
    <rect x="-38" y="-6" width="76" height="9" rx="4.5" fill="${hex(C.hair)}"/>
    <rect x="-38" y="12" width="52" height="9" rx="4.5" fill="${hex(C.hair)}"/>
  </g>`;

  // 4. blast radius — a grid of downstream projects, all inheriting the compromise
  const gx = 700, cols = 4, rows = 3, cs = 44, gap = 16;
  const gridW = cols * cs + (cols - 1) * gap;
  const gridH = rows * cs + (rows - 1) * gap;
  const gy = y - gridH / 2;

  [0, 1, 2].forEach((r) => {
    const ry = gy + r * (cs + gap) + cs / 2;
    out += `<path d="M ${xReg + 56} ${y} C ${xReg + 130} ${y}, ${gx - 108} ${ry}, ${gx - 42} ${ry}"
              fill="none" stroke="${hex(C.red)}" stroke-width="2.4" opacity="0.8"/>
            <path d="M ${gx - 28} ${ry} L ${gx - 41} ${ry - 6} L ${gx - 41} ${ry + 6} Z" fill="${hex(C.red)}"/>`;
  });

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = gx + c * (cs + gap) + cs / 2;
      const py = gy + r * (cs + gap) + cs / 2;
      out += pkg(px, py, cs / 76, hex(C.redTint), hex(C.red), 2.6);
    }
  }
  return out + `</svg>`;
}

// ---------------------------------------------------------------------------
// Charts — built by hand so they can carry annotations that argue
// ---------------------------------------------------------------------------

/** Slide 10: packages scanned per validation run. */
function chartPackages(w = 760, h = 430) {
  const data = [
    { label: 'Initial Test', v: 82 },
    { label: 'Production Run 1', v: 3024 },
    { label: 'Production Run 2', v: 2651 },
  ];
  const max = 3300;
  const padL = 74, padR = 24, padB = 74, padT = 34;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const bw = 118, gap = (plotW - bw * data.length) / (data.length + 1);

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hex(C.red)}"/>
      <stop offset="100%" stop-color="${hex(C.redDark)}"/>
    </linearGradient>
    <filter id="bsh" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#8F3620" flood-opacity="0.28"/>
    </filter>
  </defs>`;

  // gridlines + y labels
  [0, 1000, 2000, 3000].forEach((t) => {
    const yy = padT + plotH - (t / max) * plotH;
    out += `<line x1="${padL}" y1="${yy}" x2="${w - padR}" y2="${yy}" stroke="${hex(C.hairLight)}" stroke-width="1"/>
            <text x="${padL - 12}" y="${yy + 4}" text-anchor="end" font-family="Montserrat Medium, Montserrat"
                  font-size="13" fill="${hex(C.muted)}">${t.toLocaleString()}</text>`;
  });

  data.forEach((d, i) => {
    const bh = (d.v / max) * plotH;
    const x = padL + gap + i * (bw + gap);
    const yy = padT + plotH - bh;
    out += `<rect x="${x}" y="${yy}" width="${bw}" height="${bh}" rx="4" fill="url(#barG)" filter="url(#bsh)"/>`;
    out += `<text x="${x + bw / 2}" y="${yy - 14}" text-anchor="middle" font-family="Montserrat ExtraBold, Montserrat"
                  font-size="25" fill="${hex(C.inkDeep)}">${d.v.toLocaleString()}</text>`;
    out += `<text x="${x + bw / 2}" y="${padT + plotH + 27}" text-anchor="middle" font-family="Montserrat SemiBold, Montserrat"
                  font-size="13.5" fill="${hex(C.ink)}">${d.label}</text>`;
  });

  // baseline
  out += `<line x1="${padL}" y1="${padT + plotH}" x2="${w - padR}" y2="${padT + plotH}" stroke="${hex(C.ink)}" stroke-width="2"/>`;
  return out + `</svg>`;
}

/** Slide 14: 0% -> 100% automated match, as a before/after proportion pair. */
function chartMatch(w = 720, h = 400) {
  const r = 104, cy = 176;
  const cxA = 176, cxB = 544;

  const ring = (cx, pct, color, track) => {
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${track}" stroke-width="30"/>
            ${pct > 0 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="30"
              stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="0"
              transform="rotate(-90 ${cx} ${cy})" stroke-linecap="butt"/>` : ''}`;
  };

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <filter id="rsh" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#8F3620" flood-opacity="0.22"/>
      </filter>
    </defs>`;

  out += ring(cxA, 0, hex(C.red), hex(C.hairLight));
  out += `<text x="${cxA}" y="${cy + 17}" text-anchor="middle" font-family="Montserrat ExtraBold, Montserrat"
                font-size="56" fill="${hex(C.hair)}">0%</text>`;
  out += `<text x="${cxA}" y="${cy + r + 62}" text-anchor="middle" font-family="Montserrat SemiBold, Montserrat"
                font-size="16" fill="${hex(C.muted)}">BEFORE — BY HAND</text>`;

  out += `<g filter="url(#rsh)">${ring(cxB, 100, hex(C.red), hex(C.redTint))}</g>`;
  out += `<text x="${cxB}" y="${cy + 17}" text-anchor="middle" font-family="Montserrat ExtraBold, Montserrat"
                font-size="56" fill="${hex(C.red)}">100%</text>`;
  out += `<text x="${cxB}" y="${cy + r + 62}" text-anchor="middle" font-family="Montserrat SemiBold, Montserrat"
                font-size="16" fill="${hex(C.red)}">AFTER — AUTOMATED</text>`;

  // transition arrow between the two rings
  const midA = cxA + r + 26, midB = cxB - r - 26;
  out += `<line x1="${midA}" y1="${cy}" x2="${midB - 15}" y2="${cy}" stroke="${hex(C.ink)}" stroke-width="3"/>
          <path d="M ${midB} ${cy} L ${midB - 15} ${cy - 8} L ${midB - 15} ${cy + 8} Z" fill="${hex(C.ink)}"/>`;
  return out + `</svg>`;
}

/**
 * Slide 16: 209 fix-actions -> 46 tickets. A waffle field where every cell is
 * one real fix-action; the red block is what actually became a ticket.
 * Labels are placed as native pptx text on the slide, not baked in here.
 */
function chartConsolidation() {
  const total = 209, kept = 46;
  const cols = 42, rows = 5;   // 210 slots, 209 used — a wide, shallow band
  const cell = 20, gap = 5;
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;

  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`;
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (n >= total) break;
      const keep = n < kept;
      const x = c * (cell + gap), y = r * (cell + gap);
      out += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5"
                fill="${keep ? hex(C.red) : hex(C.hairLight)}"/>`;
      n++;
    }
  }
  return out + `</svg>`;
}

// ---------------------------------------------------------------------------
// Slide 17 — unified dashboard mockup
// ---------------------------------------------------------------------------
function dashboardMock(w = 900, h = 520) {
  const pad = 18;
  let out = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="dsh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#6B6560" flood-opacity="0.30"/>
    </filter>
    <linearGradient id="hdr" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${hex(C.red)}"/>
      <stop offset="100%" stop-color="${hex(C.redDark)}"/>
    </linearGradient>
    <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${hex(C.red)}"/>
      <stop offset="100%" stop-color="${hex(C.redDark)}"/>
    </linearGradient>
  </defs>
  <g filter="url(#dsh)">
    <rect x="4" y="4" width="${w - 8}" height="${h - 8}" rx="12" fill="#FFFFFF" stroke="${hex(C.hair)}" stroke-width="1.5"/>
    <path d="M 4 16 A 12 12 0 0 1 16 4 L ${w - 16} 4 A 12 12 0 0 1 ${w - 4} 16 L ${w - 4} 58 L 4 58 Z" fill="url(#hdr)"/>
    <circle cx="30" cy="31" r="6" fill="#FFFFFF" opacity="0.45"/>
    <circle cx="50" cy="31" r="6" fill="#FFFFFF" opacity="0.30"/>
    <circle cx="70" cy="31" r="6" fill="#FFFFFF" opacity="0.30"/>
    <rect x="96" y="22" width="188" height="18" rx="9" fill="#FFFFFF" opacity="0.30"/>
  </g>`;

  // four KPI tiles
  const tileW = (w - pad * 2 - 3 * 14) / 4, tileY = 78, tileH = 96;
  const tiles = [
    { v: '117', l: 'flaws found' },
    { v: '209', l: 'fix actions' },
    { v: '46', l: 'tickets' },
    { v: '78%', l: 'reduction' },
  ];
  tiles.forEach((t, i) => {
    const x = pad + i * (tileW + 14);
    out += `<rect x="${x}" y="${tileY}" width="${tileW}" height="${tileH}" rx="9" fill="${hex(C.card)}" stroke="${hex(C.hairLight)}" stroke-width="1.2"/>
            <rect x="${x}" y="${tileY}" width="4" height="${tileH}" rx="2" fill="${hex(C.red)}"/>
            <text x="${x + tileW / 2}" y="${tileY + 50}" text-anchor="middle" font-family="Montserrat ExtraBold, Montserrat"
                  font-size="34" fill="${hex(C.red)}">${t.v}</text>
            <text x="${x + tileW / 2}" y="${tileY + 74}" text-anchor="middle" font-family="Montserrat Medium, Montserrat"
                  font-size="13" fill="${hex(C.muted)}">${t.l}</text>`;
  });

  // left: trend bars
  const px = pad, py = tileY + tileH + 20, pw = w * 0.56 - pad, ph = h - py - pad;
  out += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="9" fill="#FFFFFF" stroke="${hex(C.hairLight)}" stroke-width="1.4"/>`;
  const bvals = [0.42, 0.58, 0.5, 0.72, 0.64, 0.88, 0.78];
  const bW = 34, bGap = (pw - 48 - bvals.length * bW) / (bvals.length - 1);
  bvals.forEach((v, i) => {
    const bh = (ph - 74) * v;
    const bx = px + 24 + i * (bW + bGap);
    out += `<rect x="${bx}" y="${py + ph - 34 - bh}" width="${bW}" height="${bh}" rx="4" fill="url(#bar2)" opacity="${0.55 + i * 0.06}"/>`;
  });
  out += `<line x1="${px + 18}" y1="${py + ph - 34}" x2="${px + pw - 18}" y2="${py + ph - 34}" stroke="${hex(C.hair)}" stroke-width="1.4"/>`;

  // right: the four-system chain
  const rx0 = px + pw + 16, rw = w - rx0 - pad;
  out += `<rect x="${rx0}" y="${py}" width="${rw}" height="${ph}" rx="9" fill="#FFFFFF" stroke="${hex(C.hairLight)}" stroke-width="1.4"/>`;
  const chain = ['Tenable', 'Kevlar', 'ServiceNow', 'Wiz'];
  const rowH = (ph - 36) / chain.length;
  chain.forEach((s, i) => {
    const yy = py + 20 + i * rowH;
    out += `<circle cx="${rx0 + 34}" cy="${yy + rowH / 2 - 6}" r="11" fill="${hex(C.redTint)}" stroke="${hex(C.red)}" stroke-width="2.2"/>
            <circle cx="${rx0 + 34}" cy="${yy + rowH / 2 - 6}" r="4" fill="${hex(C.red)}"/>
            <text x="${rx0 + 58}" y="${yy + rowH / 2 - 1}" font-family="Montserrat SemiBold, Montserrat"
                  font-size="15" fill="${hex(C.inkDeep)}">${s}</text>`;
    if (i < chain.length - 1) {
      out += `<line x1="${rx0 + 34}" y1="${yy + rowH / 2 + 7}" x2="${rx0 + 34}" y2="${yy + rowH + rowH / 2 - 20}"
                stroke="${hex(C.red)}" stroke-width="2" stroke-dasharray="4 4" opacity="0.6"/>`;
    }
  });

  return out + `</svg>`;
}

module.exports = {
  redPanel, slashMark, hairTexture, logo, isoMachine,
  supplyChain, chartPackages, chartMatch, chartConsolidation, dashboardMock,
};
