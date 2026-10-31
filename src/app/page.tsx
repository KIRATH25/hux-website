import { BuiltAtGLA } from "@/components/BuiltAtGLA";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Marquee } from "@/components/Marquee";
import { Pricing } from "@/components/Pricing";
import { Rewards } from "@/components/Rewards";
import { SafetyBand } from "@/components/SafetyBand";
import { ScreensShowcase } from "@/components/ScreensShowcase";
import { TrustStrip } from "@/components/TrustStrip";

// The home page, in the order of the brief (the navbar and footer come from the root layout).
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <TrustStrip />
      <Features />
      <SafetyBand />
      <HowItWorks />
      <Rewards />
      <Pricing />
      <ScreensShowcase />
      <BuiltAtGLA />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
