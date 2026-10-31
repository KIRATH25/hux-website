import { site } from "@/config/site";
import { DownloadButton, HowToInstallButton } from "@/components/DownloadButton";
import { HandArrow, HandCircle, HandNote, ScribbleUnderline, Sparkle } from "@/components/HandDrawn";
import { Hexagon } from "@/components/Hexagon";
import { InstallSteps } from "@/components/InstallSteps";
import { Logo } from "@/components/Logo";
import { PhoneFrame } from "@/components/PhoneFrame";
import { QRCodeCard } from "@/components/QRCodeCard";
import { Todo } from "@/components/Todo";

// PHASE 1 PREVIEW: the design system and the download system on one page.
// Phase 2 replaces this page with the real home page (Navbar, Hero, Marquee, Trust strip, Features).

const COLOURS = [
  ["ivory", "#F7F5EF", "page background"],
  ["ivory-2", "#EFEBDD", "soft cards, inset panels"],
  ["paper", "#FFFDF7", "cards (the app's card colour)"],
  ["line", "#DED9CC", "hairlines, borders"],
  ["charcoal", "#171717", "text, dark bands, buttons"],
  ["ink-2", "#333333", "body text"],
  ["muted", "#6F6C65", "secondary text"],
  ["sunflower", "#F4D35E", "fills, highlights, icon circles"],
  ["sunflower-soft", "#FFF0B8", "highlight backgrounds"],
  ["green", "#3E865A", "verified, paid"],
  ["red", "#C64F4F", "warnings only"],
] as const;

export default function Phase1Preview() {
  return (
    <main className="pb-24">
      <header className="border-b border-line">
        <div className="container-hux flex h-[72px] items-center justify-between">
          <Logo />
          <DownloadButton size="compact" />
        </div>
      </header>

      <section className="container-hux pt-14" data-reveal>
        <p className="t-eyebrow">Phase 1 preview · design system and download</p>
        <h1 className="t-h1 mt-5 max-w-[16ch]">
          Everything you need is already on{" "}
          <span className="relative isolate inline-block italic">
            campus
            <ScribbleUnderline className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.24em] w-full" delay={300} />
          </span>
          .
        </h1>
        <p className="t-body mt-6">
          HUX lets verified GLA students buy, sell, rent and swap things, skills and time with each other. No strangers. No middlemen.
        </p>
        <div className="mt-8 flex flex-wrap items-start gap-3">
          <DownloadButton showMeta />
          <HowToInstallButton />
        </div>
        <p className="mt-2 text-[13px] text-muted">iPhone: coming soon</p>
      </section>

      {/* colours */}
      <section className="container-hux mt-20" data-reveal>
        <h2 className="t-h2">Colours</h2>
        <p className="t-body mt-3">From the app. Sunflower is never text on ivory: it is a fill behind charcoal text, or text on charcoal.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COLOURS.map(([name, hex, use]) => (
            <li key={name} className="overflow-hidden rounded-[20px] border border-line bg-paper">
              <div className="h-20" style={{ background: hex }} />
              <div className="p-3">
                <p className="text-[14px] font-semibold text-charcoal">{name}</p>
                <p className="font-mono text-[12px] text-muted">{hex}</p>
                <p className="mt-1 text-[12px] leading-snug text-ink-2">{use}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* type */}
      <section className="container-hux mt-20 grid gap-10 lg:grid-cols-2" data-reveal>
        <div>
          <p className="t-eyebrow">Eyebrow · Inter 600 · 13px</p>
          <h2 className="t-h2 mt-4">
            Use what you have.{" "}
            <span className="relative isolate inline-block">
              Get what you need.
              <ScribbleUnderline className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.2em] w-full" />
            </span>
          </h2>
          <h3 className="t-h3 mt-6">Card title · Inter 600</h3>
          <p className="t-body mt-3">
            Body · Inter 400, 18px desktop and 16px mobile, line height 1.6 and at most 62 characters a line, so long paragraphs stay easy to read.
          </p>
        </div>
        <div className="relative rounded-[28px] bg-ivory-2 p-8">
          <p className="t-eyebrow">Handwritten notes · Caveat 600</p>
          <div className="mt-6 space-y-5">
            {site.slogans.map((s, i) => (
              <HandNote key={s} rotate={[-3, 2, -1.5, 3][i]}>
                {s}
              </HandNote>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="sticker" style={{ transform: "rotate(-4deg)" }}>
              <span className="size-2 rounded-full bg-green" /> Verified
            </span>
            <span className="sticker" style={{ transform: "rotate(3deg)" }}>OTP handover</span>
            <span className="sticker" style={{ transform: "rotate(-2deg)" }}>₹0 commission</span>
          </div>
        </div>
      </section>

      {/* phones */}
      <section className="container-hux mt-24" data-reveal>
        <h2 className="t-h2">Phone frame</h2>
        <p className="t-body mt-3">An Android phone drawn in code, tilted with CSS 3D, floating slowly. The screens are placeholders until the real screenshots arrive.</p>
        <div className="relative mx-auto mt-14 flex h-[600px] max-w-[760px] items-center justify-center">
          <Hexagon className="absolute left-1/2 top-1/2 w-[min(720px,96vw)] -translate-x-1/2 -translate-y-1/2" />
          <PhoneFrame screen={site.screens.listing} tilt={-8} turn={14} float floatDelay={1.2} size="min(220px, 40vw)" className="absolute left-[2%] top-[90px] hidden sm:block" />
          <PhoneFrame screen={site.screens.points} tilt={8} turn={-14} float floatDelay={2.4} size="min(220px, 40vw)" className="absolute right-[2%] top-[90px] hidden sm:block" />
          <PhoneFrame screen={site.screens.home} float priority size="min(260px, 62vw)" className="relative z-10" />
          <div className="absolute -top-10 -left-4 z-20 hidden items-start gap-1 md:flex">
            <HandNote rotate={-4}>made by students, for students</HandNote>
            <HandArrow className="mt-6 w-[110px]" delay={200} />
          </div>
        </div>
      </section>

      {/* hand-drawn */}
      <section className="container-hux mt-24" data-reveal>
        <h2 className="t-h2">Hand-drawn layer</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Arrow right", <HandArrow key="r" variant="right" className="h-20 w-28" />],
            ["Arrow left", <HandArrow key="l" variant="left" className="h-20 w-28" />],
            ["Arrow loop", <HandArrow key="o" variant="loop" className="h-20 w-32" />],
            [
              "Circle",
              <span key="c" className="relative inline-block px-3 py-1 text-[22px] font-semibold text-charcoal">
                free
                <HandCircle className="absolute -inset-x-2 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+16px)]" />
              </span>,
            ],
            ["Scribble", <ScribbleUnderline key="s" className="h-5 w-32" />],
            [
              "Sparkles",
              <span key="k" className="flex gap-2">
                <Sparkle className="size-8" />
                <Sparkle className="size-6" fill="#F4D35E" delay={150} />
                <Sparkle className="size-5" delay={300} />
              </span>,
            ],
          ].map(([label, art]) => (
            <figure key={label as string} className="flex h-40 flex-col items-center justify-center gap-4 rounded-[24px] border border-line bg-paper">
              {art}
              <figcaption className="text-[13px] text-muted">{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* download system */}
      <section className="container-hux mt-24" data-reveal>
        <h2 className="t-h2">Download system</h2>
        <p className="t-body mt-3">
          The same button everywhere. Android downloads {site.apk.fileName} and shows the steps; Instagram and other in-app browsers get &ldquo;Open in Chrome&rdquo;; iPhone never gets the APK; a computer gets a QR code.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="rounded-[28px] bg-charcoal p-8 md:p-12" data-dark>
            <p className="t-eyebrow !text-ivory/70">On a dark band</p>
            <h3 className="t-h2 mt-4 !text-ivory">Your campus, one exchange away.</h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <DownloadButton onDark showMeta />
              <HowToInstallButton onDark />
            </div>
            <HandNote dark rotate={-3} className="mt-6">
              free to start ✦
            </HandNote>
          </div>
          <QRCodeCard className="self-start" />
        </div>
        <h3 className="t-h3 mt-14">Install steps</h3>
        <div className="mt-6">
          <InstallSteps />
        </div>
      </section>

      <section className="container-hux mt-24" data-reveal>
        <h2 className="t-h2">Still to come from you</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          <li><Todo>real app screenshots (Home, Listing, Pay seller, Chat, Points)</Todo></li>
          <li><Todo>contact e-mail</Todo></li>
          <li><Todo>Instagram handle</Todo></li>
          <li><Todo>team member and guide names</Todo></li>
          <li><Todo>domain (the QR points at this computer until then)</Todo></li>
          <li><Todo>the 4 reference images</Todo></li>
        </ul>
      </section>
    </main>
  );
}
