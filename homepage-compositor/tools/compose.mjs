#!/usr/bin/env node
/**
 * Stage 2 — compose every legal combination into a full homepage.
 *
 *   node tools/compose.mjs --all                 # full run, auto-batched
 *   node tools/compose.mjs --batch 3             # only batch 3
 *   node tools/compose.mjs --batch-size 1200     # batch size (1000–1500)
 *   node tools/compose.mjs --only hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P01
 *   node tools/compose.mjs --resume              # skip complete folders
 *   node tools/compose.mjs --clean               # wipe pages/ (never touches the labs)
 *
 * Every page links the eight extracted fragment stylesheets and scripts, so the
 * 29 designs exist once on disk instead of 21,600 times. Pages are therefore
 * ~30–40 KB of markup and open under `python3 -m http.server` (or the bundled
 * tools/serve.mjs) with `../../fragments` + `../../shared` resolving normally.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allCombos, totalCombos } from './lib/combos.mjs';
import { buildManifest } from './lib/manifest.mjs';
import { SLOT_ORDER, LABS } from './lib/traits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const PAGES = path.join(COMPOSITOR, 'pages');

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const valueOf = (f, d) => {
  const i = argv.indexOf(f);
  return i === -1 ? d : argv[i + 1];
};

const batchSize = Math.max(1000, Math.min(1500, Number(valueOf('--batch-size', 1200)) || 1200));
const only = valueOf('--only', null);
const batchArg = valueOf('--batch', null);
const resume = has('--resume');

const inventory = JSON.parse(fs.readFileSync(path.join(COMPOSITOR, 'inventory.json'), 'utf8'));

function frag(slot, folder) {
  const base = path.join(COMPOSITOR, 'fragments', slot, folder);
  const meta = JSON.parse(fs.readFileSync(path.join(base, 'meta.json'), 'utf8'));
  const markup = fs.readFileSync(path.join(base, 'markup.html'), 'utf8').trim();
  return { slot, folder, base, meta, markup };
}

// Load the selected fragments once — 29 small files, not 21,600 × 8.
const fragCache = new Map();
function getFrag(slot, folder) {
  const key = slot + '/' + folder;
  if (!fragCache.has(key)) fragCache.set(key, frag(slot, folder));
  return fragCache.get(key);
}

// Seam fix: sticky work previews must park below a sticky header.
const STICKY_HEADERS = new Set(['P02-glass', 'P04-pill']);
const STICKY_WORK = {
  'S03-split-viewer': { sel: '.preview', top: 22 },
  'S10-sticky-showcase': { sel: '.pin', top: 26 },
};

const HEAD_BOOT = `(function(){try{
  var q=new URLSearchParams(location.search).get('theme');
  var t=(q==='dark'||q==='light')?q:null;
  if(!t){try{t=localStorage.getItem('nl-theme')}catch(e){}}
  if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  document.documentElement.setAttribute('data-theme',t);
  if('IntersectionObserver' in window){document.documentElement.classList.add('js');}
}catch(e){}})();`;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function relToFrag(f, file) {
  return `../../fragments/${f.slot}/${f.folder}/${file}`;
}

function renderPage(combo) {
  const picks = combo.picks;
  const frags = SLOT_ORDER.map((slot) => getFrag(slot, picks[slot].folder));
  const cssLinks = frags.map((f) => `  <link rel="stylesheet" href="${relToFrag(f, 'styles.css')}">`).join('\n');
  const scripts = frags.filter((f) => f.meta.metrics.jsBytes > 0)
    .map((f) => `  <script src="${relToFrag(f, 'script.js')}"></script>`).join('\n');
  const sourceLine = SLOT_ORDER.map((s) => `${s}:${picks[s].id}`).join(' · ');
  let seamCss = '';
  if (STICKY_HEADERS.has(picks.header.folder) && STICKY_WORK[picks.work.folder]) {
    const fix = STICKY_WORK[picks.work.folder];
    seamCss = `\n <style>/* seam fix: sticky header -> park the sticky work preview below it */\n[data-slot="work"] ${fix.sel}{top:calc(${fix.top}px + 72px)}\n</style>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(combo.label)} — Nestlancer homepage compositor</title>
<meta name="description" content="Composed Nestlancer homepage — ${esc(sourceLine)}. Eight approved shortlist samples composed in the fixed header → hero → delivery → money → why → work → CTA → footer order.">
<meta name="combo-id" content="${combo.id}">
<meta name="generator" content="nestlancer-homepage-compositor/1">
<script>${HEAD_BOOT}</script>
  <link rel="stylesheet" href="../../shared/tokens.css">
${cssLinks}${seamCss}
 <noscript><style>[data-reveal],.reveal,.slot{opacity:1!important;transform:none!important}</style></noscript>
</head>
<body>
<a class="nl-skip" href="#main">Skip to content</a>
${frags[0].markup}

<main id="main" tabindex="-1">
${SLOT_ORDER.slice(1, 7).map((slot) => frags.find((f) => f.slot === slot).markup).join('\n\n')}
</main>

${frags[7].markup}

<script src="../../shared/slot-runtime.js"></script>
${scripts}
  <script src="../../shared/theme-boot.js"></script>
</body>
</html>
`;
}

function comboJson(combo) {
  const slots = {};
  for (const slot of SLOT_ORDER) {
    const p = combo.picks[slot];
    const f = getFrag(slot, p.folder);
    slots[slot] = {
      id: p.id,
      folder: p.folder,
      name: p.name,
      source: p.source,
      fragment: `fragments/${slot}/${p.folder}`,
      sha: p.sha,
      trait: p.trait,
    };
  }
  return {
    combo_id: combo.id,
    label: combo.label,
    index: combo.index,
    order: SLOT_ORDER,
    slots,
    review: { total: 0, aspects: {}, note: 'pending review pass' },
    pages: {
      href: `pages/${combo.id}/`,
      title: `${combo.label} — Nestlancer homepage compositor`,
    },
    assets: 'shared/assets (logos + illustrative work images), fragments/<slot>/<folder>/{styles.css,script.js}',
  };
}

function writeCombo(combo) {
  const dir = path.join(PAGES, combo.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPage(combo));
  fs.writeFileSync(path.join(dir, 'combo.json'), JSON.stringify(comboJson(combo), null, 2) + '\n');
}

function isComplete(combo) {
  const dir = path.join(PAGES, combo.id);
  if (!fs.existsSync(path.join(dir, 'index.html')) || !fs.existsSync(path.join(dir, 'combo.json'))) return false;
  try {
    const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    return html.includes(`content="${combo.id}"`);
  } catch (e) { return false; }
}

function dirCount(p) {
  try { return fs.readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).length; } catch (e) { return 0; }
}

function main() {
  if (has('--clean')) {
    fs.rmSync(PAGES, { recursive: true, force: true });
    console.log('pages/ cleared (upstream labs untouched)');
  }
  const total = totalCombos(inventory);
  if (total !== 21600) {
    console.error(`REFUSING: inventory product is ${total}, expected 21600`);
    process.exit(1);
  }
  fs.mkdirSync(PAGES, { recursive: true });

  const batchCount = Math.ceil(total / batchSize);
  const batches = batchArg !== null
    ? [Number(batchArg)]
    : Array.from({ length: batchCount }, (_, i) => i + 1);

  let written = 0;
  let skipped = 0;
  let failed = 0;
  const started = Date.now();

  for (const batchNo of batches) {
    const from = (batchNo - 1) * batchSize;
    const to = Math.min(total, from + batchSize);
    let inBatch = 0;
    for (const combo of allCombos(inventory)) {
      if (combo.index < from) continue;
      if (combo.index >= to) break;
      if (only && combo.id !== only) continue;
      if (resume && isComplete(combo)) { skipped++; continue; }
      try {
        writeCombo(combo);
        written++;
        inBatch++;
      } catch (err) {
        failed++;
        console.error(`FAILED ${combo.id}: ${err.message}`);
      }
      if (written && written % 500 === 0) {
        const secs = (Date.now() - started) / 1000;
        const rate = written / secs;
        const remain = Math.max(0, total - (from + inBatch));
        console.log(`  ${written} written · ${rate.toFixed(0)}/s · ETA ${(remain / Math.max(rate, 1)).toFixed(0)}s`);
      }
    }
    const free = fs.statfsSync(PAGES).bavail * fs.statfsSync(PAGES).bsize;
    console.log(`batch ${batchNo}/${batchCount} · ${to}/${total} indexed · ${written} written this run · ${skipped} skipped · ${(free / 1e9).toFixed(1)} GB free`);
  }

  if (!only && batches.length === batchCount) {
    const manifest = buildManifest(inventory);
    fs.writeFileSync(path.join(COMPOSITOR, 'manifest.json'), JSON.stringify(manifest) + '\n');
    console.log(`manifest.json: ${manifest.combos.length} entries`);
  }

  console.log(`\npages on disk: ${dirCount(PAGES)}`);
  console.log(`written this run: ${written} · skipped: ${skipped} · failed: ${failed}`);
  if (failed) process.exit(1);
}

main();
