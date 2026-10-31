/**
 * The hand-made layer: wobbly arrows, scribbles, a circle and sparkles, drawn as inline SVG.
 * Each path has pathLength="1" and the class "stroke", so it "draws on" when RevealObserver marks the svg [data-shown]
 * (900 ms; arrowheads follow with the class "late"). With reduced motion or no JS they simply show.
 */
import type { CSSProperties } from "react";

type Common = { className?: string; color?: string; delay?: number; style?: CSSProperties };

const base = (color: string, width = 2.5) => ({
  fill: "none",
  stroke: color,
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const withDelay = (style: CSSProperties | undefined, delay?: number) => (delay ? ({ ...style, ["--d" as string]: `${delay}ms` } as CSSProperties) : style);

/** arrow: "right" swoops down and to the right, "left" is its mirror image, "loop" makes a small loop on the way */
export function HandArrow({ variant = "right", className, color = "#171717", delay, style }: Common & { variant?: "right" | "left" | "loop" }) {
  const p = base(color);
  if (variant === "loop") {
    return (
      <svg viewBox="0 0 132 80" className={className} style={withDelay(style, delay)} data-draw aria-hidden="true" focusable="false">
        <path {...p} className="stroke" pathLength={1} d="M6 52 C 15 26, 46 12, 62 30 C 74 44, 58 61, 47 50 C 37 39, 52 21, 77 23 C 98 25, 112 40, 121 57" />
        <path {...p} className="stroke late" pathLength={1} d="M107 53.5 L 121.5 58 L 123 43" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 84" className={className} style={withDelay(style, delay)} data-draw aria-hidden="true" focusable="false">
      <g transform={variant === "left" ? "translate(120 0) scale(-1 1)" : undefined}>
        <path {...p} className="stroke" pathLength={1} d="M5 10 C 24 5, 47 9, 63 23 C 79 37, 86 53, 101 66 C 104 69, 107 71, 109 72" />
        <path {...p} className="stroke late" pathLength={1} d="M95.5 70 L 110 73.5 L 106.5 59" />
      </g>
    </svg>
  );
}

/** a sunflower scribble that sits under a word (stretches to the word's width) */
export function ScribbleUnderline({ className, color = "#F4D35E", delay, style }: Common) {
  const p = { ...base(color, 6), vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 240 22" preserveAspectRatio="none" className={className} style={withDelay(style, delay)} data-draw aria-hidden="true" focusable="false">
      <path {...p} className="stroke" pathLength={1} d="M3 13 C 38 6, 78 9, 122 8 C 162 7, 204 5, 237 9" />
      <path {...p} className="stroke late" pathLength={1} d="M24 18 C 66 13, 118 15, 160 13 C 186 12, 206 13, 220 14" />
    </svg>
  );
}

/** a loose hand-drawn circle around a word (place it absolutely over the word) */
export function HandCircle({ className, color = "#171717", delay, style }: Common) {
  const p = { ...base(color, 2.5), vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox="0 0 180 64" preserveAspectRatio="none" className={className} style={withDelay(style, delay)} data-draw aria-hidden="true" focusable="false">
      <path {...p} className="stroke" pathLength={1} d="M38 9 C 86 0, 158 4, 172 25 C 182 41, 136 59, 82 58 C 34 57, 4 46, 7 29 C 10 14, 44 6, 82 6 C 106 6, 124 8, 136 12" />
    </svg>
  );
}

/** a 4-point sparkle like the ones on the HUX sticker sheets */
export function Sparkle({ className, color = "#171717", fill = "none", delay, style }: Common & { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={withDelay(style, delay)} data-draw aria-hidden="true" focusable="false">
      <path
        {...base(color, 1.8)}
        fill={fill}
        className="stroke"
        pathLength={1}
        d="M12 1.5 C 12.6 7.6, 15.6 11.2, 22.5 12 C 15.6 12.8, 12.6 16.4, 12 22.5 C 11.4 16.4, 8.4 12.8, 1.5 12 C 8.4 11.2, 11.4 7.6, 12 1.5 Z"
      />
    </svg>
  );
}

/** a Caveat note, slightly rotated */
export function HandNote({ children, className = "", rotate = -3, dark = false }: { children: React.ReactNode; className?: string; rotate?: number; dark?: boolean }) {
  return (
    <p className={`t-hand ${dark ? "!text-sunflower" : ""} ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </p>
  );
}
