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
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-accent-500/40 hover:bg-white/[0.06]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-ink-950">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-400">{item.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
