# Deploying the HUX website (GitHub)

Everything lives on GitHub (account `KIRATH25`):

| Repo | What is in it | Public? |
|---|---|---|
| [`hux-website`](https://github.com/KIRATH25/hux-website) | This code. GitHub Pages builds and publishes it on every push. | Yes (GitHub Pages needs a public repo on a free account) |
| [`hux-releases`](https://github.com/KIRATH25/hux-releases) | Only a README and the APK under **Releases** (98 MB is too big for the website itself). | Yes |
| [`HUX`](https://github.com/KIRATH25/HUX) | The app. Nothing website-related goes there. | — |

**Live site:** https://kirath25.github.io/hux-website/
**Download link (always the newest APK):** https://github.com/KIRATH25/hux-releases/releases/latest/download/HUX.apk

## How publishing works

1. You change something here and `git push`.
2. GitHub Actions (`.github/workflows/deploy.yml`) runs `npm ci` and `npm run build` with:
   - `NEXT_PUBLIC_BASE_PATH` = `/hux-website` (the site lives in a sub-folder on GitHub Pages)
   - `NEXT_PUBLIC_SITE_URL` = `https://kirath25.github.io/hux-website` (QR code, sitemap, sharing links)
   - `NEXT_PUBLIC_APK_URL` = the `hux-releases` link above
3. It uploads `out/` to GitHub Pages. About 2 minutes later the site is updated.

Watch it under the repo's **Actions** tab. A red run means nothing changed on the live site; open it to see the error.

## A new app version

1. https://github.com/KIRATH25/hux-releases/releases/new
   - Tag: the new version, e.g. `v1.0.1`
   - Attach the APK renamed to exactly **`HUX.apk`**, then **Publish release**.
   The download link does not change: it always points to the latest release.
2. In `src/config/site.ts` update `apk.version`, `apk.sizeMB`, `apk.updated` and `apk.sha256`
   (`Get-FileHash E:\hux\apk\<file>.apk -Algorithm SHA256` in PowerShell).
3. `git commit` and `git push`.

## Your own domain (later)

1. Repo **Settings → Pages → Custom domain**, and follow GitHub's DNS steps.
2. The workflow picks up the new address by itself on the next push (no sub-folder any more).

## Test after each change (section 8 of the brief)

- [ ] Android phone, Chrome: **Download for Android** → Chrome may say "This type of file can harm your device" → **Download anyway** → the "Download started" sheet appears → install with the five steps.
- [ ] Open the link from inside Instagram on Android: the "Open this page in Chrome" sheet appears instead of a download.
- [ ] iPhone: "iPhone version coming soon"; no APK offered anywhere.
- [ ] Computer: the button opens the QR code; scanning it with an Android phone opens `/download/` on the live site.
- [ ] Remove each `TODO-CONFIRM` marker on `/privacy/`, `/terms/` and `/delete-account/` once the sentence is confirmed.

## Local commands

| Command | What it does |
|---|---|
| `npm run dev` | Preview with live reload on http://localhost:3100 (copies the newest APK from `E:\hux\apk` so Download works locally) |
| `npm run build` | The static site in `out/` (removes the local APK copy first; fails if any file is over 25 MB) |
| `npm run serve` | Serves `out/` like a static host, for testing the build |
| `npm test` | Device-detection tests |
| `npm run shots -- phase6` | Screenshots and checks (overflow, download flows, QR) into `qa/` |
| `npm run assets` | Converts merch photos, logo and screenshots to WebP |
| `npm run capture` | Captures the app's real signed-out screens (needs `npm run web` in `E:\hux`) |

To test the GitHub Pages sub-folder locally:
`$env:NEXT_PUBLIC_BASE_PATH="/hux-website"; npm run build; $env:BASE="/hux-website"; npm run serve` → http://localhost:3100/hux-website/
