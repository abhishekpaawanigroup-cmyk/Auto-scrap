"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import type { TraceabilityCheckpoint } from "@/types";

const LINE_DURATION = 0.7;

export function TraceabilitySteps({
  checkpoints,
  activeIndex,
  onSelect,
}: {
  checkpoints: TraceabilityCheckpoint[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  // The connecting line travels toward `activeIndex` immediately; the circle
  // glow only "arrives" once the line reaches it, so steps light up in
  // sequence with the line instead of jumping ahead of it.
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (activeIndex === displayIndex) return undefined;
    timeoutRef.current = setTimeout(() => {
      setDisplayIndex(activeIndex);
    }, LINE_DURATION * 1000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const isTraveling = activeIndex !== displayIndex;
  const progress = checkpoints.length > 1 ? activeIndex / (checkpoints.length - 1) : 0;
  const inset = 100 / (checkpoints.length * 2);

  return (
    <div className="relative">
      <div className="flex flex-col gap-2 md:hidden">
        {checkpoints.map((checkpoint, index) => {
          const Icon = getIcon(checkpoint.navIcon);
          const isActive = index === activeIndex;
          return (
            <button
              key={checkpoint.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isActive}
              aria-label={`Step ${checkpoint.number}: ${checkpoint.navTitle}`}
              className={cn(
                "flex h-12 w-full items-center gap-2 rounded-full border px-4 text-xs font-semibold transition-all duration-300",
                isActive
                  ? "border-primary-500 bg-primary-50 text-primary-700 shadow-[0_0_0_4px_rgba(26,126,0,0.12)]"
                  : "border-ink-200 bg-white text-ink-500"
              )}
            >
              <span className={cn("font-mono text-[11px]", isActive ? "text-primary-600" : "text-ink-400")}>
                {checkpoint.number}
              </span>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {checkpoint.navTitle}
            </button>
          );
        })}
      </div>

      <div className="relative hidden md:block">
        <div
          className="absolute top-6 h-px bg-ink-200"
          style={{ left: `${inset}%`, right: `${inset}%` }}
          aria-hidden
        />
        <div
          className="absolute top-6 h-px overflow-hidden"
          style={{ left: `${inset}%`, right: `${inset}%` }}
          aria-hidden
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: LINE_DURATION, ease: "linear" }}
          />
        </div>
        <div
          className="pointer-events-none absolute top-6"
          style={{ left: `${inset}%`, right: `${inset}%` }}
          aria-hidden
        >
          <motion.span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-500"
            style={{ boxShadow: "0 0 10px 3px rgba(26,126,0,0.55)" }}
            initial={false}
            animate={{ left: `${progress * 100}%`, opacity: isTraveling ? 1 : 0 }}
            transition={{
              left: { duration: LINE_DURATION, ease: "linear" },
              opacity: { duration: 0.2 },
            }}
          />
        </div>

        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${checkpoints.length}, minmax(0, 1fr))` }}>
          {checkpoints.map((checkpoint, index) => {
            const Icon = getIcon(checkpoint.navIcon);
            const isActive = index === displayIndex;
            const isDone = index < displayIndex;
            return (
              <button
                key={checkpoint.id}
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive}
                aria-label={`Step ${checkpoint.number}: ${checkpoint.navTitle}`}
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white font-mono text-sm font-bold transition-all duration-300",
                    isActive
                      ? "border-primary-500 text-primary-600"
                      : isDone
                        ? "border-primary-300 text-primary-500"
                        : "border-ink-200 text-ink-400 group-hover:border-primary-300 group-hover:text-primary-600"
                  )}
                  style={isActive ? { boxShadow: "0 0 0 6px rgba(26,126,0,0.12)" } : undefined}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-primary-400/25"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden
                    />
                  )}
                  {checkpoint.number}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-center text-[11px] font-semibold uppercase leading-snug tracking-wide transition-colors lg:text-xs",
                    isActive ? "text-ink-900" : "text-ink-400 group-hover:text-ink-600"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                  {checkpoint.navTitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
