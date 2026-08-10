import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { getIcon } from "@/lib/icon-map";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import vehiclesData from "@/data/vehicles.json";
import type { VehicleType } from "@/types";

const vehicles = vehiclesData as VehicleType[];

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) return {};

  return buildMetadata({
    title: `Scrap Your ${vehicle.name}`,
    description: vehicle.description,
    path: `/vehicle-types/${vehicle.slug}`,
    image: vehicle.image,
  });
}

export default async function VehicleTypeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  const Icon = getIcon(vehicle.icon);
  const related = vehicles.filter((v) => v.slug !== vehicle.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Vehicle Types", path: "/vehicle-types" },
              { name: vehicle.name, path: `/vehicle-types/${vehicle.slug}` },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
        <Container className="relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal direction="left">
            <Link href="/vehicle-types" className="text-sm text-ink-400 hover:text-white">
              &larr; Back to Vehicle Types
            </Link>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-[var(--shadow-glow)]">
              <Icon className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">{vehicle.name}</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
              {vehicle.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <p className="text-xs text-ink-400">Average Scrap Value</p>
                <p className="mt-0.5 text-lg font-bold text-accent-400">{vehicle.averagePrice}</p>
              </div>
            </div>
            <ul className="mt-8 flex flex-col gap-3">
              {vehicle.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-ink-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/contact" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                Get {vehicle.name} Valuation
              </Button>
            </div>
          </Reveal>
          <Reveal direction="right" className="flex justify-center lg:justify-end">
            <QuoteForm variant="glass" />
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Other Vehicle Types</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((item) => (
              <Link key={item.id} href={`/vehicle-types/${item.slug}`}>
                <div className="rounded-2xl border border-border bg-white p-5">
                  <VehicleThumb vehicle={item} />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}

function VehicleThumb({ vehicle }: { vehicle: VehicleType }) {
  const Icon = getIcon(vehicle.icon);
  return (
    <div className="flex flex-col gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="text-sm font-semibold text-ink-900">{vehicle.name}</span>
    </div>
  );
}
