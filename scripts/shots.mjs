// Screenshots and checks against the running site (npm run dev, or a static server on out/).
//   node scripts/shots.mjs [phase] [baseUrl]
// Saves full-page screenshots per width into qa/<phase>/, checks there is no horizontal overflow, and drives the
// download button as an Android phone, an Instagram in-app browser, an iPhone and a desktop computer.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import jsQR from 'jsqr';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const phase = process.argv[2] || 'phase1';
const base = (process.argv[3] || 'http://localhost:3000').replace(/\/$/, '');
const pages = (process.env.PAGES || '/').split(',');
const widths = (process.env.WIDTHS || '390,1440').split(',').map(Number);
const out = path.join(root, 'qa', phase);
fs.mkdirSync(out, { recursive: true });

const UA = {
  android: 'Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
  instagram: 'Mozilla/5.0 (Linux; Android 14; RMX3741 Build/UP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.58 Mobile Safari/537.36 Instagram 352.0.0.38.100 Android',
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1',
};
const mobile = (ua) => ({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: ua });

const results = [];
const note = (ok, name, detail = '') => {
  results.push({ ok, name, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`);
};

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const errors = [];
const watch = (page, label) => {
  page.on('pageerror', (e) => errors.push(`${label}: ${e.message}`));
  page.on('console', (m) => m.type() === 'error' && errors.push(`${label} console: ${m.text().slice(0, 200)}`));
};
const settle = async (page) => {
  await page.waitForLoadState('networkidle').catch(() => {});
  // reveal everything (scroll to the bottom and back) so full-page shots show the final state
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(1300);
};

try {
  // 1. full pages at each width + overflow
  for (const p of pages) {
    for (const w of widths) {
      const ctx = await browser.newContext(w < 768 ? { ...mobile(UA.android), viewport: { width: w, height: 844 } } : { viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      watch(page, `${p}@${w}`);
      await page.goto(base + p, { waitUntil: 'domcontentloaded' });
      await settle(page);
      const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
      note(sw <= iw, `no horizontal overflow ${p} @ ${w}px`, `scrollWidth ${sw} / innerWidth ${iw}`);
      const name = `${(p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-|-$/g, ''))}-${w}.png`;
      await page.screenshot({ path: path.join(out, name), fullPage: true });
      await ctx.close();
    }
  }

  if (process.env.SKIP_DOWNLOAD !== '1') {
    // 2. Android Chrome: real download + install sheet
    {
      const ctx = await browser.newContext({ ...mobile(UA.android), acceptDownloads: true });
      const page = await ctx.newPage();
      watch(page, 'android');
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      const btn = page.getByRole('link', { name: /Download for Android/ }).first();
      const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), btn.click()]);
      note(dl.suggestedFilename() === 'HUX.apk', 'Android: tapping Download starts a download of HUX.apk', dl.suggestedFilename());
      const tmp = path.join(out, '_download.apk');
      await dl.saveAs(tmp);
      const size = fs.statSync(tmp).size;
      fs.rmSync(tmp);
      note(size > 50e6, 'Android: the downloaded file is the real APK', `${(size / 1e6).toFixed(1)} MB`);
      const sheet = page.getByRole('dialog', { name: 'Download started' });
      await sheet.waitFor({ timeout: 3000 }).catch(() => {});
      note(await sheet.isVisible(), 'Android: the "Download started" sheet opens after the tap');
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(out, 'android-download-started.png') });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      note(!(await sheet.isVisible()), 'Android: Esc closes the sheet');
      await ctx.close();
    }
    // 3. Instagram in-app browser
    {
      const ctx = await browser.newContext({ ...mobile(UA.instagram), acceptDownloads: true });
      const page = await ctx.newPage();
      watch(page, 'instagram');
      let downloaded = false;
      page.on('download', () => (downloaded = true));
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      await page.getByRole('link', { name: /Download for Android/ }).first().click();
      const sheet = page.getByRole('dialog', { name: /Open this page in Chrome/ });
      await sheet.waitFor({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
      note((await sheet.isVisible()) && !downloaded, 'Instagram in-app browser: "Open in Chrome" sheet, no download attempt');
      await page.screenshot({ path: path.join(out, 'instagram-open-in-chrome.png') });
      await ctx.close();
    }
    // 4. iPhone
    {
      const ctx = await browser.newContext(mobile(UA.iphone));
      const page = await ctx.newPage();
      watch(page, 'iphone');
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const apkLinks = await page.locator(`a[href$=".apk"]`).count();
      const soon = await page.getByRole('button', { name: /iPhone version coming soon/ }).count();
      note(apkLinks === 0 && soon > 0, 'iPhone: no APK link anywhere, "iPhone version coming soon" shown', `${apkLinks} apk links, ${soon} buttons`);
      await page.screenshot({ path: path.join(out, 'iphone-hero.png') });
      await page.getByRole('button', { name: /iPhone version coming soon/ }).first().click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(out, 'iphone-sheet.png') });
      await ctx.close();
    }
    // 5. desktop: QR modal, and the QR really decodes to /download
    {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      watch(page, 'desktop');
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      await page.getByRole('link', { name: /Download for Android/ }).first().click();
      const modal = page.getByRole('dialog', { name: /Get HUX on your phone/ });
      await modal.waitFor({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(500);
      note(await modal.isVisible(), 'Desktop: Download opens the QR modal');
      await page.screenshot({ path: path.join(out, 'desktop-qr-modal.png') });
      const svg = await modal.locator('svg[aria-label^="QR code"]').evaluate((n) => n.outerHTML);
      const { data, info } = await sharp(Buffer.from(svg)).resize(600, 600).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);
      note(Boolean(decoded && /\/download\/?$/.test(decoded.data)), 'Desktop: the QR code (with the logo) scans to /download', decoded ? decoded.data : 'not readable');
      // focus trap: Tab stays inside
      for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => Boolean(document.activeElement && document.activeElement.closest('[role="dialog"]')));
      note(inside, 'Desktop: keyboard focus stays inside the modal');
      await ctx.close();
    }
  }
} finally {
  await browser.close();
}

note(errors.length === 0, 'no page errors', errors.slice(0, 5).join(' | '));
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} passed, ${failed} failed  ->  ${path.relative(root, out)}`);
process.exit(failed ? 1 : 0);
