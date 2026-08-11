"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArchiveStage,
  CertificateStage,
  CutStage,
  IdentityStage,
  MaterialStage,
} from "@/components/sections/traceability/TraceabilityStages";
import type { TraceabilityCheckpoint } from "@/types";

function CornerMark({ className }: { className: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} aria-hidden>
      <path d="M1 21V5C1 2.79086 2.79086 1 5 1H21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TraceabilityVisual({ checkpoint }: { checkpoint: TraceabilityCheckpoint }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-gradient-to-b from-ink-50/70 to-white shadow-[var(--shadow-premium)]">
      <div className="absolute inset-0 bg-grid opacity-[0.035]" aria-hidden />
      <CornerMark className="absolute left-4 top-4 text-primary-300" />
      <CornerMark className="absolute right-4 top-4 rotate-90 text-primary-300" />
      <CornerMark className="absolute bottom-4 left-4 -rotate-90 text-primary-300" />
      <CornerMark className="absolute bottom-4 right-4 rotate-180 text-primary-300" />

      <div className="pointer-events-none absolute right-6 top-6 flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50/80 px-2.5 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-500" />
        </span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary-700">Live Trace</span>
      </div>

      <div className="relative flex min-h-[400px] items-center justify-center px-6 py-16 sm:min-h-[460px] sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={checkpoint.id}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {checkpoint.id === 1 && <IdentityStage badges={checkpoint.badges} />}
            {checkpoint.id === 2 && <CertificateStage badges={checkpoint.badges} />}
            {checkpoint.id === 3 && <CutStage badges={checkpoint.badges} />}
            {checkpoint.id === 4 && <MaterialStage badges={checkpoint.badges} />}
            {checkpoint.id === 5 && <ArchiveStage badges={checkpoint.badges} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
