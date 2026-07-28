/**
 * Build a single slide into its own .pptx, for copy-pasting into another deck.
 *
 *   node tools/one-slide.js exec-summary
 *   node tools/one-slide.js cve-problem cve-match --name=CVE_Section
 *   node tools/one-slide.js --list
 *
 * Several keys build one file containing those slides in the order given.
 * Slides are rendered by the same builder the full deck uses, so they stay
 * identical to their counterparts — including their footer slide numbers.
 */
const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');
const { generate } = require('../src/genart');
const { C } = require('../src/tokens');

const ROOT = path.join(__dirname, '..');

// slide key -> [module, exported function, output basename]
const SLIDES = {
  'title':            ['front',    'title',        'Title'],
  'contents':         ['front',    'toc',          'Contents'],
  'about-me':         ['front',    'about',        'About_Me'],
  'overview':         ['front',    'overview',     'Internship_Overview'],
  'exec-summary':     ['front',    'execSummary',  'Executive_Summary'],
  'p1-problem':       ['p1-image', 'problem',      'Image_Mgmt_Problem'],
  'p1-process':       ['p1-image', 'process',      'Image_Mgmt_Process'],
  'p1-next':          ['p1-image', 'next',         'Image_Mgmt_Next'],
  'aegis-problem':    ['p2-aegis', 'problem',      'AEGIS_Problem'],
  'aegis-built':      ['p2-aegis', 'built',        'AEGIS_Built'],
  'aegis-pipeline':   ['p2-aegis', 'pipeline',     'AEGIS_Pipeline'],
  'aegis-proving':    ['p2-aegis', 'proving',      'AEGIS_Proving'],
  'aegis-next':       ['p2-aegis', 'next',         'AEGIS_Next'],
  'cve-problem':      ['p3-cve',   'problem',      'CVE_Problem'],
  'cve-match':        ['p3-cve',   'match',        'CVE_Match'],
  'cve-no-action':    ['p3-cve',   'noAction',     'CVE_No_Action'],
  'cve-209':          ['p3-cve',   'granularity',  'CVE_209'],
  'cve-roi':          ['p3-cve',   'roi',          'CVE_Payoff'],
  'cve-future':       ['p3-cve',   'future',       'CVE_Next'],
  'outcomes':         ['close',    'outcomes',     'What_This_Means'],
  'thank-you':        ['close',    'summary',      'Thank_You'],
};

async function main() {
  const keys = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const outName = (process.argv.find((a) => a.startsWith('--name=')) || '').slice(7);
  if (!keys.length || process.argv.includes('--list')) {
    console.log('slides:\n  ' + Object.keys(SLIDES).join('\n  '));
    return;
  }
  for (const k of keys) {
    if (!SLIDES[k]) { console.error(`unknown slide "${k}" — run with --list`); process.exit(1); }
  }
  const base = outName || SLIDES[keys[0]][2];

  if (!process.argv.includes('--no-art')) generate();

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'W16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'W16x9';
  pptx.author = 'Jair Maldonado';
  pptx.company = 'Stewart Title';

  // built in the order given, so a run of slides keeps its narrative sequence
  for (const k of keys) {
    const [mod, fn] = SLIDES[k];
    require(path.join(ROOT, 'src', 'slides', mod))[fn](pptx);
  }

  const outDir = path.join(ROOT, 'out', 'slides');
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${base}.pptx`);
  await pptx.writeFile({ fileName: file });
  console.log('wrote', file);
}

main().catch((e) => { console.error(e); process.exit(1); });
