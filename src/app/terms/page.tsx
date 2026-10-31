import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Confirm } from "@/components/Confirm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms",
  description: "The simple rules for using HUX, the campus exchange for GLA University students.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  const p = site.pricing;
  return (
    <main id="main">
      <PageHeader eyebrow="Legal" title="Terms of use" underline="Terms" updated="31 October 2026" />
      <article className="container-hux prose-hux pb-24">
        <p>
          These are the rules for using the HUX app (Human Utility eXchange, by {site.brand}). By creating an account you agree to them. They are short on purpose.
        </p>

        <h2>1. Only GLA students</h2>
        <ul>
          <li>HUX is only for students of {site.team.university} with a GLA e-mail address (@gla.ac.in).</li>
          <li>You need to upload your own college ID. An admin checks it before you can use HUX.</li>
          <li>One account per person. Do not share your account or use someone else&apos;s ID.</li>
        </ul>

        <h2>2. HUX is not part of your payment</h2>
        <ul>
          <li>The buyer pays the seller directly, by UPI to the seller&apos;s UPI ID. HUX never holds, receives or forwards your money.</li>
          <li>HUX is not a party to the deal between two students. The deal, the price and the item are between you and the other student.</li>
          <li>Only confirm a payment when the money is really in your own account. Only share your handover code after you have the item.</li>
          <li>
            Your first {p.freeDealsPerMonth} deals each month are free. Premium (₹{p.premiumPrice} for {p.premiumDays} days) is paid by UPI inside the app and is never
            renewed automatically.
          </li>
          <li>
            Reward coins have no cash value and can only be used for HUX merch inside the app. <Confirm />
          </li>
        </ul>

        <h2>3. Meet safely</h2>
        <ul>
          <li>Meet on campus, in a public place, at a reasonable time.</li>
          <li>Check the item before you share the handover code.</li>
          <li>If something feels wrong, leave, and report the user in the app.</li>
        </ul>

        <h2>4. What you may not list or do</h2>
        <ul>
          <li>Nothing illegal, stolen, dangerous or unsafe: no weapons, drugs, alcohol, tobacco or vapes, medicines, fake documents or exam answers.</li>
          <li>No harassment, hate, threats, spam or scams.</li>
          <li>No personal details of other people (phone numbers, roll numbers, ID photos) in listings, chats or photos.</li>
          <li>Do not try to break, overload or misuse the app.</li>
        </ul>

        <h2>5. Admins can act</h2>
        <ul>
          <li>Admins review reports and can remove listings and suspend accounts that break these rules.</li>
          <li>A suspended account cannot use HUX; its open requests and bookings are cancelled.</li>
          <li>
            If you think a decision was wrong, write to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </li>
        </ul>

        <h2>6. Your content</h2>
        <p>
          You are responsible for what you post. You allow HUX to show your listings, photos and reviews inside the app so the service can work. See the{" "}
          <Link href="/privacy/">privacy policy</Link> for what we store and who can see it.
        </p>

        <h2>7. No guarantees</h2>
        <p>
          HUX is built and run by students. We work hard to keep it safe and working, but we cannot promise it will always be available or free of mistakes, and we are not
          responsible for deals between students. <Confirm />
        </p>

        <h2>8. Leaving</h2>
        <p>
          You can stop using HUX at any time and ask us to delete your account on the <Link href="/delete-account/">Delete account</Link> page.
        </p>

        <h2>9. Changes and contact</h2>
        <p>
          If these terms change, we update the date at the top. Questions: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </article>
    </main>
  );
}
