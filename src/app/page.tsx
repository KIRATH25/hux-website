import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Rewards } from "@/components/Rewards";
import { SafetyBand } from "@/components/SafetyBand";
import { TrustStrip } from "@/components/TrustStrip";

// Home page. Phase 4 adds Screens, Built at GLA, FAQ, Final CTA and the footer.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <TrustStrip />
        <Features />
        <SafetyBand />
        <HowItWorks />
        <Rewards />
        <Pricing />
      </main>
    </>
  );
}
