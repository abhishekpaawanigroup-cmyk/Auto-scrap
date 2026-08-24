import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";
import stats from "@/data/stats.json";
import type { StatItem } from "@/types";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-950 py-16 sm:py-20">
      <div className="bg-lattice absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-ink-950 via-transparent to-ink-950"
        aria-hidden
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {(stats as StatItem[]).map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <Reveal key={stat.id} direction="up" delay={index * 0.08} className="flex flex-col items-center text-center">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-accent-400 shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.06)]">
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
