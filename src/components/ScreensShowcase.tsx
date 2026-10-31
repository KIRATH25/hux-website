import { site } from "@/config/site";
import { ScreensCarousel } from "./ScreensCarousel";
import { PhoneFrame } from "./PhoneFrame";
import { ScribbleUnderline } from "./HandDrawn";

// the fan: [rotate, lift, scale] for each of the five positions
const FAN = [
  { tilt: -12, y: 70, size: "min(196px, 15vw)" },
  { tilt: -6, y: 22, size: "min(214px, 16.5vw)" },
  { tilt: 0, y: 0, size: "min(248px, 19vw)" },
  { tilt: 6, y: 22, size: "min(214px, 16.5vw)" },
  { tilt: 12, y: 70, size: "min(196px, 15vw)" },
];

/** "Designed to feel simple": five phones fanned out in an arc on desktop, a swipeable carousel with dots on phones. */
export function ScreensShowcase() {
  const items = site.showcase.map((s) => ({ screen: site.screens[s.screen], caption: s.caption }));
  return (
    <section id="screens" aria-labelledby="screens-title" className="section scroll-mt-20 overflow-hidden">
      <div className="container-hux">
        <div className="mx-auto max-w-[680px] text-center" data-reveal>
          <p className="t-eyebrow">Inside the app</p>
          <h2 id="screens-title" className="t-h2 mt-4">
            Designed to feel{" "}
            <span className="relative isolate inline-block">
              simple.
              <ScribbleUnderline className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.22em] w-full" delay={250} />
            </span>
          </h2>
        </div>

        {/* desktop fan */}
        <ul className="mt-16 hidden items-start justify-center lg:flex" aria-label="App screens">
          {items.map((it, i) => (
            <li
              key={it.screen.label}
              className={`flex flex-col items-center ${i === 2 ? "z-10" : i === 1 || i === 3 ? "z-[5]" : ""} ${i > 0 ? "-ml-6" : ""}`}
              style={{ marginTop: FAN[i].y, width: FAN[i].size, ["--d" as string]: `${i * 60}ms` }}
              data-reveal
            >
              <PhoneFrame screen={it.screen} tilt={FAN[i].tilt} size={FAN[i].size} />
              <p className="t-hand mt-8 max-w-[90%] text-center !text-[22px] !leading-[1.1]" style={{ transform: `rotate(${FAN[i].tilt / 3}deg)` }}>
                {it.caption}
              </p>
            </li>
          ))}
        </ul>

        {/* phones: swipe */}
        <div className="mt-12 lg:hidden">
          <ScreensCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
