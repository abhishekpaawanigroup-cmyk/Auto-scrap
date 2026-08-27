import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/ui/CTABanner";
import { getIcon } from "@/lib/icon-map";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import servicesData from "@/data/services.json";
import type { Service } from "@/types";

const services = servicesData as Service[];

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
        <Container className="relative z-10">
          <Reveal direction="left" className="max-w-2xl">
            <Link href="/services" className="text-sm text-ink-400 hover:text-white active:text-white">
              &larr; Back to Services
            </Link>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-[var(--shadow-glow)]">
              <Icon className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-300 sm:text-lg">
              {service.shortDescription}
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                Request This Service
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <Reveal direction="left">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Service Overview</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-500">{service.description}</p>
          </Reveal>
          <Reveal direction="right" className="rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-premium)]">
            <h3 className="text-lg font-bold text-ink-900">Key Benefits</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-ink-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Related Services</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item) => {
              const RelatedIcon = getIcon(item.icon);
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary-200 hover:shadow-[var(--shadow-premium)] active:-translate-y-1 active:border-primary-200 active:shadow-[var(--shadow-premium)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <RelatedIcon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{item.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
