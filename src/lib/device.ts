/**
 * Which download experience a visitor gets. Runs in the browser only (after the page has loaded), so the
 * server-rendered page is always the plain download link and there is no hydration mismatch.
 *  - android        the APK
 *  - android-inapp  "Open in Chrome" (Instagram & co. block file downloads)
 *  - ios            the iPhone version: the web app, opened in Safari and added to the Home Screen
 *  - ios-inapp      "Open in Safari" (Instagram & co. cannot add to the Home Screen)
 *  - desktop        the QR code
 */
export type Device = "android" | "android-inapp" | "ios" | "ios-inapp" | "desktop";

const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Snapchat|LinkedInApp/i;
// A plain Android WebView ("; wv)") cannot save files either.
const ANDROID_WEBVIEW = /;\s*wv\)/i;

export function detectDevice(ua: string, opts: { platform?: string; maxTouchPoints?: number } = {}): Device {
  // iPadOS reports itself as a Mac; a Mac with a touch screen is an iPad.
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (opts.platform === "MacIntel" && (opts.maxTouchPoints ?? 0) > 1);
  if (isIOS) return IN_APP.test(ua) ? "ios-inapp" : "ios";
  if (/Android/i.test(ua)) return IN_APP.test(ua) || ANDROID_WEBVIEW.test(ua) ? "android-inapp" : "android";
  return "desktop";
}

export const isIos = (d: Device | null) => d === "ios" || d === "ios-inapp";
