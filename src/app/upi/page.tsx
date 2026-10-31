import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { AtSign, BadgeCheck, Ban, HandCoins, IndianRupee, KeyRound, Lock, RefreshCw, ScanSearch, ShieldAlert, Smartphone, Tag } from "lucide-react";
import { site, withBase } from "@/config/site";
import { Accordion } from "@/components/Accordion";
import { DownloadButton } from "@/components/DownloadButton";
import { HandNote } from "@/components/HandDrawn";
import { PageHeader } from "@/components/PageHeader";
import { PhoneFrame } from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "Get paid with UPI",
  description: "How to add your UPI ID in the HUX app so buyers can pay you directly, and how a paid deal works from booking to handover.",
  alternates: { canonical: withBase("/upi/") },
};

const linkCls = "font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4";
const B = ({ children }: { children: ReactNode }) => <b className="font-semibold text-charcoal">{children}</b>;

// The wording of the buttons and labels is copied from the app (apps/mobile/app/edit-profile.tsx), so people find them.
const ADD_STEPS: { title: string; text: ReactNode }[] = [
  { title: "Open your profile", text: <>Open HUX and tap the <B>Profile</B> tab at the bottom.</> },
  { title: "Tap Edit profile", text: <>It is in the list under your profile card (&ldquo;Bio, interests and availability&rdquo;).</> },
  {
    title: "Type your UPI ID",
    text: (
      <>
        In <B>Payments: my UPI ID</B>, type the ID from your UPI app, like <code className="font-mono text-[15px] text-charcoal">name@okaxis</code> or{" "}
        <code className="font-mono text-[15px] text-charcoal">98xxxxxx10@ybl</code>.
      </>
    ),
  },
  {
    title: "Save and check it",
    text: (
      <>
        Tap <B>Save</B>. HUX shows the ID back and asks &ldquo;Is this your UPI ID?&rdquo;. Check every letter, then tap <B>Yes, save it</B>.
      </>
    ),
  },
  {
    title: "Test it (optional)",
    text: (
      <>
        Tap <B>Send myself ₹1 to test</B>. Your UPI app opens with ₹1 to this ID. If your app does not let you pay yourself, ask a friend to send ₹1.
      </>
    ),
  },
];

const RULES = [
  {
    icon: Smartphone,
    title: "Where to find your ID",
    text: "Open your UPI app (Google Pay, PhonePe, Paytm, BHIM or your bank's app) and tap your photo or name. Your UPI ID is shown there: a name, then @ and a bank handle like @okaxis or @ybl.",
  },
  {
    icon: AtSign,
    title: "The right format",
    text: "name@bank: letters, numbers, dots, dashes or underscores, then @ and the bank's letters. No spaces, up to 64 characters.",
  },
  {
    icon: Lock,
    title: "Who can see it",
    text: "Only the buyer of a booking with you, after you accept their request. Their screen shows it masked (ra****@okaxis); Pay with UPI and Copy UPI ID fill in the full ID.",
  },
  {
    icon: Tag,
    title: "When you need it",
    text: "To publish a listing with a price. Free listings work without one: there is nothing to pay, and you confirm the deal at the meeting.",
  },
  {
    icon: RefreshCw,
    title: "Changing it later",
    text: "Edit it on the same screen. New bookings use the new ID. Bookings you already accepted are still paid to the old one, so keep it working until they are done.",
  },
  {
    icon: HandCoins,
    title: "HUX never holds the money",
    text: "The money goes straight from the buyer's UPI app into your bank account. HUX only helps both of you check the payment and the handover.",
  },
];

const DEAL_STEPS: { title: string; text: ReactNode }[] = [
  { title: "A buyer books", text: "They ask for your listing and, for rentals and hourly help, pick how many days or hours (1 to 30). You accept the request." },
  {
    title: "HUX fixes the amount and your UPI ID",
    text: "Both are saved for this booking. The buyer has 30 minutes to pay; if they do not, the booking is cancelled and your item is free again.",
  },
  { title: "The buyer pays you", text: "From their own UPI app. Then they type the 12-digit UTR (transaction ID) and send a screenshot." },
  {
    title: "You check your UPI app",
    text: (
      <>
        Only when the money is in your account, tap <B>Confirm payment</B> and pick where to meet. Not there? Tap <B>Not received</B>: the buyer can send a new proof, and HUX
        can review it.
      </>
    ),
  },
  { title: "Meet and finish", text: "Names and chat open, and the buyer gets a 4-digit code. Hand over the item, ask for the code and type it in. Done." },
];

const SAFETY = [
  { icon: KeyRound, title: "Never share your UPI PIN or an OTP.", text: "You never need a PIN to receive money. Anyone who asks for it is trying to take money, not send it." },
  { icon: Ban, title: "Do not approve “collect requests”.", text: "Getting paid never asks you to approve anything in your UPI app." },
  { icon: ScanSearch, title: "A screenshot is not money.", text: "Screenshots can be edited. Confirm only when the amount shows in your own UPI app or bank, with the same UTR." },
  { icon: BadgeCheck, title: "Hand over after “Payment confirmed”.", text: "And the buyer shares the code only after they have the item in their hands." },
  { icon: ShieldAlert, title: "Something feels off?", text: "Tap Not received, or report the user or the listing in the app. Our admins review every report." },
];

const FAQ = [
  { q: "Does HUX take a part of the payment?", a: "No. The buyer pays you directly, from their UPI app to yours. HUX never touches the money." },
  { q: "Which UPI apps work?", a: "Any of them: Google Pay, PhonePe, Paytm, BHIM or your bank's own app. The buyer can use a different app from yours." },
  { q: "Can I type my phone number instead?", a: "Type the full UPI ID, with the @. Many apps give you one made from your number, like 98xxxxxx10@ybl." },
  {
    q: "Will the buyer see my real name?",
    a: "HUX keeps names hidden until you confirm the payment. But when the buyer pays, their UPI app may show the name registered with your bank. That is part of UPI, not something HUX can hide.",
  },
  {
    q: "The ₹1 test does not work",
    a: "Some UPI apps do not allow paying yourself. Ask a friend to send ₹1 to your ID, or copy the ID again from your UPI app's profile and save it.",
  },
  { q: "I changed my UPI ID. Where does money for older bookings go?", a: "To the old ID. HUX saved it when you accepted those bookings. New bookings use the new ID." },
  {
    q: "The buyer says they paid, but I don't see it",
    a: "Don't confirm. Check your UPI app's history again (a payment can take a few minutes), then tap Not received and say what you see. The buyer can send a new UTR and screenshot, and HUX can review it.",
  },
  { q: "Can buyers pay in cash?", a: "Only when there is nothing to pay (a free deal), which you confirm at the meeting. Deals with a price are paid by UPI, so both of you have a record." },
];

/** Help page: where to add your UPI ID in the app, the rules around it, how a paid deal runs, and how to stay safe. */
export default function UpiPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Payments"
        title="Get paid with UPI"
        underline="UPI"
        lead="Add your UPI ID once in the HUX app. Buyers then pay you directly, straight into your bank account. HUX never holds the money."
      />

      {/* above the fold: no reveal animation here, so the phone and the steps paint at once */}
      <section id="add" aria-labelledby="add-title" className="container-hux scroll-mt-24 pb-16 pt-2 lg:pb-24">
        <div className="grid items-center gap-12 rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="t-eyebrow">In the app · about a minute</p>
            <h2 id="add-title" className="t-h2 mt-4">
              Add your UPI ID
            </h2>
            <ol className="mt-8 space-y-6">
              {ADD_STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-4">
                  {/* the dashed line down to the next number (none after the last, however tall the text) */}
                  {i < ADD_STEPS.length - 1 ? <span className="absolute -bottom-6 left-[19px] top-10 border-l-2 border-dashed border-line" aria-hidden="true" /> : null}
                  <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 border-paper bg-sunflower text-[14px] font-bold text-charcoal">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-[18px] font-semibold leading-snug text-charcoal">{s.title}</h3>
                    <p className="mt-1 text-[16px] leading-[1.6] text-ink-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-2xl bg-ivory-2 px-5 py-4 text-[15px] leading-[1.6] text-ink-2">
              Publishing a listing with a price before adding your UPI ID? HUX stops and asks you to add it first: <B>Open Settings</B> takes you to this same screen.
            </p>
          </div>
          <div className="relative mx-auto flex w-full max-w-[340px] justify-center">
            <PhoneFrame screen={site.screens.upi} size="min(270px, 66vw)" priority />
            <HandNote rotate={-5} className="absolute -left-[30%] top-[38%] z-10 hidden max-w-[9ch] text-center xl:block">
              buyers pay exactly this ID
            </HandNote>
          </div>
        </div>
      </section>

      <section aria-labelledby="rules-title" className="container-hux pb-16 lg:pb-24">
        <div data-reveal>
          <p className="t-eyebrow">Good to know</p>
          <h2 id="rules-title" className="t-h2 mt-4">
            Your UPI ID, in short
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RULES.map((r, i) => (
            <li key={r.title} data-reveal style={{ ["--d" as string]: `${(i % 3) * 60}ms` }} className="rounded-[24px] border border-line bg-paper p-6 shadow-warm-sm">
              <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
                <r.icon size={20} strokeWidth={1.9} />
              </span>
              <h3 className="mt-5 text-[19px] font-semibold leading-snug text-charcoal">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{r.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="deal" aria-labelledby="deal-title" className="section scroll-mt-20 !pt-0">
        <div className="container-hux grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="relative mx-auto flex w-full max-w-[400px] flex-col items-center" data-reveal>
            <PhoneFrame screen={site.screens.pay} tilt={-4} turn={10} size="min(260px, 62vw)" />
            <HandNote rotate={3} className="mt-8">
              what the buyer sees
            </HandNote>
          </div>
          <div>
            <div data-reveal>
              <p className="t-eyebrow">From booking to handover</p>
              <h2 id="deal-title" className="t-h2 mt-4">
                How a paid deal works
              </h2>
            </div>
            <ol className="mt-10 space-y-7">
              {DEAL_STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-5" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
                  {i < DEAL_STEPS.length - 1 ? <span className="absolute -bottom-7 left-[23px] top-12 border-l-2 border-dashed border-line" aria-hidden="true" /> : null}
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-ivory bg-sunflower text-[15px] font-bold text-charcoal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="t-h3">{s.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-[1.6] text-ink-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="safe-title" className="px-3 sm:px-5 lg:px-8">
        <div className="mx-auto max-w-[1376px] rounded-[32px] bg-charcoal py-16 text-ivory sm:rounded-[40px] lg:py-24" data-dark>
          <div className="container-hux">
            <div data-reveal>
              <p className="t-eyebrow !text-ivory/60">Stay safe</p>
              <h2 id="safe-title" className="t-h2 mt-4 max-w-[16ch]">
                Five rules for getting paid.
              </h2>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {SAFETY.map((s, i) => (
                <li key={s.title} className="flex gap-4" data-reveal style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
                    <s.icon size={20} strokeWidth={1.9} />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-semibold leading-snug text-ivory">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.6] text-ivory/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="upi-faq-title" className="section">
        <div className="container-hux grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div data-reveal>
            <p className="t-eyebrow">Questions</p>
            <h2 id="upi-faq-title" className="t-h2 mt-4">
              Getting paid, answered.
            </h2>
            <p className="t-body mt-4 text-ink-2">
              Something else?{" "}
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
            <h2 className="mt-5 font-serif text-[34px] leading-[1.1] text-charcoal lg:text-[42px]">No HUX on your phone yet?</h2>
            <p className="mt-2 text-[16px] leading-[1.6] text-ink-2">
              Download the app, then add your UPI ID. Need help installing? See the{" "}
              <Link href="/download/#install" className={linkCls}>
                install steps
              </Link>
              .
            </p>
          </div>
          <DownloadButton className="shrink-0" />
        </div>
      </section>
    </main>
  );
}
