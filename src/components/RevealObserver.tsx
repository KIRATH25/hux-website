"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole site: marks [data-reveal] blocks and [data-draw] SVGs with [data-shown]
 * the first time they come into view (CSS in globals.css does the animation, once per page load).
 * New elements (client-side navigation) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const scan = (root: ParentNode) => {
      root.querySelectorAll("[data-reveal]:not([data-shown]), [data-draw]:not([data-shown])").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };
    scan(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && scan(n.parentElement ?? document));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
