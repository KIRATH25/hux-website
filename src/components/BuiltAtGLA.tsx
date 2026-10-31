import { site } from "@/config/site";
import { HandNote, Sparkle } from "./HandDrawn";
import { LogoMark } from "./Logo";
import { Testimonials } from "./Testimonials";

/** An honest story block instead of testimonials: HUX has no reviews yet, so there are none here. */
export function BuiltAtGLA() {
  const t = site.team;
  return (
    <section id="about" aria-labelledby="about-title" className="section scroll-mt-20">
      <div className="container-hux grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div data-reveal>
          <p className="t-eyebrow">Our story</p>
          <h2 id="about-title" className="t-h2 mt-4">
            Built at GLA, for GLA.
          </h2>
          <p className="t-body mt-6 text-ink-2">
            HUX is built by {t.name} at {t.university}, under the {site.brand} brand. We built it because the things and skills students need are usually already on
            campus, and there was no safe way to find them.
          </p>
          {t.members.length > 0 ? (
            <p className="mt-6 text-[15px] leading-[1.6] text-ink-2">
              <span className="font-semibold text-charcoal">{t.name}:</span> {t.members.join(", ")}
              {t.guide ? (
                <>
                  <br />
                  <span className="font-semibold text-charcoal">Project guide:</span> {t.guide}
                </>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-[420px]" data-reveal style={{ ["--d" as string]: "120ms" }}>
          <div className="relative rotate-[2deg] rounded-[28px] border-[1.5px] border-charcoal bg-paper p-8 shadow-warm">
            <LogoMark size={64} />
            <p className="mt-6 font-serif text-[34px] leading-[1.08] text-charcoal">Human Utility eXchange</p>
            <p className="mt-2 text-[15px] text-muted">by {site.brand} · {t.name}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["GLA University", "Mathura", "Students only"].map((chip, i) => (
                <span key={chip} className="sticker !shadow-none" style={{ transform: `rotate(${[-3, 2, -1][i]}deg)` }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <HandNote rotate={-5} className="absolute -bottom-12 -left-2 sm:-left-8">
            Better people, bigger possibilities
          </HandNote>
          <Sparkle className="absolute -right-3 -top-4 size-8" delay={300} />
        </div>
      </div>
      <Testimonials />
    </section>
  );
}
