#!/usr/bin/env node
/**
 * Optional behavioural smoke test — executes real composed pages in a DOM.
 *
 *   npm i --no-save linkedom
 *   node tools/dom-smoke.mjs               # 200 deterministic combos + the spot matrix
 *   node tools/dom-smoke.mjs --limit 3000  # first 3000 canonical combos
 *   node tools/dom-smoke.mjs --all         # every page (slow, ~10 min)
 *
 * There is no browser engine in this sandbox, so this is the closest available
 * behavioural check: linkedom parses the composed page, every local script is
 * inlined and executed against stubbed IntersectionObserver / rAF / localStorage,
 * then the page is asked to do what a visitor would do —
 *
 *   - click the one theme control and expect data-theme to flip (+ aria-pressed)
 *   - open and close the mobile menu
 *   - expect every hero reveal to have run
 *   - expect every count-up to land on its locked figure
 *   - filter the work grid, switch the split-viewer tab
 *
 * Results are written to review/dom-smoke.json. This is a behavioural check,
 * not a layout check: it cannot measure horizontal overflow.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const PAGES = path.join(COMPOSITOR, 'pages');

let parseHTML;
try {
  ({ parseHTML } = await import('linkedom'));
} catch (e) {
  console.error('linkedom is not installed.\n  npm i --no-save linkedom\n  node tools/dom-smoke.mjs');
  process.exit(2);
}

const argv = process.argv.slice(2);
const all = argv.includes('--all');
const limitArg = argv.indexOf('--limit');
const limit = all ? Infinity : limitArg === -1 ? 200 : Number(argv[limitArg + 1]);

const dirs = fs.readdirSync(PAGES).filter((d) => fs.statSync(path.join(PAGES, d)).isDirectory()).sort();
const step = Math.max(1, Math.floor(dirs.length / 200));
const targets = all
  ? dirs
  : [...new Set(Array.from({ length: Math.min(limit, dirs.length) }, (_, k) => dirs[(k * step) % dirs.length]))];

const SPOT = [
  'hdr-P01__hero-H01__del-D01__fin-M01__why-W04__work-S01__cta-C01__ftr-P01',
  'hdr-P02__hero-H03__del-D03__fin-M03__why-W05__work-S02__cta-C03__ftr-P04',
  'hdr-P04__hero-H09__del-D10__fin-M05__why-W04__work-S10__cta-C04__ftr-P05',
  'hdr-P02__hero-H08__del-D06__fin-M04__why-W05__work-S03__cta-C01__ftr-P05',
  'hdr-P01__hero-H07__del-D01__fin-M05__why-W05__work-S01__cta-C01__ftr-P01',
  'hdr-P04__hero-H08__del-D03__fin-M04__why-W05__work-S03__cta-C04__ftr-P04',
];
for (const s of SPOT) if (fs.existsSync(path.join(PAGES, s)) && !targets.includes(s)) targets.push(s);

function hydrate(html) {
  return html.replace(/<script src="\.\.\/\.\.\/([^"]+)"><\/script>/g, (m, rel) => {
    const p = path.join(COMPOSITOR, rel);
    return fs.existsSync(p) ? `<script>/* ${rel} */\n${fs.readFileSync(p, 'utf8')}\n</script>` : '';
  });
}

function boot(html) {
  const { window, document } = parseHTML(html);
  const errors = [];
  const queue = [];
  let clock = 0;
  const store = new Map();
  const IO = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { queue.push(() => this.cb([{ isIntersecting: true, target: el }], this)); }
    unobserve() {}
    disconnect() {}
  };
  const sandbox = {
    document,
    location: { search: '', href: 'http://local/page/', origin: 'http://local', pathname: '/page/' },
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
    IntersectionObserver: IO,
    requestAnimationFrame: (cb) => { queue.push(() => cb((clock += 16))); return queue.length; },
    setTimeout: (fn) => { queue.push(fn); return 0; },
    clearTimeout() {},
    addEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => '' }),
    CSS: { escape: (s) => String(s).replace(/[^\w-]/g, '\\$&') },
    Image: class { set src(v) { this._src = v; if (this.onload) queue.push(() => this.onload()); } get src() { return this._src; } },
    Intl,
    console,
    parent: { postMessage() {} },
    Event: window.Event,
  };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);
  ctx.window = ctx;

  const scripts = [...html.matchAll(/<script(?![^>]*application\/json)(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  for (const code of scripts) {
    if (!code.trim()) continue;
    try { vm.runInContext(code, ctx); } catch (e) { if (errors.length < 4) errors.push('script: ' + e.message); }
  }
  for (let i = 0; i < 8000 && queue.length; i++) {
    const fn = queue.shift();
    try { fn(); } catch (e) { if (errors.length < 4) errors.push('task: ' + e.message); }
  }
  return { window, document, errors };
}

const res = {
  pages: 0,
  scriptErrors: [],
  themeFail: [],
  menuFail: [],
  revealFail: [],
  countFail: [],
  filterFail: [],
  tabFail: [],
};

const started = Date.now();
for (const d of targets) {
  if (!fs.existsSync(path.join(PAGES, d, 'index.html'))) continue;
  const html = hydrate(fs.readFileSync(path.join(PAGES, d, 'index.html'), 'utf8'));
  const { window, document, errors } = boot(html);
  res.pages++;
  if (errors.length) res.scriptErrors.push([d, errors.slice(0, 3)]);

  const root = document.documentElement;
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const before = root.getAttribute('data-theme');
  if (toggles.length !== 1) res.themeFail.push([d, 'controls=' + toggles.length]);
  else {
    toggles[0].dispatchEvent(new window.Event('click'));
    const after = root.getAttribute('data-theme');
    if (after === before || after !== (before === 'dark' ? 'light' : 'dark')) res.themeFail.push([d, `${before}->${after}`]);
    else if (toggles[0].getAttribute('aria-pressed') !== String(after === 'dark')) res.themeFail.push([d, 'aria-pressed']);
  }

  const btn = document.querySelector('[data-slot="header"] .nav__toggle');
  if (btn) {
    const id = btn.getAttribute('aria-controls');
    const panel = id ? document.getElementById(id) : null;
    if (panel) {
      btn.dispatchEvent(new window.Event('click'));
      if (btn.getAttribute('aria-expanded') !== 'true' || panel.hidden) res.menuFail.push([d, 'open']);
      btn.dispatchEvent(new window.Event('click'));
      if (btn.getAttribute('aria-expanded') !== 'false' || !panel.hidden) res.menuFail.push([d, 'close']);
    }
  }

  const heroReveals = [...document.querySelectorAll('[data-slot="hero"] [data-reveal], [data-slot="hero"] .reveal')];
  const stuck = heroReveals.filter((el) => !el.classList.contains('is-in') && !el.classList.contains('in'));
  if (stuck.length) res.revealFail.push([d, `${stuck.length}/${heroReveals.length}`]);

  const counters = [...document.querySelectorAll('[data-count]')];
  const wrong = counters.filter((el) => el.textContent.replace(/[^\d]/g, '') !== String(Number(el.getAttribute('data-count'))));
  if (wrong.length) res.countFail.push([d, `${wrong.length}/${counters.length}`, wrong[0].textContent, wrong[0].getAttribute('data-count')]);

  const chips = [...document.querySelectorAll('[data-slot="work"] [data-filter]')];
  if (chips.length) {
    const chip = chips.find((c) => c.getAttribute('data-filter') === 'mobile');
    if (chip) {
      chip.dispatchEvent(new window.Event('click'));
      const visible = [...document.querySelectorAll('[data-slot="work"] .card')].filter((c) => !c.hidden && c.style.display !== 'none');
      if (chip.getAttribute('aria-pressed') !== 'true' || (visible.length && visible.length !== 2)) {
        res.filterFail.push([d, `pressed=${chip.getAttribute('aria-pressed')} visible=${visible.length}`]);
      }
    }
  }

  const rows = [...document.querySelectorAll('[data-slot="work"] .row[role="tab"]')];
  if (rows.length > 1) {
    const title = document.querySelector('[data-slot="work"] #pv-title');
    if (title) {
      const t0 = title.textContent;
      rows[1].dispatchEvent(new window.Event('click'));
      if (!title.textContent || title.textContent === t0) res.tabFail.push([d, 'title unchanged']);
    }
  }
}

const seconds = (Date.now() - started) / 1000;
const report = {
  tool: 'tools/dom-smoke.mjs',
  dom: 'linkedom (no layout engine)',
  pages_executed: res.pages,
  seconds: Math.round(seconds * 10) / 10,
  failures: {
    script_errors: res.scriptErrors.length,
    theme_toggle: res.themeFail.length,
    mobile_menu: res.menuFail.length,
    hero_reveal: res.revealFail.length,
    count_up: res.countFail.length,
    work_filter: res.filterFail.length,
    work_tabs: res.tabFail.length,
  },
  examples: {
    script_errors: res.scriptErrors.slice(0, 5),
    theme_toggle: res.themeFail.slice(0, 5),
    mobile_menu: res.menuFail.slice(0, 5),
    hero_reveal: res.revealFail.slice(0, 5),
    count_up: res.countFail.slice(0, 5),
    work_filter: res.filterFail.slice(0, 5),
    work_tabs: res.tabFail.slice(0, 5),
  },
  gate: Object.values({
    script_errors: res.scriptErrors.length,
    theme_toggle: res.themeFail.length,
    mobile_menu: res.menuFail.length,
    hero_reveal: res.revealFail.length,
    count_up: res.countFail.length,
    work_filter: res.filterFail.length,
    work_tabs: res.tabFail.length,
  }).every((n) => n === 0) ? 'PASS' : 'FAIL',
};

fs.mkdirSync(path.join(COMPOSITOR, 'review'), { recursive: true });
fs.writeFileSync(path.join(COMPOSITOR, 'review', 'dom-smoke.json'), JSON.stringify(report, null, 2) + '\n');

console.log('## DOM SMOKE (' + report.dom + ')');
console.log(`pages executed: ${res.pages} in ${report.seconds}s`);
for (const [k, v] of Object.entries(report.failures)) console.log(`  ${k}: ${v === 0 ? 'PASS' : 'FAIL (' + v + ')'}`);
console.log(`Gate: ${report.gate}`);
if (report.gate === 'FAIL') {
  console.log(JSON.stringify(report.examples, null, 1).slice(0, 3000));
  process.exit(1);
}
