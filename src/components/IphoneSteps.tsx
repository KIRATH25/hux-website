import { Compass, Share, Smartphone, SquarePlus } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";

const host = site.ios.url.replace(/^https:\/\//, "").replace(/\/$/, "");

const FULL: { icon: typeof Share; title: string; text: ReactNode }[] = [
  {
    icon: Compass,
    title: "Open HUX in Safari",
    text: (
      <>
        Go to <b className="font-semibold text-charcoal break-all">{host}</b> in Safari. Inside Instagram, WhatsApp or Gmail, first tap ••• or the compass and choose
        &ldquo;Open in Safari&rdquo;.
      </>
    ),
  },
  { icon: Share, title: "Tap Share", text: "The square with an arrow pointing up: at the bottom of the screen on iPhone, at the top right on iPad." },
  {
    icon: SquarePlus,
    title: "Add to Home Screen",
    text: "Scroll down the list, tap “Add to Home Screen”, then “Add”. If you see “Open as Web App”, leave it on.",
  },
  {
    icon: Smartphone,
    title: "Open HUX from its icon",
    text: "Sign in with your GLA e-mail. Then turn on notifications: Profile → Notifications → Turn on notifications → Allow.",
  },
];

/** The iPhone install steps: the two taps (compact, in the sheets) or the full four steps (the /iphone/ guide). */
export function IphoneSteps({ compact = false }: { compact?: boolean }) {
  const steps = compact ? FULL.slice(1, 3) : FULL;
  return (
    <ol className={compact ? "space-y-4" : "grid gap-5 sm:grid-cols-2"}>
      {steps.map((s, i) => (
        <li key={s.title} className={compact ? "flex gap-4" : "flex gap-4 rounded-[24px] border border-line bg-paper p-5 shadow-warm-sm"}>
          <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl bg-sunflower text-charcoal" aria-hidden="true">
            <s.icon size={22} strokeWidth={1.9} />
            <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-charcoal text-[12px] font-bold text-ivory">{i + 1}</span>
          </span>
          <div className="pt-0.5">
            <h3 className="text-[17px] font-semibold leading-snug text-charcoal">{s.title}</h3>
            <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
