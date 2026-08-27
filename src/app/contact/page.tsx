import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { MapSection } from "@/components/sections/MapSection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Carcrush24 for vehicle scrapping quotes, corporate fleet disposal, or general enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        title="We're Here to Help"
        description="Have a question about pricing, pickup, or documentation? Reach out - our team responds within one business day."
      />

      <ContactSection />

      <FAQSection />

      <MapSection />
    </>
  );
}
