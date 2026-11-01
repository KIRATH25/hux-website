"use client";

import { useEffect } from "react";
import { withBase } from "@/config/site";
import { detectDevice } from "@/lib/device";

/** On the /iphone/ page: Android visitors use the APK, so they go straight to the download page. */
export function AndroidToDownload() {
  useEffect(() => {
    const d = detectDevice(navigator.userAgent, { platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints });
    if (d === "android" || d === "android-inapp") window.location.replace(withBase("/download/"));
  }, []);
  return null;
}
