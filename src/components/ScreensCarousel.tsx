"use client";

import { useEffect, useRef, useState } from "react";
import type { Screen } from "@/config/site";
import { PhoneFrame } from "./PhoneFrame";

/** Horizontal scroll-snap carousel with dots (the dots follow the swipe and can be tapped). */
export function ScreensCarousel({ items }: { items: { screen: Screen; caption: string }[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const li = track.current?.querySelectorAll("li")[i];
    li?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div>
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50%-110px)] pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="App screens"
      >
        {items.map((it, i) => (
          <li key={it.screen.label} data-index={i} className="flex w-[220px] shrink-0 snap-center flex-col items-center">
            <PhoneFrame screen={it.screen} size="220px" />
            <p className="t-hand mt-6 text-center !text-[23px]">{it.caption}</p>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-center gap-1" role="group" aria-label="Choose a screen">
        {items.map((it, i) => (
          <button
            key={it.screen.label}
            type="button"
            onClick={() => go(i)}
            aria-label={`Screen ${i + 1}: ${it.caption}`}
            aria-current={active === i ? "true" : undefined}
            className="grid size-8 place-items-center rounded-full"
          >
            <span className={`block h-2.5 rounded-full transition-all duration-300 ${active === i ? "w-7 bg-charcoal" : "w-2.5 bg-line"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
