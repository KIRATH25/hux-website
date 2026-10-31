import { site } from "@/config/site";

/**
 * The five install steps (01-05), each with a small drawing of a phone screen in the HUX theme.
 * These are simple illustrations, not screenshots of Android settings. Used in the "Download started" sheet and on /download.
 */
export const INSTALL_STEPS = [
  {
    title: "Download",
    text: `Tap "Download for Android". If Chrome says the file may be harmful, tap "Download anyway". ${site.apk.fileName} saves to your Downloads.`,
  },
  {
    title: "Open the file",
    text: `Tap the download notification, or open Files → Downloads → ${site.apk.fileName}.`,
  },
  {
    title: "Allow install, one time",
    text: 'If Android says your phone "is not allowed to install unknown apps from this source", tap Settings, turn on "Allow from this source", then go back.',
  },
  {
    title: "Play Protect message",
    text: 'If you see "App scanned by Play Protect" or "Unrecognised developer", tap More details → Install anyway. This appears because HUX is not on the Play Store yet, so Google does not know the developer. It is the same app we are publishing.',
  },
  {
    title: "Open HUX",
    text: "Sign up with your GLA email, upload your college ID, and wait for an admin to approve you.",
  },
] as const;

export function InstallSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "space-y-4" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
      {INSTALL_STEPS.map((s, i) => (
        <li
          key={s.title}
          className={
            compact
              ? "flex items-start gap-4"
              : "flex flex-col gap-4 rounded-[28px] border border-line bg-paper p-5 shadow-warm-sm"
          }
        >
          <div className={compact ? "w-[64px] shrink-0" : "flex items-center justify-between"}>
            {compact ? null : <StepNumber n={i + 1} />}
            <StepArt step={i + 1} className={compact ? "h-[80px] w-[64px]" : "h-[112px] w-[90px]"} />
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-[17px] font-semibold text-charcoal">
              {compact ? <span className="font-mono text-[13px] font-semibold text-muted">0{i + 1}</span> : null}
              {s.title}
            </h3>
            <p className="mt-1 text-[15px] leading-[1.55] text-ink-2">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StepNumber({ n }: { n: number }) {
  return (
    <span className="grid size-11 place-items-center rounded-full bg-sunflower text-[15px] font-bold text-charcoal">
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** little phone-screen drawings, one per step */
export function StepArt({ step, className }: { step: number; className?: string }) {
  const ink = "#171717";
  const sun = "#F4D35E";
  const paper = "#FFFDF7";
  const line = { fill: "none", stroke: ink, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 90 112" className={className} aria-hidden="true" focusable="false">
      {/* phone */}
      <rect x="6" y="3" width="78" height="106" rx="14" fill={paper} stroke={ink} strokeWidth="2.2" />
      <circle cx="45" cy="11" r="2.2" fill={ink} />
      {step === 1 ? (
        <>
          <circle cx="45" cy="46" r="18" fill={sun} />
          <path {...line} d="M45 34 V 56 M 37 49 L 45 57 L 53 49" />
          <rect x="22" y="76" width="46" height="16" rx="8" fill={paper} stroke={ink} strokeWidth="2" />
          <text x="45" y="87.5" textAnchor="middle" fontSize="9" fontWeight="700" fill={ink} fontFamily="Inter, sans-serif">HUX.apk</text>
        </>
      ) : null}
      {step === 2 ? (
        <>
          <rect x="14" y="22" width="62" height="24" rx="7" fill={paper} stroke={ink} strokeWidth="2" />
          <rect x="19" y="27" width="14" height="14" rx="3" fill={sun} />
          <path {...line} strokeWidth={2} d="M38 31 H 68 M 38 37 H 58" />
          <path {...line} d="M30 66 h 12 l 4 5 h 14 v 22 h -30 z" fill={sun} />
          <path {...line} d="M45 52 c 0 6 0 8 6 12" />
        </>
      ) : null}
      {step === 3 ? (
        <>
          <path {...line} strokeWidth={2} d="M16 28 H 74 M 16 36 H 60" />
          <rect x="14" y="52" width="62" height="24" rx="8" fill={paper} stroke={ink} strokeWidth="2" />
          <path {...line} strokeWidth={2} d="M20 61 H 44 M 20 67 H 38" />
          <rect x="50" y="58" width="20" height="12" rx="6" fill={sun} stroke={ink} strokeWidth="2" />
          <circle cx="64" cy="64" r="4" fill={ink} />
          <path {...line} d="M24 92 l 6 -6 M 24 92 l 6 6 M 24 92 H 42" />
        </>
      ) : null}
      {step === 4 ? (
        <>
          <path {...line} d="M45 22 l 20 7 v 16 c 0 13 -9 21 -20 26 c -11 -5 -20 -13 -20 -26 v -16 z" fill={sun} />
          <path {...line} d="M36 46 l 6 6 l 12 -13" />
          <rect x="18" y="82" width="54" height="15" rx="7.5" fill={ink} />
          <text x="45" y="92.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill={paper} fontFamily="Inter, sans-serif">Install anyway</text>
        </>
      ) : null}
      {step === 5 ? (
        <>
          <rect x="25" y="28" width="40" height="40" rx="11" fill={ink} />
          <polygon points="45,35 55.4,41 55.4,55 45,61 34.6,55 34.6,41" fill="none" stroke={sun} strokeWidth="2.6" strokeLinejoin="round" />
          <path {...line} d="M30 84 H 60 M 35 92 H 55" />
        </>
      ) : null}
    </svg>
  );
}
