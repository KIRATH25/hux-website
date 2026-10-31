// Captures REAL screenshots of the HUX app's signed-out screens (onboarding and GLA sign-up) from its web version.
// No account and no data are involved, so nothing on them is made up. Signed-in screens (Home, Listing, Pay seller,
// Chat, Points) have to come from a phone.
//   1. in E:\hux:  npm run web          (Expo web on http://localhost:8081)
//   2. here:       node scripts/capture-app.mjs
//   3. here:       npm run assets       (-> public/screens/*.webp, 1080x2400)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.argv[2] || 'http://localhost:8081').replace(/\/$/, '');
const out = path.join(root, 'public', 'screens', 'src');
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const ctx = await browser.newContext({
  viewport: { width: 360, height: 800 }, // 20:9; x3 = 1080x2400
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
  colorScheme: 'light',
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));

async function shot(route, file, after) {
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2500);
  if (after) await after();
  const url = new URL(page.url()).pathname;
  await page.screenshot({ path: path.join(out, file) });
  console.log(`${file}  <- ${url}`);
}

try {
  await shot('/onboarding/1', 'onboarding-1.png');
  await shot('/onboarding/2', 'onboarding-2.png');
  await shot('/onboarding/3', 'onboarding-3.png');
  await shot('/auth/login', 'signup.png', async () => {
    await page.getByText('Register with @gla.ac.in').click();
    await page.waitForTimeout(800);
  });
} finally {
  await browser.close();
}
if (errors.length) console.log('page errors:', errors.slice(0, 3).join(' | '));
