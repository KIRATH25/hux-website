# HUX website

The official website for **HUX (Human Utility eXchange) by Feelfinity**, the campus exchange for GLA University, Mathura.
Its one job: make students trust HUX and download the Android app (an APK, not a Play Store link).

- Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 · motion
- Everything that can change (links, version, prices, coins, merch, team, contact) lives in `src/config/site.ts`
- Real app screenshots only (`assets/screens/`); missing ones show a neutral "Screenshot: …" placeholder
- No cookies, no analytics, no invented reviews or numbers

```powershell
npm install
npm run dev      # http://localhost:3100
npm run build    # static site in out/
```

Deploying: see [DEPLOY.md](DEPLOY.md).
