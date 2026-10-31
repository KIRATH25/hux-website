import { ScribbleUnderline } from "./HandDrawn";

/** The top of the inner pages: eyebrow, serif title (one word underlined) and an optional line. */
export function PageHeader({ eyebrow, title, underline, lead, updated }: { eyebrow: string; title: string; underline?: string; lead?: string; updated?: string }) {
  const parts = underline ? title.split(underline) : [title];
  return (
    <header className="container-hux pb-6 pt-10 lg:pt-16">
      <p className="t-eyebrow">{eyebrow}</p>
      <h1 className="t-h1 mt-5 max-w-[16ch] !text-[44px] lg:!text-[72px]">
        {parts[0]}
        {underline ? (
          <span className="relative isolate inline-block">
            {underline}
            <ScribbleUnderline className="absolute -bottom-[0.08em] left-0 -z-10 h-[0.22em] w-full" delay={250} />
          </span>
        ) : null}
        {parts[1] ?? ""}
      </h1>
      {lead ? <p className="t-body mt-5 text-ink-2">{lead}</p> : null}
      {updated ? <p className="mt-4 text-[14px] text-muted">Last updated: {updated}</p> : null}
    </header>
  );
}
