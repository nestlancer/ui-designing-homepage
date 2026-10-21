#!/usr/bin/env node
/**
 * Stage 4 + 6 — gallery, top-50 page, and the self-contained top-50 hand-off.
 *
 *   node tools/gallery.mjs
 *
 * Produces:
 *   index.html                     filterable gallery for all 21,600 combos
 *   review/top50.html              ranked top-50 list with per-aspect scores
 *   review/top50/<combo>/index.html  single-file page (CSS + JS inlined)
 *   review/top50/<combo>/combo.json  slot map + review block
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLOT_ORDER, SLOT_LABEL } from './lib/traits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const REVIEW = path.join(COMPOSITOR, 'review');
const PAGES = path.join(COMPOSITOR, 'pages');

const inventory = JSON.parse(fs.readFileSync(path.join(COMPOSITOR, 'inventory.json'), 'utf8'));
const summary = JSON.parse(fs.readFileSync(path.join(REVIEW, 'summary.json'), 'utf8'));
const scores = JSON.parse(fs.readFileSync(path.join(REVIEW, 'scores.json'), 'utf8'));

const ASPECTS = summary.aspects;
const PREFIX = { header: 'hdr', hero: 'hero', delivery: 'del', financial: 'fin', why: 'why', work: 'work', cta: 'cta', footer: 'ftr' };

const byIndex = new Array(21600).fill(0);
const byId = new Map();
for (const r of scores) { byIndex[r.index] = r.total; byId.set(r.combo_id, r); }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ------------------------------------------------------------------ top 50 */
function readCombo(id) {
  return JSON.parse(fs.readFileSync(path.join(PAGES, id, 'combo.json'), 'utf8'));
}

function inlinePage(id) {
  const html = fs.readFileSync(path.join(PAGES, id, 'index.html'), 'utf8');
  const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="\.\.\/\.\.\/([^"]+)"/g)].map((m) => m[1]);
  const jsFiles = [...html.matchAll(/<script src="\.\.\/\.\.\/([^"]+)"><\/script>/g)].map((m) => m[1]);
  const css = cssFiles.map((f) => `/* ---- ${f} ---- */\n` + fs.readFileSync(path.join(COMPOSITOR, f), 'utf8')).join('\n');
  const js = jsFiles.map((f) => `/* ---- ${f} ---- */\n` + fs.readFileSync(path.join(COMPOSITOR, f), 'utf8')).join('\n');
  let out = html
    .replace(/\s*<link rel="stylesheet" href="\.\.\/\.\.\/[^"]+">/g, '')
    .replace(/\s*<script src="\.\.\/\.\.\/[^"]+"><\/script>/g, '')
    .replace(/\.\.\/\.\.\/shared\/assets\//g, '../../shared/assets/')
    .replace('</head>', ` <style>\n${css}\n </style>\n</head>`)
    .replace('</body>', `<script>\n${js}\n</script>\n</body>`);
  // the review strip is a hand-off artifact, not part of the composed page
  out = out.replace('</body>', `<!-- Hand-off copy: CSS/JS inlined, assets bundled in review/shared/assets/,
     so this file opens from disk or from any static root. Original page:
     homepage-compositor/pages/${id}/index.html -->\n</body>`);
  return out;
}

function bundleAssets() {
  // review/ must be servable as its own document root, so the hand-off copies
  // carry the 12 shared assets instead of reaching outside review/.
  const from = path.join(COMPOSITOR, 'shared', 'assets');
  const to = path.join(REVIEW, 'shared', 'assets');
  fs.rmSync(path.join(REVIEW, 'shared'), { recursive: true, force: true });
  fs.mkdirSync(path.join(to, 'work'), { recursive: true });
  let copied = 0;
  for (const f of fs.readdirSync(from)) {
    const src = path.join(from, f);
    if (fs.statSync(src).isFile()) { fs.copyFileSync(src, path.join(to, f)); copied++; }
  }
  const work = path.join(from, 'work');
  if (fs.existsSync(work)) for (const f of fs.readdirSync(work)) { fs.copyFileSync(path.join(work, f), path.join(to, 'work', f)); copied++; }
  return copied;
}

function buildTop50() {
  const dir = path.join(REVIEW, 'top50');
  fs.rmSync(dir, { recursive: true, force: true });
  for (const entry of summary.top50) {
    const out = path.join(dir, entry.combo_id);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, 'index.html'), inlinePage(entry.combo_id));
    const combo = readCombo(entry.combo_id);
    combo.review = { total: entry.total, aspects: entry.aspects, note: entry.note, rank: entry.rank };
    combo.handoff = {
      note: 'CSS + JS inlined for single-file open; logos and illustrative work images resolve to ../../shared/assets/ inside review/ — no pages/ build and no server needed.',
      canonical_page: `pages/${entry.combo_id}/index.html`,
    };
    fs.writeFileSync(path.join(out, 'combo.json'), JSON.stringify(combo, null, 2) + '\n');
  }
  return summary.top50;
}

const assetCount = bundleAssets();
const top50 = buildTop50();

/* --------------------------------------------------------------- top50.html */
function top50Page() {
  const rows = top50.map((r) => {
    const cells = ASPECTS.map((a) => `<td>${r.aspects[a.key]}</td>`).join('');
    return `<tr>
<td class="rank">${r.rank}</td>
<td class="combo"><a href="top50/${r.combo_id}/index.html">${r.label}</a><code>${r.combo_id}</code>
<span class="live" data-live hidden> · <a href="top50/${r.combo_id}/index.html" data-live-href="../pages/${r.combo_id}/">live page</a></span></td>
<td class="total">${r.total}<span>/45</span></td>
${cells}
<td class="note">${esc(r.note)}</td>
</tr>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Top 50 — Nestlancer homepage compositor</title>
<script>(function(){try{var t=null;try{t=localStorage.getItem('nl-gallery-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<style>
:root{--bg:#f9fbfc;--surface:#fff;--ink:#0a2543;--body:#4a5c6e;--muted:#5f7080;--line:#e3ebe9;--teal:#1f7a72;--soft:#edf4f6}
[data-theme="dark"]{--bg:#0b1720;--surface:#0f1e29;--ink:#e8eef4;--body:#b9c6d0;--muted:#8aa0b3;--line:rgba(255,255,255,.1);--teal:#2fa59b;--soft:#12242f}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--body);font:400 15px/1.55 "Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
a{color:var(--teal)}
header{padding:40px 24px 24px;border-bottom:1px solid var(--line);background:var(--surface)}
.wrap{max-width:1500px;margin:0 auto}
h1{margin:0 0 8px;color:var(--ink);font-size:clamp(24px,3vw,34px);letter-spacing:-.02em}
p.lede{margin:0;max-width:78ch}
.meta{margin-top:14px;color:var(--muted);font-size:13px;display:flex;gap:18px;flex-wrap:wrap}
.meta b{color:var(--ink)}
table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
th,td{padding:10px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
th{position:sticky;top:0;background:var(--surface);color:var(--ink);font-size:11px;letter-spacing:.08em;text-transform:uppercase;z-index:2}
td.rank{font-weight:700;color:var(--ink);width:44px}
td.total{font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums;white-space:nowrap}
td.total span{color:var(--muted);font-weight:400;font-size:11px}
td.combo{min-width:330px}
td.combo a{font-weight:600;text-decoration:none}
td.combo a:hover{text-decoration:underline}
td.combo code{display:block;color:var(--muted);font-size:11px;margin-top:3px;word-break:break-all}
td.note{min-width:280px;color:var(--body);font-size:12.5px}
tbody tr:hover{background:var(--soft)}
.toggle{margin-top:16px;border:1px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:9px 16px;font:600 13px/1 inherit;cursor:pointer}
.banner{margin-top:18px;padding:12px 14px;border:1px solid #cfe3dd;border-left:4px solid var(--teal);border-radius:8px;background:var(--soft);color:var(--ink);font-size:13px;max-width:100ch}
.banner code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px}
td.combo .live{color:var(--muted);font-size:11px;white-space:nowrap}
main{padding:0 24px 60px}
footer{padding:24px;color:var(--muted);font-size:12px;border-top:1px solid var(--line)}
@media(max-width:900px){td.note,th.note{display:none}}
</style>
</head>
<body>
<header><div class="wrap">
<h1>Top 50 composed Nestlancer homepages</h1>
<p class="lede">Ranked by the nine-aspect UI review (45 max). Each row links to its <strong>hand-off copy</strong> — <code>review/top50/&lt;combo&gt;/index.html</code>, the full page with CSS, JS and assets bundled, so it opens from disk or from this folder served on its own. When the generated <code>pages/</code> build is present, a second <em>live page</em> link appears next to it.</p>
<div class="banner" id="pagesNote" hidden>
  <strong>Live <code>pages/</code> build not reachable from this server root.</strong>
  The 50 hand-off copies below are complete and need nothing else. To browse all 21,600 composed pages, build them once and serve the compositor root:
  <br><code>node tools/compose.mjs --all</code> → <code>python3 -m http.server 8126 --bind 0.0.0.0</code> → <code>/homepage-compositor/</code>
</div>
<div class="meta">
<span>reviewed <b>21,600</b></span><span>top score <b>${summary.top}/45</b></span><span>median <b>${summary.median}/45</b></span><span>mean <b>${summary.mean}</b></span>
</div>
<button class="toggle" id="theme" type="button">Switch theme</button>
</div></header>
<main><div class="wrap">
<table>
<thead><tr><th>#</th><th>Combo</th><th>Total</th>${ASPECTS.map((a) => `<th title="${esc(a.label)}">${a.label.split(' ')[0]}</th>`).join('')}<th class="note">Reviewer note</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
</div></main>
<footer><div class="wrap">Scores are produced by <code>tools/review.mjs</code>; methodology in <code>review/methodology.md</code>. Gallery (needs the compositor root as its document root): <a href="../index.html">../index.html</a> · review index: <a href="index.html">index.html</a></div></footer>
<script>
document.getElementById('theme').addEventListener('click',function(){
  var r=document.documentElement,next=r.getAttribute('data-theme')==='dark'?'light':'dark';
  r.setAttribute('data-theme',next);try{localStorage.setItem('nl-gallery-theme',next)}catch(e){}
});
/* reveal the "live page" links only when pages/ is actually served next to us */
(function(){
  var probe='../pages/${summary.top50[0].combo_id}/index.html';
  fetch(probe,{method:'HEAD'}).then(function(r){
    if(!r.ok) throw new Error('missing');
    document.querySelectorAll('[data-live]').forEach(function(el){
      el.hidden=false;
      el.querySelectorAll('[data-live-href]').forEach(function(a){a.href=a.getAttribute('data-live-href');});
    });
  }).catch(function(){
    var n=document.getElementById('pagesNote'); if(n) n.hidden=false;
  });
})();
</script>
</body>
</html>
`;
}

fs.writeFileSync(path.join(REVIEW, 'top50.html'), top50Page());

/* ------------------------------------------------------- review/index.html */
function reviewIndexPage() {
  const rows = summary.top50.slice(0, 8).map((r) => `<li><a href="top50/${r.combo_id}/index.html">${r.label}</a> <span>${r.total}/45</span></li>`).join('');
  const dist = Object.entries(summary.distribution).sort((a, b) => b[0] - a[0])
    .map(([score, n]) => `<tr><td>${score}/45</td><td>${n.toLocaleString('en-IN')}</td></tr>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Review — Nestlancer homepage compositor</title>
<script>(function(){try{var t=null;try{t=localStorage.getItem('nl-gallery-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
<style>
:root{--bg:#f9fbfc;--surface:#fff;--ink:#0a2543;--body:#4a5c6e;--muted:#5f7080;--line:#e3ebe9;--teal:#1f7a72;--soft:#edf4f6}
[data-theme="dark"]{--bg:#0b1720;--surface:#0f1e29;--ink:#e8eef4;--body:#b9c6d0;--muted:#8aa0b3;--line:rgba(255,255,255,.1);--teal:#2fa59b;--soft:#12242f}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--body);font:400 15px/1.6 "Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
a{color:var(--teal)}
.wrap{max-width:1040px;margin:0 auto;padding:0 24px}
header{padding:44px 0 26px;border-bottom:1px solid var(--line);background:var(--surface)}
h1{margin:0 0 8px;color:var(--ink);font-size:clamp(24px,3vw,32px);letter-spacing:-.02em}
p{margin:8px 0 0;max-width:80ch}
.stats{display:flex;gap:22px;flex-wrap:wrap;margin-top:18px;font-size:13px;color:var(--muted)}
.stats b{display:block;color:var(--ink);font-size:22px;letter-spacing:-.02em}
main{padding:28px 0 60px}
h2{color:var(--ink);font-size:16px;margin:28px 0 10px;letter-spacing:-.01em}
ul.files{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}
ul.files li{border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:12px}
ul.files a{font-weight:600;text-decoration:none}
ul.files small{display:block;color:var(--muted);margin-top:4px;line-height:1.45}
ol.top{list-style:none;padding:0;display:grid;gap:6px;counter-reset:r}
ol.top li{display:flex;justify-content:space-between;gap:14px;border-bottom:1px solid var(--line);padding:7px 0;font-size:13px}
ol.top a{text-decoration:none}
ol.top span{color:var(--muted);font-variant-numeric:tabular-nums;white-space:nowrap}
table{border-collapse:collapse;font-size:13px;margin-top:6px}
td{padding:4px 18px 4px 0;border-bottom:1px solid var(--line)}
td:first-child{color:var(--ink);font-variant-numeric:tabular-nums}
.note{margin-top:24px;padding:12px 14px;border:1px solid var(--line);border-left:4px solid var(--teal);border-radius:8px;background:var(--soft);color:var(--ink);font-size:13px}
code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px}
footer{padding:22px 0 40px;color:var(--muted);font-size:12.5px;border-top:1px solid var(--line)}
</style>
</head>
<body>
<header><div class="wrap">
<h1>UI review — 21,600 composed homepages</h1>
<p>Nine aspects per combination (seam integrity, hierarchy, skin coherence, type &amp; spacing, motion, theme, responsive, content fidelity, overall feel). This folder is self-contained: the 50 top-ranked pages are bundled with their CSS, JS and assets, so it can be served on its own.</p>
<div class="stats">
<div><b>${summary.reviewed.toLocaleString('en-IN')}</b>reviewed</div>
<div><b>${summary.top}/45</b>top score</div>
<div><b>${summary.median}/45</b>median</div>
<div><b>${summary.mean}</b>mean</div>
<div><b>${summary.top50.length}</b>hand-off pages</div>
</div>
</div></header>
<main><div class="wrap">
<h2>Start here</h2>
<ul class="files">
<li><a href="top50.html">top50.html</a><small>The ranked table with per-aspect scores and a reviewer note per combo.</small></li>
<li><a href="top50/${summary.top50[0].combo_id}/index.html">Top-ranked page</a><small>${summary.top50[0].label} — ${summary.top50[0].total}/45, opens with no build and no server.</small></li>
<li><a href="methodology.md">methodology.md</a><small>What is measured, what is judged, what was not verified.</small></li>
<li><a href="scores.json">scores.json</a><small>All 21,600 records, sorted by rank.</small></li>
<li><a href="summary.json">summary.json</a><small>Distribution plus the readable top-50 list.</small></li>
<li><a href="dom-smoke.json">dom-smoke.json</a><small>Behavioural run: 21,600 pages executed in a JS DOM, 0 failures.</small></li>
</ul>

<h2>Top 8 of 50</h2>
<ol class="top">${rows}</ol>

<h2>Score distribution</h2>
<table><tbody>${dist}</tbody></table>
<p class="note"><strong>Full gallery of 21,600:</strong> the manifest-driven gallery lives one level up at <code>homepage-compositor/index.html</code> and needs the generated <code>pages/</code> folder for previews. Build it with <code>node tools/compose.mjs --all</code>, then serve the compositor root, or simply run <code>node tools/serve.mjs</code>.</p>
</div></main>
<footer><div class="wrap">Generated by <code>tools/gallery.mjs</code> · scores by <code>tools/review.mjs</code> · <a href="../index.html">gallery</a></div></footer>
<script>
document.addEventListener('click',function(e){
  var a=e.target.closest('[data-toggle]'); if(!a) return; e.preventDefault();
  var r=document.documentElement,next=r.getAttribute('data-theme')==='dark'?'light':'dark';
  r.setAttribute('data-theme',next);try{localStorage.setItem('nl-gallery-theme',next)}catch(err){}
});
</script>
</body>
</html>
`;
}
fs.writeFileSync(path.join(REVIEW, 'index.html'), reviewIndexPage());

/* -------------------------------------------------------------- the gallery */
const galleryData = {
  slots: SLOT_ORDER.map((slot) => ({
    slot,
    label: SLOT_LABEL[slot],
    prefix: PREFIX[slot],
    samples: inventory.slots.find((s) => s.slot === slot).samples.map((x) => ({ id: x.id, folder: x.folder, name: x.name })),
  })),
  scores: byIndex,
  top: top50.map((r) => ({ rank: r.rank, id: r.combo_id, label: r.label, total: r.total, aspects: r.aspects, note: r.note })),
  total: 21600,
};

const gallery = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nestlancer homepage compositor — 21,600 combinations</title>
<meta name="description" content="Browse, filter and deep-link all 21,600 composed Nestlancer homepages (3 × 5 × 5 × 4 × 2 × 4 × 3 × 3).">
<script>(function(){try{var t=localStorage.getItem('nl-gallery-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t)}catch(e){}})();</script>
<style>
:root{
  --bg:#f9fbfc;--surface:#fff;--surface-2:#f4f8f9;--tint:#edf4f6;--ink:#0a2543;--ink-2:#123a5e;--body:#4a5c6e;
  --muted:#5f7080;--line:#e3ebe9;--teal:#1f7a72;--teal-hover:#1c6f68;--soft:#d9ece9;--shadow:0 8px 28px rgba(10,37,67,.10);
  --font:"Inter",system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --mono:ui-monospace,"IBM Plex Mono","SF Mono",Menlo,Consolas,monospace;
  color-scheme:light;
}
[data-theme="dark"]{
  --bg:#0b1720;--surface:#0f1e29;--surface-2:#12242f;--tint:#102530;--ink:#e8eef4;--ink-2:#d3dde6;--body:#b9c6d0;
  --muted:#8aa0b3;--line:rgba(255,255,255,.1);--teal:#2fa59b;--teal-hover:#3fb8ab;--soft:#14343a;--shadow:0 8px 28px rgba(0,0,0,.45);
  color-scheme:dark;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--body);font:400 15px/1.55 var(--font);-webkit-font-smoothing:antialiased}
a{color:var(--teal)}
code{font-family:var(--mono)}
.wrap{max-width:1280px;margin:0 auto;padding:0 24px}
header{border-bottom:1px solid var(--line);background:var(--surface);padding:34px 0 22px}
h1{margin:0;color:var(--ink);font-size:clamp(26px,3.2vw,38px);letter-spacing:-.025em;line-height:1.1}
.lede{margin:10px 0 0;max-width:82ch}
.math{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-family:var(--mono);font-size:12px;color:var(--muted)}
.math b{color:var(--ink)}
.tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:18px}
button,select,input[type=search]{font:inherit;color:var(--ink)}
button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer}
button:hover{border-color:var(--teal);color:var(--teal)}
button.primary{background:var(--teal);border-color:var(--teal);color:#fff}
button.primary:hover{background:var(--teal-hover);color:#fff}
main{padding:26px 0 60px}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);padding:18px}
.filters{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.field{display:flex;flex-direction:column;gap:5px;min-width:0}
.field label{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:var(--mono)}
select{width:100%;padding:9px 10px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);font-size:13px}
.summary{display:flex;flex-wrap:wrap;gap:14px;align-items:baseline;justify-content:space-between;margin:18px 0 4px}
.count{font-size:15px;color:var(--muted)}
.count b{font-size:26px;color:var(--ink);font-variant-numeric:tabular-nums;letter-spacing:-.02em;margin-right:6px}
.hint{font-size:12px;color:var(--muted)}
.results{margin-top:16px;list-style:none;padding:0;display:grid;gap:8px}
.row{display:grid;grid-template-columns:52px minmax(0,1fr) auto auto;gap:12px;align-items:center;
  padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface-2)}
.row:hover{border-color:var(--teal)}
.row .score{font:700 13px/1 var(--mono);color:var(--ink);background:var(--soft);border-radius:6px;padding:6px 0;text-align:center}
.row .label{color:var(--ink);font-weight:600;text-decoration:none;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row .label:hover{color:var(--teal);text-decoration:underline}
.row .id{display:block;color:var(--muted);font:400 11px/1.4 var(--mono);word-break:break-all;margin-top:2px}
.row .open{font-size:12.5px;font-weight:600;text-decoration:none;white-space:nowrap}
.row .clip{font-size:11.5px;color:var(--muted);background:none;border:0;padding:2px 4px;cursor:pointer}
.row .clip:hover{color:var(--teal)}
.picked{grid-column:1/-1;margin-top:20px;padding:16px;border:1px solid var(--teal);border-radius:12px;background:var(--tint)}
.picked h2{margin:0 0 6px;font-size:15px;color:var(--ink)}
.picked .meta{font:400 11.5px/1.5 var(--mono);color:var(--muted);word-break:break-all}
.picked .acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.topstrip{margin-top:36px}
.topstrip h2{color:var(--ink);font-size:20px;margin:0 0 4px;letter-spacing:-.01em}
.topstrip p{margin:0 0 14px;color:var(--muted);font-size:13px}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px;list-style:none;padding:0;margin:0}
.card{border:1px solid var(--line);border-radius:12px;background:var(--surface);padding:12px;display:flex;flex-direction:column;gap:6px}
.card .rankline{display:flex;justify-content:space-between;align-items:center;font-family:var(--mono);font-size:11px;color:var(--muted)}
.card .rankline b{color:var(--teal);font-size:12px}
.card a{font-weight:650;text-decoration:none;color:var(--ink);font-size:13.5px;line-height:1.35}
.card a:hover{color:var(--teal);text-decoration:underline}
.card .sub{font:400 11px/1.4 var(--mono);color:var(--muted)}
.card .note{font-size:12px;color:var(--body)}
.previewFrame{margin-top:26px;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow)}
.previewFrame header{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--line);background:var(--surface-2)}
.previewFrame iframe{display:block;width:100%;height:70vh;border:0;background:var(--bg)}
.previewFrame .path{font:400 11.5px/1.4 var(--mono);color:var(--muted);word-break:break-all}
.banner{margin-top:18px;padding:12px 14px;border:1px solid #cfe3dd;border-left:4px solid var(--teal);border-radius:8px;background:var(--tint);color:var(--ink);font-size:13px;max-width:110ch;line-height:1.55}
.banner code{font-family:var(--mono);font-size:12px;background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:1px 5px}
.row .label.is-off{color:var(--muted);font-weight:500;cursor:not-allowed}
.chip-notbuilt{font:600 10px/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:3px 7px;white-space:nowrap}
footer{border-top:1px solid var(--line);padding:22px 0 40px;color:var(--muted);font-size:12.5px}
footer ul{list-style:none;padding:0;display:flex;gap:18px;flex-wrap:wrap}
@media(max-width:900px){.filters{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.filters{grid-template-columns:1fr}.row{grid-template-columns:44px minmax(0,1fr);}.row .open,.row .clip{display:none}}
</style>
</head>
<body>
<header><div class="wrap">
  <h1>Nestlancer homepage compositor</h1>
  <p class="lede">Every legal combination of the eight approved shortlist slots, composed with one page shell, one theme system and namespaced CSS/JS. Filter below, deep-link a combination, or open one of the top 50 reviewed pages.</p>
  <div class="math" id="math"></div>
  <div class="tools">
    <button id="random" class="primary" type="button">Open random match</button>
    <button id="first" type="button">Open first match</button>
    <button id="reset" type="button">Clear filters</button>
    <button id="theme" type="button">Switch theme</button>
  </div>
  <div class="banner" id="pagesNote" hidden>
    <strong>This gallery is a manifest for all 21,600 pages; the generated <code>pages/</code> folder is not part of the clone.</strong>
    Filters, deep links and scores work as-is, and all 50 reviewed pages open from their bundled copies. To browse every composed page, build once and reload:
    <code>node homepage-compositor/tools/compose.mjs --all</code> — or run <code>node homepage-compositor/tools/serve.mjs</code>, which does the URL bookkeeping for you.
  </div>
</div></header>

<main><div class="wrap">
  <section class="panel" aria-labelledby="filters-title">
    <h2 id="filters-title" style="margin:0 0 12px;font-size:14px;letter-spacing:.1em;text-transform:uppercase;font-family:var(--mono);color:var(--muted)">Filters</h2>
    <div class="filters" id="filters"></div>
    <div class="summary">
      <p class="count"><b id="count">21600</b>combinations match</p>
      <p class="hint">Showing <span id="shown">100</span> · the DOM never holds more than 100 rows</p>
    </div>
    <div id="picked"></div>
    <ul class="results" id="results"></ul>
  </section>

  <section class="topstrip" aria-labelledby="top-title">
    <h2 id="top-title">Top 50 by UI review</h2>
    <p>Scored on seam integrity, hierarchy, skin coherence, type &amp; spacing, motion, theme, responsive behaviour, content fidelity and overall feel. <a href="review/top50.html">Full top-50 table →</a></p>
    <ul class="cards" id="topcards"></ul>
  </section>

  <section class="previewFrame" id="preview" hidden>
    <header>
      <div><b id="previewTitle">Preview</b><div class="path" id="previewPath"></div></div>
      <div class="tools" style="margin:0">
        <button id="previewTheme" type="button">Toggle page theme</button>
        <button id="previewClose" type="button">Close preview</button>
      </div>
    </header>
    <iframe id="previewFrameEl" title="Composed homepage preview" loading="lazy"></iframe>
  </section>
</main>

<footer><div class="wrap">
  <ul>
    <li><a href="review/">Review index</a></li>
    <li><a href="review/top50.html">Top 50 table</a></li>
    <li><a href="review/summary.json">review/summary.json</a></li>
    <li><a href="manifest.json">manifest.json</a></li>
    <li><a href="inventory.json">inventory.json</a></li>
    <li><a href="verify.log">verify.log</a></li>
  </ul>
  <p>Serve the repository root with <code>python3 -m http.server 8125</code> and open <code>/homepage-compositor/</code>.</p>
</div></footer>

<script id="nl-data" type="application/json">${JSON.stringify(galleryData).replace(/</g, '\\u003c')}</script>
<script>
(function () {
  var DATA = JSON.parse(document.getElementById('nl-data').textContent);
  var SLOTS = DATA.slots;
  var SCORES = DATA.scores;
  var LIMIT = 100;

  var filtersEl = document.getElementById('filters');
  var resultsEl = document.getElementById('results');
  var countEl = document.getElementById('count');
  var shownEl = document.getElementById('shown');
  var pickedEl = document.getElementById('picked');

  /* --- slot selects ------------------------------------------------------ */
  var selects = {};
  SLOTS.forEach(function (slot) {
    var field = document.createElement('div');
    field.className = 'field';
    var id = 'f-' + slot.slot;
    field.innerHTML = '<label for="' + id + '">' + slot.label + ' · ' + slot.samples.length + '</label>';
    var sel = document.createElement('select');
    sel.id = id;
    sel.setAttribute('data-slot', slot.slot);
    var all = document.createElement('option');
    all.value = '';
    all.textContent = 'Any ' + slot.label.toLowerCase() + ' (' + slot.samples.length + ')';
    sel.appendChild(all);
    slot.samples.forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.id + ' · ' + s.name;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', apply);
    field.appendChild(sel);
    filtersEl.appendChild(field);
    selects[slot.slot] = sel;
  });

  /* --- maths line -------------------------------------------------------- */
  document.getElementById('math').innerHTML =
    SLOTS.map(function (s) { return s.samples.length; }).join(' × ') +
    ' = <b>' + DATA.total + '</b> pages · 8 slots · fixed order';

  /* --- canonical order + index (mirrors tools/lib/combos.mjs) ------------ */
  function eachCombo(cb) {
    var idx = SLOTS.map(function () { return 0; });
    var i = 0;
    for (;;) {
      var picks = {};
      for (var k = 0; k < SLOTS.length; k++) picks[SLOTS[k].slot] = SLOTS[k].samples[idx[k]];
      var id = SLOTS.map(function (s) { return s.prefix + '-' + picks[s.slot].id; }).join('__');
      cb({ index: i++, id: id, picks: picks });
      var carry = SLOTS.length - 1;
      for (; carry >= 0; carry--) {
        if (idx[carry] < SLOTS[carry].samples.length - 1) { idx[carry]++; break; }
        idx[carry] = 0;
      }
      if (carry < 0) break;
    }
  }

  function label(picks) {
    var ids = SLOTS.map(function (s) { return picks[s.slot].id; });
    ids[ids.length - 1] = 'Ftr-' + ids[ids.length - 1];
    return ids.join(' · ');
  }

  /* --- filtering --------------------------------------------------------- */
  function readState() {
    var st = {};
    SLOTS.forEach(function (s) {
      st[s.slot] = selects[s.slot].value || null;
    });
    return st;
  }

  function matches(state) {
    var out = [];
    eachCombo(function (combo) {
      for (var k = 0; k < SLOTS.length; k++) {
        var want = state[SLOTS[k].slot];
        if (want && combo.picks[SLOTS[k].slot].id !== want) return;
      }
      out.push(combo);
    });
    return out;
  }

  function scoreOf(index) { return SCORES[index] || 0; }

  /* --- page availability -------------------------------------------------
     pages/ is generated output and is not in the clone. Every combo still has
     a score; the 50 reviewed combos also ship a bundled hand-off copy. Links
     point at whichever of the two actually exists. */
  var HAS_PAGES = false;
  var TOP_RANK = {};
  DATA.top.forEach(function (t) { TOP_RANK[t.id] = t.rank; });
  function pageHref(id) {
    if (HAS_PAGES) return 'pages/' + id + '/';
    if (TOP_RANK[id]) return 'review/top50/' + id + '/index.html';
    return null;
  }

  function rowEl(combo) {
    var li = document.createElement('li');
    li.className = 'row';
    var score = scoreOf(combo.index);
    var lab = label(combo.picks);
    var href = pageHref(combo.id);
    var head = href
      ? '<a class="label" href="' + href + '">' + lab + '</a>'
      : '<span class="label is-off" title="pages/ is not built in this checkout">' + lab + '</span>';
    var tag = !href
      ? '<span class="chip-notbuilt">not built</span>'
      : '<a class="open" href="#" data-preview="' + combo.id + '">Preview</a>';
    li.innerHTML =
      '<div class="score" title="UI review score">' + score + '</div>' +
      '<div>' + head + '<span class="id">' + combo.id + '</span></div>' +
      tag +
      '<button class="clip" type="button" title="Copy deep link">Copy link</button>';
    li.querySelector('.clip').addEventListener('click', function () {
      var url = location.origin + location.pathname + '?' + deepQuery(combo.picks);
      var done = function () { li.querySelector('.clip').textContent = 'Copied'; };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, done);
      else { window.prompt('Deep link', url); }
    });
    var pv = li.querySelector('[data-preview]');
    if (pv) pv.addEventListener('click', function (e) { e.preventDefault(); openPreview(combo); });
    return li;
  }

  function deepQuery(picks) {
    return SLOTS.map(function (s) { return s.prefix + '=' + picks[s.slot].id; }).join('&');
  }

  function pickedPanel(combo) {
    var score = scoreOf(combo.index);
    var href = pageHref(combo.id);
    var acts = href
      ? '<a class="open" href="' + href + '">Open the page</a> · ' +
        '<a href="' + previewHref(combo.id) + '" target="_blank" rel="noopener">Open preview in a new tab</a>'
      : '<span class="chip-notbuilt">pages/ not built</span> ' +
        'This combination is composed and scored, but its page folder is generated output. ' +
        (TOP_RANK[combo.id] ? '' : 'Build it once with <code>node homepage-compositor/tools/compose.mjs --all</code>.');
    pickedEl.innerHTML =
      '<div class="picked">' +
      '<h2>Deep-linked combination — ' + score + '/45</h2>' +
      '<div class="meta">' + combo.id + '</div>' +
      '<div class="acts">' + acts + '</div></div>';
  }

  var previewTheme = 'light';
  function previewHref(id) {
    var href = pageHref(id);
    if (!href) return null;
    return href + '?theme=' + previewTheme;
  }

  function openPreview(combo) {
    var href = previewHref(combo.id);
    if (!href) {
      var note = document.getElementById('pagesNote');
      if (note) { note.hidden = false; note.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      return;
    }
    var box = document.getElementById('preview');
    box.hidden = false;
    document.getElementById('previewTitle').textContent = label(combo.picks) + ' — ' + scoreOf(combo.index) + '/45';
    document.getElementById('previewPath').textContent = href.split('?theme=')[0].replace(/index[.]html$/, '');
    document.getElementById('previewFrameEl').src = href;
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var current = [];
  var state = {};

  function apply() {
    state = readState();
    current = matches(state);
    countEl.textContent = current.length;
    shownEl.textContent = Math.min(LIMIT, current.length);
    resultsEl.innerHTML = '';
    var frag = document.createDocumentFragment();
    current.slice(0, LIMIT).forEach(function (c) { frag.appendChild(rowEl(c, state)); });
    resultsEl.appendChild(frag);
    if (!current.length) {
      resultsEl.innerHTML = '<li class="hint" style="padding:14px">No combination with those slots.</li>';
    }
  }

  /* --- deep links -------------------------------------------------------- */
  function parseQuery() {
    var q = new URLSearchParams(location.search);
    var any = false;
    SLOTS.forEach(function (s) {
      var v = q.get(s.prefix);
      if (v && s.samples.some(function (x) { return x.id === v; })) { selects[s.slot].value = v; any = true; }
    });
    return any;
  }

  function findCombo() {
    var st = readState();
    var found = null;
    eachCombo(function (c) {
      if (found) return;
      var ok = SLOTS.every(function (s) { return !st[s.slot] || c.picks[s.slot].id === st[s.slot]; });
      if (ok && SLOTS.every(function (s) { return st[s.slot]; })) found = c;
    });
    return found;
  }

  /* --- top 50 strip ------------------------------------------------------ */
  var cards = document.getElementById('topcards');
  function renderTopCards() {
    cards.innerHTML = '';
    DATA.top.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'card';
      var ids = t.label.split(' · ');
      var href = pageHref(t.id);
      li.innerHTML =
        '<div class="rankline"><b>#' + t.rank + '</b><span>' + t.total + '/45</span></div>' +
        '<a href="' + href + '">' + ids.join(' · ') + '</a>' +
        '<div class="sub">' + t.id.replace(/__/g, ' ') + '</div>' +
        '<div class="note">' + t.note.replace(/</g, '&lt;') + '</div>';
      cards.appendChild(li);
    });
  }

  /* --- actions ----------------------------------------------------------- */
  document.getElementById('reset').addEventListener('click', function () {
    SLOTS.forEach(function (s) { selects[s.slot].value = ''; });
    pickedEl.innerHTML = '';
    history.replaceState(null, '', location.pathname);
    apply();
  });

  document.getElementById('random').addEventListener('click', function () {
    if (!current.length) return;
    openPreview(current[Math.floor(Math.random() * current.length)]);
  });

  document.getElementById('first').addEventListener('click', function () {
    if (current.length) openPreview(current[0]);
  });

  document.getElementById('theme').addEventListener('click', function () {
    var r = document.documentElement;
    var next = r.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', next);
    try { localStorage.setItem('nl-gallery-theme', next); } catch (e) {}
  });

  document.getElementById('previewTheme').addEventListener('click', function () {
    previewTheme = previewTheme === 'light' ? 'dark' : 'light';
    var frame = document.getElementById('previewFrameEl');
    if (frame && frame.src && /theme=(light|dark)/.test(frame.src)) {
      frame.src = frame.src.replace(/theme=(light|dark)/, 'theme=' + previewTheme);
    }
  });

  document.getElementById('previewClose').addEventListener('click', function () {
    var box = document.getElementById('preview');
    box.hidden = true;
    document.getElementById('previewFrameEl').src = 'about:blank';
  });

  /* --- boot -------------------------------------------------------------- */
  parseQuery();
  apply();
  renderTopCards();
  var hit = findCombo();
  if (hit) pickedPanel(hit);

  // Does this checkout/root actually serve the composed pages?
  var probe = 'pages/' + DATA.top[0].id + '/index.html';
  fetch(probe, { method: 'HEAD' }).then(function (r) {
    if (!r.ok) throw new Error('missing');
    HAS_PAGES = true;
  }).catch(function () {
    HAS_PAGES = false;
    var note = document.getElementById('pagesNote');
    if (note) note.hidden = false;
  }).then(function () {
    document.documentElement.setAttribute('data-pages', HAS_PAGES ? 'ready' : 'missing');
    apply();
    renderTopCards();
    var again = findCombo();
    if (again) pickedPanel(again);
  });
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(COMPOSITOR, 'index.html'), gallery);
console.log(`gallery written: index.html (${galleryData.slots.length} filters, ${galleryData.top.length} top cards)`);
console.log(`top50: review/top50.html + ${top50.length} self-contained folders (assets bundled: ${assetCount})`);
console.log('review/index.html: landing page for serving review/ as its own root');
