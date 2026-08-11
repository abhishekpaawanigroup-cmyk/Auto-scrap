import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { VehicleCard } from "@/components/cards/VehicleCard";
import vehicles from "@/data/vehicles.json";
import type { VehicleType } from "@/types";

export function VehicleCategories() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Vehicle Coverage"
          title="We Recover All Types of Vehicles"
          description="From city runabouts to heavy industrial machinery - every category, processed to the same certified standard."
        />
        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {(vehicles as VehicleType[]).map((vehicle) => (
            <RevealItem key={vehicle.id} direction="up" className="h-full">
              <VehicleCard vehicle={vehicle} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
