"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";
import environmentalImpact from "@/data/environmental-impact.json";
import type { EnvironmentalStat } from "@/types";

export function EnvironmentalImpact() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Environmental Impact"
          title="Measurable Impact, Verified Results"
          description="Every vehicle we process contributes directly to reduced landfill waste and lower carbon emissions."
          light
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(environmentalImpact as EnvironmentalStat[]).map((stat, index) => (
            <ImpactCard key={stat.id} stat={stat} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ImpactCard({ stat, delay }: { stat: EnvironmentalStat; delay: number }) {
  const Icon = getIcon(stat.icon);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Reveal delay={delay}>
      <div ref={ref} className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent-400">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <div className="text-2xl font-bold text-white sm:text-3xl">
          <Counter end={stat.value} suffix={stat.suffix} />
        </div>
        <p className="text-sm text-primary-200">{stat.label}</p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${stat.percentage}%` : 0 }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-accent-500"
          />
        </div>
      </div>
    </Reveal>
  );
}
