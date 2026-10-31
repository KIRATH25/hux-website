"use client";

import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useBrowserValue } from "@/lib/client";

// the animation features load in the background right after the page (not on the first tap, not up front)
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * The one dialog the site uses. "sheet" slides up from the bottom on phones (and sits centred on larger screens);
 * "modal" is centred everywhere. Accessible: role=dialog, labelled by its title, focus is trapped inside,
 * Esc and the backdrop close it, focus returns to the button that opened it, the page behind does not scroll.
 */
export function Dialog({
  open,
  onClose,
  title,
  variant = "sheet",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** full: a full-height page (the mobile menu) */
  variant?: "sheet" | "modal" | "full";
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const titleId = `dlg-${useId().replace(/:/g, "")}`;

  const mounted = useBrowserValue(() => true, false);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel.current)?.focus();
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
      opener.current?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;
  const sheet = variant === "sheet";
  const full = variant === "full";
  const from = full ? { opacity: 0, y: -12 } : sheet ? { y: 48, opacity: 0 } : { scale: 0.96, opacity: 0 };
  return createPortal(
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
    <AnimatePresence>
      {open ? (
        <div className={`fixed inset-0 z-[70] flex justify-center ${full ? "items-stretch" : sheet ? "items-end p-0 md:items-center md:p-6" : "items-center p-4"}`}>
          <m.button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-charcoal/45"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={`relative z-10 w-full overflow-y-auto overscroll-contain bg-ivory text-ink-2 outline-none ${
              full ? "h-[100dvh]" : sheet ? "max-h-[88dvh] rounded-t-[28px] shadow-warm md:max-w-lg md:rounded-[28px]" : "max-h-[88dvh] max-w-md rounded-[28px] shadow-warm"
            }`}
            initial={from}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={from}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {sheet ? <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-line md:hidden" aria-hidden="true" /> : null}
            <div className="flex items-start justify-between gap-4 px-6 pt-5 md:px-8 md:pt-7">
              <h2 id={titleId} className="font-serif text-[30px] leading-[1.05] tracking-[-0.01em] text-charcoal">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 grid size-11 shrink-0 place-items-center rounded-full text-charcoal transition-colors hover:bg-ivory-2"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>
            <div className="px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-2 md:px-8 md:pb-8">{children}</div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
    </MotionConfig>
    </LazyMotion>,
    document.body,
  );
}
