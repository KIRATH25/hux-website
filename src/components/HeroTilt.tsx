"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * Tilts the hero phones a little (at most 4 degrees) towards the mouse. Desktop with a real mouse only;
 * off on touch screens and for people who prefer reduced motion.
 */
export function HeroTilt({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 80, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      ry.set(x * 8); // -4..4 deg
      rx.set(-y * 8);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rx, ry]);

  return (
    <motion.div className="absolute inset-0 [perspective:1800px] [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
      {children}
    </motion.div>
  );
}
