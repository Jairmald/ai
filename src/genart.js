/** Writes every SVG asset to assets/gen, then rasterizes them via cairosvg. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const A = require('./art');

const ROOT = path.join(__dirname, '..');
const GEN = path.join(ROOT, 'assets', 'gen');
const BRAND = path.join(ROOT, 'assets', 'brand');

/**
 * Real brand files win over the generated stand-ins.
 *
 * Drop the official artwork in assets/brand/ (logo-red.png, logo-white.png) and
 * it is copied over the reconstruction on every build — so regenerating never
 * clobbers the genuine asset. Placement reads the file's real dimensions, so
 * any size or aspect ratio works without a code change.
 */
function applyBrandOverrides() {
  if (!fs.existsSync(BRAND)) return;
  for (const f of fs.readdirSync(BRAND)) {
    if (!f.endsWith('.png')) continue;
    fs.copyFileSync(path.join(BRAND, f), path.join(GEN, f));
    console.log('brand override applied:', f);
  }
}

function generate() {
  fs.mkdirSync(GEN, { recursive: true });

  const assets = {
    'panel-red': A.redPanel(1333, 750),
    'panel-red-left': A.redPanel(500, 750),   // About Me left column
    'panel-red-band': A.redPanel(1333, 300),  // horizontal callout bands
    'mark-slash': A.slashMark(900, 900, 0.07, '#FFFFFF'),
    'mark-slash-faint': A.slashMark(900, 900, 0.045, '#FFFFFF'),
    'mark-slash-ink': A.slashMark(900, 900, 0.05, '#43464A'),
    'texture-hair': A.hairTexture(800, 800),
    'logo-red': A.logo('red'),
    'logo-white': A.logo('white'),
    'iso-machine': A.isoMachine(),
    'supply-chain': A.supplyChain(),
    'chart-packages': A.chartPackages(),
    'chart-match': A.chartMatch(),
    'chart-consolidation': A.chartConsolidation(),
    'dashboard-mock': A.dashboardMock(),
  };

  for (const [name, svg] of Object.entries(assets)) {
    fs.writeFileSync(path.join(GEN, `${name}.svg`), svg);
  }
  execFileSync('python3', [path.join(ROOT, 'tools', 'rasterize.py')], { stdio: 'inherit' });
  applyBrandOverrides();

  // path helper for slide modules
  const img = (name) => path.join(GEN, `${name}.png`);
  return { img };
}

module.exports = { generate, GEN };

if (require.main === module) generate();
