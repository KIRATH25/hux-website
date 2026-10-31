import type { CSSProperties } from "react";
import { site, type Screen } from "@/config/site";
import { LogoMark } from "./Logo";

type Props = {
  /** a screen from site.screens; an empty src shows a neutral placeholder (never a made-up app screen) */
  screen: Screen;
  /** rotateZ in degrees */
  tilt?: number;
  /** rotateY in degrees, for the 3D look */
  turn?: number;
  float?: boolean;
  floatDelay?: number;
  /** CSS width, e.g. "280px" or "min(280px, 62vw)" */
  size?: string;
  /** the hero's first phone loads eagerly; everything else is lazy */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * A modern Android phone drawn in CSS: even thin bezels, punch-hole camera, metal edge (two gradients), side buttons and a
 * soft floor shadow. The screen is 20:9 and the screenshot fills it with object-fit: cover.
 * Sizes inside use container units (cqw) so the phone scales cleanly at any width.
 */
export function PhoneFrame({ screen, tilt = 0, turn = 0, float = false, floatDelay = 0, size = "280px", priority = false, className = "", style }: Props) {
  const has = screen.src !== "";
  return (
    // the outer div takes the caller's positioning (absolute, relative...); the inner one anchors the floor shadow
    <div className={className} style={{ width: size, ...style }}>
     <div className="relative [perspective:1600px]">
      <div className={float ? "float" : undefined} style={{ ["--float-delay" as string]: `${floatDelay}s` }}>
        <div
          className="[container-type:inline-size] [transform-style:preserve-3d] transition-transform duration-700 ease-[var(--ease-out-soft)]"
          style={{ transform: `rotateY(${turn}deg) rotateZ(${tilt}deg)` }}
        >
          {/* body with a metal rim */}
          <div
            className="relative rounded-[14.6cqw] p-[3cqw] shadow-warm"
            style={{
              border: "0.9cqw solid transparent",
              background:
                "linear-gradient(#0c0c0c, #0c0c0c) padding-box, linear-gradient(135deg, #9a9a9a 0%, #2b2b2b 22%, #d9d9d9 48%, #303030 70%, #8c8c8c 100%) border-box",
            }}
          >
            {/* side buttons */}
            <span className="absolute -right-[1.9cqw] top-[22%] h-[13%] w-[1.1cqw] rounded-r-sm bg-gradient-to-r from-[#5c5c5c] to-[#1d1d1d]" aria-hidden="true" />
            <span className="absolute -right-[1.9cqw] top-[39%] h-[7%] w-[1.1cqw] rounded-r-sm bg-gradient-to-r from-[#5c5c5c] to-[#1d1d1d]" aria-hidden="true" />
            {/* screen */}
            <div className="relative aspect-[9/20] overflow-hidden rounded-[11.4cqw] bg-ivory-2">
              {has ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={screen.src}
                  alt={screen.alt}
                  width={1080}
                  height={2400}
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <Placeholder label={screen.label} alt={screen.alt} />
              )}
              {/* punch-hole camera */}
              <span className="absolute left-1/2 top-[2.6cqw] size-[3.6cqw] -translate-x-1/2 rounded-full bg-[#050505] ring-[0.5cqw] ring-[#1b1b1b]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      {/* floor shadow stays flat under the phone */}
      <div className="pointer-events-none absolute -bottom-[6%] left-[12%] right-[12%] h-[5%] rounded-[50%] bg-charcoal/25 blur-xl" aria-hidden="true" />
     </div>
    </div>
  );
}

function Placeholder({ label, alt }: { label: string; alt: string }) {
  return (
    <div role="img" aria-label={`${alt} (screenshot coming soon)`} className="absolute inset-0 flex flex-col items-center justify-center gap-[4cqw] border-[0.6cqw] border-dashed border-line bg-ivory-2 px-[8cqw] text-center">
      <LogoMark variant="mark" size={44} color="#171717" className="opacity-25" />
      <span className="text-[5.2cqw] font-semibold text-muted">Screenshot: {label}</span>
      <span className="text-[3.8cqw] font-medium text-muted/80">{site.name} · TODO</span>
    </div>
  );
}
