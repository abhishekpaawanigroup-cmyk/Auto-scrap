import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServiceAvailability } from "@/components/sections/ServiceAvailability";
import { VehicleCategories } from "@/components/sections/VehicleCategories";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TraceabilitySection } from "@/components/sections/traceability/TraceabilitySection";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
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
    <div className="theme-gold">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Hero />
      <ServiceAvailability />
      <VehicleCategories />
      <StatsSection />
      <ProcessSection />
      <TraceabilitySection />
      <ProcessGallery />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
    </div>
  );
}
