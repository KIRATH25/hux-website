"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog } from "./Dialog";
import { DownloadButton } from "./DownloadButton";
import { Logo } from "./Logo";
import { withBase } from "@/config/site";

export const NAV_LINKS = [
  { href: withBase("/#features"), label: "Features" },
  { href: withBase("/#how"), label: "How it works" },
  { href: withBase("/#rewards"), label: "Rewards" },
  { href: withBase("/#pricing"), label: "Pricing" },
  { href: withBase("/#faq"), label: "FAQ" },
] as const;

/** Sticky navbar: transparent at the top, ivory with an 8px blur and a hairline once the page has scrolled 20px. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-line bg-ivory/85 backdrop-blur-[8px]" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-hux flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="HUX home" className="rounded-lg">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:bg-ivory-2 hover:text-charcoal">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <DownloadButton size="compact" />
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            aria-expanded={menu}
            className="grid size-11 place-items-center rounded-full text-charcoal transition-colors hover:bg-ivory-2 lg:hidden"
          >
            <Menu size={24} strokeWidth={1.75} />
          </button>
        </div>
      </nav>

      <Dialog open={menu} onClose={() => setMenu(false)} title="Menu" variant="full">
        <ul className="mt-6 space-y-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                className="block rounded-2xl py-3 font-serif text-[40px] leading-[1.1] text-charcoal transition-colors hover:bg-ivory-2"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-line pt-8">
          <DownloadButton showMeta />
        </div>
      </Dialog>
    </header>
  );
}
