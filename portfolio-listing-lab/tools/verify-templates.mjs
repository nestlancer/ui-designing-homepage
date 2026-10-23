#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_DIR = path.resolve(__dirname, '..');

const BANNED_LEGACY_HEX = [
  '#5265ed', '#4154db', '#6c3cff', '#6232f5', '#ddd0ff',
  '#c9f269', '#ff8c7a', '#ffb4a5', '#ffcf33', '#e24e2a',
  '#ba3718', '#bf3113', '#ad4326', '#c55b3c', '#b29cff', '#85f7a5'
];

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

function parseVarMap(blockBody) {
  const out = {};
  for (const m of blockBody.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim();
  }
  return out;
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

  const rootMatch = clean.match(/:root\s*\{([^}]+)\}/);
  const rootLight = rootMatch ? parseVarMap(rootMatch[1]) : {};

  const darkRootMatch = clean.match(/html\[data-theme="dark"\]\s*\{([^}]+)\}/);
  const rootDark = darkRootMatch ? parseVarMap(darkRootMatch[1]) : {};

  const designThemeVars = { light: {}, dark: {} };
  for (const block of clean.matchAll(/html\[data-theme="(light|dark)"\]\s+body\[data-design="(\d+)"\]\s*\{([^}]+)\}/g)) {
    const theme = block[1];
    const id = Number(block[2]);
    designThemeVars[theme][id] = { ...(designThemeVars[theme][id] || {}), ...parseVarMap(block[3]) };
  }
  for (const block of clean.matchAll(/(?:^|\n)\s*body\[data-design="(\d+)"\]\s*\{([^}]+)\}/g)) {
    const id = Number(block[1]);
    const vars = parseVarMap(block[2]);
    designThemeVars.light[id] = { ...(designThemeVars.light[id] || {}), ...vars };
    designThemeVars.dark[id] = { ...(designThemeVars.dark[id] || {}), ...vars };
  }

  const bannedHits = BANNED_LEGACY_HEX.filter(hex => clean.toLowerCase().includes(hex));

  return {
    relPath,
    balancedBraces: depth === 0,
    keyframes,
    minFontPx: fontSizesPx.length ? Math.min(...fontSizesPx) : null,
    sub11Count: fontSizesPx.filter(px => px < 11).length,
    hasReducedMotion,
    rootLight,
    rootDark,
    designThemeVars,
    bannedHits
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
  if (!/<meta[^>]+name="color-scheme"[^>]+light dark/i.test(html)) issues.push('Missing <meta name="color-scheme" content="light dark">');
  if (!/<title>[^<]+<\/title>/i.test(html)) issues.push('Missing <title>');
  if (!/setAttribute\(['"]data-theme['"]/i.test(html)) issues.push('Missing inline head data-theme boot script');

  for (const hex of BANNED_LEGACY_HEX) {
    if (html.toLowerCase().includes(hex)) issues.push(`Legacy off-brand color ${hex} in ${filename}`);
  }

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
    if (!/id="top-homepages"/.test(html)) issues.push('index.html missing #top-homepages bridge');
    if (!/data-theme-toggle/.test(html)) issues.push('index.html missing [data-theme-toggle]');
    const pCss = cssMeta['assets/picker.css'];
    for (const theme of ['light', 'dark']) {
      const vars = theme === 'dark' ? { ...pCss.rootLight, ...pCss.rootDark } : pCss.rootLight;
      const bg = parseColor(vars['--bg']);
      const surface = blend(parseColor(vars['--surface']), bg);
      const ink = parseColor(vars['--ink']);
      const muted = parseColor(vars['--muted']);
      const teal = parseColor(vars['--teal']);
      const btn = parseColor(vars['--btn']);
      const btnInk = parseColor(vars['--btn-ink']);
      if (contrast(ink, bg) < 4.5) issues.push(`[picker ${theme}] Low --ink on --bg: ${contrast(ink, bg)}:1`);
      if (contrast(muted, bg) < 4.5) issues.push(`[picker ${theme}] Low --muted on --bg: ${contrast(muted, bg)}:1`);
      if (contrast(muted, surface) < 4.5) issues.push(`[picker ${theme}] Low --muted on --surface: ${contrast(muted, surface)}:1`);
      if (contrast(teal, bg) < 4.5) issues.push(`[picker ${theme}] Low --teal on --bg: ${contrast(teal, bg)}:1`);
      if (contrast(btnInk, btn) < 4.5) issues.push(`[picker ${theme}] Low --btn-ink on --btn: ${contrast(btnInk, btn)}:1`);
    }
    return { filename, designId: null, name: 'Picker Gallery + Top 5 Homepages Bridge', ok: issues.length === 0, issues };
  }

  const id = Number(designMatch[1]);
  const designEntry = data.designs.find(d => d.id === id);
  if (!designEntry) issues.push(`No matching design metadata in data.js for data-design="${id}"`);
  if (!/<noscript>[\s\S]*index\.html[\s\S]*<\/noscript>/i.test(html)) issues.push('Missing index.html link in <noscript>');
  if (id === 1 && html.includes('flow-designs.css')) issues.push('design-01.html should not load flow-designs.css');
  if (id >= 2 && !html.includes('assets/flow-designs.css')) issues.push(`${filename} must load assets/flow-designs.css`);

  // Verify WCAG AA contrast in BOTH Light AND Dark themes for this design!
  const dCss = cssMeta['assets/designs.css'];
  const fCss = cssMeta['assets/flow-designs.css'];
  for (const theme of ['light', 'dark']) {
    const baseRoot = theme === 'dark' ? { ...dCss.rootLight, ...dCss.rootDark } : dCss.rootLight;
    const perDesign = id === 1
      ? (dCss.designThemeVars[theme][1] || {})
      : (fCss.designThemeVars[theme][id] || {});
    const vars = { ...baseRoot, ...perDesign };

    const bg = parseColor(vars['--bg']);
    const surface = blend(parseColor(vars['--surface']), bg);
    const muted = parseColor(vars['--muted']);
    const accent = parseColor(vars['--accent']);
    const ink = parseColor(vars['--ink']);
    const btn = parseColor(vars['--btn']);
    const btnInk = parseColor(vars['--button-ink']);

    if (contrast(ink, bg) < 4.5) issues.push(`[${theme}] Low contrast --ink on --bg: ${contrast(ink, bg)}:1`);
    if (contrast(muted, bg) < 4.5) issues.push(`[${theme}] Low contrast --muted on --bg: ${contrast(muted, bg)}:1`);
    if (contrast(muted, surface) < 4.5) issues.push(`[${theme}] Low contrast --muted on --surface: ${contrast(muted, surface)}:1`);
    if (contrast(accent, bg) < 4.5) issues.push(`[${theme}] Low contrast --accent on --bg: ${contrast(accent, bg)}:1`);
    if (contrast(btnInk, btn) < 4.5) issues.push(`[${theme}] Low contrast --button-ink on --btn: ${contrast(btnInk, btn)}:1`);

    if (id === 4) {
      const bInk = parseColor(vars['--bento-ink']);
      const bMuted = parseColor(vars['--bento-muted']);
      const bAcc = parseColor(vars['--bento-accent']);
      for (const k of ['--bento-1', '--bento-2', '--bento-3', '--bento-4']) {
        const bBg = parseColor(vars[k]);
        if (contrast(bInk, bBg) < 4.5) issues.push(`[${theme}] Low contrast --bento-ink on ${k}: ${contrast(bInk, bBg)}:1`);
        if (contrast(bMuted, bBg) < 4.5) issues.push(`[${theme}] Low contrast --bento-muted on ${k}: ${contrast(bMuted, bBg)}:1`);
        if (contrast(bAcc, bBg) < 4.5) issues.push(`[${theme}] Low contrast --bento-accent on ${k}: ${contrast(bAcc, bBg)}:1`);
      }
    } else if (id === 7) {
      const sFill = parseColor(vars['--snake-fill']);
      if (contrast(ink, sFill) < 4.5) issues.push(`[${theme}] Low contrast --ink on --snake-fill: ${contrast(ink, sFill)}:1`);
      if (contrast(muted, sFill) < 4.5) issues.push(`[${theme}] Low contrast --muted on --snake-fill: ${contrast(muted, sFill)}:1`);
    } else {
      const badgeFg = parseColor(vars['--badge-ink'] || '#ffffff');
      if (contrast(badgeFg, accent) < 4.5) issues.push(`[${theme}] Low contrast .featured-badge: ${contrast(badgeFg, accent)}:1`);
    }
  }

  return {
    filename,
    designId: id,
    name: `${designEntry?.name || `Design ${id}`} · ${designEntry?.hpCode || ''}`,
    ok: issues.length === 0,
    issues
  };
}

const data = loadDataset();
const globalIssues = [];

if (data.projects.length !== 108) globalIssues.push(`Expected 108 projects in data.js, got ${data.projects.length}`);
if (data.designs.length !== 10) globalIssues.push(`Expected 10 designs in data.js, got ${data.designs.length}`);
if (!Array.isArray(data.topHomepages) || data.topHomepages.length !== 5) {
  globalIssues.push(`Expected 5 topHomepages in data.js, got ${data.topHomepages?.length}`);
} else {
  for (const hp of data.topHomepages) {
    if (!fs.existsSync(path.join(LAB_DIR, hp.href))) {
      globalIssues.push(`Missing Top-5 Homepage handoff target: ${hp.href}`);
    }
  }
}

for (const p of data.projects) {
  if (/\bIOS\b/.test(p.summary)) globalIssues.push(`Typo "IOS" in project ${p.slug}`);
  if (!fs.existsSync(path.join(LAB_DIR, p.image))) globalIssues.push(`Missing project image ${p.image}`);
}
for (const d of data.designs) {
  const prev = `assets/previews/design-${String(d.id).padStart(2, '0')}.jpg`;
  if (!fs.existsSync(path.join(LAB_DIR, prev))) globalIssues.push(`Missing preview image ${prev}`);
  if (!d.hpCode || !d.hpHref || !fs.existsSync(path.join(LAB_DIR, d.hpHref))) {
    globalIssues.push(`Design ${d.id} missing valid hpCode/hpHref`);
  }
  for (const c of d.colors) {
    if (BANNED_LEGACY_HEX.includes(c.toLowerCase())) {
      globalIssues.push(`Design ${d.id} still has legacy off-brand swatch ${c}`);
    }
  }
}

const cssMeta = {};
for (const rel of ['assets/designs.css', 'assets/flow-designs.css', 'assets/picker.css']) {
  const meta = extractCssMetadata(rel);
  cssMeta[rel] = meta;
  if (!meta.balancedBraces) globalIssues.push(`${rel} has unbalanced braces`);
  if (meta.sub11Count > 0) globalIssues.push(`${rel} has ${meta.sub11Count} font-size declarations < 11px`);
  if (meta.bannedHits.length) globalIssues.push(`${rel} contains banned legacy colors: ${meta.bannedHits.join(', ')}`);
}
if (!cssMeta['assets/designs.css'].hasReducedMotion) {
  globalIssues.push('assets/designs.css missing @media (prefers-reduced-motion: reduce)');
}
if (cssMeta['assets/designs.css'].keyframes.length < 1 || cssMeta['assets/flow-designs.css'].keyframes.length < 5) {
  globalIssues.push('Missing expected @keyframes route/ambient animations');
}

for (const jsRel of ['assets/app.js', 'assets/picker.js']) {
  const jsCode = fs.readFileSync(path.join(LAB_DIR, jsRel), 'utf8');
  try {
    new vm.Script(jsCode, { filename: jsRel });
  } catch (err) {
    globalIssues.push(`Syntax error in ${jsRel}: ${err.message}`);
  }
  for (const hex of BANNED_LEGACY_HEX) {
    if (jsCode.toLowerCase().includes(hex)) globalIssues.push(`${jsRel} contains legacy off-brand color ${hex}`);
  }
}

const appJs = fs.readFileSync(path.join(LAB_DIR, 'assets/app.js'), 'utf8');
for (const token of ['skip-link', 'mobile-nav', 'aria-current="page"', 'data-theme-toggle', 'data-col=', 'ResizeObserver', 'is-image-error']) {
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
console.log(`\nAll ${targets.length} template(s) verified in BOTH Light & Dark themes with 0 errors.`);
