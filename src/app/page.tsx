import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { TrustStrip } from "@/components/TrustStrip";

// Home page. Phase 2: Navbar, Hero, Marquee, Trust strip, Features.
// Phase 3 adds Safety, How it works, Rewards, Pricing; Phase 4 adds Screens, Built at GLA, FAQ, Final CTA, Footer.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <TrustStrip />
        <Features />
      </main>
    </>
  );
}
