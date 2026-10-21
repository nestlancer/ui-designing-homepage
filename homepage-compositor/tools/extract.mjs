#!/usr/bin/env node
/**
 * Stage 1 — extract the 29 approved shortlist samples into reusable fragments.
 *
 *   node tools/extract.mjs [--check]
 *
 * For every sample:
 *   - strips lab chrome (theme fab, framed-preview hooks, skip link, sample notes)
 *   - keeps <section>/<header>/<footer> markup verbatim otherwise
 *   - scopes CSS to [data-slot="<slot>"] and namespaces every @keyframes
 *   - re-emits only the token keys that differ from shared/tokens.css
 *   - wraps the sample's JS in an IIFE with a slot-scoped document facade
 *   - rewrites ../../assets/... to ../../shared/assets/...
 *   - writes fragments/<slot>/<folder>/{markup.html,styles.css,script.js,meta.json}
 *
 * `--check` re-extracts into memory and compares hashes without writing.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  stripScripts, scriptBlocks, topLevelElements, tagAttrs, classesOf,
  removeTopLevelByClass, removeTopLevelById, unwrapMain, setRootAttr, getRoot,
  collectIds, textContent, countElements,
} from './lib/html.mjs';
import { scopeCss, collectKeyframes, cssMetrics } from './lib/css.mjs';
import { HOUSE_LIGHT, HOUSE_DARK, tokensCss } from './lib/tokens.mjs';
import { LABS, SLOT_ORDER, TRAITS } from './lib/traits.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const COMPOSITOR = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);

function read(p) { return fs.readFileSync(p, 'utf8'); }

function styleBlocks(html) {
  const blocks = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push(m[1]);
  return blocks.join('\n');
}

function bodyOf(html) {
  const m = /<body\b[^>]*>([\s\S]*?)<\/body\s*>/i.exec(html);
  return m ? m[1] : html;
}

function ensureThemeHook(markup) {
  // The header's own theme button becomes the single page-level control.
  let out = markup.replace(
    /<button\b([^>]*\bid="themeToggle"[^>]*)>/i,
    (full, attrs) => {
      if (/data-theme-toggle/i.test(attrs)) return full;
      return `<button${attrs} data-theme-toggle>`;
    },
  );
  return out;
}

function filterScripts(blocks, { slot }) {
  const kept = [];
  const dropped = [];
  for (const b of blocks) {
    const code = b.code.trim();
    if (!code) continue;
    if (/\bis-framed\b/.test(code)) { dropped.push('lab frame postMessage'); continue; }
    const themeRelated = /themeToggle|theme-toggle|querySelector\(\s*['"]\.theme['"]\s*\)|querySelector\(\s*["']\.theme["']\s*\)/.test(code);
    const hasBehaviour = /IntersectionObserver|data-reveal|data-count|addEventListener\(\s*['"](scroll|pointerenter|click|focusin|keydown)['"]/.test(code);
    if (themeRelated && !hasBehaviour) { dropped.push('theme toggle (owned by the shell)'); continue; }
    kept.push(code);
  }
  return { kept, dropped };
}

function wrapScript(code, slot) {
  // `document` is shadowed by a slot-scoped facade: getElementById / querySelector
  // can only see this slot, and theme controls resolve to a detached stub so a
  // fragment can never become a second theme writer.
  const indented = code.split('\n').map((l) => (l ? '  ' + l : l)).join('\n');
  return `/* ${slot} slot — theme controls are owned by the page shell. */\ntry{\n(function(document){\n${indented}\n})(window.NL.scope('${slot}'));\n}catch(__nlError){ window.NL.rescue('${slot}', __nlError); }\n`;
}

function extractOne(lab, folder) {
  const sourceRel = `${lab.dir}/samples/${folder}/${lab.file}`;
  const sourceAbs = path.join(ROOT, sourceRel);
  const fallbackRel = `${lab.dir}/samples/${folder}/index.html`;
  const useFile = fs.existsSync(sourceAbs) ? sourceRel : fallbackRel;
  const html = read(path.join(ROOT, useFile));
  const meta = JSON.parse(read(path.join(ROOT, `${lab.dir}/samples/${folder}/sample.json`)));

  let markup = stripScripts(bodyOf(html));
  markup = unwrapMain(markup);
  markup = removeTopLevelByClass(markup, ['skip-link', 'page-note', 'sample', 'spacer', 'stage', 'is-framed']);
  if (lab.slot !== 'header') {
    markup = removeTopLevelByClass(markup, ['theme', 'theme-fab']);
    markup = removeTopLevelById(markup, ['theme-toggle']);
  } else {
    markup = removeTopLevelById(markup, ['main']);
    markup = ensureThemeHook(markup);
  }
  markup = markup.replace(/\.\.\/\.\.\/assets\//g, '../../shared/assets/').trim();

  let rootInfo = getRoot(markup);
  if (!rootInfo) {
    rootInfo = { tag: 'div', classes: ['nl-slot'], id: null, virtual: true };
    markup = `<div class="nl-slot">${markup}</div>`;
    rootInfo = getRoot(markup);
  }
  markup = setRootAttr(markup, 'data-slot', lab.slot);

  const rawCss = styleBlocks(html);
  const keyframeNames = collectKeyframes(rawCss);
  const keyframes = new Map(keyframeNames.map((n, i) => [n, `nl-${lab.slot}-${i}-${n}`]));
  const scoped = scopeCss(rawCss.replace(/\.\.\/\.\.\/assets\//g, '../../shared/assets/'), {
    slot: lab.slot,
    root: { tag: rootInfo.tag, classes: rootInfo.classes, id: rootInfo.id },
    house: { light: HOUSE_LIGHT, dark: HOUSE_DARK },
    keyframes,
  });

  const bodyScripts = scriptBlocks(bodyOf(html));
  const { kept, dropped } = filterScripts(bodyScripts, lab);
  const js = kept.length ? wrapScript(kept.join('\n\n'), lab.slot) : '';

  const traits = (TRAITS[lab.slot] || {})[folder] || { surface: 'solid', vector: [0, 0, 0], motion: 1, density: 1, summary: 'approved sample' };
  const metrics = {
    markupBytes: Buffer.byteLength(markup),
    cssBytes: Buffer.byteLength(scoped.css),
    jsBytes: Buffer.byteLength(js),
    textChars: textContent(markup).length,
    elements: countElements(markup),
    headings: (markup.match(/<h[1-3]\b/g) || []).length,
    ...cssMetrics(scoped.css),
    cssRulesRaw: cssMetrics(rawCss).rules,
    keyframes: keyframeNames.length,
    hardcodedHex: new Set((scoped.css.match(/#[0-9a-fA-F]{3,8}\b/g) || []).map((s) => s.toLowerCase())).size,
    hasLiteralStack: /system-ui,\s*-apple-system/.test(scoped.css),
  };

  const ids = collectIds(markup);
  const labelledBy = [...markup.matchAll(/aria-labelledby="([^"]+)"/g)].map((m) => m[1]);
  const missingRefs = labelledBy.filter((id) => !ids.includes(id));

  const frag = {
    meta: {
      slot: lab.slot,
      id: meta.id,
      folder,
      name: meta.name || folder,
      source: useFile,
      section_scope: meta.scope || meta.section || lab.slot,
      approved: meta.status || 'approved',
      root: { tag: rootInfo.tag, classes: rootInfo.classes, id: rootInfo.id },
      ids,
      anchors: ids.filter((id) => ['how-it-works', 'financial-clarity', 'why-nestlancer', 'selected-work', 'start', 'main'].includes(id)),
      missingLabelledBy: missingRefs,
      traits,
      metrics,
      droppedScripts: dropped,
      cssDropped: scoped.dropped,
      sha: {
        markup: sha(markup),
        css: sha(scoped.css),
        js: sha(js),
      },
    },
    markup,
    css: `/* ${meta.id} · ${meta.name || folder} — extracted from ${useFile}\n   Scoped to [data-slot="${lab.slot}"]. Lab chrome removed; keyframes namespaced. */\n${scoped.css}\n`,
    js,
  };
  return frag;
}

function buildInventory(extracted) {
  const slots = [];
  const matrix = {};
  let product = 1;
  let total = 0;
  for (const lab of LABS) {
    const samples = lab.ids.map((id) => {
      const folder = lab.folders[id];
      const frag = extracted.find((e) => e.meta.slot === lab.slot && e.meta.folder === folder);
      return {
        id,
        folder,
        name: frag.meta.name,
        source: frag.meta.source,
        root: frag.meta.root,
        trait: frag.meta.traits.surface,
        sha: frag.meta.sha,
      };
    });
    slots.push({ slot: lab.slot, lab: lab.dir, file: lab.file, count: samples.length, samples });
    matrix[lab.slot] = Object.fromEntries(samples.map((s) => [s.id, { folder: s.folder, name: s.name, source: s.source }]));
    product *= samples.length;
    total += samples.length;
  }
  return {
    schema: 'nestlancer.homepage-compositor.inventory/1',
    order: SLOT_ORDER,
    slots,
    counts: Object.fromEntries(slots.map((s) => [s.slot, s.count])),
    product,
    total_samples: total,
    sample_id_matrix: matrix,
    id_namespaces: {
      note: 'The header and footer labs both use the P## family by design; identity is slot-scoped. Codes are unique inside every lab.',
      slot_scoped_ids: slots.flatMap((s) => s.samples.map((x) => `${s.slot}:${x.id}`)),
    },
  };
}

function main() {
  const extracted = [];
  const failures = [];
  for (const lab of LABS) {
    for (const id of lab.ids) {
      const folder = lab.folders[id];
      const dir = path.join(ROOT, lab.dir, 'samples', folder);
      if (!fs.existsSync(dir)) { failures.push(`${lab.slot}/${folder}: missing`); continue; }
      const frag = extractOne(lab, folder);
      if (frag.meta.id !== id) failures.push(`${lab.slot}/${folder}: sample.json id ${frag.meta.id} != ${id}`);
      if (frag.meta.missingLabelledBy.length) failures.push(`${lab.slot}/${folder}: aria-labelledby targets missing -> ${frag.meta.missingLabelledBy.join(',')}`);
      extracted.push(frag);
    }
  }

  const inventory = buildInventory(extracted);
  if (inventory.product !== 21600) failures.push(`product ${inventory.product} != 21600`);
  if (inventory.total_samples !== 29) failures.push(`samples ${inventory.total_samples} != 29`);

  if (check) {
    let drift = 0;
    for (const frag of extracted) {
      const base = path.join(COMPOSITOR, 'fragments', frag.meta.slot, frag.meta.folder);
      for (const [file, content] of [['markup.html', frag.markup], ['styles.css', frag.css], ['script.js', frag.js]]) {
        const p = path.join(base, file);
        const same = fs.existsSync(p) && read(p).replace(/\n$/, '') === content.replace(/\n$/, '');
        if (!same) { drift++; console.error(`drift: ${path.relative(ROOT, p)}`); }
      }
    }
    console.log(drift ? `FRAGMENT DRIFT: ${drift} file(s)` : 'fragments are up to date');
    process.exit(drift || failures.length ? 1 : 0);
  }

  for (const frag of extracted) {
    const base = path.join(COMPOSITOR, 'fragments', frag.meta.slot, frag.meta.folder);
    fs.mkdirSync(base, { recursive: true });
    fs.writeFileSync(path.join(base, 'markup.html'), frag.markup + '\n');
    fs.writeFileSync(path.join(base, 'styles.css'), frag.css);
    fs.writeFileSync(path.join(base, 'script.js'), frag.js);
    fs.writeFileSync(path.join(base, 'meta.json'), JSON.stringify(frag.meta, null, 2) + '\n');
  }

  fs.mkdirSync(path.join(COMPOSITOR, 'shared'), { recursive: true });
  fs.writeFileSync(path.join(COMPOSITOR, 'shared', 'tokens.css'), tokensCss());
  fs.writeFileSync(path.join(COMPOSITOR, 'inventory.json'), JSON.stringify(inventory, null, 2) + '\n');

  // asset copy (once)
  const assetDir = path.join(COMPOSITOR, 'shared', 'assets');
  fs.mkdirSync(assetDir, { recursive: true });
  for (const f of fs.readdirSync(path.join(ROOT, 'assets'))) {
    fs.copyFileSync(path.join(ROOT, 'assets', f), path.join(assetDir, f));
  }
  const workSrc = path.join(ROOT, 'homepage-selected-work', 'assets', 'work');
  if (fs.existsSync(workSrc)) {
    fs.mkdirSync(path.join(assetDir, 'work'), { recursive: true });
    for (const f of fs.readdirSync(workSrc)) fs.copyFileSync(path.join(workSrc, f), path.join(assetDir, 'work', f));
  }

  const bySlot = Object.fromEntries(SLOT_ORDER.map((s) => [s, extracted.filter((e) => e.meta.slot === s).length]));
  console.log(`fragments written: ${extracted.length}/29`);
  console.log(SLOT_ORDER.map((s) => `${s} ${bySlot[s]}`).join(' · '));
  console.log(`product: ${inventory.product}`);
  if (failures.length) {
    console.error('FAILURES:\n' + failures.join('\n'));
    process.exit(1);
  }
  console.log('extract: OK');
}

main();
