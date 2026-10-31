// Serves the built site (out/) the way a static host does, for testing the real build locally:
// /download/ -> out/download/index.html, unknown paths -> out/404.html with status 404.
// /HUX.apk is answered from ../hux/apk (local testing only; the live site downloads from GitHub Releases).
//   node scripts/serve-out.mjs [port]
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const apkDir = process.env.HUX_APK_DIR || path.resolve(root, '..', 'hux', 'apk');
const port = Number(process.argv[2] || 3100);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.ico': 'image/x-icon', '.apk': 'application/vnd.android.package-archive',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file;
    if (url === '/HUX.apk') {
      const apks = fs.existsSync(apkDir) ? fs.readdirSync(apkDir).filter((f) => f.endsWith('.apk')) : [];
      if (apks.length) file = path.join(apkDir, apks.sort().at(-1));
    } else {
      const p = path.normalize(path.join(out, url));
      if (!p.startsWith(out)) return res.writeHead(400).end();
      if (fs.existsSync(p) && fs.statSync(p).isFile()) file = p;
      else if (fs.existsSync(path.join(p, 'index.html'))) {
        if (!url.endsWith('/')) return res.writeHead(308, { Location: url + '/' }).end();
        file = path.join(p, 'index.html');
      }
    }
    const status = file ? 200 : 404;
    file ??= path.join(out, '404.html');
    const ext = path.extname(file);
    const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Content-Length': fs.statSync(file).size };
    if (url.startsWith('/_next/static/')) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    res.writeHead(status, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, () => console.log(`serving out/ on http://localhost:${port}`));
