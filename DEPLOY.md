# Deploying the HUX website

Two free services, two separate jobs:

| What | Where | Why |
|---|---|---|
| The APK file (98 MB) | **GitHub Releases**, public repo `hux-releases` | Big files, no bandwidth limit, one link that always gives the newest version |
| The website (3.3 MB) | **Cloudflare Pages** | Free, commercial use allowed, unlimited bandwidth. Refuses files over 25 MB, so the APK must **not** be in the website |

## 1. Put the APK on GitHub Releases (once per app version)

1. On GitHub (account `KIRATH25`): **New repository** → name `hux-releases` → **Public** → tick "Add a README" → Create. No source code goes in it.
2. In that repo: **Releases → Create a new release**.
   - Tag: `v1.0.0` (the app version from `apps/mobile/app.json`)
   - Title: `HUX 1.0.0`
   - Attach the APK, renamed to exactly **`HUX.apk`** (from `E:\hux\apk\application-….apk`).
   - Publish.
3. The download link is now, and stays, for every future release:
   `https://github.com/KIRATH25/hux-releases/releases/latest/download/HUX.apk`
   Keep the file name `HUX.apk` the same in every release.

## 2. Put the website code on GitHub

```powershell
cd E:\hux-website
git remote add origin https://github.com/KIRATH25/hux-website.git   # create the empty repo on GitHub first (private is fine)
git push -u origin master
```

The APK and the `qa/` screenshots are ignored by git and never uploaded.

## 3. Connect Cloudflare Pages

1. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** → choose `hux-website`.
2. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
3. **Environment variables** (Production):
   - `NEXT_PUBLIC_APK_URL` = `https://github.com/KIRATH25/hux-releases/releases/latest/download/HUX.apk`
   - `NODE_VERSION` = `22`
4. Save and deploy. You get an address like `https://hux-website.pages.dev`.
5. Add one more variable, `NEXT_PUBLIC_SITE_URL` = that address (e.g. `https://hux-website.pages.dev`), and **Retry deployment**. The QR code, sitemap, robots.txt and sharing links then use the real address.

Later, with your own domain: Cloudflare Pages → Custom domains → add it, change `NEXT_PUBLIC_SITE_URL` to it, and redeploy.

## 4. Test the live site (section 8 of the brief)

- [ ] Android phone, Chrome: tap **Download for Android** → Chrome may say "This type of file can harm your device" → **Download anyway** → the "Download started" sheet appears → install with the five steps → the app opens.
- [ ] Open the link from inside Instagram on Android: the "Open this page in Chrome" sheet appears instead of a download.
- [ ] iPhone: the button says "iPhone version coming soon"; no APK is offered anywhere.
- [ ] Computer: the button opens the QR code; scanning it with an Android phone opens `/download/`.
- [ ] The QR code and links show the live address (not 192.168.x.x).
- [ ] Remove every `TODO-CONFIRM` marker on `/privacy/`, `/terms/` and `/delete-account/` once the sentence is confirmed.

## 5. A new app version

1. GitHub `hux-releases` → new release (`v1.0.1`, …) with the new file renamed `HUX.apk`. The download link does not change.
2. In `src/config/site.ts` update `apk.version`, `apk.sizeMB`, `apk.updated` and `apk.sha256`
   (`Get-FileHash E:\hux\apk\<file>.apk -Algorithm SHA256` in PowerShell).
3. `git commit` and `git push`: Cloudflare rebuilds the site by itself.

## Local commands

| Command | What it does |
|---|---|
| `npm run dev` | Preview with live reload on http://localhost:3100 (copies the newest APK from `E:\hux\apk` so Download works locally) |
| `npm run build` | The real static site in `out/` (removes the local APK copy first; fails if any file is over 25 MB) |
| `npm run serve` | Serves `out/` like a static host, for testing the build |
| `npm test` | Device-detection tests |
| `npm run shots -- phase6` | Screenshots and checks (overflow, download flows, QR) into `qa/` |
| `npm run assets` | Converts merch photos, logo and screenshots to WebP |
| `npm run capture` | Captures the app's real signed-out screens (needs `npm run web` in `E:\hux`) |
