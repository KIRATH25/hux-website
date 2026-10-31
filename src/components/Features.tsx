import { ArrowLeftRight, Clock, GraduationCap, ShoppingBag } from "lucide-react";
import { ScribbleUnderline } from "./HandDrawn";

// Four ways to use HUX. The card rhythm (paper, paper, charcoal with a sunflower label, sunflower outline) follows
// the app's own "Need something?" screen.
const CARDS = [
  {
    icon: ShoppingBag,
    title: "Buy & sell",
    text: "Books, calculators, cycles, lab coats and hostel stuff, from students on your campus.",
    note: "clear your shelf",
    tone: "paper",
  },
  {
    icon: Clock,
    title: "Rent by the hour or day",
    text: "Lend your camera, drafter or speaker for a few hours or days and earn from it.",
    note: "earn while it sits",
    tone: "paper",
  },
  {
    icon: ArrowLeftRight,
    title: "Exchange",
    text: "Swap without money: notes for headphones, design help for coding help.",
    note: "no money needed",
    tone: "dark",
  },
  {
    icon: GraduationCap,
    title: "Skills & services",
    text: "Tutoring, design, photography, repairs. Offer what you are good at.",
    note: "your skills have value",
    tone: "outline",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="section scroll-mt-20">
      <div className="container-hux">
        <div className="max-w-[720px]" data-reveal>
          <p className="t-eyebrow">One app, four ways</p>
          <h2 className="t-h2 mt-4">
            Use what you have.{" "}
            <span className="relative isolate inline-block">
              Get what you need.
              <ScribbleUnderline className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.2em] w-full" delay={250} />
            </span>
          </h2>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CARDS.map(({ icon: Icon, title, text, note, tone }, i) => {
            const dark = tone === "dark";
            return (
              <li
                key={title}
                data-reveal
                {...(dark ? { "data-dark": "" } : {})}
                style={{ ["--d" as string]: `${i * 60}ms` }}
                className={`relative flex min-h-[260px] flex-col rounded-[28px] p-7 ${
                  dark
                    ? "bg-charcoal text-ivory shadow-warm"
                    : tone === "outline"
                      ? "border-2 border-sunflower bg-paper shadow-warm-sm"
                      : "border border-line bg-paper shadow-warm-sm"
                }`}
              >
                <span className="grid size-12 place-items-center rounded-full bg-sunflower text-charcoal">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className={`t-h3 mt-auto pt-10 ${dark ? "!text-ivory" : ""}`}>{title}</h3>
                <p className={`mt-2 text-[15px] leading-[1.55] ${dark ? "text-ivory/80" : "text-ink-2"}`}>{text}</p>
                {dark ? (
                  <span className="absolute right-6 top-7 rotate-[3deg] rounded-full bg-sunflower px-3 py-1 font-hand text-[19px] font-semibold leading-none text-charcoal">
                    {note}
                  </span>
                ) : (
                  <span className="absolute right-6 top-7 rotate-[3deg] font-hand text-[21px] font-semibold leading-none text-muted">{note}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
