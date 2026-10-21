#!/usr/bin/env node
/**
 * Zero-dependency static server for the compositor.
 *
 *   node tools/serve.mjs                  # repo root, port 8125, opens /homepage-compositor/
 *   node tools/serve.mjs --review         # serves homepage-compositor/review/ only
 *   node tools/serve.mjs --port 8001
 *
 * Why it exists: `python3 -m http.server` serves whatever folder you start it in,
 * and the composed pages, the gallery and the hand-off copies each need a
 * different root. This serves the repository root by default, maps `/` to the
 * gallery, and prints the URLs that actually resolve. It also tells you when
 * `pages/` has not been built yet, instead of letting you discover it as 404s.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPOSITOR = path.resolve(__dirname, '..');
const REPO = path.resolve(COMPOSITOR, '..');

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const reviewOnly = argv.includes('--review');
const port = Number(arg('--port', 8125));
const host = arg('--host', '0.0.0.0');
const root = reviewOnly ? path.join(COMPOSITOR, 'review') : REPO;
const prefix = reviewOnly ? '' : '/homepage-compositor';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8',
  '.log': 'text/plain; charset=utf-8',
};

function pagesBuilt() {
  const pages = path.join(COMPOSITOR, 'pages');
  try {
    const first = fs.readdirSync(pages).find((d) => fs.existsSync(path.join(pages, d, 'index.html')));
    return first ? fs.readdirSync(pages, { withFileTypes: true }).filter((d) => d.isDirectory()).length : 0;
  } catch (e) { return 0; }
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-cache' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch (e) { return send(res, 400, 'bad request'); }

  if (pathname === '/') {
    if (reviewOnly) return send(res, 200, fs.readFileSync(path.join(root, 'index.html')), MIME['.html']);
    res.writeHead(302, { location: '/homepage-compositor/' });
    return res.end();
  }

  const file = path.normalize(path.join(root, pathname));
  if (!file.startsWith(root)) return send(res, 403, 'forbidden');

  let target = file;
  try {
    if (fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  } catch (e) { /* fall through to 404 */ }

  fs.readFile(target, (err, buf) => {
    if (err) {
      const hint = pathname.includes('/pages/') && !pagesBuilt()
        ? 'pages/ is generated output and is not in this clone.\nBuild it:  node homepage-compositor/tools/compose.mjs --all\n'
        : '';
      return send(res, 404, `404 ${pathname}\n${hint}`, 'text/plain; charset=utf-8');
    }
    res.writeHead(200, {
      'content-type': MIME[path.extname(target).toLowerCase()] || 'application/octet-stream',
      'content-length': buf.length,
      'cache-control': 'no-cache',
    });
    res.end(buf);
  });
});

server.listen(port, host, () => {
  const built = pagesBuilt();
  const base = `http://127.0.0.1:${port}`;
  const lines = [
    `serving ${root}`,
    `  root        ${base}${reviewOnly ? '/' : '/'}${reviewOnly ? '' : ' → gallery'}`,
  ];
  if (reviewOnly) {
    lines.push(
      `  review      ${base}/`,
      `  top 50      ${base}/top50.html`,
      `  top page    ${base}/top50/${JSON.parse(fs.readFileSync(path.join(COMPOSITOR, 'review', 'summary.json'), 'utf8')).top50[0].combo_id}/index.html`,
    );
  } else {
    lines.push(
      `  gallery     ${base}/homepage-compositor/`,
      `  review      ${base}/homepage-compositor/review/`,
      `  top 50      ${base}/homepage-compositor/review/top50.html`,
      `  a page      ${base}/homepage-compositor/pages/<combo-id>/`,
    );
  }
  lines.push(built
    ? `  pages/      ${built.toLocaleString('en-IN')} folders on disk`
    : `  pages/      NOT BUILT — run: node homepage-compositor/tools/compose.mjs --all`);
  console.log(lines.join('\n'));
  console.log('\nCtrl-C to stop.');
});
