import { LandingCompanyValue } from "@/components/landing/LandingCompanyValue";
import { LandingCta } from "@/components/landing/LandingCta";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHowItWorks } from "@/components/landing/LandingHowItWorks";
import { LandingPaymentOptions } from "@/components/landing/LandingPaymentOptions";
import { LandingTrustStats } from "@/components/landing/LandingTrustStats";
import { LandingWorkerValue } from "@/components/landing/LandingWorkerValue";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="bg-white text-[#071B3A] [&>section:not(:first-child)]:pt-20 sm:[&>section:not(:first-child)]:pt-24 lg:[&>section:not(:first-child)]:pt-28">
        <LandingHero />
        <LandingTrustStats />
        <LandingWorkerValue />
        <LandingCompanyValue />
        <LandingHowItWorks />
        <LandingPaymentOptions />
        <LandingFaq />
        <LandingCta />
      </main>
    </>
  );
}
