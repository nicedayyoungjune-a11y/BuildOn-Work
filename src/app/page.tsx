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
    <main className="bg-white text-[#071B3A] [&>#faq>section]:pt-20 [&>section:not(:first-child)]:pt-20 sm:[&>#faq>section]:pt-24 sm:[&>section:not(:first-child)]:pt-24 lg:[&>#faq>section]:pt-28 lg:[&>section:not(:first-child)]:pt-28">
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
