import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";
import process from "@/data/process.json";
import type { ProcessStep } from "@/types";

export function ProcessSection() {
  const steps = process as ProcessStep[];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="The Process"
          title="Our Simple 6-Step Process"
          description="A structured, transparent journey from first quote to certified recycling — every step tracked."
        />

        <div className="mt-16 hidden lg:block">
          <div className="relative grid grid-cols-6 gap-4">
            <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
            {steps.map((step, index) => {
              const Icon = getIcon(step.icon);
              return (
                <Reveal key={step.id} delay={index * 0.08} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-700 shadow-[var(--shadow-premium)]">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">{step.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="relative mt-14 flex flex-col gap-8 lg:hidden">
          <div className="absolute left-8 top-2 bottom-2 w-px bg-gradient-to-b from-primary-600 via-ink-200 to-transparent" />
          {steps.map((step, index) => {
            const Icon = getIcon(step.icon);
            return (
              <Reveal key={step.id} direction="left" delay={index * 0.06} className="relative flex gap-5">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary-200 bg-white text-primary-700 shadow-[var(--shadow-premium)]">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
