// Local preview only: copies the newest APK from the app repo into public/HUX.apk so the Download button works on
// this computer (and on a phone on the same Wi-Fi). `remove` deletes it again before a build: the file is 98 MB and
// Cloudflare Pages refuses anything over 25 MB, so the live site downloads from GitHub Releases instead.
//
//   node scripts/apk.mjs copy     (runs before `npm run dev`)
//   node scripts/apk.mjs remove   (runs before `npm run build`)
//
// Source folder: HUX_APK_DIR, or ../hux/apk next to this project.
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'public', 'HUX.apk');
const sourceDir = process.env.HUX_APK_DIR || path.resolve(root, '..', 'hux', 'apk');
const mode = process.argv[2];

if (mode === 'remove') {
  if (fs.existsSync(target)) {
    fs.rmSync(target);
    console.log('apk: removed public/HUX.apk (never deployed; the live site uses NEXT_PUBLIC_APK_URL)');
  }
  process.exit(0);
}

if (mode !== 'copy') {
  console.error('usage: node scripts/apk.mjs copy|remove');
  process.exit(2);
}

const apks = fs.existsSync(sourceDir)
  ? fs.readdirSync(sourceDir).filter((f) => f.toLowerCase().endsWith('.apk')).map((f) => path.join(sourceDir, f))
  : [];
if (apks.length === 0) {
  console.warn(`apk: no .apk found in ${sourceDir}. The Download button will 404 locally until one is there.`);
  process.exit(0);
}
const newest = apks.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
const fresh = !fs.existsSync(target) || fs.statSync(target).size !== fs.statSync(newest).size || fs.statSync(target).mtimeMs < fs.statSync(newest).mtimeMs;
if (fresh) fs.copyFileSync(newest, target);
const bytes = fs.statSync(target).size;
const sha = createHash('sha256').update(fs.readFileSync(target)).digest('hex');
console.log(`apk: public/HUX.apk <- ${path.basename(newest)} (${(bytes / 1e6).toFixed(1)} MB, sha256 ${sha.slice(0, 12)}…)`);
console.log('apk: if this is a new build, update version / sizeMB / sha256 / updated in src/config/site.ts');
