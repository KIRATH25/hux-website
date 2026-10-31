"use client";

import { useDownload } from "./DownloadProvider";

/** "iPhone: coming soon" under the hero buttons; hidden on an iPhone, where the button itself already says it. */
export function IosNote() {
  const { device } = useDownload();
  if (device === "ios") return null;
  return <p className="mt-2 text-[13px] text-muted">iPhone: coming soon</p>;
}
