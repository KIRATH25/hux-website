/**
 * Which download experience a visitor gets. Runs in the browser only (after the page has loaded), so the
 * server-rendered page is always the plain download link and there is no hydration mismatch.
 */
export type Device = "android" | "android-inapp" | "ios" | "desktop";

const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Snapchat|LinkedInApp/i;
// A plain Android WebView ("; wv)") cannot save files either.
const ANDROID_WEBVIEW = /;\s*wv\)/i;

export function detectDevice(ua: string, opts: { platform?: string; maxTouchPoints?: number } = {}): Device {
  // iPadOS reports itself as a Mac; a Mac with a touch screen is an iPad.
  const isIOS = /iPhone|iPad|iPod/i.test(ua) || (opts.platform === "MacIntel" && (opts.maxTouchPoints ?? 0) > 1);
  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return IN_APP.test(ua) || ANDROID_WEBVIEW.test(ua) ? "android-inapp" : "android";
  return "desktop";
}
