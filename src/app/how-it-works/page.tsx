import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { FAQSection } from "@/components/sections/FAQSection";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import process from "@/data/process.json";
import type { ProcessStep } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "How It Works",
  description:
    "A detailed walkthrough of Carcrush24's 6-step process — from instant quote request to certified eco-friendly recycling.",
  path: "/how-it-works",
});

const stepImages: Record<number, string> = {
  1: "/images/gallery/documentation.svg",
  2: "/images/gallery/inspection.svg",
  3: "/images/gallery/pickup.svg",
  4: "/images/gallery/facility.svg",
  5: "/images/gallery/documentation.svg",
  6: "/images/gallery/dismantling.svg",
};

export default function HowItWorksPage() {
  const steps = process as ProcessStep[];

  return (
    <>
      <PageHero
        eyebrow="How It Works"
        breadcrumb="How It Works"
        title="A Transparent, 6-Step Recovery Process"
        description="Every stage is tracked and documented — so you always know exactly where your vehicle is in the process."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container className="max-w-5xl">
          <div className="relative flex flex-col gap-20">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary-200 via-border to-transparent lg:block" />
            {steps.map((step, index) => {
              const Icon = getIcon(step.icon);
              const reversed = index % 2 === 1;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16",
                  )}
                >
                  <Reveal
                    direction={reversed ? "right" : "left"}
                    className={cn(reversed && "lg:order-2")}
                  >
                    <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-premium)]">
                      <Image
                        src={stepImages[step.step]}
                        alt={step.title}
                        width={640}
                        height={480}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Reveal>
                  <Reveal
                    direction={reversed ? "left" : "right"}
                    delay={0.1}
                    className={cn(reversed && "lg:order-1")}
                  >
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-700 shadow-[var(--shadow-premium)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                      <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                        {step.step}
                      </span>
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-ink-900">{step.title}</h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
                      {step.description}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionTitle
            eyebrow="Timeline Estimate"
            title="From Quote to Certificate — What to Expect"
            description="Most vehicles are picked up within 48 hours, with RC cancellation completed inside 20 working days."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              { label: "Quote to Pickup", value: "24–48 hrs" },
              { label: "Payment Settlement", value: "Instant" },
              { label: "RC Cancellation", value: "15–20 days" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-surface p-6 text-center">
                <p className="text-2xl font-bold text-primary-700">{item.value}</p>
                <p className="mt-2 text-sm text-ink-500">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection />

      <CTABanner />
    </>
  );
}
