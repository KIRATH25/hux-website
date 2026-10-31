// After `next build`: Cloudflare Pages refuses files over 25 MB, so the build fails here instead of at deploy time.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const LIMIT = 25 * 1024 * 1024;
const big = [];
let total = 0;
let files = 0;
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else {
      const size = fs.statSync(p).size;
      total += size;
      files += 1;
      if (size > LIMIT) big.push(`${path.relative(out, p)} (${(size / 1048576).toFixed(1)} MB)`);
    }
  }
})(out);

if (big.length) {
  console.error(`check-out: these files are over Cloudflare's 25 MB limit:\n  ${big.join('\n  ')}`);
  process.exit(1);
}
console.log(`check-out: ${files} files, ${(total / 1048576).toFixed(1)} MB, none over 25 MB`);
