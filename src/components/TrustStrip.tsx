import { BadgeIndianRupee, KeyRound, ShieldCheck } from "lucide-react";

// Honest facts instead of the "4.6/5 from 600 reviews" row in the reference: HUX has no reviews or user numbers yet.
const ITEMS = [
  { icon: ShieldCheck, title: "Verified students only", text: "A GLA email plus a college ID checked by our admins." },
  { icon: KeyRound, title: "OTP handover", text: "Every deal is closed with a one-time code at pickup." },
  { icon: BadgeIndianRupee, title: "Zero commission", text: "HUX never takes a cut of your deal." },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="Why HUX is safe" className="container-hux pb-6 pt-4 lg:pt-8">
      <ul className="grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="flex items-start gap-4 px-2 py-7 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sunflower text-charcoal">
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-[17px] font-semibold text-charcoal">{title}</h2>
              <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
