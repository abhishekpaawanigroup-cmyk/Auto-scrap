import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { buildMetadata } from "@/lib/seo";
import services from "@/data/services.json";
import type { Service } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Explore Carcrush24's full range of services - vehicle scrapping, RC cancellation, pollution certificates, buy-back, and corporate fleet disposal.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        breadcrumb="Services"
        title="End-to-End Vehicle Recovery Services"
        description="Beyond scrapping - complete documentation, compliance handling, and fleet-scale support, all under one roof."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionTitle
            eyebrow="What We Offer"
            title="Eight Services, One Trusted Partner"
            description="Every service is delivered by the same certified team, so you never have to juggle multiple vendors."
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(services as Service[]).map((service) => (
              <RevealItem key={service.id} direction="up">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner
        title="Not Sure Which Service You Need?"
        description="Talk to our advisors - we'll assess your situation and recommend the right path in minutes."
      />
    </>
  );
}
