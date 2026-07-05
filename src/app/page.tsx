import { LandingCompanyValue } from "@/components/landing/LandingCompanyValue";
import { LandingCta } from "@/components/landing/LandingCta";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingPaymentOptions } from "@/components/landing/LandingPaymentOptions";
import { LandingTrustStats } from "@/components/landing/LandingTrustStats";
import { LandingWorkerValue } from "@/components/landing/LandingWorkerValue";

export default function Home() {
  return (
    <main className="bg-white text-[#071B3A]">
      <LandingHero />
      <LandingTrustStats />
      <LandingWorkerValue />
      <LandingCompanyValue />
      <LandingHowItWorks />
      <LandingPaymentOptions />
      <div id="faq">
        <LandingFaq />
      </div>
      <LandingCta />
    </main>
  );
}
