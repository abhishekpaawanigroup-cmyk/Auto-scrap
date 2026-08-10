import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";
import stats from "@/data/stats.json";
import type { StatItem } from "@/types";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {(stats as StatItem[]).map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <Reveal key={stat.id} direction="up" delay={index * 0.08} className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent-400">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-ink-400">{stat.label}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
