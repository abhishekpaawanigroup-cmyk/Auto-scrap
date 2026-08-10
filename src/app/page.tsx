import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { VehicleCategories } from "@/components/sections/VehicleCategories";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BrandsSlider } from "@/components/sections/BrandsSlider";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
import { EnvironmentalImpact } from "@/components/sections/EnvironmentalImpact";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { PartnersSlider } from "@/components/sections/PartnersSlider";
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
      <VehicleCategories />
      <StatsSection />
      <ProcessSection />
      <WhyChooseUs />
      <ServicesSection />
      <BrandsSlider />
      <ProcessGallery />
      <EnvironmentalImpact />
      <TestimonialsSection />
      <FAQSection />
      <LatestBlogs />
      <PartnersSlider />
      <CTABanner />
    </>
  );
}
