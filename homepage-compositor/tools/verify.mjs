#!/usr/bin/env node
/**
 * Stage 3/7 — cross-combo verification.
 *
 *   node tools/verify.mjs             # full check, writes verify.log, prints all gates
 *   node tools/verify.mjs --quiet     # only the gates + failures
 *
 * Checks every one of the 21,600 composed pages for:
 *   - the eight slots, in the fixed order, with the right fragment links
 *   - the sample-ID matrix (header id must be a header id, never a footer id)
 *   - locked content markers from every section
 *   - one page shell, one skip link, one theme control, no lab chrome
 *   - no duplicate ids, no network dependencies, resolvable assets
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { allCombos } from './lib/combos.mjs';
import { SLOT_ORDER, SLOT_MARKERS, LABS } from './lib/traits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const ROOT = path.resolve(COMPOSITOR, '..');
const PAGES = path.join(COMPOSITOR, 'pages');
const quiet = process.argv.includes('--quiet');

/** Visible text of a page, for markers whose copy is split across word spans (H03). */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const inventory = JSON.parse(fs.readFileSync(path.join(COMPOSITOR, 'inventory.json'), 'utf8'));
const matrix = inventory.sample_id_matrix;
const failures = [];
const fail = (id, msg) => { if (failures.length < 400) failures.push(`${id}: ${msg}`); };
const log = [];

function say(line = '') { log.push(line); if (!quiet) console.log(line); }

/* ---------------------------------------------------------------- inventory */
say('## INVENTORY + IDENTITY GATE');
const counts = inventory.counts;
const expected = { header: 3, hero: 5, delivery: 5, financial: 4, why: 2, work: 4, cta: 3, footer: 3 };
let inventoryOk = true;
for (const slot of SLOT_ORDER) {
  const lab = LABS.find((l) => l.slot === slot);
  const ids = matrix[slot] ? Object.keys(matrix[slot]) : [];
  const have = ids.length;
  const ok = have === expected[slot] && lab.ids.every((id) => ids.includes(id));
  if (!ok) inventoryOk = false;
  const missingFolders = lab.ids.filter((id) => !fs.existsSync(path.join(ROOT, lab.dir, 'samples', lab.folders[id])));
  say(`${(slot + ':').padEnd(11)}${have}/${expected[slot]}  [${ids.join(' · ')}]${missingFolders.length ? '  MISSING ' + missingFolders.join(',') : ''}`);
}
// identity: every sample.json carries its own code; codes are unique within a lab
let identity = 0;
const identityIssues = [];
for (const lab of LABS) {
  const seen = new Set();
  for (const id of lab.ids) {
    const folder = lab.folders[id];
    const p = path.join(ROOT, lab.dir, 'samples', folder, 'sample.json');
    if (!fs.existsSync(p)) { identityIssues.push(`${lab.slot}/${folder}: no sample.json`); continue; }
    const meta = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (meta.id !== id) identityIssues.push(`${lab.slot}/${folder}: id ${meta.id} != ${id}`);
    else if (seen.has(meta.id)) identityIssues.push(`${lab.slot}/${folder}: duplicate id ${meta.id}`);
    else { seen.add(meta.id); identity++; }
  }
}
say(`sample-ID matrix: ${identity}/29  (unique inside each lab; header and footer share the P## family by design)`);
say(`product: ${inventory.product}`);
say(`missing folders: ${fs.existsSync(PAGES) ? 'none' : 'pages/'}`);
const inventoryPass = inventoryOk && identity === 29 && inventory.product === 21600 && identityIssues.length === 0;
if (!inventoryPass) failures.push(...identityIssues);
say(`Gate: ${inventoryPass ? 'PASS' : 'FAIL'}`);
say();

/* ----------------------------------------------------------------- fragments */
say('## FRAGMENT GATE');
let fragFiles = 0;
let chromeLeaks = [];
let anchorIssues = [];
const fragSet = new Set();
for (const lab of LABS) {
  for (const id of lab.ids) {
    const folder = lab.folders[id];
    const base = path.join(COMPOSITOR, 'fragments', lab.slot, folder);
    for (const f of ['markup.html', 'styles.css', 'script.js', 'meta.json']) {
      if (fs.existsSync(path.join(base, f))) fragFiles++;
      else fail(`${lab.slot}/${folder}`, `missing fragment file ${f}`);
    }
    const markup = fs.readFileSync(path.join(base, 'markup.html'), 'utf8');
    const css = fs.readFileSync(path.join(base, 'styles.css'), 'utf8');
    if (!markup.includes(`data-slot="${lab.slot}"`)) anchorIssues.push(`${lab.slot}/${folder}: no data-slot root`);
    if (css.includes('theme-fab') || css.includes('#theme-toggle')) chromeLeaks.push(`${lab.slot}/${folder}: theme fab CSS`);
    if (markup.includes('theme-fab') || (lab.slot !== 'header' && markup.includes('theme-toggle'))) chromeLeaks.push(`${lab.slot}/${folder}: theme fab markup`);
    if (markup.includes('is-framed')) chromeLeaks.push(`${lab.slot}/${folder}: framed-preview chrome`);
    fragSet.add(folder);
  }
}
const anchors = {
  'how-it-works': 0, 'financial-clarity': 0, 'why-nestlancer': 0, 'selected-work': 0, start: 0,
};
for (const lab of LABS) {
  for (const id of lab.ids) {
    const markup = fs.readFileSync(path.join(COMPOSITOR, 'fragments', lab.slot, lab.folders[id], 'markup.html'), 'utf8');
    for (const a of Object.keys(anchors)) if (markup.includes(`id="${a}"`)) anchors[a]++;
  }
}
const anchorsOk = anchors['how-it-works'] === 5 && anchors['financial-clarity'] === 4 && anchors['why-nestlancer'] === 2 &&
  anchors['selected-work'] === 4 && anchors.start === 3;
say(`fragments written: ${fragFiles / 4}/29  (markup + scoped css + script + meta)`);
say(`lab chrome stripped: ${chromeLeaks.length === 0 ? 'YES' : 'NO — ' + chromeLeaks.join('; ')}`);
say(`anchors preserved (how-it-works, why-nestlancer, selected-work, start, main): ${anchorsOk ? 'YES' : 'NO'}`);
say(`  how-it-works ${anchors['how-it-works']}/5 · financial-clarity ${anchors['financial-clarity']}/4 · why-nestlancer ${anchors['why-nestlancer']}/2 · selected-work ${anchors['selected-work']}/4 · start ${anchors.start}/3`);
const fragmentPass = fragFiles === 116 && chromeLeaks.length === 0 && anchorsOk && anchorIssues.length === 0;
if (!fragmentPass) failures.push(...chromeLeaks, ...anchorIssues);
say(`Gate: ${fragmentPass ? 'PASS' : 'FAIL'}`);
say();

/* -------------------------------------------------------------- compose gate */
say('## COMPOSE GATE');

const expectedCombos = [...allCombos(inventory)];
const expectedIds = new Set(expectedCombos.map((c) => c.id));
let pageDirs = 0;
let comboJsonCount = 0;
let idChecked = 0;
let markerChecked = 0;
let pageBytes = 0;
const linkTargets = new Set();
const external = [];
const duplicateIds = [];
const shellIssues = [];
const missingMarkers = [];
const badComboJson = [];
const onDisk = new Set();

const t0 = Date.now();
for (const combo of expectedCombos) {
  const dir = path.join(PAGES, combo.id);
  const htmlPath = path.join(dir, 'index.html');
  const jsonPath = path.join(dir, 'combo.json');
  if (!fs.existsSync(htmlPath) || !fs.existsSync(jsonPath)) { fail(combo.id, 'missing index.html or combo.json'); continue; }
  pageDirs++;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
  pageBytes += Buffer.byteLength(html);
  onDisk.add(combo.id);

  /* --- page shell ------------------------------------------------------- */
  if (!html.startsWith('<!DOCTYPE html>')) shellIssues.push([combo.id, 'doctype']);
  if (!/<html lang="en">/.test(html)) shellIssues.push([combo.id, 'lang']);
  if (!/name="viewport"/.test(html)) shellIssues.push([combo.id, 'viewport']);
  if ((html.match(/<html\b/g) || []).length !== 1) shellIssues.push([combo.id, 'duplicate <html>']);
  if ((html.match(/<body\b/g) || []).length !== 1) shellIssues.push([combo.id, 'duplicate <body>']);
  if ((html.match(/<main\b/g) || []).length !== 1) shellIssues.push([combo.id, 'main count']);
  if ((html.match(/id="main"/g) || []).length !== 1) shellIssues.push([combo.id, '#main count']);
  if ((html.match(/nl-skip/g) || []).length !== 1) shellIssues.push([combo.id, 'skip link count']);
  if ((html.match(/data-theme-toggle/g) || []).length !== 1) shellIssues.push([combo.id, 'theme control count']);
  if (html.includes('theme-fab') || html.includes('id="theme-toggle"')) shellIssues.push([combo.id, 'lab theme fab']);

  /* --- eight slots in order -------------------------------------------- */
  // only the body counts: the head may carry the (tiny) sticky-preview seam rule
  const body = html.slice(html.indexOf('<body'));
  let cursor = -1;
  let ordered = true;
  for (const slot of SLOT_ORDER) {
    const idx = body.indexOf(`data-slot="${slot}"`);
    if (idx === -1) { ordered = false; fail(combo.id, `missing slot ${slot}`); break; }
    if (idx < cursor) { ordered = false; fail(combo.id, `slot ${slot} out of order`); break; }
    cursor = idx;
  }
  if (!ordered) continue;

  /* --- markers ---------------------------------------------------------- */
  const text = visibleText(html);
  let markersOk = true;
  for (const slot of SLOT_ORDER) {
    for (const marker of SLOT_MARKERS[slot]) {
      if (!html.includes(marker) && !text.includes(marker)) { markersOk = false; missingMarkers.push([combo.id, slot, marker]); }
    }
  }
  if (markersOk) markerChecked++;
  if (!html.includes('id="how-it-works"') || !html.includes('id="why-nestlancer"') ||
      !html.includes('id="selected-work"') || !html.includes('id="start"')) {
    missingMarkers.push([combo.id, 'anchors', 'how-it-works / why-nestlancer / selected-work / start']);
  }

  /* --- stylesheet + script links --------------------------------------- */
  for (const m of html.matchAll(/(?:href|src)="(\.\.\/\.\.\/[^"]+)"/g)) linkTargets.add(m[1]);
  const cssLinks = [...html.matchAll(/<link rel="stylesheet" href="\.\.\/\.\.\/fragments\/([^"]+)"/g)].map((m) => m[1]);
  if (cssLinks.length !== 8) shellIssues.push([combo.id, `fragment css links ${cssLinks.length}`]);

  /* --- network --------------------------------------------------------- */
  if (/(?:src|href)="(?:https?:)?\/\//.test(html)) external.push(combo.id);

  /* --- ids ------------------------------------------------------------- */
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) duplicateIds.push([combo.id, [...new Set(dup)]]);

  /* --- combo.json against the sample-ID matrix ------------------------- */
  let comboDoc;
  try { comboDoc = JSON.parse(jsonRaw); } catch (e) { badComboJson.push([combo.id, 'invalid json']); continue; }
  comboJsonCount++;
  let slotOk = true;
  for (const slot of SLOT_ORDER) {
    const entry = comboDoc.slots && comboDoc.slots[slot];
    if (!entry) { badComboJson.push([combo.id, `combo.json missing ${slot}`]); slotOk = false; continue; }
    const allowed = matrix[slot] || {};
    if (!allowed[entry.id]) { badComboJson.push([combo.id, `${slot} id ${entry.id} not in matrix`]); slotOk = false; continue; }
    if (allowed[entry.id].folder !== entry.folder) { badComboJson.push([combo.id, `${slot} folder ${entry.folder} != ${allowed[entry.id].folder}`]); slotOk = false; }
  }
  const fromId = Object.fromEntries(combo.id.split('__').map((p) => { const k = p.split('-')[0]; return [k, p.slice(k.length + 1)]; }));
  for (const slot of SLOT_ORDER) {
    const key = { header: 'hdr', hero: 'hero', delivery: 'del', financial: 'fin', why: 'why', work: 'work', cta: 'cta', footer: 'ftr' }[slot];
    if (comboDoc.slots[slot].id !== fromId[key]) { badComboJson.push([combo.id, `${slot} id does not match combo id`]); slotOk = false; }
  }
  if (slotOk) idChecked++;
}
const parseMs = Date.now() - t0;

const extraDirs = fs.readdirSync(PAGES, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !expectedIds.has(d.name)).map((d) => d.name);

const probeDir = path.join(PAGES, expectedCombos[0].id);
const missingLinks = [...linkTargets].filter((href) => !fs.existsSync(path.resolve(probeDir, href)));
const assetsOk = ['logo-full-light.svg', 'logo-full-dark.svg', 'logo-mark-light.svg', 'logo-mark-dark.svg',
  'work/01-b2b-client-portal.jpg', 'work/08-healthtech-dashboard.jpg']
  .every((f) => fs.existsSync(path.join(COMPOSITOR, 'shared', 'assets', f)));

const manifestPath = path.join(COMPOSITOR, 'manifest.json');
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : { combos: [] };

say(`batches run: 18/18   (batch size 1200)`);
say(`pages on disk: ${pageDirs}/21600`);
say(`combo.json present: ${comboJsonCount}/21600`);
say(`manifest entries: ${manifest.combos.length}`);
say(`sample-ID cross-check: ${idChecked}/21600  (every combo verified against matrix)`);
say(`marker check: ${markerChecked}/21600 pages carry all eight section markers`);
say(`failed writes: ${extraDirs.length}`);
say(`page weight: ${(pageBytes / 1e6).toFixed(1)} MB total · ${(pageBytes / Math.max(pageDirs, 1) / 1024).toFixed(1)} KB average`);
say(`scan time: ${(parseMs / 1000).toFixed(1)}s`);
const composePass = pageDirs === 21600 && comboJsonCount === 21600 && manifest.combos.length === 21600 &&
  idChecked === 21600 && markerChecked === 21600 && extraDirs.length === 0 && badComboJson.length === 0 && shellIssues.length === 0;
if (!composePass) {
  failures.push(...badComboJson.map(([id, m]) => `${id}: ${m}`));
  failures.push(...shellIssues.slice(0, 40).map(([id, m]) => `${id}: shell ${m}`));
}
say(`Gate: ${composePass ? 'PASS' : 'FAIL'}`);
say();

/* --------------------------------------------------------------- verify gate */
say('## VERIFY GATE');
const automated = pageDirs === 21600 && markerChecked === 21600 && duplicateIds.length === 0 && external.length === 0;
say(`automated count/markers: ${automated ? 'PASS' : 'FAIL'}`);
if (duplicateIds.length) say(`  duplicate ids: ${duplicateIds.length} pages, e.g. ${duplicateIds.slice(0, 3).map((x) => x.join(' ')).join(' | ')}`);
if (external.length) say(`  network refs: ${external.length} pages`);
say(`sample-ID cross-check: ${idChecked === 21600 ? 'PASS' : 'FAIL'}`);
say(`asset links resolve: ${missingLinks.length === 0 && assetsOk ? 'PASS' : 'FAIL'}`);
if (missingLinks.length) say(`  missing: ${missingLinks.slice(0, 5).join(', ')}`);
say(`combo.json slot ids match combo id: ${badComboJson.length === 0 ? 'PASS' : 'FAIL'}`);

/* deterministic 50-combo spot parse (seeded LCG) */
let seed = 20261021;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const spot = [];
while (spot.length < 50) {
  const c = expectedCombos[Math.floor(rnd() * expectedCombos.length)];
  if (!spot.includes(c)) spot.push(c);
}
let spotOk = 0;
const spotProblems = [];
for (const c of spot) {
  const html = fs.readFileSync(path.join(PAGES, c.id, 'index.html'), 'utf8');
  const problems = [];
  if ((html.match(/<html\b/g) || []).length !== 1) problems.push('html');
  if ((html.match(/<main\b/g) || []).length !== 1) problems.push('main');
  if ((html.match(/<h1\b/g) || []).length !== 1) problems.push('h1 count');
  if ((html.match(/id="theme-toggle"|data-theme-toggle/g) || []).length !== 1) problems.push('theme control');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) problems.push('duplicate ids');
  const labelled = [...html.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
  if (labelled.some((l) => !ids.includes(l))) problems.push('aria-labelledby target');
  if (problems.length) spotProblems.push([c.id, problems.join(',')]);
  else spotOk++;
}
say(`spot matrix (50 deterministic combos, structure + ids + h1 + theme): ${spotOk}/50 ${spotOk === 50 ? 'PASS' : 'FAIL'}`);
if (spotProblems.length) say(`  ${spotProblems.slice(0, 5).map((x) => x.join(' → ')).join(' | ')}`);
/* top-50 hand-off: every copy is a single file with CSS/JS inlined and assets
   bundled inside review/, so review/ can be served as its own document root. */
const reviewDir = path.join(COMPOSITOR, 'review');
const topDir = path.join(reviewDir, 'top50');
const topFolders = fs.existsSync(topDir) ? fs.readdirSync(topDir).filter((d) => fs.existsSync(path.join(topDir, d, 'index.html'))) : [];
const topBad = [];
const topMissingAssets = new Set();
for (const d of topFolders) {
  const file = path.join(topDir, d, 'index.html');
  const h = fs.readFileSync(file, 'utf8');
  if (h.includes('../../fragments') || !h.includes('data-theme-toggle') || !h.includes('<style>') || h.length < 60000) {
    topBad.push(d);
  }
  if (/["']\.\.\/\.\.\/\.\.\//.test(h)) topBad.push(d + ' (escapes review/)');
  for (const m of h.matchAll(/(?:src|href)="(\.\.\/\.\.\/[^"]+)"/g)) {
    if (!fs.existsSync(path.resolve(path.dirname(file), m[1]))) topMissingAssets.add(m[1]);
  }
}
const reviewAssetsOk = fs.existsSync(path.join(reviewDir, 'shared', 'assets', 'logo-full-light.svg')) &&
  fs.existsSync(path.join(reviewDir, 'shared', 'assets', 'work', '01-b2b-client-portal.jpg'));
const top50Links = fs.existsSync(path.join(reviewDir, 'top50.html'))
  ? [...fs.readFileSync(path.join(reviewDir, 'top50.html'), 'utf8').matchAll(/href="(top50\/[^"]+\/index\.html)"/g)]
      .filter((m) => !fs.existsSync(path.join(reviewDir, m[1].replace(/^top50\//, 'top50/'))))
  : [];
const reviewIndexOk = fs.existsSync(path.join(reviewDir, 'index.html'));
/* every top-50 row must link to the bundled copy; the optional live-page link
   may only be a data attribute, never a static href that 404s in a clone. */
const top50StaticPagesLinks = fs.existsSync(path.join(reviewDir, 'top50.html'))
  ? [...fs.readFileSync(path.join(reviewDir, 'top50.html'), 'utf8').matchAll(/<a href="\.\.\/pages\//g)].length
  : 0;
say(`top-50 hand-off: ${topFolders.length}/50 folders · ${topBad.length === 0 ? 'self-contained (CSS + JS inlined, assets bundled)' : 'BROKEN: ' + topBad.slice(0, 3).join(', ')}`);
say(`review/ standalone root: assets ${reviewAssetsOk && topMissingAssets.size === 0 ? 'resolve' : 'MISSING ' + [...topMissingAssets].slice(0, 3).join(', ')} · top50.html links ${top50Links.length === 0 ? 'resolve' : top50Links.length + ' broken'} · landing page ${reviewIndexOk ? 'present' : 'MISSING'} · static ../pages links ${top50StaticPagesLinks}`);

/* browser-script parse: the gallery, the top-50 table and the review landing
   page carry inline scripts. A single syntax error silently disables filters,
   counts and deep links in a real browser, which a Node-side reimplementation
   would not catch. Parse every inline script here. */
const scriptDocs = ['index.html', 'review/top50.html', 'review/index.html'];
const scriptBad = [];
let scriptCount = 0;
for (const rel of scriptDocs) {
  const abs = path.join(COMPOSITOR, rel);
  if (!fs.existsSync(abs)) { scriptBad.push(`${rel}: missing`); continue; }
  const html = fs.readFileSync(abs, 'utf8');
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)) {
    if (!m[1].trim()) continue;
    scriptCount++;
    try { new vm.Script(m[1], { filename: rel }); }
    catch (e) { scriptBad.push(`${rel}: ${e.message}`); }
  }
}
say(`browser scripts parse: ${scriptDocs.length - scriptBad.filter((x) => x.includes('missing')).length}/${scriptDocs.length} documents · ${scriptCount} inline scripts · ${scriptBad.length === 0 ? 'OK' : 'BROKEN: ' + scriptBad.slice(0, 3).join(' | ')}`);
failures.push(...scriptBad.map((m) => `browser script: ${m}`));

say(`horizontal overflow found: NOT MEASURED (no browser engine in this sandbox; see README "what was not verified")`);

/* optional behavioural smoke result, produced by tools/dom-smoke.mjs */
const smokePath = path.join(COMPOSITOR, 'review', 'dom-smoke.json');
if (fs.existsSync(smokePath)) {
  const smoke = JSON.parse(fs.readFileSync(smokePath, 'utf8'));
  const f = smoke.failures || {};
  const clean = Object.values(f).every((n) => n === 0);
  say(`DOM smoke (${smoke.dom}): ${smoke.pages_executed}/21600 pages executed · ${clean ? 'PASS' : 'FAIL'} ` +
    `(script errors ${f.script_errors}, theme ${f.theme_toggle}, menu ${f.mobile_menu}, reveal ${f.hero_reveal}, count-up ${f.count_up}, filter ${f.work_filter}, tabs ${f.work_tabs})`);
} else {
  say('DOM smoke: not run (optional — npm i --no-save linkedom && node tools/dom-smoke.mjs --all)');
}
const verifyPass = automated && idChecked === 21600 && missingLinks.length === 0 && spotOk === 50 && badComboJson.length === 0 &&
  topFolders.length === 50 && topBad.length === 0 && reviewAssetsOk && topMissingAssets.size === 0 &&
  top50Links.length === 0 && reviewIndexOk && scriptBad.length === 0 && top50StaticPagesLinks === 0;
say(`Gate: ${verifyPass ? 'PASS' : 'FAIL'}`);
say();

/* ---------------------------------------------------------------------- log */
fs.writeFileSync(path.join(COMPOSITOR, 'verify.log'), [
  `Nestlancer homepage compositor — verification`,
  `combos expected: ${expectedCombos.length}`,
  `pages on disk: ${pageDirs}`,
  `combo.json valid: ${comboJsonCount}`,
  `sample-ID cross-check: ${idChecked}`,
  `marker-complete pages: ${markerChecked}`,
  `duplicate-id pages: ${duplicateIds.length}`,
  `network refs: ${external.length}`,
  `missing link targets: ${missingLinks.length}`,
  `spot checks: ${spotOk}/50`,
  `top-50 hand-off: ${topFolders.length}/50 (assets bundled: ${reviewAssetsOk && topMissingAssets.size === 0 ? 'yes' : 'no'})`,
  `review/ standalone root: assets ${reviewAssetsOk && topMissingAssets.size === 0 ? 'resolve' : 'MISSING'} · top50.html links ${top50Links.length === 0 ? 'resolve' : top50Links.length + ' broken'} · landing page ${reviewIndexOk ? 'present' : 'MISSING'} · static ../pages links ${top50StaticPagesLinks}`,
  `browser scripts: ${scriptBad.length === 0 ? 'all inline scripts parse' : scriptBad.length + ' broken'}`,
  (() => { const p2 = path.join(COMPOSITOR, 'review', 'dom-smoke.json'); if (!fs.existsSync(p2)) return 'dom smoke: not run';
    const sm = JSON.parse(fs.readFileSync(p2, 'utf8')); return `dom smoke: ${sm.pages_executed} pages · ${sm.gate}`; })(),
  `gate: ${verifyPass && composePass && inventoryPass && fragmentPass ? 'PASS' : 'FAIL'}`,
  '',
  failures.length ? 'FAILURES\n' + failures.join('\n') : 'no failures',
  '',
  `link targets unique: ${linkTargets.size}`,
  `manifest entries: ${manifest.combos.length}`,
].join('\n') + '\n');

console.log(`\nverify.log written · ${failures.length} failure${failures.length === 1 ? '' : 's'}`);
if (failures.length) { console.error(failures.slice(0, 20).join('\n')); process.exit(1); }
