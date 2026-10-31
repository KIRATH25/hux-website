"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tilts the hero phones a little (at most 4 degrees) towards the mouse, easing smoothly. Desktop with a real mouse only;
 * off on touch screens and for people who prefer reduced motion. A few lines of script instead of an animation library,
 * so the home page loads faster; the loop stops as soon as the phones have settled.
 */
export function HeroTilt({ children }: { children: ReactNode }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      node.style.transform = `rotateX(${y.toFixed(3)}deg) rotateY(${x.toFixed(3)}deg)`;
      raf = Math.abs(tx - x) > 0.01 || Math.abs(ty - y) > 0.01 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 8; // -4..4 deg
      ty = -(e.clientY / window.innerHeight - 0.5) * 8;
      if (!raf) raf = requestAnimationFrame(step);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={el} className="absolute inset-0 [perspective:1800px] [transform-style:preserve-3d]">
      {children}
    </div>
  );
}
