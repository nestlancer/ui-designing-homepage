/**
 * Deterministic CSS scoping for the Nestlancer homepage compositor.
 *
 * Every shortlist sample was written as a mini-document: its selectors assume
 * they own the page and its :root block re-declares the whole palette. Composing
 * eight of them into one document therefore needs:
 *
 *   1. a slot scope  -> every selector becomes `[data-slot="hero"] …`
 *   2. token handling -> :root blocks are diffed against shared/tokens.css and
 *      re-emitted scoped to the slot only when the sample genuinely differs
 *   3. keyframe renaming -> `ping` in a hero can never animate a money panel
 *   4. lab-chrome removal -> theme fabs, framed-preview rules, skip links
 *
 * The scoper is intentionally conservative: it drops a rule only when the rule
 * targets lab chrome or a page-level global that the shell already provides.
 */

const CHROME_CLASSES = new Set(['theme-fab', 'theme', 'skip-link', 'page-note', 'sample', 'spacer', 'stage', 'is-framed']);
const CHROME_IDS = new Set(['theme-toggle']);
const PAGE_GLOBALS = new Set(['main']);

function matchBrace(css, openIndex) {
  let depth = 0;
  let quote = null;
  for (let i = openIndex; i < css.length; i++) {
    const ch = css[i];
    if (quote) {
      if (ch === '\\') { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 1;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return css.length - 1;
}

export function parseBlocks(css) {
  const out = [];
  let i = 0;
  let buf = '';
  while (i < css.length) {
    const ch = css[i];
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 2;
      buf += ' ';
      continue;
    }
    if (ch === '"' || ch === "'") {
      const q = ch;
      let j = i + 1;
      while (j < css.length && css[j] !== q) { if (css[j] === '\\') j++; j++; }
      buf += css.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === '{') {
      const end = matchBrace(css, i);
      out.push({ type: 'block', prelude: buf.trim(), body: css.slice(i + 1, end) });
      buf = '';
      i = end + 1;
      continue;
    }
    if (ch === ';') {
      const prelude = buf.trim();
      if (prelude) out.push({ type: 'statement', prelude });
      buf = '';
      i++;
      continue;
    }
    buf += ch;
    i++;
  }
  if (buf.trim()) out.push({ type: 'statement', prelude: buf.trim() });
  return out;
}

export function parseDeclarations(body) {
  const decls = [];
  let buf = '';
  let quote = null;
  let paren = 0;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (quote) {
      buf += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; buf += ch; continue; }
    if (ch === '/' && body[i + 1] === '*') {
      const end = body.indexOf('*/', i + 2);
      i = end === -1 ? body.length : end + 1;
      continue;
    }
    if (ch === '(') paren++;
    if (ch === ')') paren = Math.max(0, paren - 1);
    if (ch === ';' && paren === 0) {
      if (buf.trim()) decls.push(buf.trim());
      buf = '';
      continue;
    }
    buf += ch;
  }
  if (buf.trim()) decls.push(buf.trim());
  return decls;
}

export function declarationMap(body) {
  const map = new Map();
  for (const decl of parseDeclarations(body)) {
    const idx = decl.indexOf(':');
    if (idx === -1) continue;
    const prop = decl.slice(0, idx).trim().toLowerCase();
    const value = decl.slice(idx + 1).trim().replace(/\s+/g, ' ');
    map.set(prop, value);
  }
  return map;
}

function splitSelectorList(selector) {
  const parts = [];
  let buf = '';
  let depth = 0;
  let quote = null;
  for (let i = 0; i < selector.length; i++) {
    const ch = selector[i];
    if (quote) { buf += ch; if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; buf += ch; continue; }
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { parts.push(buf.trim()); buf = ''; continue; }
    buf += ch;
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts;
}

/**
 * Is this selector a lab-chrome control?
 * Chrome classes are matched anywhere in the selector: `[data-theme="dark"]
 * #theme-toggle .i-moon` still targets a removed control.
 */
function isChromeSelector(sel) {
  const classes = [...sel.matchAll(/\.([-\w]+)/g)].map((m) => m[1]);
  if (classes.some((c) => CHROME_CLASSES.has(c))) return true;
  const ids = [...sel.matchAll(/#([-\w]+)/g)].map((m) => m[1]);
  if (ids.some((id) => CHROME_IDS.has(id))) return true;
  if (/\bdata-theme-toggle\b/.test(sel)) return true;
  return false;
}

const TAG_RE = /^[a-zA-Z][\w-]*/;

/**
 * Rewrite one selector so it can only match inside `[data-slot="<slot>"]`.
 * Returns null when the rule should be dropped.
 */
function scopeSelector(sel, ctx) {
  let s = sel.trim().replace(/\s+/g, ' ');
  if (!s) return null;
  if (s.includes('::selection')) return null;
  if (isChromeSelector(s)) return null;

  const ancestors = [];
  let themeDark = false;
  let rootMatched = false;

  // Peel page-level context that lives on <html> or on <body>.
  for (let guard = 0; guard < 12; guard++) {
    s = s.trim();
    if (!s) break;
    let m;
    if ((m = /^:root(?![\w-])/i.exec(s))) { s = s.slice(m[0].length); rootMatched = true; continue; }
    if ((m = /^html(?![\w-])/i.exec(s))) { s = s.slice(m[0].length); continue; }
    if ((m = /^body(?![\w-])/i.exec(s))) { s = s.slice(m[0].length); rootMatched = true; continue; }
    if ((m = /^\[data-theme\s*=\s*(["']?)dark\1\s*\]/i.exec(s))) { themeDark = true; s = s.slice(m[0].length); continue; }
    if ((m = /^\.js(?![\w-])/.exec(s))) { ancestors.push('.js'); s = s.slice(m[0].length); continue; }
    if ((m = /^\.is-scrolled(?![\w-])/.exec(s))) { ancestors.push('.is-scrolled'); s = s.slice(m[0].length); continue; }
    break;
  }

  if (!s.trim()) {
    // pure :root / body / html rule -> the slot root itself
    if (!rootMatched) return null;
    return withSlot(ctx, ancestors, themeDark, '');
  }

  s = s.trim();
  if (PAGE_GLOBALS.has(s)) return null;

  // `*`, `*,*::before` etc. — apply the reset to the slot subtree only.
  if (/^\*(\s*,\s*\*[\w:-]*)*$/.test(s) || /^\*::?(before|after)/.test(s)) {
    const pieces = s.split(',').map((p) => p.trim()).filter(Boolean);
    return pieces
      .map((p) => withSlot(ctx, ancestors, themeDark, p === '*' ? '' : p))
      .join(', ');
  }

  const scoped = matchRootCompound(s, ctx);
  if (scoped) {
    const p = prefix(ctx, ancestors, themeDark);
    return (p ? p + ' ' : '') + scoped;
  }
  return withSlot(ctx, ancestors, themeDark, s);
}

function slotSel(ctx) {
  return `[data-slot="${ctx.slot}"]`;
}

function prefix(ctx, ancestors, themeDark) {
  let out = '';
  if (themeDark) out += '[data-theme="dark"]';
  out += ancestors.map((a) => a).join('');
  return out;
}

/** prefix + required slot scope, joined without stray spaces */
function withSlot(ctx, ancestors, themeDark, tail) {
  const p = prefix(ctx, ancestors, themeDark);
  return (p ? p + ' ' : '') + slotSel(ctx) + (tail ? ' ' + tail : '');
}

/**
 * If the first compound of the selector describes the fragment's own root
 * element (e.g. `.nav` for a <header class="nav">), replace that compound with
 * the slot scope instead of nesting it one level deeper.
 */
function matchRootCompound(s, ctx) {
  const firstMatch = /^([^\s>+~]+)([\s>+~][\s\S]*)?$/.exec(s);
  if (!firstMatch) return null;
  const compound = firstMatch[1];
  const rest = firstMatch[2] || '';
  const root = ctx.root;
  if (!root) return null;

  let remaining = compound;
  let matched = false;

  const tagMatch = TAG_RE.exec(remaining);
  if (tagMatch && tagMatch[0].toLowerCase() === root.tag) {
    remaining = remaining.slice(tagMatch[0].length);
    matched = true;
  }
  for (const cls of root.classes) {
    const re = new RegExp('\\.' + cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w-])');
    if (re.test(remaining)) {
      remaining = remaining.replace(re, '');
      matched = true;
    }
  }
  if (root.id) {
    const re = new RegExp('#' + root.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w-])');
    if (re.test(remaining)) {
      remaining = remaining.replace(re, '');
      matched = true;
    }
  }
  if (!matched) return null;
  if (/^[.#]/.test(remaining) && compound.startsWith(remaining)) {
    // a class/id that is not part of the root stayed at the front — cannot happen
  }
  return slotSel(ctx) + remaining + rest;
}

/** Replace animation-name references after keyframes are namespaced. */
function renameKeyframesInDeclarations(body, map) {
  if (!map.size) return body;
  let out = body;
  for (const [from, to] of map) {
    const re = new RegExp('(animation(?:-name)?\\s*:[^;}]*?)\\b' + from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g');
    out = out.replace(re, (m, head) => head + to);
  }
  return out;
}

export function collectKeyframes(css) {
  const names = [];
  const re = /@(?:-webkit-)?keyframes\s+([-\w]+)/g;
  let m;
  while ((m = re.exec(css))) names.push(m[1]);
  return [...new Set(names)];
}

function renameKeyframeSteps(body, map) {
  // step selectors (from/to/%) are not scoped — only the name changes
  return body;
}

/**
 * Main entry.
 * @param {string} css raw <style> content
 * @param {{slot:string, root:object|null, house:object, keyframes:Map<string,string>}} ctx
 */
export function scopeCss(css, ctx) {
  const kfMap = ctx.keyframes || new Map();
  const dropped = [];

  function processRules(source) {
    const blocks = parseBlocks(source);
    const out = [];
    for (const block of blocks) {
      if (block.type === 'statement') {
        const p = block.prelude.trim();
        if (!p || /^@(charset|import)\b/i.test(p)) continue;
        out.push(p + ';');
        continue;
      }
      const prelude = block.prelude.trim();
      if (!prelude) continue;

      if (prelude.startsWith('@')) {
        const name = (/^@([-\w]+)/.exec(prelude) || [, ''])[1].toLowerCase();
        if (['media', 'supports', 'layer', 'container', 'document'].includes(name)) {
          const inner = processRules(block.body);
          if (inner.trim()) out.push(`${prelude}{${inner}}`);
          continue;
        }
        if (name === 'keyframes' || name === '-webkit-keyframes') {
          const kname = prelude.replace(/^@[-\w]+\s+/, '').trim();
          const newName = kfMap.get(kname) || kname;
          out.push(`@keyframes ${newName}{${block.body.trim()}}`);
          continue;
        }
        if (['font-face', 'property', 'page', 'counter-style', 'font-feature-values', 'layer'].includes(name)) {
          out.push(`${prelude}{${block.body}}`);
          continue;
        }
        out.push(`${prelude}{${block.body}}`);
        continue;
      }

      // Token blocks -> diff against shared tokens, scope only real differences.
      if (isTokenSelector(prelude)) {
        const normalized = prelude.replace(/\s+/g, '').replace(/'/g, '"');
        const dark = /data-theme/.test(normalized);
        const houseMap = dark ? ctx.house.dark : ctx.house.light;
        const map = declarationMap(block.body);
        const diff = [];
        for (const [prop, value] of map) {
          const houseValue = houseMap.get(prop);
          if (houseValue === undefined || normalizeValue(houseValue) !== normalizeValue(value)) {
            diff.push(`${prop}:${value}`);
          }
        }
        if (!diff.length) { dropped.push(prelude + ' (identical to shared tokens)'); continue; }
        const target = dark
          ? `[data-theme="dark"] [data-slot="${ctx.slot}"]`
          : `[data-slot="${ctx.slot}"]`;
        out.push(`${target}{${diff.join(';')}}`);
        continue;
      }

      const selector = splitSelectorList(prelude)
        .map((s) => scopeSelector(s, ctx))
        .filter(Boolean)
        .join(', ');
      if (!selector) { dropped.push(prelude); continue; }

      let rawDecls = block.body.trim();
      if (isDocumentSelectorList(prelude)) {
        // A sample's `body{background:var(--bg)}` must not paint the slot root:
        // on a composed page the shell owns the page background, and painting a
        // sticky header wrapper (P04) would cover the content beneath it.
        rawDecls = stripDocumentBackground(parseDeclarations(rawDecls)).join(';');
      }
      const body = renameKeyframesInDeclarations(rawDecls, kfMap);
      if (!body) continue;
      out.push(`${selector}{${body}}`);
    }
    return out.join('\n');
  }

  const scoped = processRules(css);
  return { css: scoped, dropped };
}

/** True when every component targets the document root (html/body). */
function isDocumentSelectorList(prelude) {
  const parts = splitSelectorList(prelude);
  if (!parts.length) return false;
  return parts.every((p) => /^(?:html|body)(?:\.[-\w]+)*(?:\[[^\]]*\])?$/.test(p.trim()));
}

function stripDocumentBackground(decls) {
  return decls.filter((d) => {
    const prop = d.slice(0, d.indexOf(':')).trim().toLowerCase();
    return prop !== 'background' && prop !== 'background-color' && prop !== 'background-image' && prop !== 'color-scheme';
  });
}

function isTokenSelector(prelude) {
  const s = prelude.replace(/\s+/g, '');
  return s === ':root' || s === ':root[data-theme=dark]' || s === ':root[data-theme="dark"]' || s === '[data-theme=dark]' || s === '[data-theme="dark"]';
}

function normalizeValue(v) {
  return String(v).replace(/\s+/g, ' ').trim().toLowerCase();
}

/** Lightweight metrics used by the review pass. */
export function cssMetrics(css) {
  const rules = (css.match(/\{/g) || []).length;
  const media = (css.match(/@media/g) || []).length;
  const keyframes = (css.match(/@keyframes/g) || []).length;
  const infinite = (css.match(/animation:[^;}]*\binfinite\b/g) || []).length;
  const reduced = /prefers-reduced-motion/.test(css);
  const fontSizes = new Set([...css.matchAll(/(?:^|[;{])\s*font-size\s*:\s*([^;}]+)/g)].map((m) => m[1].trim()));
  const radii = new Set([...css.matchAll(/border-radius\s*:\s*([^;}]+)/g)].map((m) => m[1].trim()));
  const pxWidths = [...css.matchAll(/\b(?:width|min-width|max-width)\s*:\s*(\d{3,4})px/g)].map((m) => Number(m[1]));
  const fluid = /clamp\(|minmax\(|auto-fit|auto-fill|\bmin\(|\bmax\(/.test(css);
  return {
    rules,
    media,
    keyframes,
    infinite,
    reduced,
    fontSizeCount: fontSizes.size,
    radiusCount: radii.size,
    maxFixedWidth: pxWidths.length ? Math.max(...pxWidths) : 0,
    fluid,
  };
}
