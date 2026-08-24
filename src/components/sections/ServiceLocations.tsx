import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LocationCard } from "@/components/cards/LocationCard";
import { SITE_CONFIG } from "@/constants/site";
import locations from "@/data/locations.json";
import type { ServiceLocation } from "@/types";

export function ServiceLocations() {
  return (
    <section id="locations" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Service Locations"
          title="Where We Currently Operate"
          description="Certified pickup and recycling support across these regions - with new cities added regularly."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(locations as ServiceLocation[]).map((location) => (
            <RevealItem key={location.id} direction="up">
              <LocationCard location={location} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 flex justify-center">
          <Button
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            variant="outline"
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Find Your Nearest Service
          </Button>
        </div>
      </Container>
    </section>
  );
}
