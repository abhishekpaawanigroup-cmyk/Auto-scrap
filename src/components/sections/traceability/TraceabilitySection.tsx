"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TraceabilitySteps } from "@/components/sections/traceability/TraceabilitySteps";
import { TraceabilityVisual } from "@/components/sections/traceability/TraceabilityVisual";
import { TraceabilityContent } from "@/components/sections/traceability/TraceabilityContent";
import checkpoints from "@/data/traceability.json";
import type { TraceabilityCheckpoint } from "@/types";

const AUTOPLAY_INTERVAL = 5200;

export function TraceabilitySection() {
  const data = checkpoints as TraceabilityCheckpoint[];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [isPaused, data.length]);

  const active = data[activeIndex];

  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.025]" aria-hidden />
      <div
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-primary-500/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-primary-400/10 blur-[110px]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              Verified &amp; Traceable
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Carcrush24 Five Traceability Checkpoints
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-base leading-relaxed text-ink-500 sm:text-lg">
              From handover to certificate, every critical step is verified, documented, and retained
              so that you can sleep peacefully.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.24} className="mt-14">
          <TraceabilitySteps checkpoints={data} activeIndex={activeIndex} onSelect={setActiveIndex} />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-14">
          <Reveal direction="left" delay={0.1}>
            <TraceabilityVisual checkpoint={active} />
          </Reveal>
          <Reveal direction="right" delay={0.16}>
            <TraceabilityContent checkpoint={active} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
