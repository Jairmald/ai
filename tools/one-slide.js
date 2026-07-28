/**
 * Build a single slide into its own .pptx, for copy-pasting into another deck.
 *
 *   node tools/one-slide.js exec-summary
 *   node tools/one-slide.js --list
 *
 * The slide is rendered by the same builder the full deck uses, so it stays
 * identical to its counterpart — including its footer slide number.
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
  'thank-you':        ['close',    'summary',      'Thank_You'],
};

async function main() {
  const key = process.argv[2];
  if (!key || key === '--list') {
    console.log('slides:\n  ' + Object.keys(SLIDES).join('\n  '));
    return;
  }
  const entry = SLIDES[key];
  if (!entry) {
    console.error(`unknown slide "${key}" — run with --list`);
    process.exit(1);
  }
  const [mod, fn, base] = entry;

  if (!process.argv.includes('--no-art')) generate();

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'W16x9', width: 13.333, height: 7.5 });
  pptx.layout = 'W16x9';
  pptx.author = 'Jair Maldonado';
  pptx.company = 'Stewart Title';

  require(path.join(ROOT, 'src', 'slides', mod))[fn](pptx);

  const outDir = path.join(ROOT, 'out', 'slides');
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(outDir, `${base}.pptx`);
  await pptx.writeFile({ fileName: file });
  console.log('wrote', file);
}

main().catch((e) => { console.error(e); process.exit(1); });
