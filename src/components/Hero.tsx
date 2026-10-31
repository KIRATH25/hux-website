import { Check, KeyRound } from "lucide-react";
import { site } from "@/config/site";
import { DownloadButton, HowToInstallButton } from "./DownloadButton";
import { HandArrow, HandNote, ScribbleUnderline, Sparkle } from "./HandDrawn";
import { Hexagon } from "./Hexagon";
import { HeroTilt } from "./HeroTilt";
import { IosNote } from "./IosNote";
import { PhoneFrame } from "./PhoneFrame";

/** Hero: the promise on the left, three real app screens on a sunflower hexagon on the right (two on phones). */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 lg:pb-24 lg:pt-14">
      <div className="container-hux grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
        {/* words */}
        {/* no fade-in above the fold: the headline and phones must paint at once (Largest Contentful Paint) */}
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-full bg-sunflower-soft px-4 py-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-charcoal">
            <span className="size-2 rounded-full bg-green" aria-hidden="true" />
            Only for GLA University, Mathura
          </p>
          <h1 className="t-h1 mt-6 max-w-[11.5ch]">
            Everything you need is already on{" "}
            <span className="relative isolate inline-block italic">
              campus
              <ScribbleUnderline className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.24em] w-full" delay={350} />
            </span>
            .
          </h1>
          <p className="t-body mt-6 text-ink-2">
            HUX lets verified GLA students buy, sell, rent and swap things, skills and time with each other. No strangers. No middlemen.
          </p>
          <div className="mt-9 flex flex-wrap items-start gap-3">
            <DownloadButton showMeta />
            <HowToInstallButton />
          </div>
          <IosNote />
        </div>

        {/* phones */}
        <div className="relative mx-auto h-[560px] w-full max-w-[400px] sm:h-[620px] sm:max-w-[560px] lg:h-[660px] lg:max-w-none">
          <Hexagon className="absolute left-1/2 top-[64%] w-[108%] max-w-[760px] -translate-x-1/2 -translate-y-1/2 sm:top-[50%] sm:w-[118%]" />
          <Rings />
          <HeroTilt>
            {/* left: sign-up (tablet and up) */}
            <PhoneFrame
              screen={site.screens.signup}
              tilt={-7}
              turn={16}
              float
              floatDelay={1.4}
              size="min(212px, 34vw)"
              className="absolute left-[2%] top-[20%] hidden sm:block lg:left-[-2%]"
            />
            {/* right: need something */}
            <PhoneFrame
              screen={site.screens.onboarding2}
              tilt={7}
              turn={-16}
              float
              floatDelay={2.6}
              size="min(212px, 40vw)"
              className="absolute right-[3%] top-[18%] sm:right-[2%] sm:top-[20%] lg:right-[-2%]"
            />
            {/* centre */}
            <PhoneFrame
              screen={site.screens.onboarding1}
              float
              priority
              size="min(256px, 54vw)"
              className="absolute left-[8%] top-[4%] z-10 sm:left-1/2 sm:-translate-x-1/2"
            />
          </HeroTilt>

          {/* sticker chips */}
          <span className="sticker absolute left-[-2%] top-[64%] z-20 hidden sm:inline-flex" style={{ transform: "rotate(-5deg)" }}>
            <span className="grid size-5 place-items-center rounded-full bg-green text-white">
              <Check size={13} strokeWidth={3} />
            </span>
            Verified
          </span>
          <span className="sticker absolute right-[1%] top-[3%] z-20" style={{ transform: "rotate(4deg)" }}>
            <KeyRound size={15} strokeWidth={1.75} />
            OTP handover
          </span>
          <span className="sticker absolute bottom-[4%] right-[8%] z-20 sm:right-[16%]" style={{ transform: "rotate(-3deg)" }}>
            ₹0 commission
          </span>

          {/* handwritten note + arrow */}
          <div className="absolute -left-2 bottom-[-2%] z-20 flex items-end gap-1 sm:bottom-[1%] lg:-left-[14%] lg:bottom-auto lg:top-[-4%] lg:items-start">
            <HandNote rotate={-4} className="!text-[24px] sm:!text-[28px]">
              made by students,
              <br />
              for students
            </HandNote>
            <HandArrow variant="right" className="mb-6 hidden w-[96px] lg:mb-0 lg:mt-10 lg:block" delay={500} />
          </div>
          <Sparkle className="absolute right-[10%] top-[44%] z-20 hidden size-7 sm:block" delay={700} />
          <Sparkle className="absolute right-[38%] top-[-1%] z-0 hidden size-5 lg:block" fill="#F4D35E" delay={850} />
        </div>
      </div>
    </section>
  );
}

/** two dashed rings behind the phones, like the app's welcome screen */
function Rings() {
  return (
    <svg viewBox="0 0 400 400" className="pointer-events-none absolute left-1/2 top-[50%] w-[92%] max-w-[660px] -translate-x-1/2 -translate-y-1/2 sm:w-[110%]" aria-hidden="true" focusable="false">
      <circle cx="200" cy="200" r="196" fill="none" stroke="#C99A1E" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 7" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#C99A1E" strokeOpacity="0.35" strokeWidth="1.2" />
    </svg>
  );
}
