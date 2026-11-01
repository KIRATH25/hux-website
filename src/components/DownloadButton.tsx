"use client";

import { ArrowDown, ArrowUpRight, Share } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { apkMetaLine, site } from "@/config/site";
import { useDownload } from "./DownloadProvider";

type Props = {
  size?: "lg" | "compact";
  /** on a charcoal band the button turns ivory so it stays visible */
  onDark?: boolean;
  /** the "Free · v1.0.1 · 98 MB · Android 6.0+" line under the button */
  showMeta?: boolean;
  className?: string;
};

/**
 * The one download button used everywhere. Without JavaScript it is a plain link to the APK.
 * In the browser it adapts: Android downloads at once and shows the install steps 600 ms later; an in-app browser
 * (Instagram, Facebook...) gets "Open in Chrome"; an iPhone never gets the APK but "Open HUX on iPhone" (the web app,
 * added to the Home Screen from Safari); inside Instagram on an iPhone it says "Open in Safari"; a computer gets a QR code.
 */
export function DownloadButton({ size = "lg", onDark = false, showMeta = false, className = "" }: Props) {
  const { device, open } = useDownload();
  const compact = size === "compact";

  if (device === "ios" || device === "ios-inapp") {
    const onIosClick = (e: MouseEvent<HTMLAnchorElement>) => {
      // Instagram & co. cannot add to the Home Screen: explain "Open in Safari" first
      if (device === "ios-inapp") {
        e.preventDefault();
        open("ios-inapp");
      }
    };
    return (
      <div className={className}>
        <a
          href={site.ios.url}
          onClick={onIosClick}
          className={`group inline-flex items-center rounded-full font-semibold transition-transform duration-150 active:scale-[0.98] ${
            onDark ? "bg-ivory text-charcoal" : "bg-charcoal text-ivory"
          } ${compact ? "h-11 gap-2.5 pl-4 pr-1.5 text-[14px]" : "h-[56px] gap-4 pl-7 pr-2 text-[16px]"}`}
        >
          <span>{compact ? "Open on iPhone" : "Open HUX on iPhone"}</span>
          <span className={`grid place-items-center rounded-full bg-sunflower text-charcoal ${compact ? "size-8" : "size-11"}`} aria-hidden="true">
            <ArrowUpRight size={compact ? 16 : 20} strokeWidth={1.75} />
          </span>
        </a>
        {showMeta ? (
          <p className={`mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] ${onDark ? "text-ivory/75" : "text-muted"}`}>
            Then tap Share <Share size={14} strokeWidth={2} aria-label="(the Share button)" /> and &ldquo;Add to Home Screen&rdquo;.
            <Link href="/iphone/" className={`font-semibold underline underline-offset-2 ${onDark ? "text-ivory" : "text-charcoal"}`}>
              Step by step
            </Link>
          </p>
        ) : null}
      </div>
    );
  }

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (device === "android") {
      // let the browser download the file, then explain how to install it
      window.setTimeout(() => open("started"), 600);
    } else if (device === "android-inapp") {
      e.preventDefault();
      open("inapp");
    } else if (device === "desktop") {
      e.preventDefault();
      open("desktop");
    }
    // device === null (still loading): the plain link just works
  };

  return (
    <div className={className}>
      <a
        href={site.apk.url}
        download={site.apk.fileName}
        rel="noopener"
        onClick={onClick}
        className={`group inline-flex items-center rounded-full font-semibold transition-transform duration-150 active:scale-[0.98] ${
          onDark ? "bg-ivory text-charcoal" : "bg-charcoal text-ivory"
        } ${compact ? "h-11 gap-2.5 pl-4 pr-1.5 text-[14px]" : "h-[56px] gap-4 pl-7 pr-2 text-[16px]"}`}
      >
        <span>{compact ? "Download" : "Download for Android"}</span>
        <span
          className={`grid place-items-center rounded-full bg-sunflower text-charcoal transition-transform duration-200 group-hover:scale-105 ${compact ? "size-8" : "size-11"}`}
          aria-hidden="true"
        >
          <ArrowDown size={compact ? 16 : 20} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-y-1" />
        </span>
      </a>
      {showMeta ? <p className={`mt-3 text-[13px] ${onDark ? "text-ivory/70" : "text-muted"}`}>{apkMetaLine()}</p> : null}
    </div>
  );
}

/** the secondary "How to install" pill: opens the install steps (the iPhone steps on an iPhone) */
export function HowToInstallButton({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const { device, open } = useDownload();
  return (
    <button
      type="button"
      onClick={() => open(device === "ios" || device === "ios-inapp" ? "ios" : "steps")}
      className={`inline-flex h-[56px] items-center justify-center rounded-full border-[1.5px] px-7 text-[16px] font-semibold transition-transform active:scale-[0.98] ${
        onDark ? "border-ivory text-ivory" : "border-charcoal text-charcoal hover:bg-ivory-2"
      } ${className}`}
    >
      How to install
    </button>
  );
}
