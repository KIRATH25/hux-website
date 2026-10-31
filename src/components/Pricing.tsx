import { Check } from "lucide-react";
import { site } from "@/config/site";
import { DownloadButton } from "./DownloadButton";
import { HandNote } from "./HandDrawn";

/** Two honest plans. Premium is raised and outlined in sunflower. Numbers come from site.ts. */
export function Pricing() {
  const p = site.pricing;
  const c = site.coins;
  const plans = [
    {
      name: "Free",
      price: "₹0",
      per: "",
      lead: `${p.freeDealsPerMonth} deals every month, free.`,
      points: ["Buy, sell, rent and exchange", `Earn coins on every deal (${c.free.sell} per sale or purchase)`, "Verified GLA students only"],
      note: "",
      premium: false,
    },
    {
      name: "Premium",
      price: `₹${p.premiumPrice}`,
      per: "/ month",
      lead: "For students who trade a lot.",
      points: [
        "Unlimited deals",
        `More coins per deal (${c.premium.sell} per sale or purchase)`,
        `+${c.premiumBonus} bonus coins each time you pay`,
        `${p.premiumMerchDiscountPct}% off HUX merch`,
      ],
      note: `Pay once a month (a pass lasts ${p.premiumDays} days) by UPI inside the app. No auto-debit.`,
      premium: true,
    },
  ];

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section scroll-mt-20 bg-ivory-2/60">
      <div className="container-hux">
        <div className="mx-auto max-w-[640px] text-center" data-reveal>
          <p className="t-eyebrow">Pricing</p>
          <h2 id="pricing-title" className="t-h2 mt-4">
            Simple, and free to start.
          </h2>
          <p className="t-body mx-auto mt-4">HUX never takes a commission on your deals. Premium is only for when you want more.</p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-[900px] items-end gap-6 md:grid-cols-2">
          {plans.map((plan, i) => (
            <li
              key={plan.name}
              data-reveal
              style={{ ["--d" as string]: `${i * 60}ms` }}
              className={`relative flex flex-col rounded-[28px] bg-paper p-8 ${
                plan.premium ? "border-[3px] border-sunflower shadow-warm md:-translate-y-4 md:p-10" : "border border-line shadow-warm-sm"
              }`}
            >
              {plan.premium ? (
                <span className="absolute -top-4 left-8 rotate-[-2deg] rounded-full bg-charcoal px-4 py-1.5 text-[13px] font-semibold text-sunflower">Most coins</span>
              ) : null}
              <h3 className="t-h3">{plan.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-[64px] leading-none text-charcoal">{plan.price}</span>
                {plan.per ? <span className="text-[16px] font-medium text-muted">{plan.per}</span> : null}
              </p>
              <p className="mt-3 text-[16px] font-medium text-charcoal">{plan.lead}</p>
              <ul className="mt-6 space-y-3">
                {plan.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-[1.5] text-ink-2">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sunflower text-charcoal">
                      <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              {plan.note ? <p className="mt-6 rounded-2xl bg-sunflower-soft px-4 py-3 text-[14px] leading-[1.5] text-charcoal">{plan.note}</p> : null}
              <DownloadButton className="mt-8" />
            </li>
          ))}
        </ul>
        <HandNote rotate={-2} className="mt-10 text-center">
          More skills, more freedom
        </HandNote>
      </div>
    </section>
  );
}
