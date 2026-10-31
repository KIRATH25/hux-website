import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Serif, Inter } from "next/font/google";
import { site } from "@/config/site";
import { DownloadProvider } from "@/components/DownloadProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { downloadPageUrl } from "@/lib/download-url";
import { qrSvg } from "@/lib/qr";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-caveat", display: "swap" });

const title = `${site.name}: ${site.tagline}`;
const description =
  "HUX lets verified GLA University students buy, sell, rent and swap things, skills and time with each other. No strangers. No middlemen. Download the Android app.";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain || "http://localhost:3100"),
  title: { default: title, template: `%s · ${site.name}` },
  description,
  applicationName: site.name,
  openGraph: { title, description, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Built once per build (or per request in dev): the QR the desktop modal shows, pointing at /download.
  const downloadUrl = downloadPageUrl();
  const qr = await qrSvg(downloadUrl);
  return (
    <html lang="en-IN" className={`${inter.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        {/* Motion styles only apply once JS runs, so the page is fully readable without it.
            suppressHydrationWarning: some browser extensions (pop-up/ad blockers) rewrite the first <script> in <head>
            before React loads; React must not treat that as an error. If an extension blanks it, the page simply
            shows without animations. */}
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <DownloadProvider qr={qr} downloadUrl={downloadUrl}>
          {children}
        </DownloadProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
