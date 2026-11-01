import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site, withBase } from "@/config/site";
import { Confirm } from "@/components/Confirm";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Delete your account",
  description: "How to delete your HUX account and the data linked to it.",
  alternates: { canonical: withBase("/delete-account/") },
};

/** The page the Play Store will ask for. There is no delete button in the app (not wanted for now), so it is an e-mail request. */
export default function DeleteAccountPage() {
  const subject = "Delete my HUX account";
  const body = [
    "Hi HUX team,",
    "",
    "Please delete my HUX account and the data linked to it.",
    "",
    "My GLA email (the one I signed up with): ",
    "",
    "I understand this cannot be undone.",
  ].join("\n");
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <main id="main">
      <PageHeader
        eyebrow="Your account"
        title="Delete your HUX account"
        underline="Delete"
        lead="You can ask us to delete your account and the data linked to it at any time."
      />
      <article className="container-hux prose-hux pb-24">
        <div className="not-prose mt-2 rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:p-8">
          <h2 className="!mt-0 !text-[28px]">Send a deletion request</h2>
          <p>
            Send the request from (or mention) the GLA e-mail you signed up with, so we know the account is yours. The button opens your e-mail app with the message ready.
          </p>
          <a
            href={mailto}
            className="mt-6 inline-flex h-[56px] items-center gap-3 rounded-full bg-charcoal pl-6 pr-2 text-[16px] font-semibold !text-ivory !no-underline transition-transform active:scale-[0.98]"
          >
            Email a deletion request
            <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal" aria-hidden="true">
              <Mail size={19} strokeWidth={1.75} />
            </span>
          </a>
          <p className="!mt-4 text-[14px] text-muted">
            Or write to {site.contact.email} with the subject &ldquo;{subject}&rdquo;.
          </p>
        </div>

        <h2>What gets deleted</h2>
        <ul>
          <li>Your account and sign-in (your GLA e-mail and password).</li>
          <li>Your profile: display name, photo, bio, interests, Day Scholar or Hosteler.</li>
          <li>Your college ID details: name on the ID, roll number and the ID photo.</li>
          <li>Your UPI ID, listings and listing photos.</li>
          <li>Your chats and chat photos, saved listings, notifications, push notification tokens and iPhone notification subscriptions.</li>
          <li>Your coins, referral code and merch orders.</li>
        </ul>

        <h2>What may be kept for a while</h2>
        <ul>
          <li>
            Records we need to keep HUX safe or settle an open dispute (for example a report about a deal, or a payment that is being checked) may be kept until the matter
            is closed. <Confirm />
          </li>
        </ul>

        <h2>How long it takes</h2>
        <p>
          We delete your account within 30 days of your request and reply to confirm when it is done. <Confirm />
        </p>

        <h2>Before you go</h2>
        <ul>
          <li>Finish or cancel any open bookings first, so nobody is left waiting for an item or a payment.</li>
          <li>Deleting your account cannot be undone. Your coins are lost.</li>
        </ul>
      </article>
    </main>
  );
}
