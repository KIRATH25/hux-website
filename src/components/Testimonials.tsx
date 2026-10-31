import { site } from "@/config/site";

/**
 * Real student feedback, later. Hidden until site.showTestimonials is true AND site.testimonials has entries:
 * no invented quotes, names or star ratings, ever.
 */
export function Testimonials() {
  if (!site.showTestimonials || site.testimonials.length === 0) return null;
  return (
    <div className="container-hux mt-20">
      <h3 className="t-h3">What students say</h3>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {site.testimonials.map((t) => (
          <li key={t.name} className="rounded-[28px] border border-line bg-paper p-7 shadow-warm-sm">
            <blockquote className="text-[16px] leading-[1.6] text-ink-2">&ldquo;{t.quote}&rdquo;</blockquote>
            <p className="mt-4 text-[14px] font-semibold text-charcoal">
              {t.name} <span className="font-normal text-muted">· {t.course}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
