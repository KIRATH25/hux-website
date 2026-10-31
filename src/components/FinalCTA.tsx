import { site } from "@/config/site";
import { DownloadButton } from "./DownloadButton";
import { HandNote } from "./HandDrawn";
import { Hexagon } from "./Hexagon";
import { PhoneFrame } from "./PhoneFrame";
import { QRCodeCard } from "./QRCodeCard";

/** The closing dark band: a tilted phone on a sunflower hexagon, the line, the button, and the QR code on desktop. */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-16 sm:px-5 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-[1376px] overflow-hidden rounded-[32px] bg-charcoal sm:rounded-[40px]" data-dark>
        <div className="container-hux grid items-center gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-0">
          <div className="relative order-2 mx-auto h-[400px] w-full max-w-[380px] lg:order-1 lg:h-[560px]" data-reveal>
            <Hexagon className="absolute left-1/2 top-1/2 w-[110%] -translate-x-1/2 -translate-y-1/2" />
            <PhoneFrame screen={site.screens.onboarding1} tilt={-8} turn={14} float size="min(232px, 56vw)" className="absolute left-1/2 top-[6%] -translate-x-1/2 lg:top-[12%]" />
          </div>
          <div className="order-1 lg:order-2 lg:py-24" data-reveal style={{ ["--d" as string]: "100ms" }}>
            <h2 id="cta-title" className="t-h2 max-w-[12ch]">
              Your campus, one exchange away.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-ivory/75 lg:text-[18px]">
              Download HUX, sign up with your GLA email and start with {site.pricing.freeDealsPerMonth} free deals this month.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <DownloadButton onDark showMeta />
              <QRCodeCard onDark className="hidden lg:inline-flex" />
            </div>
            <HandNote dark rotate={-4} className="mt-8">
              free to start ✦
            </HandNote>
          </div>
        </div>
      </div>
    </section>
  );
}
