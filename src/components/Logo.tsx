"use client";

import { useId } from "react";

/**
 * The HUX hexagon mark (from E:\hux\design\logo). "tile" is the app icon: sunflower mark on a charcoal rounded square,
 * which reads well on ivory. "mark" draws only the strokes, in the given colour (sunflower on dark surfaces).
 */
export function LogoMark({ variant = "tile", size = 36, color = "#F4D35E", className }: { variant?: "tile" | "mark"; size?: number; color?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" className={className} aria-hidden="true" focusable="false">
      <defs>
        <mask id={`${id}b`} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
          <rect width="1024" height="1024" fill="white" />
          <path d="M 452 650 L 452 524" fill="none" stroke="black" strokeWidth="68" />
        </mask>
        <mask id={`${id}a`} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="1024">
          <rect width="1024" height="1024" fill="white" />
          <path d="M 572 374 L 572 500" fill="none" stroke="black" strokeWidth="68" />
        </mask>
      </defs>
      {variant === "tile" ? <rect width="1024" height="1024" rx="230" fill="#171717" /> : null}
      <polygon points="512,182 797.8,347 797.8,677 512,842 226.2,677 226.2,347" fill="none" stroke={color} strokeWidth="46" strokeLinejoin="round" />
      <path d="M 452 650 L 452 480 Q 452 440 492 440 L 736 440 M 676 380 L 740 440 L 676 500" fill="none" stroke={color} strokeWidth="42" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${id}a)`} />
      <path d="M 572 374 L 572 544 Q 572 584 532 584 L 288 584 M 348 524 L 284 584 L 348 644" fill="none" stroke={color} strokeWidth="42" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${id}b)`} />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={36} />
      <span className={`font-sans text-[22px] font-bold tracking-[-0.02em] ${dark ? "text-ivory" : "text-charcoal"}`}>HUX</span>
    </span>
  );
}
