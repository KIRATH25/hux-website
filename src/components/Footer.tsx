import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/download/", label: "Download (Android)" },
      { href: "/iphone/", label: "HUX on iPhone" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/help/", label: "Help & support" },
      { href: "/download/#install", label: "How to install" },
      { href: "/upi/", label: "Get paid (UPI)" },
      { href: "/#faq", label: "FAQ" },
      { href: `mailto:${site.contact.email}`, label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy/", label: "Privacy policy" },
      { href: "/terms/", label: "Terms" },
      { href: "/delete-account/", label: "Delete account" },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="container-hux grid gap-12 py-14 md:grid-cols-[1.3fr_2fr] lg:py-20">
        <div>
          <Logo />
          <p className="mt-5 text-[15px] text-ink-2">
            {site.fullName} · by {site.brand}
          </p>
          <p className="mt-1 text-[15px] text-ink-2">
            Made by {site.team.name} at {site.team.university}
          </p>
          {site.contact.instagram ? (
            <a href={`https://instagram.com/${site.contact.instagram}`} className="mt-5 inline-block text-[15px] font-semibold text-charcoal underline" rel="noopener">
              Instagram
            </a>
          ) : null}
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="t-eyebrow">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("mailto:") ? (
                      <a href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-charcoal hover:underline">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[15px] text-ink-2 transition-colors hover:text-charcoal hover:underline">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="container-hux py-6 text-[13px] text-muted">
          © {year} {site.brand}. {site.fullName}.
        </p>
      </div>
    </footer>
  );
}
