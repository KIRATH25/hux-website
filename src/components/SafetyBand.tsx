import { Lock } from "lucide-react";
import { site, type Screen } from "@/config/site";
import { PhoneFrame } from "./PhoneFrame";

const CARDS: { title: string; text: string; screen: Screen; tone: "white" | "sunflower" }[] = [
  {
    title: "Real students only",
    text: "Everyone signs up with a GLA email and a college ID, and an admin approves them before they can trade.",
    screen: site.screens.signup,
    tone: "white",
  },
  {
    title: "Pay the seller directly",
    text: "Pay by UPI straight to the seller's UPI ID, add the UTR and a screenshot, and the seller confirms. HUX never holds your money.",
    screen: site.screens.pay,
    tone: "sunflower",
  },
  {
    title: "Meet, check, then share the code",
    text: "You get the meeting point and a one-time code. Share the code only after you have the item in your hands.",
    screen: site.screens.handover,
    tone: "white",
  },
];

/** "Safe by design": a charcoal band inset from the page edges, three cards with a cropped phone each. */
export function SafetyBand() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="scroll-mt-20 px-3 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1376px] rounded-[32px] bg-charcoal py-16 text-ivory sm:rounded-[40px] lg:py-[110px]" data-dark>
        <div className="container-hux">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end" data-reveal>
            <div>
              <p className="t-eyebrow !text-ivory/60">Safe by design</p>
              <h2 id="safety-title" className="t-h2 mt-4 max-w-[13ch]">
                Safe deals, from hello to handover.
              </h2>
            </div>
            <p className="text-[16px] leading-[1.6] text-ivory/75 lg:text-right lg:text-[17px]">
              HUX checks who is on the platform, never touches your money, and keeps every handover honest with a one-time code.
            </p>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
            {CARDS.map((c, i) => {
              const sun = c.tone === "sunflower";
              return (
                <li
                  key={c.title}
                  data-reveal
                  style={{ ["--d" as string]: `${i * 60}ms` }}
                  className={`flex h-[540px] flex-col overflow-hidden rounded-[28px] ${sun ? "bg-sunflower" : "bg-paper"}`}
                >
                  <div className="p-7 pb-0">
                    <span className={`inline-grid size-9 place-items-center rounded-full text-[14px] font-bold ${sun ? "bg-charcoal text-sunflower" : "bg-sunflower text-charcoal"}`}>
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[21px] font-semibold leading-snug text-charcoal">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.55] text-ink-2">{c.text}</p>
                  </div>
                  {/* the phone is cropped by the card's bottom edge */}
                  <div className="relative mt-8 flex justify-center">
                    <PhoneFrame screen={c.screen} size="228px" />
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 flex items-center justify-center gap-3 text-center text-[15px] font-medium text-ivory/85" data-reveal>
            <Lock size={18} strokeWidth={1.75} className="shrink-0 text-sunflower" aria-hidden="true" />
            Names, photos and chat stay private until the seller confirms your payment.
          </p>
        </div>
      </div>
    </section>
  );
}
