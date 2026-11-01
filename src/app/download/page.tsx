import type { Metadata } from "next";
import Link from "next/link";
import { site, withBase } from "@/config/site";
import { Accordion } from "@/components/Accordion";
import { DownloadButton } from "@/components/DownloadButton";
import { HandArrow, HandNote } from "@/components/HandDrawn";
import { InstallSteps } from "@/components/InstallSteps";
import { PageHeader } from "@/components/PageHeader";
import { QRCodeCard } from "@/components/QRCodeCard";

export const metadata: Metadata = {
  title: "Download for Android",
  description: `Download the HUX Android app (APK, ${site.apk.sizeMB} MB, Android ${site.apk.minAndroid}+) and install it in five steps.`,
  alternates: { canonical: withBase("/download/") },
};

/** The page the QR code opens: the button, version details, the install steps, troubleshooting and the checksum. */
export default function DownloadPage() {
  const a = site.apk;
  const details = [
    ["Version", a.version],
    ["Size", `${a.sizeMB} MB`],
    ["Needs", `Android ${a.minAndroid} or newer`],
    ["Updated", a.updated],
    ["File", a.fileName],
  ];
  const trouble = [
    {
      q: '"App not installed"',
      a: `If an older HUX was installed from somewhere else, uninstall it first. Also check that your phone has at least ${a.freeSpaceMB} MB free.`,
    },
    { q: '"Download blocked" or nothing happens', a: "You are probably inside Instagram, Facebook or another app's browser. Tap the menu (⋮) and choose Open in Chrome, then download again." },
    {
      q: 'Chrome says "This type of file can harm your device"',
      a: 'Chrome shows this for every app file that does not come from the Play Store. Tap "Download anyway". Only do this for HUX downloaded from this website.',
    },
    { q: "How do I update?", a: "Download the new APK from this page and install it over the old one. Your account and data stay." },
    {
      q: "Is it safe?",
      a: (
        <>
          Only download HUX from this website. You can check that your file is the real one: its SHA-256 checksum is{" "}
          <code className="break-all rounded bg-ivory-2 px-1.5 py-0.5 font-mono text-[13px] text-charcoal">{a.sha256}</code>.
        </>
      ),
    },
  ];

  return (
    <main id="main">
      <PageHeader eyebrow="Download" title="HUX for Android" underline="Android" lead="Free to download. HUX is not on the Play Store yet, so you install the app file (APK) yourself. It takes about a minute." />

      <section className="container-hux pb-6">
        <div className="grid gap-8 rounded-[28px] border border-line bg-paper p-6 shadow-warm-sm md:p-10 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
          <div>
            <DownloadButton showMeta />
            <HandNote rotate={-3} className="mt-6 !text-[24px]">
              then follow the steps below
            </HandNote>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px]">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="font-semibold text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="hidden items-center gap-2 lg:flex">
            <HandArrow variant="loop" className="w-[90px]" />
            <QRCodeCard />
          </div>
        </div>
        <p className="mt-4 rounded-2xl bg-ivory-2 px-5 py-4 text-[15px] leading-[1.6] text-ink-2">
          On an iPhone? HUX works there too, without the App Store: open it in Safari and add it to your Home Screen.{" "}
          <Link href="/iphone/" className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
            HUX on iPhone
          </Link>
        </p>
      </section>

      <section id="install" aria-labelledby="install-title" className="container-hux scroll-mt-24 py-16 lg:py-24">
        <div data-reveal>
          <p className="t-eyebrow">Install in five steps</p>
          <h2 id="install-title" className="t-h2 mt-4">
            How to install
          </h2>
        </div>
        <div className="mt-10" data-reveal style={{ ["--d" as string]: "100ms" }}>
          <InstallSteps />
        </div>
        <p className="t-body mt-10 text-ink-2" data-reveal>
          Installed and approved? Add your UPI ID next, so buyers can pay you:{" "}
          <Link href="/upi/" className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
            Get paid with UPI
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="trouble-title" className="container-hux grid gap-10 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <p className="t-eyebrow">Troubleshooting</p>
          <h2 id="trouble-title" className="t-h2 mt-4">
            Something not working?
          </h2>
          <p className="t-body mt-4 text-ink-2">
            Still stuck? Email{" "}
            <a href={`mailto:${site.contact.email}`} className="font-semibold text-charcoal underline decoration-sunflower decoration-[3px] underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
        <div data-reveal style={{ ["--d" as string]: "100ms" }}>
          <Accordion items={trouble} defaultOpen={null} />
        </div>
      </section>
    </main>
  );
}
