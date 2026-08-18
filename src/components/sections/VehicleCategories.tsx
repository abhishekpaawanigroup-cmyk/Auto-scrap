import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";

const scrapCategories = [
  { name: "Cars", icon: "Car", href: "/vehicle-types/cars" },
  { name: "Two-Wheeler", icon: "Bike", href: "/vehicle-types/bikes" },
  { name: "Three-Wheeler", icon: "CarTaxiFront", href: "/contact" },
  { name: "Bus", icon: "Bus", href: "/vehicle-types/buses" },
  { name: "Truck", icon: "Truck", href: "/vehicle-types/trucks" },
  { name: "Electric Vehicles", icon: "BatteryCharging", href: "/vehicle-types/electric-vehicles" },
];

export function VehicleCategories() {
  return (
    <section className="bg-gradient-to-r from-sky-50 via-primary-50/60 to-ink-100 py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-10">
        <Reveal className="max-w-2xl text-center">
          <h2 className="text-gradient-primary text-3xl font-bold leading-tight sm:text-4xl">
            What We Scrap
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">
            Select your vehicle type to get started with an instant estimate.
          </p>
        </Reveal>

        <RevealGroup className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {scrapCategories.map((vehicle) => {
            const Icon = getIcon(vehicle.icon);
            return (
              <RevealItem key={vehicle.name} direction="up">
                <Link
                  href={vehicle.href}
                  className="group flex h-full flex-col items-center gap-3 rounded-2xl bg-white/80 px-4 py-7 text-center shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium-lg)]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm font-bold text-ink-900">{vehicle.name}</span>
                  <span className="text-xs font-semibold text-primary-600 underline underline-offset-2 group-hover:text-primary-700">
                    Get Instant Quote
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
