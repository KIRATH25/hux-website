import Link from "next/link";
import { site } from "@/config/site";
import { Accordion } from "./Accordion";

const linkCls = "font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4";

export function FAQ() {
  const p = site.pricing;
  const items = [
    { q: "Who can join HUX?", a: "Only GLA University students with a GLA email address (@gla.ac.in) and a college ID approved by our admins." },
    { q: "Why is it not on the Play Store?", a: "It's coming. For now you can download it safely from this website." },
    {
      q: "Is the APK safe?",
      a: (
        <>
          Yes. It is the same app we are publishing. Only download it from this website. Android may show a warning because it isn&apos;t from the Play Store; the{" "}
          <Link href="/download/#install" className={linkCls}>
            install steps
          </Link>{" "}
          show what to tap.
        </>
      ),
    },
    {
      q: "Is HUX free?",
      a: `Yes. ${p.freeDealsPerMonth} deals every month are free. If you want unlimited deals, Premium is ₹${p.premiumPrice} a month.`,
    },
    { q: "Does HUX hold my money?", a: "No. The buyer pays the seller directly by UPI. HUX only helps you check the payment and the handover." },
    {
      q: "How do I get paid?",
      a: (
        <>
          Add your UPI ID in the app: Profile, then Edit profile, then &ldquo;Payments: my UPI ID&rdquo;. Buyers pay it directly. The{" "}
          <Link href="/upi/" className={linkCls}>
            Get paid with UPI
          </Link>{" "}
          page shows each step.
        </>
      ),
    },
    {
      q: "What if something goes wrong?",
      a: 'If a payment does not arrive, tap "Not received". You can also report a user or a listing in the app. Our admins review every report.',
    },
    {
      q: "Is there an iPhone app?",
      a: (
        <>
          Yes, without the App Store: open HUX in Safari and add it to your Home Screen (Share, then &ldquo;Add to Home Screen&rdquo;). Same account and same deals as Android.
          The{" "}
          <Link href="/iphone/" className={linkCls}>
            iPhone guide
          </Link>{" "}
          shows each step, notifications and paying by UPI.
        </>
      ),
    },
    {
      q: "How do I delete my account?",
      a: (
        <>
          Send us a request from the{" "}
          <Link href="/delete-account/" className={linkCls}>
            Delete account
          </Link>{" "}
          page, and we delete your account and the data linked to it.
        </>
      ),
    },
    {
      q: "How do I contact you?",
      a: (
        <>
          Email{" "}
          <a href={`mailto:${site.contact.email}`} className={linkCls}>
            {site.contact.email}
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <section id="faq" aria-labelledby="faq-title" className="section scroll-mt-20">
      <div className="container-hux grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <p className="t-eyebrow">FAQ</p>
          <h2 id="faq-title" className="t-h2 mt-4">
            Questions, answered.
          </h2>
          <p className="t-body mt-4 text-ink-2">
            Something else? The{" "}
            <Link href="/help/" className={linkCls}>
              help centre
            </Link>{" "}
            answers every question, or{" "}
            <a href={`mailto:${site.contact.email}`} className={linkCls}>
              write to us
            </a>
            .
          </p>
        </div>
        <div data-reveal style={{ ["--d" as string]: "100ms" }}>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
