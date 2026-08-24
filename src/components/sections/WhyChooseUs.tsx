import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";
import whyChooseUs from "@/data/why-choose-us.json";
import type { WhyChooseUsItem } from "@/types";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary-700/25 blur-[120px]" aria-hidden />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Built for Trust, Engineered for Speed"
          description="Every part of our process is designed to remove friction - and give you full visibility from quote to certificate."
          light
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(whyChooseUs as WhyChooseUsItem[]).map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <RevealItem key={item.id} direction="up">
                <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 ease-[var(--ease-premium)] hover:border-accent-600 hover:bg-accent-500 hover:shadow-[var(--shadow-premium-lg)]">
                  <div
                    className="bg-pattern-diagonal pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full flex-col gap-4">
                    <Icon
                      className="h-10 w-10 text-accent-400 transition-colors duration-300 group-hover:text-ink-950"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-ink-950">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-400 transition-colors duration-300 group-hover:text-ink-900">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
