import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HandArrow, HandNote } from "@/components/HandDrawn";
import { Hexagon } from "@/components/Hexagon";

export default function NotFound() {
  return (
    <main id="main" className="container-hux relative flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden py-24 text-center">
      <Hexagon tone="soft" className="pointer-events-none absolute left-1/2 top-1/2 w-[min(520px,90vw)] -translate-x-1/2 -translate-y-1/2" />
      <div className="relative">
        <p className="t-eyebrow">Error 404</p>
        <h1 className="t-h1 mt-4">This page is not on campus.</h1>
        <p className="t-body mx-auto mt-5 text-ink-2">The link may be old, or the page has moved.</p>
        <div className="mt-10 flex items-center justify-center gap-2">
          <HandNote rotate={-4} className="!text-[24px]">
            this way
          </HandNote>
          <HandArrow variant="right" className="w-[80px] rotate-[-30deg]" />
          <Link
            href="/"
            className="group inline-flex h-[56px] items-center gap-4 rounded-full bg-charcoal pl-7 pr-2 text-[16px] font-semibold text-ivory transition-transform active:scale-[0.98]"
          >
            Back to home
            <span className="grid size-11 place-items-center rounded-full bg-sunflower text-charcoal transition-transform group-hover:scale-105" aria-hidden="true">
              <ArrowRight size={20} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
