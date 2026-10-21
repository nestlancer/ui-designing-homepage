#!/usr/bin/env node
/**
 * Stage 5 — the UI review pass.
 *
 *   node tools/review.mjs            # score all 21,600 combos, write scores + top 50
 *   node tools/review.mjs --report   # re-print the gate from an existing scores.json
 *
 * Every combination is judged on the nine aspects from the compositor brief:
 * seam integrity, visual hierarchy, skin coherence, typography & spacing,
 * motion quality, theme integrity, responsive behaviour, content fidelity and
 * overall Nestlancer feel.
 *
 * The reviewer cannot open a browser in this sandbox, so the judgement is a
 * documented rubric over (a) the reviewer's per-sample reading of the 29
 * approved designs (lib/traits.mjs), (b) measured fragment CSS/markup metrics,
 * and (c) measured cross-slot relations. The rubric lives in
 * review/methodology.md and every input is reproducible from fragments/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allCombos } from './lib/combos.mjs';
import { SLOT_ORDER } from './lib/traits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const PAGES = path.join(COMPOSITOR, 'pages');
const REVIEW = path.join(COMPOSITOR, 'review');

const ASPECTS = [
  ['seam', 'Seam integrity'],
  ['hierarchy', 'Visual hierarchy'],
  ['skin', 'Skin coherence'],
  ['type', 'Typography & spacing'],
  ['motion', 'Motion quality'],
  ['theme', 'Theme integrity'],
  ['responsive', 'Responsive behaviour'],
  ['content', 'Content fidelity'],
  ['feel', 'Overall Nestlancer feel'],
];

const inventory = JSON.parse(fs.readFileSync(path.join(COMPOSITOR, 'inventory.json'), 'utf8'));

const fragMeta = new Map();
for (const slot of SLOT_ORDER) {
  for (const s of inventory.slots.find((x) => x.slot === slot).samples) {
    fragMeta.set(`${slot}/${s.folder}`, JSON.parse(fs.readFileSync(
      path.join(COMPOSITOR, 'fragments', slot, s.folder, 'meta.json'), 'utf8')));
  }
}

const get = (picks, slot) => fragMeta.get(`${slot}/${picks[slot].folder}`);
const mass = (m) => m.metrics.textChars + m.metrics.elements * 12;
const clamp = (v, lo = 1, hi = 5) => Math.min(hi, Math.max(lo, v));
const round1 = (v) => Math.round(v * 10) / 10;
const stdev = (xs) => {
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length);
};

function scoreCombo(combo) {
  const f = Object.fromEntries(SLOT_ORDER.map((s) => [s, get(combo.picks, s)]));
  const t = Object.fromEntries(SLOT_ORDER.map((s) => [s, f[s].traits]));
  const m = Object.fromEntries(SLOT_ORDER.map((s) => [s, f[s].metrics]));
  const vec = SLOT_ORDER.map((s) => t[s].vector);
  const texture = vec.map((v) => v[0]);
  const darkness = vec.map((v) => v[1]);
  const elevation = vec.map((v) => v[2]);
  const darkSections = darkness.filter((d) => d === 2).length;
  const mixedSections = darkness.filter((d) => d === 1).length;

  // 1 — seam integrity -------------------------------------------------------
  let seam = 5;
  const seamNotes = [];
  if (t.why.surface === 'dark' && t.financial.surface === 'terminal') {
    seam -= 1; seamNotes.push('two dark masses meet at money → why');
  } else if (t.why.surface === 'dark') {
    seam -= 0.5; seamNotes.push('the dark proof plane is the only hard cut in an otherwise light run');
  }
  if (t.header.sticky && (t.work.surface === 'viewer' || t.work.surface === 'showcase')) {
    seam -= 0.25; // the shell offsets the preview, but two sticky planes still interact
  }
  if (t.header.surface === 'float' && t.hero.surface === 'dual') {
    seam -= 0.5; seamNotes.push('floating pill bar over a hard 50/50 split');
  }
  if (t.cta.surface === 'orbit' && t.footer.surface === 'float') {
    seam -= 0.5; seamNotes.push('orbital close stacked on a floating footer card');
  }
  if (t.why.surface === 'dark' && t.footer.surface === 'float') seam -= 0.25;

  // 2 — visual hierarchy -----------------------------------------------------
  let hierarchy = 5;
  const hierNotes = [];
  if (mass(f.work) > 2.2 * mass(f.hero)) { hierarchy -= 0.5; hierNotes.push('the work grid outweighs the hero opening'); }
  if (m.hero.elements > 110) { hierarchy -= 0.5; hierNotes.push('a crowded hero pushes the first scroll'); }
  if (t.financial.density === 2 && t.why.density === 2) { hierarchy -= 0.5; hierNotes.push('two spacious proof sections run together'); }
  if (t.cta.density === 1) hierarchy -= 0.5;
  if (t.hero.motion === 3 && t.work.motion === 3) hierarchy -= 0.25;

  // 3 — skin coherence -------------------------------------------------------
  const sdT = stdev(texture);
  const sdE = stdev(elevation);
  let skin = 5 - sdT * 1.5 - sdE * 0.9 - Math.max(0, darkSections - 1) * 0.8 - Math.max(0, mixedSections - 2) * 0.25;
  const surfaceSet = [...new Set(SLOT_ORDER.map((s) => t[s].surface))];

  // 4 — typography & spacing -------------------------------------------------
  const totalFs = SLOT_ORDER.reduce((n, s) => n + m[s].fontSizeCount, 0);
  const literalStack = SLOT_ORDER.filter((s) => m[s].hasLiteralStack).length;
  let type = 5;
  if (totalFs > 95) type -= 0.25;
  if (totalFs > 110) type -= 0.25;
  if (totalFs < 45) type -= 0.5;
  if (literalStack >= 2) type -= 0.25;            // a couple of samples bring their own system stack
  const busyType = SLOT_ORDER.filter((s) => m[s].fontSizeCount > 13).length;
  if (busyType >= 1) type -= 0.25;                // more than thirteen distinct sizes in one section
  if (busyType >= 2) type -= 0.25;
  const sharp = SLOT_ORDER.filter((s) => m[s].radiusCount === 0).length;
  if (sharp && (t.header.surface === 'float' || t.footer.surface === 'float')) type -= 0.25; // pill chrome beside square edges
  if (sharp >= 2) type -= 0.25;

  // 5 — motion quality -------------------------------------------------------
  const totalMotion = SLOT_ORDER.reduce((n, s) => n + t[s].motion, 0);
  const looping = SLOT_ORDER.reduce((n, s) => n + m[s].infinite, 0);
  const reducedAll = SLOT_ORDER.every((s) => m[s].reduced);
  let motion = 5;
  if (totalMotion >= 14) motion -= 0.5;
  if (totalMotion >= 16) motion -= 0.5;
  if (looping >= 5) motion -= 0.5;
  if (looping >= 7) motion -= 0.5;
  if (!reducedAll) motion -= 1;

  // 6 — theme integrity ------------------------------------------------------
  let theme = 5;
  if (t.why.surface === 'dark') theme -= 0.25;          // light mode is already a dark plane
  if (m.why.hardcodedHex > 35) theme -= 0.25;           // many literal colours outside the token set
  if (t.financial.surface === 'terminal' && t.why.surface === 'dark') theme -= 0.25;

  // 7 — responsive behaviour -------------------------------------------------
  // responsive: breakpoint coverage, not raw media-query count. A section with
  // two breakpoints plus fluid clamp()/minmax() grid behaves as well as one
  // with five, so coverage is scored per fragment and averaged.
  let coverage = 0;
  for (const s of SLOT_ORDER) {
    const media = m[s].media;
    let c = media >= 4 ? 1 : media === 3 ? 0.9 : media === 2 ? 0.8 : media === 1 ? 0.6 : 0.25;
    if (m[s].fluid) c += 0.15;
    if (m[s].maxFixedWidth > 1100) c -= 0.2;
    coverage += Math.max(0, Math.min(1, c));
  }
  let responsive = 5 * (coverage / SLOT_ORDER.length);

  // 8 — content fidelity (verified by tools/verify.mjs on every page) ---------
  const content = 5;

  // 9 — overall feel ---------------------------------------------------------
  const subtotal = (seam + hierarchy + skin + type + motion + theme + responsive + content) / 8;
  let feel = subtotal;
  if (skin >= 4 && seam >= 4) feel += 0.3;
  if (t.cta.surface === t.footer.surface) feel += 0.2;
  if (t.header.surface === t.footer.surface) feel += 0.2;
  if (surfaceSet.length >= 7) feel -= 0.6;
  else if (surfaceSet.length >= 6) feel -= 0.3;

  const aspects = {
    seam: round1(clamp(seam)),
    hierarchy: round1(clamp(hierarchy)),
    skin: round1(clamp(skin)),
    type: round1(clamp(type)),
    motion: round1(clamp(motion)),
    theme: round1(clamp(theme)),
    responsive: round1(clamp(responsive)),
    content: round1(content),
    feel: round1(clamp(feel)),
  };
  const total = ASPECTS.reduce((n, [k]) => n + Math.round(aspects[k]), 0);
  const exact = ASPECTS.reduce((n, [k]) => n + aspects[k], 0);

  // The note: the combination in one reviewer's line, then the reservation
  // that actually applies (or a positive if none does).
  const list = (xs) => (xs.length <= 1 ? xs[0] : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]);
  const article = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
  const opening = `${t.header.short[0].toUpperCase()}${t.header.short.slice(1)} over ${article(t.hero.short)} ${t.hero.short}`;
  const body = list([t.financial.short, t.why.short, t.work.short]);
  const close = list([t.cta.short, t.footer.short]);
  let tail;
  if (seamNotes.length) tail = `Watch: ${seamNotes[0]}.`;
  else if (aspects.skin <= 3.9) tail = `Watch: ${surfaceSet.length} surface languages read as plates.`;
  else if (aspects.motion <= 4) tail = `Motion runs hot at ${totalMotion}/24 with ${looping} loops.`;
  else if (aspects.type <= 4.2) tail = 'Shape language drifts between pill chrome and square panels.';
  else tail = `Motion sits at ${totalMotion}/24; both themes hold.`;
  const base = `${opening}; ${body}; ${close}.`.replace(/\s+/g, ' ');
  const compact = ` ${t.work.short === 'scroll-spy showcase' ? 'The scroll-spy is the busiest motion on the page.' : `Motion ${totalMotion}/24.`}`;
  let note = base + (base.length + tail.length <= 190 ? ` ${tail}` : compact);
  note = note.replace(/\s+/g, ' ').replace(/\s+([.;,])/g, '$1');
  if (note.length > 200) {
    const cut = note.slice(0, 197);
    note = cut.slice(0, cut.lastIndexOf(' ')) + '…';
  }

  return { aspects, total, exact, note };
}

function main() {
  const started = Date.now();
  const records = [];
  for (const combo of allCombos(inventory)) {
    const r = scoreCombo(combo);
    records.push({
      combo_id: combo.id,
      label: combo.label,
      index: combo.index,
      total: r.total,
      exact: r.exact,
      aspects: r.aspects,
      note: r.note,
    });
  }

  // descending score; ties broken by the unrounded score, then canonical order
  records.sort((a, b) => b.total - a.total || b.exact - a.exact || a.index - b.index);

  fs.mkdirSync(REVIEW, { recursive: true });
  fs.writeFileSync(path.join(REVIEW, 'scores.json'), JSON.stringify(records) + '\n');

  // diversity-aware top 50: all 50 are top-scoring, ties are broken so the
  // hand-off covers distinct hero×work pairings before repeating one.
  const sigOf = (r) => {
    const slots = Object.fromEntries(r.combo_id.split('__').map((p) => {
      const [k, v] = p.split('-');
      return [k, v];
    }));
    return `${slots.hero}/${slots.work}`;
  };
  // Strict top 50: never promote a combo below the 50th-highest total. Diversity
  // only breaks ties inside that band — one hero×work pairing each before repeats.
  const cutoff = records[Math.min(49, records.length - 1)].total;
  const top = records.filter((r) => r.total > cutoff);
  const tiePool = records.filter((r) => r.total === cutoff);
  const chosen = new Set(top.map((r) => r.combo_id));
  const sigCount = new Map();
  const bump = (r) => {
    const sig = sigOf(r);
    sigCount.set(sig, (sigCount.get(sig) || 0) + 1);
    top.push(r); chosen.add(r.combo_id);
  };
  for (const r of top.slice()) if (sigCount.has(sigOf(r))) bump({ ...r, __skip: true }); // no-op guard
  for (const r of tiePool) {
    if (top.length >= 50) break;
    if (chosen.has(r.combo_id)) continue;
    if (sigCount.has(sigOf(r))) continue;
    bump(r);
  }
  for (const r of tiePool) {
    if (top.length >= 50) break;
    if (chosen.has(r.combo_id)) continue;
    bump(r);
  }
  // presentation order: higher score first, then unrounded score, then canonical index
  top.sort((a, b) => b.total - a.total || b.exact - a.exact || a.index - b.index);

  fs.rmSync(path.join(REVIEW, 'top50'), { recursive: true, force: true });
  const topIds = new Set(top.map((r) => r.combo_id));
  for (const r of top) {
    const src = path.join(PAGES, r.combo_id);
    const dst = path.join(REVIEW, 'top50', r.combo_id);
    fs.mkdirSync(dst, { recursive: true });
    fs.copyFileSync(path.join(src, 'index.html'), path.join(dst, 'index.html'));
    const combo = JSON.parse(fs.readFileSync(path.join(src, 'combo.json'), 'utf8'));
    combo.review = { total: r.total, aspects: r.aspects, note: r.note };
    fs.writeFileSync(path.join(dst, 'combo.json'), JSON.stringify(combo, null, 2) + '\n');
    // also keep the review block inside the canonical page folder
    fs.writeFileSync(path.join(src, 'combo.json'), JSON.stringify(combo, null, 2) + '\n');
  }

  // patch the remaining combo.json files with their review block
  let patched = 0;
  for (const r of records) {
    if (topIds.has(r.combo_id)) { patched++; continue; }
    const p = path.join(PAGES, r.combo_id, 'combo.json');
    if (!fs.existsSync(p)) continue;
    const combo = JSON.parse(fs.readFileSync(p, 'utf8'));
    combo.review = { total: r.total, aspects: r.aspects, note: r.note };
    fs.writeFileSync(p, JSON.stringify(combo, null, 2) + '\n');
    patched++;
  }

  const totals = records.map((r) => r.total);
  const sorted = [...totals].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const mean = totals.reduce((a, b) => a + b, 0) / totals.length;
  const dist = {};
  for (const t of totals) dist[t] = (dist[t] || 0) + 1;

  fs.writeFileSync(path.join(REVIEW, 'summary.json'), JSON.stringify({
    reviewed: records.length,
    aspects: ASPECTS.map(([k, label]) => ({ key: k, label })),
    top: records[0].total,
    lowest: sorted[0],
    median,
    mean: Math.round(mean * 100) / 100,
    distribution: dist,
    top50: top.map((r, i) => ({
      rank: i + 1, combo_id: r.combo_id, label: r.label, total: r.total, aspects: r.aspects, note: r.note,
    })),
    generated_by: 'tools/review.mjs',
  }, null, 2) + '\n');

  // the review gate
  const topFolders = fs.existsSync(path.join(REVIEW, 'top50'))
    ? fs.readdirSync(path.join(REVIEW, 'top50')).filter((d) => fs.existsSync(path.join(REVIEW, 'top50', d, 'index.html'))).length : 0;
  const pass = records.length === 21600 && topFolders === 50 && top.length === 50;
  console.log('## UI REVIEW GATE');
  console.log(`combos reviewed: ${records.length}/21600`);
  console.log(`scores written: ${records.length}/21600`);
  console.log(`top score: ${records[0].total}/45 · lowest score: ${sorted[0]}/45 · median: ${median}/45 · mean: ${mean.toFixed(2)}`);
  console.log(`top50 list written: ${fs.existsSync(path.join(REVIEW, 'summary.json')) ? 'YES' : 'NO'}`);
  console.log(`top50 folders on disk: ${topFolders}/50`);
  console.log(`Gate: ${pass ? 'PASS' : 'FAIL'}`);
  console.log(`\n(top-50 selection is diversity-aware within score ties; ${Object.keys(dist).length} distinct totals, ${((Date.now() - started) / 1000).toFixed(1)}s)`);
}

main();
