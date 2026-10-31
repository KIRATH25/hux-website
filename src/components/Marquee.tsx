const WORDS = ["Buy", "Sell", "Rent", "Exchange", "Skills", "Services", "Rewards"];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {WORDS.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-6 font-serif text-[38px] italic leading-none text-sunflower sm:px-8 sm:text-[48px]">{w}</span>
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 sm:size-6" aria-hidden="true" focusable="false">
            <path d="M12 1.5 C 12.6 7.6, 15.6 11.2, 22.5 12 C 15.6 12.8, 12.6 16.4, 12 22.5 C 11.4 16.4, 8.4 12.8, 1.5 12 C 8.4 11.2, 11.4 7.6, 12 1.5 Z" fill="#F4D35E" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/** A charcoal band, tilted 1.5 degrees, with the words scrolling forever. Pauses on hover; still for reduced motion. */
export function Marquee() {
  return (
    <div className="relative overflow-hidden py-10" data-dark>
      <div className="marquee -mx-[5%] w-[110%] -rotate-[1.5deg] bg-charcoal py-6 shadow-warm-sm sm:py-7">
        <p className="sr-only">{WORDS.join(", ")}</p>
        <div className="marquee-track flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
