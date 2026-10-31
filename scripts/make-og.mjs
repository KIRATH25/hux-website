// Makes the 1200x630 sharing image (Open Graph / Twitter) in the HUX theme: logo, headline and a real app screen on a phone.
// Rendered once with Chrome (so the real fonts are used) and committed as public/brand/og.png.
//   node scripts/make-og.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const screen = fs.readFileSync(path.join(root, 'public', 'screens', 'onboarding-1.webp')).toString('base64');
const mark = fs.readFileSync(path.join(root, 'public', 'brand', 'hux-icon.svg'), 'utf8');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@500;600;700&family=Caveat:wght@600&display=block" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#171717;font-family:Inter,sans-serif;overflow:hidden;position:relative}
  .hex{position:absolute;right:-40px;top:50%;transform:translateY(-50%);width:640px}
  .phone{position:absolute;right:150px;top:70px;width:300px;border-radius:44px;padding:9px;background:linear-gradient(#0c0c0c,#0c0c0c) padding-box,linear-gradient(135deg,#9a9a9a,#2b2b2b 22%,#d9d9d9 48%,#303030 70%,#8c8c8c) border-box;border:3px solid transparent;transform:rotate(-6deg);box-shadow:0 30px 60px -20px rgba(0,0,0,.6)}
  .phone img{display:block;width:100%;aspect-ratio:9/20;object-fit:cover;object-position:top;border-radius:35px}
  .copy{position:absolute;left:72px;top:72px;width:600px}
  .logo{display:flex;align-items:center;gap:14px;color:#F7F5EF;font-weight:700;font-size:34px;letter-spacing:-.02em}
  .logo svg{width:56px;height:56px;border-radius:13px}
  .chip{display:inline-flex;align-items:center;gap:10px;margin-top:44px;background:#FFF0B8;color:#171717;border-radius:999px;padding:10px 18px;font-size:16px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
  .chip i{width:10px;height:10px;border-radius:50%;background:#3E865A;display:block}
  h1{margin-top:22px;font-family:'Instrument Serif',serif;font-weight:400;font-size:84px;line-height:1.0;letter-spacing:-.02em;color:#F7F5EF}
  h1 em{color:#F4D35E}
  .note{margin-top:26px;font-family:Caveat,cursive;font-size:34px;color:#F4D35E;transform:rotate(-3deg);display:inline-block}
</style></head><body>
<svg class="hex" viewBox="0 0 200 200"><polygon points="100,14 174.5,57 174.5,143 100,186 25.5,143 25.5,57" fill="#F4D35E" stroke="#F4D35E" stroke-width="18" stroke-linejoin="round"/></svg>
<div class="phone"><img src="data:image/webp;base64,${screen}" alt=""></div>
<div class="copy">
  <div class="logo">${mark}HUX</div>
  <div class="chip"><i></i>Only for GLA University, Mathura</div>
  <h1>Everything you need is already on <em>campus</em>.</h1>
  <div class="note">buy · sell · rent · swap</div>
</div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const out = path.join(root, 'public', 'brand', 'og.png');
await page.screenshot({ path: out });
await browser.close();
console.log('og image ->', path.relative(root, out));
