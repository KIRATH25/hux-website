// Turns the app repo's design files into web-ready assets (run once, and again when a source file changes):
//   - merch photos: E:\hux\design\merch\*.png (2000x2500)  -> public/merch/*.webp (800x1000, q80)
//   - logo:         E:\hux\design\logo\*.svg                -> public/brand/ + src/app/icon.svg + src/app/apple-icon.png
//   - screenshots:  public/screens/src/*.png|jpg (from your phone) -> public/screens/*.webp (1080x2400, q82)
// Source repo: HUX_REPO, or ../hux next to this project. Existing outputs are skipped unless the source is newer.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = process.env.HUX_REPO || path.resolve(root, '..', 'hux');
const newer = (src, out) => !fs.existsSync(out) || fs.statSync(src).mtimeMs > fs.statSync(out).mtimeMs;
const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
let made = 0;

// merch
const merchSrc = path.join(repo, 'design', 'merch');
const merchOut = path.join(root, 'public', 'merch');
ensure(merchOut);
if (fs.existsSync(merchSrc)) {
  for (const f of fs.readdirSync(merchSrc).filter((n) => n.endsWith('.png'))) {
    const out = path.join(merchOut, f.replace(/\.png$/, '.webp'));
    if (!newer(path.join(merchSrc, f), out)) continue;
    await sharp(path.join(merchSrc, f)).resize(800, 1000, { fit: 'cover' }).webp({ quality: 80 }).toFile(out);
    made += 1;
  }
} else console.warn(`prepare-assets: ${merchSrc} not found, merch skipped`);

// brand
const brandOut = path.join(root, 'public', 'brand');
ensure(brandOut);
const icon = path.join(repo, 'design', 'logo', 'hux-icon.svg');
const mark = path.join(repo, 'design', 'logo', 'hux-mark-transparent.svg');
for (const [src, name] of [[icon, 'hux-icon.svg'], [mark, 'hux-mark.svg']]) {
  if (fs.existsSync(src) && newer(src, path.join(brandOut, name))) {
    fs.copyFileSync(src, path.join(brandOut, name));
    made += 1;
  }
}
if (fs.existsSync(icon)) {
  const appDir = path.join(root, 'src', 'app');
  if (newer(icon, path.join(appDir, 'icon.svg'))) {
    fs.copyFileSync(icon, path.join(appDir, 'icon.svg'));
    made += 1;
  }
  if (newer(icon, path.join(appDir, 'apple-icon.png'))) {
    await sharp(icon).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));
    made += 1;
  }
  if (newer(icon, path.join(brandOut, 'hux-icon-512.png'))) {
    await sharp(icon).resize(512, 512).png().toFile(path.join(brandOut, 'hux-icon-512.png'));
    made += 1;
  }
}

// screenshots from the phone
const shotsSrc = path.join(root, 'public', 'screens', 'src');
const shotsOut = path.join(root, 'public', 'screens');
if (fs.existsSync(shotsSrc)) {
  for (const f of fs.readdirSync(shotsSrc).filter((n) => /\.(png|jpe?g)$/i.test(n))) {
    const out = path.join(shotsOut, f.replace(/\.(png|jpe?g)$/i, '.webp'));
    if (!newer(path.join(shotsSrc, f), out)) continue;
    await sharp(path.join(shotsSrc, f)).resize(1080, 2400, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(out);
    made += 1;
  }
}

console.log(`prepare-assets: ${made} file(s) written`);
