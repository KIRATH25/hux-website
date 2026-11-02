import { Sparkles } from "lucide-react";
import { site } from "@/config/site";

/** A thin bar at the top of every page with news (site.announcement). Hidden when the text is empty. */
export function AnnouncementBar() {
  if (!site.announcement) return null;
  return (
    <div role="status" className="bg-charcoal text-ivory">
      <p className="container-hux flex items-center justify-center gap-2 py-2.5 text-center text-[13px] font-medium leading-snug sm:text-[14px]">
        <Sparkles size={15} strokeWidth={2} className="shrink-0 text-sunflower" aria-hidden="true" />
        <span>{site.announcement}</span>
      </p>
    </div>
  );
}
