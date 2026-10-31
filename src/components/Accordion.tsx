"use client";

import { Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

/**
 * An accessible accordion: each question is a button with aria-expanded and aria-controls, one answer open at a time.
 * The height animates with a CSS grid-rows transition (no animation library, so nothing extra loads); closed answers are
 * `inert`, so keyboards and screen readers skip them. Reduced motion: no transition.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: ReactNode }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId().replace(/:/g, "");
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-p${i}`;
        const buttonId = `${base}-b${i}`;
        return (
          <li key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold text-charcoal md:text-[19px]"
              >
                {item.q}
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,transform] duration-300 ${
                    isOpen ? "rotate-45 bg-sunflower" : "bg-ivory-2 group-hover:bg-sunflower-soft"
                  }`}
                  aria-hidden="true"
                >
                  <Plus size={18} strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-[62ch] pb-6 pr-14 text-[16px] leading-[1.65] text-ink-2">{item.a}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
