import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import services from "@/data/services.json";
import type { Service } from "@/types";

export function ServicesSection() {
  const featured = (services as Service[]).slice(0, 4);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Our Services"
          title="End-to-End Vehicle Recovery Services"
          description="Beyond scrapping - full documentation, compliance, and fleet-scale support under one roof."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service) => (
            <RevealItem key={service.id} direction="up">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 flex justify-center">
          <Button href="/services" variant="outline" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
