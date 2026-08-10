import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { VehicleTypesGrid } from "@/components/sections/VehicleTypesGrid";
import { buildMetadata } from "@/lib/seo";
import vehicles from "@/data/vehicles.json";
import type { VehicleType } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Vehicle Types We Recover",
  description:
    "Browse every vehicle category Carcrush24 recovers — cars, bikes, trucks, buses, luxury cars, electric vehicles, and heavy machinery.",
  path: "/vehicle-types",
});

export default function VehicleTypesPage() {
  return (
    <>
      <PageHero
        eyebrow="Vehicle Types"
        breadcrumb="Vehicle Types"
        title="Every Vehicle Category, One Certified Process"
        description="Filter by category to see how we price, pick up, and process your specific vehicle type."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionTitle
            eyebrow="Browse By Category"
            title="What Are You Scrapping Today?"
            description="Select a category to explore vehicle-specific pricing and pickup details."
          />
          <div className="mt-14">
            <VehicleTypesGrid vehicles={vehicles as VehicleType[]} />
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
