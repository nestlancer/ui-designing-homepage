#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_DIR = path.resolve(__dirname, '..');

function parseColor(str, fallback = [255, 255, 255, 1]) {
  if (!str) return fallback;
  const s = str.trim();
  if (s.startsWith('#')) {
    let h = s.slice(1);
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (h.length === 4) h = h.slice(0, 3).split('').map(c => c + c).join('');
    if (h.length >= 6) {
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
        h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
      ];
    }
  }
  const m = s.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*[,/]\s*([0-9.]+))?\s*\)/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] !== undefined ? Number(m[4]) : 1];
  return fallback;
}

function blend(fg, bg) {
  const a = fg[3] ?? 1;
  if (a >= 1) return [fg[0], fg[1], fg[2], 1];
  return [
    Math.round(fg[0] * a + bg[0] * (1 - a)),
    Math.round(fg[1] * a + bg[1] * (1 - a)),
    Math.round(fg[2] * a + bg[2] * (1 - a)),
    1
  ];
}

function luminance([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(c1, c2) {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  return Number(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
}

function extractCssMetadata(relPath) {
  const css = fs.readFileSync(path.join(LAB_DIR, relPath), 'utf8');
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let depth = 0;
  for (const ch of clean) {
    if (ch === '{') depth += 1;
    else if (ch === '}') depth -= 1;
    if (depth < 0) break;
  }
  const keyframes = [...clean.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
  const fontSizesPx = [...clean.matchAll(/font-size\s*:\s*([0-9.]+)px/g)].map(m => Number(m[1]));
  const hasReducedMotion = /prefers-reduced-motion\s*:\s*reduce/.test(clean);

  const rootVars = {};
  const rootMatch = clean.match(/:root\s*\{([^}]+)\}/);
  if (rootMatch) {
    for (const m of rootMatch[1].matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) {
      rootVars[m[1]] = m[2].trim();
    }
  }

  const designVars = {};
  for (const block of clean.matchAll(/body\[data-design="(\d+)"\]\s*\{([^}]+)\}/g)) {
    const id = Number(block[1]);
    designVars[id] = designVars[id] || {};
    for (const m of block[2].matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) {
      designVars[id][m[1]] = m[2].trim();
    }
  }

  return {
    relPath,
    balancedBraces: depth === 0,
    keyframes,
    minFontPx: fontSizesPx.length ? Math.min(...fontSizesPx) : null,
    sub11Count: fontSizesPx.filter(px => px < 11).length,
    hasReducedMotion,
    rootVars,
    designVars
  };
}

function loadDataset() {
  const code = fs.readFileSync(path.join(LAB_DIR, 'assets/data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(code, sandbox);
  return sandbox.window.NESTLANCER_DATA;
}

function verifyHtmlTemplate(filename, data, cssMeta) {
  const issues = [];
  const fullPath = path.join(LAB_DIR, filename);
  if (!fs.existsSync(fullPath)) return { filename, ok: false, issues: ['File does not exist'] };

  const html = fs.readFileSync(fullPath, 'utf8');
  if (!/^<!DOCTYPE html>/i.test(html.trim())) issues.push('Missing <!DOCTYPE html>');
  if (!/<html[^>]+lang="en"/i.test(html)) issues.push('Missing <html lang="en">');
  if (!/<meta[^>]+charset="utf-8"/i.test(html)) issues.push('Missing UTF-8 charset meta');
  if (!/<meta[^>]+name="viewport"[^>]+width=device-width/i.test(html)) issues.push('Missing responsive viewport meta');
  if (!/<title>[^<]+<\/title>/i.test(html)) issues.push('Missing <title>');

  // Verify local linked assets exist
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|#)/.test(ref)) continue;
    if (!fs.existsSync(path.join(LAB_DIR, ref))) {
      issues.push(`Missing referenced asset: ${ref}`);
    }
  }

  const designMatch = html.match(/<body[^>]+data-design="(\d+)"/);
  if (!designMatch) {
    // Picker index.html
    if (!/class="skip-link"/.test(html)) issues.push('index.html missing .skip-link');
    if (!/id="design-gallery"/.test(html)) issues.push('index.html missing #design-gallery mount');
    const pickerCss = cssMeta['assets/picker.css'];
    if (!pickerCss.balancedBraces) issues.push('picker.css has unbalanced braces');
    if (pickerCss.sub11Count > 0) issues.push(`picker.css has ${pickerCss.sub11Count} font-size rules < 11px`);
    return { filename, designId: null, name: 'Picker Gallery', ok: issues.length === 0, issues };
  }

  const id = Number(designMatch[1]);
  const designEntry = data.designs.find(d => d.id === id);
  if (!designEntry) issues.push(`No matching design metadata in data.js for data-design="${id}"`);
  if (!/<meta[^>]+name="color-scheme"/i.test(html)) issues.push('Missing <meta name="color-scheme">');
  if (!/<noscript>[\s\S]*index\.html[\s\S]*<\/noscript>/i.test(html)) issues.push('Missing index.html link in <noscript>');
  if (id === 1 && html.includes('flow-designs.css')) issues.push('design-01.html should not load flow-designs.css');
  if (id >= 2 && !html.includes('assets/flow-designs.css')) issues.push(`${filename} must load assets/flow-designs.css`);

  // Verify CSS & contrast for this design
  const dCss = cssMeta['assets/designs.css'];
  const fCss = cssMeta['assets/flow-designs.css'];
  const vars = {
    ...dCss.rootVars,
    ...(id === 1 ? (dCss.designVars[1] || {}) : (fCss.designVars[id] || {}))
  };
  const bg = parseColor(vars['--bg']);
  const surface = blend(parseColor(vars['--surface']), bg);
  const muted = parseColor(vars['--muted']);
  const accent = parseColor(vars['--accent']);
  const ink = parseColor(vars['--ink']);
  const badgeBg = id === 4 ? [255, 255, 255, 1] : id === 7 ? parseColor('#ffcf33') : accent;
  const badgeFg = parseColor(vars['--badge-ink'] || '#ffffff');

  if (contrast(ink, bg) < 4.5) issues.push(`Low contrast --ink on --bg: ${contrast(ink, bg)}:1`);
  if (contrast(muted, bg) < 4.5) issues.push(`Low contrast --muted on --bg: ${contrast(muted, bg)}:1`);
  if (contrast(muted, surface) < 4.5) issues.push(`Low contrast --muted on --surface: ${contrast(muted, surface)}:1`);
  if (contrast(accent, bg) < 4.5) issues.push(`Low contrast --accent on --bg: ${contrast(accent, bg)}:1`);
  if (contrast(badgeFg, badgeBg) < 4.5) issues.push(`Low contrast .featured-badge: ${contrast(badgeFg, badgeBg)}:1`);

  return {
    filename,
    designId: id,
    name: designEntry?.name || `Design ${id}`,
    ok: issues.length === 0,
    issues
  };
}

const data = loadDataset();
const globalIssues = [];

if (data.projects.length !== 108) globalIssues.push(`Expected 108 projects in data.js, got ${data.projects.length}`);
if (data.designs.length !== 10) globalIssues.push(`Expected 10 designs in data.js, got ${data.designs.length}`);
for (const p of data.projects) {
  if (/\bIOS\b/.test(p.summary)) globalIssues.push(`Typo "IOS" in project ${p.slug}`);
  if (!fs.existsSync(path.join(LAB_DIR, p.image))) globalIssues.push(`Missing project image ${p.image}`);
}
for (const d of data.designs) {
  const prev = `assets/previews/design-${String(d.id).padStart(2, '0')}.jpg`;
  if (!fs.existsSync(path.join(LAB_DIR, prev))) globalIssues.push(`Missing preview image ${prev}`);
}

const cssMeta = {};
for (const rel of ['assets/designs.css', 'assets/flow-designs.css', 'assets/picker.css']) {
  const meta = extractCssMetadata(rel);
  cssMeta[rel] = meta;
  if (!meta.balancedBraces) globalIssues.push(`${rel} has unbalanced braces`);
  if (meta.sub11Count > 0) globalIssues.push(`${rel} has ${meta.sub11Count} font-size declarations < 11px`);
}
if (!cssMeta['assets/designs.css'].hasReducedMotion) {
  globalIssues.push('assets/designs.css missing @media (prefers-reduced-motion: reduce)');
}
if (cssMeta['assets/designs.css'].keyframes.length < 1 || cssMeta['assets/flow-designs.css'].keyframes.length < 5) {
  globalIssues.push('Missing expected @keyframes route/ambient animations');
}

// Verify app.js syntax & key accessibility/geometry hooks
const appJs = fs.readFileSync(path.join(LAB_DIR, 'assets/app.js'), 'utf8');
try {
  new vm.Script(appJs, { filename: 'assets/app.js' });
} catch (err) {
  globalIssues.push(`Syntax error in assets/app.js: ${err.message}`);
}
for (const token of ['skip-link', 'mobile-nav', 'aria-current="page"', 'data-col=', 'ResizeObserver', 'is-image-error']) {
  if (!appJs.includes(token)) globalIssues.push(`assets/app.js missing expected contract: ${token}`);
}

const requested = process.argv.slice(2);
const targets = requested.length
  ? requested.map(arg => path.basename(arg))
  : ['index.html', ...Array.from({ length: 10 }, (_, i) => `design-${String(i + 1).padStart(2, '0')}.html`)];

let failed = globalIssues.length > 0;
if (globalIssues.length) {
  console.error('GLOBAL CHECK FAILURES:');
  for (const issue of globalIssues) console.error(`  - ${issue}`);
}

for (const target of targets) {
  const res = verifyHtmlTemplate(target, data, cssMeta);
  const label = res.designId ? `[${String(res.designId).padStart(2, '0')} · ${res.name}]` : `[${res.name}]`;
  if (res.ok) {
    console.log(`PASS  ${res.filename.padEnd(16)} ${label}`);
  } else {
    failed = true;
    console.error(`FAIL  ${res.filename.padEnd(16)} ${label}`);
    for (const issue of res.issues) console.error(`        * ${issue}`);
  }
}

if (failed) process.exit(1);
console.log(`\nAll ${targets.length} template(s) and shared assets verified with 0 errors.`);
