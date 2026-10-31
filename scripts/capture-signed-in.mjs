// Captures the app's SIGNED-IN screens (Pay seller, Handover code, Coins, Payments: UPI ID) from its web version, with a test session and
// neutral sample data (like the app's own scripts/web-smoke.mjs): no real account, no real person, nothing sent to Supabase.
// The screens themselves are the real app; only the numbers are samples (a Rs 150 calculator rental, a masked UPI id,
// a 4-digit code, a small coin balance).
//   1. in E:\hux:  npm run web               (Expo web on http://localhost:8081)
//   2. here:       node scripts/capture-signed-in.mjs
//   3. here:       npm run assets            (-> public/screens/*.webp)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appRepo = process.env.HUX_REPO || path.resolve(root, '..', 'hux');
const base = (process.argv[2] || 'http://localhost:8081').replace(/\/$/, '');
const out = path.join(root, 'assets', 'screens');
fs.mkdirSync(out, { recursive: true });

const env = fs.readFileSync(path.join(appRepo, 'apps', 'mobile', '.env'), 'utf8');
const ref = new URL(/EXPO_PUBLIC_SUPABASE_URL=(.*)/.exec(env)[1].trim()).hostname.split('.')[0];

const uid = 'a0000000-0000-4000-8000-00000000000a';
const sellerId = 'b0000000-0000-4000-8000-00000000000b';
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: uid, role: 'authenticated', exp: 4102444800 })}.sig`;
const user = { id: uid, aud: 'authenticated', role: 'authenticated', email: 'student@gla.ac.in', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' };
const session = { access_token: jwt, refresh_token: 'x', token_type: 'bearer', expires_in: 99999999, expires_at: 4102444800, user };
const profile = {
  id: uid, full_name: 'You', avatar_url: null, bio: null, university: 'GLA University, Mathura', campus_location: 'GLA', grad_year: 2027, major_or_dept: 'CSE',
  living_arrangement: 'HOSTELER', verification_status: 'verified', reliability_score: null, rating: null, total_reviews: 0, completed_exchanges: 0,
  response_rate: 100, skills: [], interests: [], is_available: true, role: 'student', created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
};
const priv = {
  email: 'student@gla.ac.in', college_id_status: 'approved', review_note: null, legal_name: 'Student', roll_number: '0', setup_completed_at: '2026-01-02T00:00:00Z',
  is_suspended: false, suspended_reason: null, id_attempts: 1, upi_id: null,
};
const BOOKING_ID = '11111111-1111-4111-8111-111111111111';
const booking = (pay) => ({
  id: BOOKING_ID, listing_id: '22222222-2222-4222-8222-222222222222', conversation_id: '33333333-3333-4333-8333-333333333333',
  requester_id: uid, owner_id: sellerId, status: 'confirmed', amount: 150, amount_snapshot: 150, quantity: 3,
  meeting_point: pay === 'confirmed' ? 'Central Library' : null, created_at: '2026-10-31T10:00:00Z', completed_at: null,
  requester: profile, owner: null, // the seller's name stays hidden in these shots
  listing: { id: '22222222-2222-4222-8222-222222222222', title: 'Scientific calculator (Casio fx-991EX)', listing_type: 'ITEM', category: 'Rentals', rent_price_per_day: 50, images: [], sale_state: 'booked' },
  payment: { method: 'upi', status: pay, utr: null, proof_path: null, proof_submitted_at: null, dispute_reason: null, confirmed_at: pay === 'confirmed' ? '2026-10-31T10:20:00Z' : null },
});

async function capture({ file, route, pay, scrollTo, upi = null, scrollText }) {
  const me = { ...priv, upi_id: upi };
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 14; SM-A546E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
    colorScheme: 'light',
  });
  await ctx.addInitScript(([k, v]) => {
    try {
      localStorage.setItem(k, v);
      // the daily "free deals used / Get Premium" pop-up counts as already seen today (India time), so it does not cover the screen
      localStorage.setItem('hux.premiumPopupDay', new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10));
    } catch {}
  }, [`sb-${ref}-auth-token`, JSON.stringify(session)]);
  const json = (r, body) => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(body) });
  await ctx.route('**/*.supabase.co/**', (r) => {
    const req = r.request();
    const u = new URL(req.url());
    if (req.method() === 'OPTIONS') return r.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' } });
    const single = (req.headers()['accept'] || '').includes('vnd.pgrst.object');
    if (u.pathname.startsWith('/auth/v1/user')) return json(r, user);
    if (u.pathname.startsWith('/auth/v1/token')) return json(r, session);
    if (u.pathname.startsWith('/rest/v1/rpc/')) {
      const fn = u.pathname.split('/').pop();
      const answers = {
        is_admin: false,
        get_quota_status: { used: 1, free_quota: 5, has_active_pass: false, can_start_deal: true, pass_enabled: true },
        get_unread_counts: [],
        get_pay_info: { upi_id: 'rahul.k@okaxis', amount: 150, quantity: 3, pay_by: '2026-10-31T10:30:00Z', ref: BOOKING_ID.slice(0, 8) },
        get_handover_code: '4821',
        get_campus_spots: [{ id: 1, name: 'Main Gate', active: true }, { id: 2, name: 'Central Library', active: true }],
        get_coin_balance: 45,
        get_coin_settings: { coins_sell_free: 5, coins_buy_free: 5, coins_exchange_free: 2, coins_sell_premium: 10, coins_buy_premium: 10, coins_exchange_premium: 5, coins_premium_bonus: 20 },
        get_referral_status: { my_code: 'K7M2PQX', referred: true, can_apply: false },
        get_my_referrals: { items: [], referred_by: null, total: 0, paid: 0, coins_earned: 0 },
        get_trust_stats: {},
        get_privacy_info: { show_trust_stats_before_accept: true },
        get_app_settings: { free_quota: 5, pass_price: 79, pass_days: 30, hux_upi_id: null, pass_enabled: true },
      };
      return json(r, fn in answers ? answers[fn] : []);
    }
    if (u.pathname.startsWith('/rest/v1/bookings')) {
      const b = booking(pay);
      return json(r, single ? b : [b]);
    }
    if (u.pathname.startsWith('/rest/v1/coin_ledger'))
      return json(r, [
        { id: 'c1', delta: 5, reason: 'deal_buy', ref_type: 'booking', ref_id: 'b1', created_at: '2026-10-30T12:00:00Z' },
        { id: 'c2', delta: 20, reason: 'premium_bonus', ref_type: 'member_pass', ref_id: 'p1', created_at: '2026-10-28T09:00:00Z' },
        { id: 'c3', delta: 5, reason: 'deal_sell', ref_type: 'booking', ref_id: 'b2', created_at: '2026-10-26T17:00:00Z' },
        { id: 'c4', delta: 10, reason: 'referral_referred', ref_type: 'referral', ref_id: 'f1', created_at: '2026-10-20T11:00:00Z' },
        { id: 'c5', delta: 5, reason: 'deal_sell', ref_type: 'booking', ref_id: 'b3', created_at: '2026-10-18T15:00:00Z' },
      ]);
    if (u.pathname.startsWith('/rest/v1/profiles')) return json(r, single ? profile : [profile]);
    if (u.pathname.startsWith('/rest/v1/profile_private')) return json(r, single ? me : [me]);
    if (u.pathname.startsWith('/rest/v1/')) return json(r, single ? null : []);
    return json(r, {});
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + route, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2500);
  if (scrollTo) {
    await page.getByText(scrollTo, { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
    await page.evaluate(() => {
      // nudge so the card sits near the top of the screen, as someone would scroll it
      const el = [...document.querySelectorAll('div')].find((d) => /^(PAYMENT|GETTING PAID)$/.test(d.textContent?.trim() ?? ''));
      el?.scrollIntoView({ block: 'start' });
    });
    await page.waitForTimeout(600);
  }
  if (scrollText) {
    await page.getByText(scrollText, { exact: false }).first().evaluate((el) => el.scrollIntoView({ block: 'start' })).catch(() => {});
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(out, file) });
  console.log(`${file}  <- ${new URL(page.url()).pathname}${errors.length ? '  errors: ' + errors.slice(0, 2).join(' | ') : ''}`);
  await browser.close();
}

await capture({ file: 'pay.png', route: `/booking/${BOOKING_ID}`, pay: 'awaiting_payment', scrollTo: 'PAYMENT' });
await capture({ file: 'handover.png', route: `/booking/${BOOKING_ID}`, pay: 'confirmed', scrollTo: 'PAYMENT' });
await capture({ file: 'points.png', route: '/coins', pay: 'awaiting_payment' });
await capture({ file: 'upi.png', route: '/edit-profile', pay: 'awaiting_payment', upi: 'yourname@okaxis', scrollText: 'Interests' });
