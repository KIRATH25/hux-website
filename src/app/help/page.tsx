import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site, withBase } from "@/config/site";
import { Accordion } from "@/components/Accordion";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Help & support",
  description: "Answers to every HUX question: signing up, ID approval, listings, renting, buying, paying by UPI, the handover code, coins, Premium, iPhone and Android, and how to contact us.",
  alternates: { canonical: withBase("/help/") },
};

const linkCls = "font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4";
const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className={linkCls}>
    {children}
  </Link>
);

const p = site.pricing;
const c = site.coins;

/** Every section of the help centre. The wording follows what the app and the database really do. */
const SECTIONS: { id: string; title: string; items: { q: string; a: ReactNode }[] }[] = [
  {
    id: "start",
    title: "Getting started",
    items: [
      { q: "Who can use HUX?", a: "Only GLA University students with a GLA e-mail address (@gla.ac.in) whose college ID was approved by a HUX admin." },
      {
        q: "How do I get the app?",
        a: (
          <>
            Android: download the app file from the <L href="/download/">download page</L> and install it. iPhone or iPad: open HUX in Safari and add it to your Home
            Screen, see <L href="/iphone/">HUX on iPhone</L>. The same account works on both.
          </>
        ),
      },
      { q: "How do I sign up?", a: "Tap Sign up, enter your GLA e-mail, a password and (if a friend invited you) their referral code. Then open the confirmation link we e-mail you, and sign in." },
      { q: "The confirmation e-mail did not arrive", a: "Wait a minute and check Spam and Promotions. Still nothing? Sign up again with the same e-mail: it sends a fresh link. Links expire after a while, so use the newest one." },
      { q: "Why does HUX need my college ID?", a: "So only real GLA students can trade. You send one photo of your ID with your name and roll number. Only HUX admins see it; other students never see your roll number or the photo." },
      { q: "How long does ID approval take?", a: "Usually within a day. You can close the app; you get a notification (and the app moves on by itself) when it is decided. Pull down on the waiting screen to check again." },
      { q: "My ID was not approved", a: "The app shows why (for example a blurry photo). Send a new, clear photo from the same screen." },
      { q: "I forgot my password", a: "On the sign-in screen tap “Forgot password?”. The e-mail link opens our website, where you choose a new password." },
    ],
  },
  {
    id: "listings",
    title: "Listings: renting out, selling, exchanging",
    items: [
      { q: "How do I list something?", a: "Tap + (Create), choose Service or Item, add a title, a photo, a price and where to meet, and publish. Listing things with a price needs your UPI ID first (Profile → Edit profile)." },
      { q: "Can I sell an item instead of renting it?", a: "Yes. Under “How do you offer it?” choose Rent it out, Sell it, or Rent or sell. With Rent or sell, the buyer chooses. Selling works through the same steps as renting: request, accept, pay by UPI, handover code." },
      { q: "What happens to my listing when someone buys it?", a: "It disappears from the listings as soon as you accept the purchase, and for good once the handover is done. If the purchase is cancelled, it comes back." },
      { q: "What happens while my item is rented out?", a: "It stays listed and shows “Free after <date>” (the last rental day). Others can only pick a start date after that." },
      { q: "How do I delete my listing?", a: "Open your listing and tap Delete listing, then confirm. It disappears for everyone and anyone waiting for an answer is told. You cannot delete it while a booking for it is open: finish or cancel that first." },
      { q: "Can I offer an exchange instead of money?", a: "Yes: tick the swap / barter option when you create the listing. The buyer can then choose Exchange; there is nothing to pay and you agree the swap in the chat." },
    ],
  },
  {
    id: "booking",
    title: "Requesting, dates and booking",
    items: [
      { q: "How do I rent or buy something?", a: "Open the listing, choose Rent, Buy or Exchange (if it offers more than one), pick the start date and how many days, and send the request. The seller accepts or declines." },
      { q: "Why are some dates greyed out?", a: "The item is rented out on those days. Pick a date after the “Free from” date shown above the days." },
      { q: "What happens after the seller accepts?", a: "You have 30 minutes to pay by UPI on the booking screen. If you do not, the booking is cancelled and the item is free again." },
      { q: "How many deals can I do?", a: `${p.freeDealsPerMonth} deals every month are free (as buyer or seller). For unlimited deals there is Premium: ₹${p.premiumPrice} for ${p.premiumDays} days.` },
      { q: "Can I cancel?", a: "Yes, from the booking screen, before the handover. Both of you are told." },
    ],
  },
  {
    id: "paying",
    title: "Paying and getting paid (UPI)",
    items: [
      {
        q: "Who receives my payment?",
        a: "Always the seller's own UPI ID, saved in the booking when they accepted. HUX never holds the money and never takes it. (Only Premium and merch orders are paid to HUX itself.)",
      },
      { q: "How do I pay?", a: "On the booking screen tap Pay with UPI (on iPhone you pick Google Pay, PhonePe or Paytm), pay, then type the 12-digit UTR (transaction ID) and send the screenshot. The seller confirms when the money is in their account." },
      {
        q: "How do I get paid?",
        a: (
          <>
            Add your UPI ID in Profile → Edit profile → “Payments: my UPI ID”. Buyers pay it directly. Step by step: <L href="/upi/">Get paid with UPI</L>.
          </>
        ),
      },
      { q: "The seller says the money did not arrive", a: "The seller taps Not received and you are told. Check you paid the right UPI ID and amount, then send the UTR and a clearer screenshot again from the booking screen. If you still disagree, HUX reviews it; you can also write to us." },
      { q: "Can I pay in cash?", a: "Only when there is nothing to pay (a free deal or an exchange). Deals with a price are paid by UPI, so both of you have a record." },
      { q: "Will HUX ever ask for my UPI PIN or an OTP?", a: "Never. Nobody needs your PIN to send you money. Anyone asking for it is trying to take money." },
    ],
  },
  {
    id: "chat",
    title: "Chat, meeting and the handover code",
    items: [
      { q: "Why can't I chat yet?", a: "For safety, the chat (and names and photos) open only after the seller confirms your payment. Before that the chat explains what to do next. A free deal opens at once. A cancelled booking closes the chat." },
      { q: "What is the handover code?", a: "After the payment is confirmed, the buyer gets a 4-digit code and the meeting point. Meet, check the item, and only THEN tell the seller the code. The seller types it in to finish the deal." },
      { q: "The code is wrong / it says locked", a: "After 5 wrong tries the booking locks to protect you. Write to us with the booking and we help." },
      { q: "Where should we meet?", a: "The seller picks a campus spot when confirming the payment (for example the Main Gate or the Central Library). Meet in a public place on campus." },
    ],
  },
  {
    id: "rewards",
    title: "Coins, referrals, Premium and merch",
    items: [
      { q: "How do I earn coins?", a: `Every finished deal earns coins: ${c.free.sell} for selling, ${c.free.buy} for buying, ${c.free.exchange} for an exchange (${c.premium.sell} / ${c.premium.buy} / ${c.premium.exchange} with Premium). Premium also gives a one-time ${c.premiumBonus}-coin bonus.` },
      { q: "How do referrals work?", a: `Share your code (Coins screen). When your friend signs up with it and their ID is approved, you get ${c.referral.free} coins (${c.referral.premiumReferrer} if you have Premium).` },
      { q: "How do I get Premium?", a: `Profile → HUX Premium: pay ₹${p.premiumPrice} by UPI, send the UTR and screenshot, and an admin turns it on for ${p.premiumDays} days. You get unlimited deals and ${p.premiumMerchDiscountPct}% off merch.` },
      { q: "How do I order merch?", a: "Tap your coin balance at the top of the app to open Rewards, pick an item, and pay with coins, UPI or both. You see the order status and pick it up when it is ready." },
    ],
  },
  {
    id: "phones",
    title: "Android, iPhone and notifications",
    items: [
      { q: "Notifications on Android", a: "They are on by themselves. To change them: phone Settings → Apps → HUX → Notifications." },
      {
        q: "Notifications on iPhone",
        a: (
          <>
            Open HUX from its Home Screen icon → Profile → Notifications → Turn on notifications → Allow (iOS {site.ios.notificationsMinIos} or newer). More:{" "}
            <L href="/iphone/">HUX on iPhone</L>.
          </>
        ),
      },
      { q: "The iPhone link shows only install steps / on Android it says “HUX on Android is an app”", a: "That is on purpose: HUX on iPhone runs from the Home Screen icon, and on Android it is the app (download it from this website)." },
      { q: "How do I update?", a: "Android: download the new app from the download page and install it over the old one; your account stays. iPhone: it updates itself; close and reopen HUX." },
      { q: "Something looks wrong or old", a: "Close HUX completely and open it again. Pull down to refresh a screen. Still wrong? Write to us with a screenshot." },
    ],
  },
  {
    id: "safety",
    title: "Safety, privacy and your account",
    items: [
      { q: "How do I report or block someone?", a: "Open the chat or their profile and tap Report or Block. Listings have “Report this listing”. Admins review every report. A blocked person cannot request your listings or message you." },
      { q: "What can other students see about me?", a: "Before a deal: only that you are a verified GLA student and anonymous trust numbers. After the payment is confirmed: your display name, photo and chat. Never your roll number, ID photo or legal name." },
      { q: "Can I change my name or photo?", a: "Your photo, bio, interests and UPI ID: yes, in Profile → Edit profile. Your name and where you stay are fixed after setup." },
      {
        q: "How do I delete my account?",
        a: (
          <>
            Send a request from the <L href="/delete-account/">Delete account</L> page. Read what is stored in the <L href="/privacy/">privacy policy</L>.
          </>
        ),
      },
    ],
  },
];

/** The help centre: every question in one place, linked from "Help & support" in the app (Android and iPhone). */
export default function HelpPage() {
  return (
    <main id="main">
      <PageHeader eyebrow="Help & support" title="How can we help?" underline="help" lead="Answers to every HUX question. Still stuck? Write to us and a person from the HUX team replies." />

      <nav aria-label="Help topics" className="container-hux pb-10">
        <ul className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex rounded-full border border-line bg-paper px-4 py-2 text-[14px] font-semibold text-charcoal transition-colors hover:bg-ivory-2">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-hux space-y-14 pb-16 lg:space-y-20">
        {SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-24 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="t-eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-title`} className="t-h2 mt-3 !text-[34px] lg:!text-[44px]">
                {s.title}
              </h2>
            </div>
            <Accordion items={s.items} defaultOpen={null} />
          </section>
        ))}
      </div>

      <section className="container-hux pb-24">
        <div className="rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:p-10">
          <h2 className="font-serif text-[34px] leading-[1.1] text-charcoal lg:text-[42px]">Still need help?</h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-ink-2">
            Email{" "}
            <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent("HUX help")}`} className={linkCls}>
              {site.contact.email}
            </a>{" "}
            with what you tapped, what you saw (a screenshot helps) and your phone model. Never send your password, UPI PIN or OTP.
          </p>
        </div>
      </section>
    </main>
  );
}
