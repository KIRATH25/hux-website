import type { Metadata } from "next";
import Link from "next/link";
import { site, withBase } from "@/config/site";
import { Confirm } from "@/components/Confirm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What the HUX app stores about you, who can see it, why, how long it is kept and how to delete it.",
  alternates: { canonical: withBase("/privacy/") },
};

/**
 * Written from what the app actually stores (E:\hux\supabase\migrations), not from a template.
 * Every <Confirm /> marks a sentence the team still has to confirm before the site goes live.
 */
export default function PrivacyPage() {
  const rows: { what: string; why: string; who: React.ReactNode; kept: React.ReactNode }[] = [
    {
      what: "Your GLA email address and password",
      why: "To create your account and sign you in. Only @gla.ac.in addresses can sign up.",
      who: "You and HUX admins. Your password is stored only in encrypted (hashed) form by our login provider; nobody can read it.",
      kept: "Until your account is deleted.",
    },
    {
      what: "Your name as written on your college ID, your roll number and a photo of your college ID",
      why: "To check that you are a GLA student before you can use HUX.",
      who: "You and HUX admins only. Never other students.",
      kept: (
        <>
          Until your account is deleted. <Confirm />
        </>
      ),
    },
    {
      what: "Your public profile: display name, profile photo, bio, interests, availability, Day Scholar or Hosteler",
      why: "So the person you deal with knows who they are meeting.",
      who: "You, HUX admins, and a student you have a booking with, but only after the seller has confirmed the payment (or straight away when the deal has nothing to pay). Before that, other students only see an anonymous card: “Verified GLA student”, rating, number of deals and reliability.",
      kept: "Until your account is deleted. You can change your photo, bio, interests and availability any time.",
    },
    {
      what: "Your UPI ID (if you add one to get paid)",
      why: "So a buyer can pay you directly by UPI.",
      who: "You, HUX admins, and the buyer of a booking with you. When you accept a booking, your UPI ID at that moment is copied into that booking so the buyer pays the right ID.",
      kept: "Until you change or remove it, or your account is deleted. Copies inside existing bookings stay with those bookings.",
    },
    {
      what: "Your listings and their photos",
      why: "To show what you offer.",
      who: "Approved HUX members (not people you have blocked). Listing photos are stored so that anyone who has the exact link can open them, so do not put personal details in them.",
      kept: (
        <>
          Until you remove the listing or your account is deleted. <Confirm />
        </>
      ),
    },
    {
      what: "Requests, bookings, chats and chat photos",
      why: "To run a deal between two students.",
      who: "The two students in that deal and HUX admins. The chat opens only after the payment is confirmed and closes if the booking is cancelled.",
      kept: (
        <>
          Until your account is deleted. <Confirm />
        </>
      ),
    },
    {
      what: "Payment screenshots and UTR numbers for deals",
      why: "So the seller can check that the money arrived, and so admins can settle a dispute.",
      who: "The buyer, the seller of that booking and HUX admins.",
      kept: (
        <>
          Payment screenshots are deleted 30 days after the deal is finished or cancelled. <Confirm />
        </>
      ),
    },
    {
      what: "Premium and merch payments (UTR number and screenshot) and merch orders",
      why: "So an admin can check your payment and hand over your order.",
      who: "You and HUX admins.",
      kept: (
        <>
          Until your account is deleted. <Confirm />
        </>
      ),
    },
    {
      what: "Coins, referral code and who invited you",
      why: "To give you reward coins and referral rewards.",
      who: "You and HUX admins. The people you invited appear to you by first name only.",
      kept: "Until your account is deleted.",
    },
    {
      what: "Reviews",
      why: "To help students trust each other.",
      who: (
        <>
          Approved HUX members can read reviews; names are only shown to people who have a confirmed deal with that person. <Confirm />
        </>
      ),
      kept: "Until your account is deleted.",
    },
    {
      what: "Reports and blocks",
      why: "To keep HUX safe.",
      who: "Reports: you and HUX admins. Blocks: only you; the person you block is not told.",
      kept: (
        <>
          Until your account is deleted. <Confirm />
        </>
      ),
    },
    {
      what: "Push notification token (an ID for your phone)",
      why: "To send you notifications about your deals.",
      who: "Nobody else; it is used only to send the notification. At most 5 phones per account.",
      kept: "Removed when you sign out of that phone, or when your account is deleted.",
    },
  ];

  return (
    <main id="main">
      <PageHeader eyebrow="Legal" title="Privacy policy" underline="Privacy" updated="31 October 2026" />
      <article className="container-hux prose-hux pb-24">
        <p>
          This policy explains what the HUX app (Human Utility eXchange, by {site.brand}) stores about you, who can see it, why, how long it is kept and how you can
          delete it. HUX is made by {site.team.name} at {site.team.university}. Questions: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>

        <h2>What we store and who sees it</h2>
        <div className="mt-6 space-y-4">
          {rows.map((r) => (
            <section key={r.what} className="rounded-[24px] border border-line bg-paper p-6 shadow-warm-sm">
              <h3 className="!mt-0">{r.what}</h3>
              <dl className="mt-3 grid gap-3 text-[15px] leading-[1.6] md:grid-cols-3">
                <div>
                  <dt className="font-semibold text-charcoal">Why</dt>
                  <dd className="mt-1">{r.why}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-charcoal">Who can see it</dt>
                  <dd className="mt-1">{r.who}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-charcoal">How long</dt>
                  <dd className="mt-1">{r.kept}</dd>
                </div>
              </dl>
            </section>
          ))}
        </div>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your data and we do not show ads.</li>
          <li>HUX never holds your money. Payments go from the buyer straight to the seller&apos;s UPI ID.</li>
          <li>
            We do not put your roll number, your legal name or your ID photo in notifications, e-mails or messages to other students.
          </li>
          <li>
            The app does not use advertising or tracking tools. <Confirm />
          </li>
        </ul>

        <h2>Services we use</h2>
        <p>To run HUX we use a few outside services. They process data only to provide their service to us:</p>
        <ul>
          <li>
            <strong>Supabase</strong>: our database, sign-in and file storage (where all of the data above is kept). <Confirm />
          </li>
          <li>
            <strong>Brevo</strong>: sends HUX e-mails (for example your welcome e-mail and your handover code).
          </li>
          <li>
            <strong>Expo and Google Firebase Cloud Messaging</strong>: deliver push notifications to your phone.
          </li>
        </ul>

        <h2>This website</h2>
        <p>This website does not use cookies, analytics or trackers. The download comes from GitHub, which stores the app file for us.</p>

        <h2>Your choices</h2>
        <ul>
          <li>You can change your photo, bio, interests, availability and UPI ID in the app at any time.</li>
          <li>Your display name and Day Scholar or Hosteler are fixed after setup; write to us if they need correcting.</li>
          <li>
            To delete your account and its data, see <Link href="/delete-account/">Delete account</Link>.
          </li>
          <li>
            You can ask us for a copy of the data we hold about you at <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. <Confirm />
          </li>
        </ul>

        <h2>Who HUX is for</h2>
        <p>
          HUX is only for students of GLA University, Mathura, with a GLA e-mail address. <Confirm />
        </p>

        <h2>Changes</h2>
        <p>If we change this policy, we update the date at the top of this page.</p>

        <h2>Contact</h2>
        <p>
          {site.brand}, {site.team.name}, {site.team.university}. Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </article>
    </main>
  );
}
