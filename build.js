/**
 * Builds the Stewart Title internship exit presentation.
 *
 *   node build.js            → regenerates artwork, then writes out/<deck>.pptx
 *   node build.js --no-art   → skips SVG regeneration (faster iteration)
 */
const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');
const { generate } = require('./src/genart');
const { C } = require('./src/tokens');

const OUT_DIR = path.join(__dirname, 'out');
const OUT_FILE = path.join(OUT_DIR, 'Internship_Exit_Presentation_Stewart.pptx');

function buildDeck() {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'W16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'W16x9';
  pptx.author = 'Jair Maldonado';
  pptx.company = 'Stewart Title';
  pptx.title = 'Security Analyst Internship — Exit Presentation';

  const front = require('./src/slides/front');
  const p1 = require('./src/slides/p1-image');
  const p2 = require('./src/slides/p2-aegis');
  const p3 = require('./src/slides/p3-cve');
  const close = require('./src/slides/close');

  // 1-5 front matter
  front.title(pptx);
  front.toc(pptx);
  front.about(pptx);
  front.overview(pptx);
  front.execSummary(pptx);

  // 6-9 Project 01
  p1.divider(pptx);
  p1.problem(pptx);
  p1.process(pptx);
  p1.next(pptx);

  // 10-15 Project 02
  p2.divider(pptx);
  p2.problem(pptx);
  p2.built(pptx);
  p2.pipeline(pptx);
  p2.proving(pptx);
  p2.next(pptx);

  // 16-22 Project 03
  p3.divider(pptx);
  p3.problem(pptx);
  p3.match(pptx);
  p3.noAction(pptx);
  p3.granularity(pptx);
  p3.roi(pptx);
  p3.future(pptx);

  // 23-24 closing
  close.outcomes(pptx);
  close.summary(pptx);

  return pptx;
}

async function main() {
  if (!process.argv.includes('--no-art')) generate();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pptx = buildDeck();
  await pptx.writeFile({ fileName: OUT_FILE });
  console.log('wrote', OUT_FILE);
}

main().catch((e) => { console.error(e); process.exit(1); });
