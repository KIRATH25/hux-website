import { site } from "@/config/site";
import { HandCircle, HandNote } from "./HandDrawn";
import { PhoneFrame } from "./PhoneFrame";

const STEPS = [
  { title: "Download & sign up", text: "Install the app and sign up with your GLA email." },
  { title: "Get verified", text: "Upload your college ID. An admin approves you." },
  { title: "List or book", text: "Post what you have, or ask for what you need." },
  { title: "Pay, meet, done", text: "Pay the seller by UPI, meet on campus, share the code." },
] as const;

/** Four steps, a large tilted phone on the left (the app's own "how it works" screen) inside a hand-drawn circle. */
export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section scroll-mt-20">
      <div className="container-hux grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* phone */}
        <div className="relative mx-auto flex w-full max-w-[460px] justify-center py-6 lg:py-10" data-reveal>
          <HandCircle className="absolute inset-x-[6%] inset-y-[10%] h-[80%] w-[88%] rotate-[-4deg] sm:inset-x-[-4%] sm:inset-y-[8%] sm:h-[84%] sm:w-[108%] sm:rotate-[-8deg]" delay={200} />
          <PhoneFrame screen={site.screens.onboarding3} tilt={-6} turn={12} float size="min(272px, 64vw)" />
          <HandNote rotate={5} className="absolute right-[-14%] top-[16%] z-10 hidden lg:block">
            Think. Build. Exchange.
          </HandNote>
        </div>

        {/* steps */}
        <div>
          <div data-reveal>
            <p className="t-eyebrow">How it works</p>
            <h2 id="how-title" className="t-h2 mt-4">
              Four steps. That&apos;s it.
            </h2>
          </div>
          <ol className="relative mt-10 space-y-8">
            {/* the dashed line joining the numbers */}
            <span className="absolute bottom-6 left-[23px] top-6 border-l-2 border-dashed border-line" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-5" data-reveal style={{ ["--d" as string]: `${i * 60}ms` }}>
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
  );
}
