/**
 * Minimal, dependency-free HTML string utilities used by the compositor.
 *
 * We deliberately do not ship a full DOM implementation: the source samples are
 * machine-generated, well-formed section documents. A tag scanner is enough to
 * locate top-level elements, strip lab chrome and rewrite attributes, and it is
 * fully deterministic.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

/** Read one tag starting at `i` (must point at `<`). Returns {raw, end, name, closing, selfClosing}. */
function readTag(html, i) {
  let j = i + 1;
  let closing = false;
  if (html[j] === '/') { closing = true; j++; }
  const nameStart = j;
  while (j < html.length && /[A-Za-z0-9:-]/.test(html[j])) j++;
  const name = html.slice(nameStart, j).toLowerCase();
  let quote = null;
  let selfClosing = false;
  for (; j < html.length; j++) {
    const ch = html[j];
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '>') {
      selfClosing = html[j - 1] === '/';
      j++;
      break;
    }
  }
  return { raw: html.slice(i, j), end: j, name, closing, selfClosing };
}

/** Strip every <script> element (used before markup extraction). */
export function stripScripts(html) {
  let out = '';
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { out += html.slice(i); break; }
    out += html.slice(i, lt);
    if (html.startsWith('<!--', lt)) {
      const close = html.indexOf('-->', lt + 4);
      i = close === -1 ? html.length : close + 3;
      continue;
    }
    const tag = readTag(html, lt);
    if (!tag.name) { out += html[lt]; i = lt + 1; continue; }
    if (tag.name === 'script' && !tag.closing) {
      const close = html.toLowerCase().indexOf('</script', tag.end);
      if (close === -1) { i = html.length; } else {
        const end = html.indexOf('>', close);
        i = end === -1 ? html.length : end + 1;
      }
      continue;
    }
    out += tag.raw;
    i = tag.end;
  }
  return out;
}

/** Collect script sources (inner text) from a document. */
export function scriptBlocks(html) {
  const blocks = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let m;
  while ((m = re.exec(html))) blocks.push({ attrs: m[1] || '', code: m[2] || '' });
  return blocks;
}

/**
 * List top-level elements of a markup fragment.
 * Text nodes that are not pure whitespace are ignored (samples do not have any).
 */
export function topLevelElements(html) {
  const nodes = [];
  let i = 0;
  let depth = 0;
  let start = -1;
  let startName = '';
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) break;
    if (html.startsWith('<!--', lt)) {
      const close = html.indexOf('-->', lt + 4);
      i = close === -1 ? html.length : close + 3;
      continue;
    }
    if (html.startsWith('<!', lt) || html.startsWith('<?', lt)) {
      const close = html.indexOf('>', lt);
      i = close === -1 ? html.length : close + 1;
      continue;
    }
    const tag = readTag(html, lt);
    if (!tag.name) { i = lt + 1; continue; }
    if (!tag.closing && !tag.selfClosing && !VOID.has(tag.name)) {
      if (depth === 0) { start = lt; startName = tag.name; }
      depth++;
      if (RAW.has(tag.name)) {
        const closeTok = '</' + tag.name;
        const close = html.toLowerCase().indexOf(closeTok, tag.end);
        if (close !== -1) {
          const gt = html.indexOf('>', close);
          const finish = gt === -1 ? html.length : gt + 1;
          if (depth === 1) {
            nodes.push({ tag: startName, start, end: finish, outer: html.slice(start, finish) });
          }
          depth--;
          i = finish;
          continue;
        }
      }
      i = tag.end;
      continue;
    }
    if (tag.closing) {
      depth--;
      if (depth === 0 && start !== -1) {
        nodes.push({ tag: startName, start, end: tag.end, outer: html.slice(start, tag.end) });
        start = -1;
      }
      i = tag.end;
      continue;
    }
    // void / self-closing at depth 0 is a standalone node
    if (depth === 0 && (VOID.has(tag.name) || tag.selfClosing)) {
      nodes.push({ tag: tag.name, start: lt, end: tag.end, outer: html.slice(lt, tag.end) });
    }
    i = tag.end;
  }
  return nodes;
}

/** Parse the attributes of one opening tag into a map (lower-cased names). */
export function tagAttrs(tagRaw) {
  const out = {};
  let end = 1;
  let quote = null;
  for (; end < tagRaw.length; end++) {
    const ch = tagRaw[end];
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '>') break;
  }
  const opening = tagRaw.slice(0, end + 1);
  const body = opening.replace(/^<[^\s/>]+/, '').replace(/\/?>$/, '');
  const re = /([^\s=/>]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m;
  while ((m = re.exec(body))) {
    const name = m[1].toLowerCase();
    if (!name || name === '/') continue;
    out[name] = m[3] !== undefined ? m[3] : m[4] !== undefined ? m[4] : m[5] !== undefined ? m[5] : '';
  }
  return out;
}

export function classesOf(attrs) {
  return (attrs.class || '').split(/\s+/).filter(Boolean);
}

/** Remove top-level elements whose class list contains one of `names`. */
export function removeTopLevelByClass(html, names) {
  const set = new Set(names);
  let out = '';
  let cursor = 0;
  for (const node of topLevelElements(html)) {
    const attrs = tagAttrs(node.outer);
    const cls = classesOf(attrs);
    const hit = cls.some((c) => set.has(c));
    if (hit) {
      out += html.slice(cursor, node.start);
      cursor = node.end;
    }
  }
  out += html.slice(cursor);
  return out;
}

/** Remove top-level elements with an exact id. */
export function removeTopLevelById(html, ids) {
  const set = new Set(ids);
  let out = '';
  let cursor = 0;
  for (const node of topLevelElements(html)) {
    const attrs = tagAttrs(node.outer);
    if (attrs.id && set.has(attrs.id)) {
      out += html.slice(cursor, node.start);
      cursor = node.end;
    }
  }
  out += html.slice(cursor);
  return out;
}

/** Remove a <main> wrapper, keeping its children. */
export function unwrapMain(html) {
  return html
    .replace(/<main\b[^>]*>/gi, '')
    .replace(/<\/main\s*>/gi, '');
}

/** Add or replace an attribute on the first (outermost) tag of the markup. */
export function setRootAttr(markup, name, value) {
  const m = /^\s*<([A-Za-z][A-Za-z0-9:-]*)\b([^>]*)>/.exec(markup);
  if (!m) return markup;
  let attrs = m[2];
  const attrRe = new RegExp('\\b' + name + '\\s*=\\s*("[^"]*"|\'[^\']*\'|[^\\s>]+)', 'i');
  if (attrRe.test(attrs)) {
    attrs = attrs.replace(attrRe, `${name}="${value}"`);
  } else {
    attrs = attrs.replace(/\/\s*$/, '') + ` ${name}="${value}"`;
  }
  return markup.slice(0, m.index) + `<${m[1]}${attrs}>` + markup.slice(m[0].length);
}

export function getRoot(markup) {
  const nodes = topLevelElements(markup);
  if (nodes.length !== 1) return null;
  const attrs = tagAttrs(nodes[0].outer);
  return {
    tag: nodes[0].tag,
    attrs,
    classes: classesOf(attrs),
    id: attrs.id || null,
    outer: nodes[0].outer,
    count: nodes.length,
  };
}

export function collectIds(html) {
  return [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
}

export function textContent(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countElements(html) {
  return (html.match(/<[A-Za-z][A-Za-z0-9:-]*\b/g) || []).length;
}

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
