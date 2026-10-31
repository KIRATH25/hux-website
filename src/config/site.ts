/**
 * Everything on the site that can change lives here: links, version, prices, numbers and contact details.
 * Components read from this file and never hard-code these values.
 *
 * Empty string = not given yet. Those items show a visible "TODO" marker (or are hidden where the brief says so)
 * and are listed at the end of each phase report. Nothing here is invented.
 */

export type MerchItem = {
  id: string;
  name: string;
  /** file names in public/merch/ (WebP, made from E:\hux\design\merch by scripts/prepare-assets.mjs) */
  images: string[];
  alt: string;
  priceINR: number;
  priceCoins: number;
  gender: "men" | "women" | "all";
};

export type Screen = {
  /** public/screens/<file>.webp, 1080x2400. Empty = not supplied yet: PhoneFrame shows a neutral placeholder. */
  src: string;
  label: string;
  alt: string;
};

export const site = {
  name: "HUX",
  fullName: "Human Utility eXchange",
  brand: "Feelfinity",
  tagline: "Campus exchange for GLA University students",

  /**
   * The live address, e.g. "https://hux-website.pages.dev" or your own domain. Set NEXT_PUBLIC_SITE_URL in Cloudflare Pages
   * (see DEPLOY.md). Empty = local preview: the QR code then points at this computer's network address.
   */
  domain: (process.env.NEXT_PUBLIC_SITE_URL ?? "") as string,

  apk: {
    /**
     * Local preview: "/HUX.apk" is copied from E:\hux\apk when you run `npm run dev` (it is never deployed).
     * Live site: set NEXT_PUBLIC_APK_URL to the GitHub Releases link, e.g.
     * https://github.com/KIRATH25/hux-releases/releases/latest/download/HUX.apk (see DEPLOY.md).
     */
    url: process.env.NEXT_PUBLIC_APK_URL || "/HUX.apk",
    fileName: "HUX.apk",
    version: "1.0.0", // apps/mobile/app.json
    sizeMB: 98, // 98,299,884 bytes (EAS build fc53ba0b, 31 Oct 2026)
    minAndroid: "6.0", // minSdkVersion 23
    updated: "31 Oct 2026",
    sha256: "77cbf692ffef2cca866bccfc94ecf5718903e5efb9b9b0d1949e49b90dee0f10",
    freeSpaceMB: 200,
  },

  ios: { status: "coming-soon" as const },

  pricing: {
    /** free deals every calendar month (completed deals, as buyer or seller; the count resets on the 1st) */
    freeDealsPerMonth: 5,
    premiumPrice: 79,
    premiumDays: 30,
    premiumMerchDiscountPct: 10,
  },

  coins: {
    free: { exchange: 2, sell: 5, buy: 5 },
    premium: { exchange: 5, sell: 10, buy: 10 },
    premiumBonus: 20,
    referral: { free: 10, premiumReferrer: 15 },
  },

  // Prices as first set up in the app's database (supabase/migrations/20261128120000_hux_merch.sql).
  // TODO-CONFIRM: if an admin changed them in the app, update them here.
  merch: [
    {
      id: "men-tee",
      name: "HUX T-shirt (Men)",
      images: ["men-tee-black-1.webp", "men-tee-white-1.webp"],
      alt: "Black HUX T-shirt for men with the hexagon logo",
      priceINR: 799,
      priceCoins: 2000,
      gender: "men",
    },
    {
      id: "women-tee",
      name: "HUX T-shirt (Women)",
      images: ["women-tee-black-1.webp", "women-tee-white-1.webp"],
      alt: "Black HUX T-shirt for women with the hexagon logo",
      priceINR: 799,
      priceCoins: 2000,
      gender: "women",
    },
    {
      id: "stickers",
      name: "HUX Sticker pack (5)",
      images: ["stickers-1.webp", "stickers-2.webp"],
      alt: "Five HUX stickers",
      priceINR: 399,
      priceCoins: 1500,
      gender: "all",
    },
    {
      id: "hamper",
      name: "The HUX Hamper (10 items)",
      images: ["hamper-1.webp", "hamper-2.webp"],
      alt: "The HUX gift hamper with ten items",
      priceINR: 499,
      priceCoins: 1500,
      gender: "all",
    },
  ] satisfies MerchItem[],

  // Real screenshots of the app (1080x2400). The signed-out screens were captured from the app itself by
  // scripts/capture-app.mjs. Signed-in screens need a phone: until then PhoneFrame shows "Screenshot: <label>".
  screens: {
    onboarding1: { src: "/screens/onboarding-1.webp", label: "Have something useful?", alt: "HUX welcome screen: lend gear, swap skills, only for GLA students" },
    onboarding2: { src: "/screens/onboarding-2.webp", label: "Need something?", alt: "HUX screen listing tutoring, gear rentals, project teammates and community aid" },
    onboarding3: { src: "/screens/onboarding-3.webp", label: "Ask in plain words", alt: "HUX screen explaining how to ask for what you need" },
    signup: { src: "/screens/signup.webp", label: "Sign up", alt: "HUX sign-up screen for GLA University e-mail addresses only" },
    home: { src: "", label: "Home", alt: "HUX home screen" }, // TODO: from a phone
    listing: { src: "", label: "Listing", alt: "A listing in HUX" }, // TODO
    pay: { src: "", label: "Pay seller", alt: "Paying the seller by UPI in HUX" }, // TODO
    chat: { src: "", label: "Chat", alt: "A chat between buyer and seller in HUX" }, // TODO
    handover: { src: "", label: "Handover code", alt: "The meeting point and one-time handover code in HUX" }, // TODO
    points: { src: "", label: "Points", alt: "HUX coins and rewards screen" }, // TODO
  } satisfies Record<string, Screen>,

  contact: {
    email: "kirathkumarsharma@gmail.com" as string,
    instagram: "" as string, // none: the Instagram icon stays hidden
  },

  team: {
    name: "Team 100",
    university: "GLA University, Mathura",
    // names only: the members' personal e-mail addresses are not published on the site
    members: ["Soumya Upadhyay", "Kirath Kumar Sharma", "Urvashi Gupta"] as string[],
    guide: "" as string, // not given: the line is hidden
  },

  /**
   * The five phones in "Designed to feel simple" (centre = the middle one). Real screens first; swap in
   * "home", "listing", "pay", "chat", "points" as soon as their screenshots exist.
   */
  showcase: [
    { screen: "signup", caption: "sign up with your GLA email" },
    { screen: "onboarding2", caption: "find what you need" },
    { screen: "onboarding1", caption: "lend, rent or swap" },
    { screen: "onboarding3", caption: "ask in plain words" },
    { screen: "points", caption: "earn coins on every deal" },
  ] as { screen: "onboarding1" | "onboarding2" | "onboarding3" | "signup" | "home" | "listing" | "pay" | "chat" | "handover" | "points"; caption: string }[],

  /** Real student feedback only (name, course, quote). Shown when showTestimonials is true. */
  testimonials: [] as { name: string; course: string; quote: string }[],

  /** No delete button in the app (not wanted for now): /delete-account offers an e-mail request instead. */
  inAppAccountDeletion: false,

  /** the brand's own lines from the HUX sticker sheets, used as handwritten notes */
  slogans: ["Your skills have value", "Better people, bigger possibilities", "Think. Build. Exchange.", "More skills, more freedom"],

  showTestimonials: false, // stays false until there is REAL student feedback

  /** in-app browsers that usually block file downloads */
  inAppBrowsers: ["Instagram", "FBAN", "FBAV", "FB_IAB", "Snapchat", "LinkedInApp"],
} as const;

/** "Free · v1.0.0 · 98 MB · Android 6.0+" */
export const apkMetaLine = () => `Free · v${site.apk.version} · ${site.apk.sizeMB} MB · Android ${site.apk.minAndroid}+`;

export const isSet = (value: string | undefined | null) => typeof value === "string" && value.trim() !== "";
