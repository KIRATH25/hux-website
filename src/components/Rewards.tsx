import { site, withBase } from "@/config/site";
import { HandNote, Sparkle } from "./HandDrawn";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const coins = (n: number) => n.toLocaleString("en-IN");

/** Coins per deal (Free vs Premium) on the left, the merch you can spend them on on the right. Every number comes from site.ts. */
export function Rewards() {
  const c = site.coins;
  const rows = [
    ["You sell something", c.free.sell, c.premium.sell],
    ["You buy something", c.free.buy, c.premium.buy],
    ["An exchange (no money)", c.free.exchange, c.premium.exchange],
  ] as const;

  return (
    <section id="rewards" aria-labelledby="rewards-title" className="section scroll-mt-20">
      <div className="container-hux">
        <div className="max-w-[760px]" data-reveal>
          <p className="t-eyebrow">Rewards</p>
          <h2 id="rewards-title" className="t-h2 relative mt-4 inline-block pr-10">
            Every deal earns you HUX coins.
            <Sparkle className="absolute -top-2 right-0 size-8" delay={300} />
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.95fr_1.25fr] lg:gap-14">
          {/* coins table */}
          <div data-reveal>
            <div className="overflow-hidden rounded-[28px] border border-line bg-paper shadow-warm-sm">
              <table className="w-full text-left">
                <caption className="sr-only">HUX coins earned per completed deal</caption>
                <thead>
                  <tr className="border-b border-line text-[13px] font-semibold uppercase tracking-[0.12em] text-muted">
                    <th scope="col" className="px-6 py-4 font-semibold">Per completed deal</th>
                    <th scope="col" className="px-4 py-4 text-right font-semibold">Free</th>
                    <th scope="col" className="bg-sunflower-soft px-6 py-4 text-right font-semibold text-charcoal">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, free, prem]) => (
                    <tr key={label} className="border-b border-line last:border-0">
                      <th scope="row" className="px-6 py-5 text-[16px] font-medium text-charcoal">{label}</th>
                      <td className="px-4 py-5 text-right text-[17px] font-semibold tabular-nums text-ink-2">{free}</td>
                      <td className="bg-sunflower-soft px-6 py-5 text-right text-[17px] font-bold tabular-nums text-charcoal">{prem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-6 space-y-3 text-[16px] leading-[1.55] text-ink-2">
              <li className="flex gap-3">
                <Sparkle className="mt-1 size-4 shrink-0" fill="#F4D35E" />
                <span>
                  <strong className="font-semibold text-charcoal">+{c.premiumBonus} coins</strong> every time you pay for Premium.
                </span>
              </li>
              <li className="flex gap-3">
                <Sparkle className="mt-1 size-4 shrink-0" fill="#F4D35E" />
                <span>
                  Invite friends with your referral code: you both get <strong className="font-semibold text-charcoal">{c.referral.free} coins</strong> once their ID is approved
                  ({c.referral.premiumReferrer} if you have Premium).
                </span>
              </li>
            </ul>
            <p className="mt-4 text-[13px] text-muted">Daily and per-person limits apply, so coins reward real deals.</p>
          </div>

          {/* merch */}
          <div className="min-w-0" data-reveal style={{ ["--d" as string]: "120ms" }}>
            <div className="flex items-end justify-between gap-4">
              <h3 className="t-h3">Spend them on HUX merch</h3>
              <HandNote rotate={-3} className="hidden !text-[24px] sm:block">
                pay in coins, rupees or both
              </HandNote>
            </div>
            <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-0 sm:px-0" aria-label="HUX merch">
              {site.merch.map((m) => (
                <li key={m.id} className="w-[220px] shrink-0 snap-start sm:w-[240px]">
                  <figure className="overflow-hidden rounded-[24px] border border-line bg-paper shadow-warm-sm">
                    <div className="relative aspect-[4/5] bg-ivory-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={withBase(`/merch/${m.images[0]}`)} alt={m.alt} width={800} height={1000} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                      <span className="absolute left-3 top-3 rotate-[-3deg] rounded-full bg-charcoal px-2.5 py-1 text-[12px] font-semibold text-sunflower">
                        Premium: {site.pricing.premiumMerchDiscountPct}% off
                      </span>
                    </div>
                    <figcaption className="p-4">
                      <p className="text-[15px] font-semibold text-charcoal">{m.name}</p>
                      <p className="mt-1 text-[14px] text-ink-2">
                        <span className="font-semibold text-charcoal">{inr(m.priceINR)}</span> or {coins(m.priceCoins)} coins
                      </p>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
