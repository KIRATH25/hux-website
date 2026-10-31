"use client";

import { useDownload } from "./DownloadProvider";

/** The QR code to /download as a small card (final CTA and /download). Made at build time, see src/lib/qr.ts. */
export function QRCodeCard({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const { qr } = useDownload();
  return (
    <figure className={`inline-flex flex-col items-center gap-3 rounded-[24px] p-4 ${onDark ? "bg-ivory" : "border border-line bg-paper shadow-warm-sm"} ${className}`}>
      <div className="w-[148px] overflow-hidden rounded-[14px]" dangerouslySetInnerHTML={{ __html: qr }} />
      <figcaption className="max-w-[160px] text-center text-[13px] font-medium leading-snug text-charcoal">Scan with your Android phone&apos;s camera</figcaption>
    </figure>
  );
}
