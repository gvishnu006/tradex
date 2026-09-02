import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Dashboard } from "@/components/dashboard";
import { Features } from "@/components/features";
import { AiSection } from "@/components/ai-section";
import { Portfolio } from "@/components/portfolio";
import { Markets } from "@/components/markets";
import { Security } from "@/components/security";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <>
      <Navigation />
      <CustomCursor />
      <main className="flex-1">
        <Hero />
        <Dashboard />
        <Features />
        <AiSection />
        <Portfolio />
        <Markets />
        <Security />
        <Pricing />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
