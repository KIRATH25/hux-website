import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, BellRing, Check, IndianRupee, KeyRound, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { site, withBase } from "@/config/site";
import { qrSvg } from "@/lib/qr";
import { Accordion } from "@/components/Accordion";
import { HandNote } from "@/components/HandDrawn";
import { IphoneSteps } from "@/components/IphoneSteps";
import { PageHeader } from "@/components/PageHeader";
import { PhoneFrame } from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "HUX on iPhone",
  description: "Use HUX on your iPhone: open it in Safari and add it to your Home Screen. No App Store needed. Install steps, notifications, paying with UPI and help.",
  alternates: { canonical: withBase("/iphone/") },
};

const linkCls = "font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4";
const B = ({ children }: { children: ReactNode }) => <b className="font-semibold text-charcoal">{children}</b>;

function OpenButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.ios.url}
      className={`group inline-flex h-[56px] items-center gap-4 rounded-full bg-charcoal pl-7 pr-2 text-[16px] font-semibold text-ivory transition-transform duration-150 active:scale-[0.98] ${className}`}
    >
      Open HUX on iPhone
      <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal transition-transform duration-200 group-hover:scale-105" aria-hidden="true">
        <ArrowUpRight size={20} strokeWidth={1.75} />
      </span>
    </a>
  );
}

function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-6 space-y-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sunflower text-[14px] font-bold text-charcoal">{i + 1}</span>
          <p className="pt-1 text-[16px] leading-[1.6] text-ink-2">{t}</p>
        </li>
      ))}
    </ol>
  );
}

// Every push the app sends (supabase/functions/send-push/logic.mjs), in plain words. The same list as Android.
const NOTIFIED = [
  "Someone asked for one of your listings",
  "Your request was accepted",
  "The buyer sent payment proof (check your UPI app first)",
  "The seller confirmed your payment: meeting point and code are ready",
  "The seller says the payment did not arrive",
  "A booking was cancelled, or the handover was confirmed",
  "Your ID was approved or not approved",
  "Your Premium payment was approved or not approved",
];

const DIFFERENCES: [string, string, string][] = [
  ["Install", "From Safari: Share, then Add to Home Screen", "The APK from this website"],
  ["Updates", "Automatic: every time you open HUX", "Download the new APK"],
  ["Notifications", `Turn on once (iOS ${site.ios.notificationsMinIos} or newer)`, "On by themselves"],
  ["Paying by UPI", "HUX lists Google Pay, PhonePe, Paytm + Copy", "Android's own app chooser + Copy"],
  ["Photos", "The iPhone photo picker; HUX shrinks photos itself", "Picker with a crop step"],
  ["Account, listings, chat, deals, coins, Premium, merch", "The same", "The same"],
];

const FAQ = [
  {
    q: "I can't find “Add to Home Screen”",
    a: "Check that you are in Safari, not inside Instagram, WhatsApp or Gmail (there, tap ••• or the compass and choose “Open in Safari”). In the Share list, scroll down. Still missing? Scroll to the end, tap “Edit Actions…” and add it.",
  },
  { q: "Can I use Chrome on my iPhone?", a: `On iOS 16.4 or newer, yes: tap Share in Chrome's address bar (top right), then “Add to Home Screen”. If you do not see it, use Safari.` },
  { q: "Does it work on an iPad?", a: "Yes. The steps are the same; the Share button is at the top right." },
  {
    q: "Do I need a new account?",
    a: "No. Sign in with the same GLA e-mail and password as on Android. New to HUX? Sign up with your GLA e-mail, confirm it, upload your college ID and wait for the approval, exactly as on Android.",
  },
  {
    q: "I don't get notifications",
    a: `Check that you opened HUX from its Home Screen icon (not from a Safari tab), that your iPhone has iOS ${site.ios.notificationsMinIos} or newer (Settings → General → About), that Profile → Notifications says they are on, that Settings → Notifications → HUX allows them, and that a Focus mode is not hiding them.`,
  },
  {
    q: "Google Pay, PhonePe or Paytm did not open",
    a: "HUX tells you after 2 seconds. Tap Copy UPI ID and Copy amount, open any UPI app yourself and pay there. Some apps do not accept a filled-in payment to a personal UPI ID; Copy always works. If you ticked “Remember my choice”, HUX forgets an app that did not open.",
  },
  {
    q: "Is HUX in a browser as safe as the app?",
    a: "Yes. It is the same HUX: every rule (who can see your UPI ID, names hidden until payment, the 4-digit handover code, admin ID checks) is enforced by HUX's server, not by your phone. The connection is always encrypted (HTTPS). HUX never asks for your UPI PIN or an OTP.",
  },
  {
    q: "HUX says “You are offline” but my internet works",
    a: "That was a bug in an earlier version, fixed on 1 November 2026. Close HUX completely (swipe it up from the app switcher) and open it again to get the fixed version. If the bar stays, check that Wi-Fi or mobile data is on and that Low Data Mode or a VPN is not blocking HUX, then try again.",
  },
  {
    q: "Something looks wrong, old or stuck",
    a: "Close HUX completely and open it again: that loads the newest version. Still wrong? Pull down on the screen to refresh it. If that does not help, remove HUX from the Home Screen and add it again from Safari (you only need to sign in and turn notifications on again).",
  },
  {
    q: "I can't sign in on my iPhone",
    a: "Use the same GLA e-mail and password as on Android. Forgot it? Tap “Forgot password?” on the sign-in screen; the e-mail link opens our website, where you choose a new password. New accounts must confirm their e-mail first.",
  },
  { q: "How do I update?", a: "You do not need to. HUX updates itself. To get a new version straight away, close HUX completely (swipe it up) and open it again." },
  {
    q: "How do I report a problem?",
    a: `Email ${site.contact.email} with what you tapped, what you saw (a screenshot helps) and your iPhone model and iOS version (Settings → General → About). Never send your password, UPI PIN or OTP.`,
  },
  { q: "How do I remove HUX?", a: "Press and hold the HUX icon, then “Remove App” (or “Delete Bookmark”). This signs you out on that iPhone and stops its notifications." },
  { q: "Can I trade with Android users?", a: "Yes. Everyone is in the same HUX: iPhone and Android users see the same listings and chat, book and pay each other the same way." },
];

/** The full iPhone guide: open in Safari, add to the Home Screen, notifications, paying with UPI, differences, help. */
export default async function IphonePage() {
  const qr = await qrSvg(site.ios.url);
  const host = site.ios.url.replace(/^https:\/\//, "").replace(/\/$/, "");

  return (
    <main id="main">
      <PageHeader
        eyebrow="iPhone"
        title="HUX on your iPhone"
        underline="iPhone"
        lead="No App Store needed. HUX runs in Safari and goes on your Home Screen like an app, in two taps. The same account, listings and deals as the Android app."
      />

      {/* above the fold: no reveal animation, so it paints at once */}
      <section className="container-hux pb-16 lg:pb-24">
        <div className="grid items-center gap-12 rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <OpenButton />
            <p className="mt-3 text-[14px] text-muted">
              Opens <span className="font-medium text-charcoal break-all">{host}</span> in Safari. Then tap Share and &ldquo;Add to Home Screen&rdquo;.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[15px]">
              {[
                ["Price", "Free"],
                ["Needs", "Safari on iPhone or iPad"],
                ["Updates", "Automatic"],
                ["Notifications", `iOS ${site.ios.notificationsMinIos} or newer`],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 hidden items-center gap-5 lg:flex">
              <figure className="inline-flex flex-col items-center gap-2 rounded-[20px] border border-line bg-ivory p-3">
                <div className="w-[120px] overflow-hidden rounded-[12px]" dangerouslySetInnerHTML={{ __html: qr }} />
              </figure>
              <p className="max-w-[24ch] text-[14px] leading-[1.5] text-ink-2">On a computer? Scan this with your iPhone&apos;s camera to open HUX in Safari.</p>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[320px] justify-center">
            <PhoneFrame screen={site.screens.iphoneInstall} size="min(260px, 64vw)" priority />
          </div>
        </div>
      </section>

      <section id="install" aria-labelledby="install-title" className="container-hux scroll-mt-24 pb-16 lg:pb-24">
        <div data-reveal>
          <p className="t-eyebrow">About a minute</p>
          <h2 id="install-title" className="t-h2 mt-4">
            Install in four steps
          </h2>
        </div>
        <div className="mt-10" data-reveal style={{ ["--d" as string]: "80ms" }}>
          <IphoneSteps />
        </div>
      </section>

      <section id="notifications" aria-labelledby="notify-title" className="section scroll-mt-20 !pt-0">
        <div className="container-hux grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <div data-reveal>
              <p className="t-eyebrow">Notifications</p>
              <h2 id="notify-title" className="t-h2 mt-4">
                Turn on notifications once
              </h2>
              <p className="t-body mt-4 text-ink-2">
                iPhones show notifications only for apps on the Home Screen, from iOS {site.ios.notificationsMinIos}. The Android app turns them on by itself; on iPhone it
                takes one tap.
              </p>
            </div>
            <div data-reveal style={{ ["--d" as string]: "60ms" }}>
              <Steps
                items={[
                  <>Open HUX from its <B>Home Screen icon</B> and sign in.</>,
                  <>
                    Go to <B>Profile → Notifications</B> and tap <B>Turn on notifications</B>.
                  </>,
                  <>
                    Tap <B>Allow</B> when your iPhone asks. Done: the screen says &ldquo;Notifications are on for this phone&rdquo;.
                  </>,
                ]}
              />
              <p className="mt-6 rounded-2xl bg-ivory-2 px-5 py-4 text-[15px] leading-[1.6] text-ink-2">
                Waiting for your ID to be approved? The &ldquo;Your ID is being checked&rdquo; screen has the same button, so the approval reaches you as a notification.
              </p>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[360px] flex-col items-center" data-reveal>
            <PhoneFrame screen={site.screens.iphoneNotify} tilt={3} turn={-8} size="min(250px, 62vw)" />
            <HandNote rotate={-3} className="mt-6">
              one tap, then Allow
            </HandNote>
          </div>
        </div>
        <div className="container-hux mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[24px] border border-line bg-paper p-6 shadow-warm-sm" data-reveal>
            <h3 className="flex items-center gap-3 text-[19px] font-semibold text-charcoal">
              <BellRing size={20} strokeWidth={1.9} aria-hidden="true" /> You are told when
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NOTIFIED.map((n) => (
                <li key={n} className="flex gap-3 text-[15px] leading-[1.5] text-ink-2">
                  <Check size={18} strokeWidth={2.2} className="mt-0.5 shrink-0 text-green" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-muted">New chat messages show inside HUX, as on Android.</p>
          </div>
          <div className="rounded-[24px] border border-line bg-paper p-6 shadow-warm-sm" data-reveal style={{ ["--d" as string]: "60ms" }}>
            <h3 className="flex items-center gap-3 text-[19px] font-semibold text-charcoal">
              <Lock size={20} strokeWidth={1.9} aria-hidden="true" /> Private by design
            </h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-[1.55] text-ink-2">
              <li>A notification has only fixed words, never a name, an amount, a UPI ID or a handover code. Those show inside HUX after you open it.</li>
              <li>Each iPhone is turned on separately. Signing out turns notifications off on that phone, so the next person never gets yours.</li>
              <li>
                Blocked them by mistake? <B>Settings → Notifications → HUX → Allow Notifications</B>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="upi" aria-labelledby="pay-title" className="px-3 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-[1376px] rounded-[32px] bg-charcoal py-16 text-ivory sm:rounded-[40px] lg:py-24" data-dark>
          <div className="container-hux grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div className="relative mx-auto flex w-full max-w-[360px] flex-col items-center" data-reveal>
              <PhoneFrame screen={site.screens.iphonePay} tilt={-3} turn={8} size="min(250px, 62vw)" />
            </div>
            <div>
              <div data-reveal>
                <p className="t-eyebrow !text-ivory/60">Paying by UPI on iPhone</p>
                <h2 id="pay-title" className="t-h2 mt-4">
                  Pick your UPI app.
                </h2>
                <p className="mt-4 text-[16px] leading-[1.6] text-ivory/75 lg:text-[17px]">
                  iPhones have no &ldquo;choose an app&rdquo; screen like Android, so HUX shows the list itself. The amount and the seller&apos;s UPI ID come from the booking, as on
                  Android.
                </p>
              </div>
              <ol className="mt-8 space-y-4" data-reveal style={{ ["--d" as string]: "60ms" }}>
                {[
                  "Tap Pay with UPI and choose Google Pay, PhonePe or Paytm. Your app opens with the UPI ID and the amount filled in, if the app allows it.",
                  "Didn't open within 2 seconds? HUX says so. Tap Copy UPI ID and Copy amount and pay from any UPI app (BHIM, your bank's app...).",
                  "Tick “Remember my choice” and next time your app opens straight away.",
                  "Back in HUX, type the 12-digit UTR and send the screenshot. When the seller confirms, names, chat, the meeting point and your code open.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sunflower text-[14px] font-bold text-charcoal">{i + 1}</span>
                    <p className="pt-1 text-[16px] leading-[1.6] text-ivory/85">{t}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-[15px] text-ivory/75" data-reveal>
                Selling? Add your UPI ID in Profile → Edit profile, the same as on Android:{" "}
                <Link href="/upi/" className="font-semibold text-ivory underline decoration-sunflower decoration-[3px] underline-offset-4">
                  Get paid with UPI
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="diff-title" className="section">
        <div className="container-hux">
          <div data-reveal>
            <p className="t-eyebrow">Good to know</p>
            <h2 id="diff-title" className="t-h2 mt-4">
              iPhone and Android, side by side
            </h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-line bg-paper shadow-warm-sm" data-reveal style={{ ["--d" as string]: "60ms" }}>
            <table className="w-full text-left text-[15px]">
              <thead className="bg-ivory-2 text-[13px] uppercase tracking-[0.08em] text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-6">
                    <span className="sr-only">Topic</span>
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-6">iPhone</th>
                  <th scope="col" className="px-4 py-3 font-semibold sm:px-6">Android</th>
                </tr>
              </thead>
              <tbody>
                {DIFFERENCES.map(([k, ios, android]) => (
                  <tr key={k} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-charcoal sm:px-6">{k}</th>
                    <td className="px-4 py-4 text-ink-2 sm:px-6">{ios}</td>
                    <td className="px-4 py-4 text-ink-2 sm:px-6">{android}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "The same safety", text: "Every rule is checked by HUX's server: GLA e-mail and ID approval, names hidden until payment, the one-time handover code." },
              { icon: KeyRound, title: "Never your UPI PIN", text: "HUX never asks for your UPI PIN or an OTP, on iPhone or Android. Payments happen in your own UPI app." },
              { icon: RefreshCw, title: "Always up to date", text: "There is nothing to download again: open HUX and you have the newest version. Signed-in stays signed in." },
            ].map((c, i) => (
              <li key={c.title} className="rounded-[24px] border border-line bg-paper p-6 shadow-warm-sm" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
                  <c.icon size={20} strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold text-charcoal">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="iphone-faq-title" className="section !pt-0">
        <div className="container-hux grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <p className="t-eyebrow">Help</p>
            <h2 id="iphone-faq-title" className="t-h2 mt-4">
              iPhone questions, answered.
            </h2>
            <p className="t-body mt-4 text-ink-2">
              Still stuck?{" "}
              <a href={`mailto:${site.contact.email}`} className={linkCls}>
                Write to us
              </a>
              .
            </p>
          </div>
          <div data-reveal style={{ ["--d" as string]: "100ms" }}>
            <Accordion items={FAQ} defaultOpen={null} />
          </div>
        </div>
      </section>

      <section className="container-hux pb-24">
        <div className="flex flex-col items-start gap-6 rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:flex-row md:items-center md:justify-between md:p-10" data-reveal>
          <div>
            <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
              <IndianRupee size={20} strokeWidth={1.9} />
            </span>
            <h2 className="mt-5 font-serif text-[34px] leading-[1.1] text-charcoal lg:text-[42px]">Ready? Open HUX in Safari.</h2>
            <p className="mt-2 text-[16px] leading-[1.6] text-ink-2">
              On Android instead?{" "}
              <Link href="/download/" className={linkCls}>
                Download the app
              </Link>
              .
            </p>
          </div>
          <OpenButton className="shrink-0" />
        </div>
      </section>
    </main>
  );
}
