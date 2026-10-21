#!/usr/bin/env node
/**
 * Live preview server for `rank list.html` and all 50 homepage templates.
 * Serves `rank list.html` at `/` so the live preview opens directly to the
 * interactive UI/UX Review & Rank List while resolving all relative paths
 * (`homepage-compositor/review/top50/...`, `assets/...`, `docs/...`).
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const PORT = Number(process.env.PORT || 8125);
const HOST = '0.0.0.0';

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
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }

  if (pathname === '/') {
    pathname = '/rank list.html';
  }

  const targetPath = path.normalize(path.join(ROOT, pathname));
  if (!targetPath.startsWith(ROOT)) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  let file = targetPath;
  try {
    if (fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }
  } catch {
    // handled by readFile below
  }

  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + pathname);
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'content-type': MIME[ext] || 'application/octet-stream',
      'content-length': buf.length,
      'cache-control': 'no-cache',
    });
    res.end(buf);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Serving Nestlancer UI Review & Rank List at http://${HOST}:${PORT}/`);
});
