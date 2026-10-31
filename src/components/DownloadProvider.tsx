"use client";

import { Check, Copy, EllipsisVertical } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { apkMetaLine, site } from "@/config/site";
import { useBrowserValue } from "@/lib/client";
import { detectDevice, type Device } from "@/lib/device";
import { Dialog } from "./Dialog";
import { InstallSteps } from "./InstallSteps";


type Sheet = "started" | "inapp" | "ios" | "desktop" | "steps" | null;

type Ctx = {
  /** null until the page has loaded in the browser (the server never guesses) */
  device: Device | null;
  qr: string;
  downloadUrl: string;
  open: (sheet: Exclude<Sheet, null>) => void;
};

const DownloadCtx = createContext<Ctx | null>(null);

export function useDownload() {
  const ctx = useContext(DownloadCtx);
  if (!ctx) throw new Error("useDownload needs <DownloadProvider>");
  return ctx;
}

/**
 * Holds what the download buttons need (the device, the QR code) and renders the four sheets once for the whole site:
 * "Download started" (Android), "Open in Chrome" (in-app browsers), "coming soon" (iPhone) and the QR modal (desktop).
 */
export function DownloadProvider({ qr, downloadUrl, children }: { qr: string; downloadUrl: string; children: ReactNode }) {
  const device = useBrowserValue<Device | null>(
    () => detectDevice(navigator.userAgent, { platform: navigator.platform, maxTouchPoints: navigator.maxTouchPoints }),
    null,
  );
  const [sheet, setSheet] = useState<Sheet>(null);

  const close = useCallback(() => setSheet(null), []);
  const value = useMemo<Ctx>(
    () => ({
      device,
      qr,
      downloadUrl,
      open: (s) => setSheet(s),
    }),
    [device, qr, downloadUrl],
  );

  return (
    <DownloadCtx.Provider value={value}>
        {children}

        <Dialog open={sheet === "started"} onClose={close} title="Download started">
          <p className="text-[15px] leading-[1.55] text-ink-2">
            {site.apk.fileName} is saving to your Downloads ({site.apk.sizeMB} MB). Then:
          </p>
          <div className="mt-5">
            <InstallSteps compact />
          </div>
          <p className="mt-6 text-[15px] text-ink-2">
            Didn&apos;t start?{" "}
            <a href={site.apk.url} download={site.apk.fileName} className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
              Tap here
            </a>
          </p>
        </Dialog>

        <Dialog open={sheet === "steps"} onClose={close} title="How to install">
          <p className="text-[15px] leading-[1.55] text-ink-2">HUX is not on the Play Store yet, so you install the APK file yourself. It takes about a minute.</p>
          <div className="mt-5">
            <InstallSteps compact />
          </div>
        </Dialog>

        <Dialog open={sheet === "inapp"} onClose={close} title="Open this page in Chrome to download">
          <p className="text-[15px] leading-[1.55] text-ink-2">
            Apps like Instagram, Facebook and Snapchat often block file downloads inside their browser. Open this page in Chrome and tap Download there.
          </p>
          <ol className="mt-5 space-y-3 text-[15px] text-charcoal">
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sunflower">
                <EllipsisVertical size={20} strokeWidth={1.75} />
              </span>
              Tap the menu (top right)
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-sunflower text-[13px] font-bold">2</span>
              Choose &ldquo;Open in Chrome&rdquo; (or &ldquo;Open in browser&rdquo;)
            </li>
          </ol>
          <CopyLink />
        </Dialog>

        <Dialog open={sheet === "ios"} onClose={close} title="iPhone version coming soon">
          <p className="text-[15px] leading-[1.55] text-ink-2">
            HUX is an Android app for now, and the Android file cannot run on an iPhone or iPad. Have an Android phone? Open this page on it.
          </p>
          <CopyLink />
        </Dialog>

        <Dialog open={sheet === "desktop"} onClose={close} title="Get HUX on your phone" variant="modal">
          <div className="mx-auto mt-2 w-full max-w-[260px] overflow-hidden rounded-[20px] border border-line bg-ivory p-2" dangerouslySetInnerHTML={{ __html: qr }} />
          <p className="mt-4 text-center text-[16px] font-semibold text-charcoal">Scan with your Android phone&apos;s camera</p>
          <p className="mt-1 text-center text-[13px] text-muted break-all">{downloadUrl}</p>
          <p className="mt-5 text-center text-[14px] text-ink-2">
            <a href={site.apk.url} download={site.apk.fileName} className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
              Download the APK to this computer instead
            </a>
            <span className="mt-1 block text-[12px] text-muted">{apkMetaLine()}</span>
          </p>
        </Dialog>
      </DownloadCtx.Provider>
  );
}

/** Copies the current page address; falls back to a selectable field where the clipboard is blocked (in-app browsers). */
function CopyLink() {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const href = useBrowserValue(() => window.location.href, "");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setState("copied");
    } catch {
      setState("manual");
    }
  };
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={copy}
        data-autofocus
        className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 text-[16px] font-semibold text-ivory transition-transform active:scale-[0.98]"
      >
        {state === "copied" ? <Check size={19} strokeWidth={1.75} /> : <Copy size={19} strokeWidth={1.75} />}
        {state === "copied" ? "Link copied" : "Copy link"}
      </button>
      {state === "manual" ? (
        <input
          readOnly
          value={href}
          onFocus={(e) => e.currentTarget.select()}
          aria-label="Page link"
          className="mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-charcoal"
        />
      ) : null}
    </div>
  );
}
