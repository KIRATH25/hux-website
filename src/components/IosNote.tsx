"use client";

import Link from "next/link";
import { useDownload } from "./DownloadProvider";

/** "On iPhone? Open HUX in Safari" under the hero buttons; hidden on an iPhone, where the button itself already opens it. */
export function IosNote() {
  const { device } = useDownload();
  if (device === "ios" || device === "ios-inapp") return null;
  return (
    <p className="mt-2 text-[13px] text-muted">
      On iPhone?{" "}
      <Link href="/iphone/" className="font-semibold text-charcoal underline underline-offset-2">
        Open HUX in Safari
      </Link>
    </p>
  );
}
