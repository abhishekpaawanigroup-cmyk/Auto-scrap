import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceAvailability } from "@/components/sections/ServiceAvailability";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { VehicleCategories } from "@/components/sections/VehicleCategories";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TraceabilitySection } from "@/components/sections/traceability/TraceabilitySection";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
import { EnvironmentalImpact } from "@/components/sections/EnvironmentalImpact";
import { ServiceLocations } from "@/components/sections/ServiceLocations";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTABanner } from "@/components/ui/CTABanner";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";
import faqs from "@/data/faqs.json";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Hero />
      <TrustStrip />
      <ServiceAvailability />
      <StatsSection />
      <ServicesSection />
      <VehicleCategories />
      <ProcessSection />
      <WhyChooseUs />
      <TraceabilitySection />
      <ProcessGallery />
      <EnvironmentalImpact />
      <ServiceLocations />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner
        title="Give Your Old Vehicle a Responsible New Beginning"
        description="Book a free pickup today and let our certified team handle the paperwork, valuation, and recycling - start to finish."
      />
    </>
  );
}
