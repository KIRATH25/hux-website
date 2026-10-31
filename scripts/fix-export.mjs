// After `next build` (static export): Next 16.4 writes link-prefetch payloads as  <page>/__next.<page>/__PAGE__.txt
// but the browser asks for                                                       <page>/__next.<page>.__PAGE__.txt
// so every prefetch of an inner page 404s on a static host (links still work, but the console fills with errors).
// This copies each such file to the flat name the browser requests. Works the same on any static host (Cloudflare Pages).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
let made = 0;

function flatten(segmentDir, prefix, parent) {
  for (const entry of fs.readdirSync(segmentDir, { withFileTypes: true })) {
    const p = path.join(segmentDir, entry.name);
    if (entry.isDirectory()) flatten(p, `${prefix}.${entry.name}`, parent);
    else if (entry.name.endsWith('.txt')) {
      const target = path.join(parent, `${prefix}.${entry.name}`);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(p, target);
        made += 1;
      }
    }
  }
}

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === '_next') continue;
    const p = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) flatten(p, entry.name, dir);
    else walk(p);
  }
})(out);

console.log(`fix-export: ${made} prefetch file(s) added at the paths the browser requests`);
