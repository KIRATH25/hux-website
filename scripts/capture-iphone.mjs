// Captures the iPhone version of HUX (the web app, as Safari shows it on an iPhone-sized screen) for the /iphone/ guide:
// the install banner, the "Pay with" sheet and the Notifications screen. A FAKE signed-in session and mocked Supabase
// answers with neutral sample data: no real account, no real person, nothing sent to Supabase.
//   1. in E:\hux:  node scripts/build-web.mjs  and  node scripts/serve-web.mjs   (http://localhost:8090/hux-app)
//   2. here:       node scripts/capture-iphone.mjs
//   3. here:       npm run assets            (-> public/screens/iphone-*.webp)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appRepo = process.env.HUX_REPO || path.resolve(root, '..', 'hux');
const APP = (process.argv[2] || 'http://localhost:8090/hux-app').replace(/\/$/, '');
const out = path.join(root, 'assets', 'screens');
const env = fs.readFileSync(path.join(appRepo, 'apps', 'mobile', '.env'), 'utf8');
const ref = new URL(/EXPO_PUBLIC_SUPABASE_URL=(.*)/.exec(env)[1].trim()).hostname.split('.')[0];
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

const uid = 'a0000000-0000-4000-8000-00000000000a';
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: uid, role: 'authenticated', exp: 4102444800 })}.sig`;
const user = { id: uid, aud: 'authenticated', role: 'authenticated', email: 'student@gla.ac.in', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' };
const session = { access_token: jwt, refresh_token: 'x', token_type: 'bearer', expires_in: 99999999, expires_at: 4102444800, user };
const profile = {
  id: uid, full_name: 'You', avatar_url: null, bio: null, university: 'GLA University, Mathura', campus_location: 'GLA', grad_year: 2027, major_or_dept: 'CSE',
  living_arrangement: 'HOSTELER', verification_status: 'verified', reliability_score: null, rating: null, total_reviews: 0, completed_exchanges: 0,
  response_rate: 100, skills: [], interests: [], is_available: true, role: 'student', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
};
const priv = { email: 'student@gla.ac.in', college_id_status: 'approved', review_note: null, legal_name: 'Student', roll_number: '0', setup_completed_at: '2026-01-02T00:00:00Z', is_suspended: false, suspended_reason: null, id_attempts: 1, upi_id: 'me@okaxis' };
const BOOKING = '11111111-1111-4111-8111-111111111111';
const booking = {
  id: BOOKING, listing_id: '22222222-2222-4222-8222-222222222222', conversation_id: '33333333-3333-4333-8333-333333333333', requester_id: uid, owner_id: 'b0000000-0000-4000-8000-00000000000b',
  status: 'confirmed', amount: 150, amount_snapshot: 150, quantity: 1, meeting_point: null, created_at: '2026-10-31T10:00:00Z', completed_at: null, requester: profile, owner: null,
  listing: { id: '22222222-2222-4222-8222-222222222222', title: 'Scientific calculator', listing_type: 'ITEM', category: 'Rentals', rent_price_per_day: 150, images: [], sale_state: 'booked' },
  payment: { method: 'upi', status: 'awaiting_payment', utr: null, proof_path: null, proof_submitted_at: null, dispute_reason: null, confirmed_at: null },
};

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });

async function shot(file, { url, signedIn = false, standalone = false, sw = 'block', act }) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 800 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: UA, colorScheme: 'light', serviceWorkers: sw });
  if (standalone) await ctx.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }));
  if (signedIn) {
    await ctx.addInitScript(([k, v]) => {
      try {
        localStorage.setItem(k, v);
        localStorage.setItem('hux.premiumPopupDay', new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10));
        localStorage.setItem('hux.installBannerUntil', String(Date.now() + 864e5));
      } catch {}
    }, [`sb-${ref}-auth-token`, JSON.stringify(session)]);
  }
  const json = (r, body) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) });
  await ctx.route('**/*.supabase.co/**', (r) => {
    const req = r.request();
    const u = new URL(req.url());
    if (req.method() === 'OPTIONS') return r.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' } });
    const single = (req.headers()['accept'] || '').includes('vnd.pgrst.object');
    if (!signedIn) return u.pathname.startsWith('/rest/v1/') ? json(r, single ? null : []) : json(r, {});
    if (u.pathname.startsWith('/auth/v1/user')) return json(r, user);
    if (u.pathname.startsWith('/auth/v1/token')) return json(r, session);
    if (u.pathname.startsWith('/rest/v1/rpc/')) {
      const fn = u.pathname.split('/').pop();
      const answers = {
        is_admin: false, get_unread_counts: [], get_privacy_info: { show_trust_stats_before_accept: true },
        get_quota_status: { used: 1, free_quota: 5, has_active_pass: false, can_start_deal: true, pass_enabled: true },
        get_pay_info: { upi_id: 'rahul.k@okaxis', amount: 150, quantity: 1, pay_by: '2026-10-31T10:30:00Z', ref: BOOKING.slice(0, 8) },
      };
      return json(r, fn in answers ? answers[fn] : []);
    }
    if (u.pathname.startsWith('/rest/v1/bookings')) return json(r, single ? booking : [booking]);
    if (u.pathname.startsWith('/rest/v1/profiles')) return json(r, single ? profile : [profile]);
    if (u.pathname.startsWith('/rest/v1/profile_private')) return json(r, single ? priv : [priv]);
    if (u.pathname.startsWith('/rest/v1/')) return json(r, single ? null : []);
    return json(r, {});
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(APP + url, { waitUntil: 'networkidle' });
  if (sw === 'allow') {
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.reload({ waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(2500);
  if (act) await act(page);
  await page.screenshot({ path: path.join(out, file) });
  console.log(`${file}  <- ${new URL(page.url()).pathname}${errors.length ? '  errors: ' + errors.slice(0, 2).join(' | ') : ''}`);
  await ctx.close();
}

await shot('iphone-install.png', { url: '/' });
await shot('iphone-pay.png', {
  url: `/booking/${BOOKING}`,
  signedIn: true,
  act: async (page) => {
    await page.getByText('Pay with UPI', { exact: true }).click();
    await page.waitForTimeout(900);
  },
});
await shot('iphone-notify.png', { url: '/notification-settings', signedIn: true, standalone: true, sw: 'allow' });
await browser.close();
