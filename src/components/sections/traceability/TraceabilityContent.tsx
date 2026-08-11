"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { TraceabilityCheckpoint } from "@/types";

export function TraceabilityContent({ checkpoint }: { checkpoint: TraceabilityCheckpoint }) {
  return (
    <div className="flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={checkpoint.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5"
        >
          <span className="w-fit rounded-full border border-primary-100 bg-primary-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-700">
            {checkpoint.stepLabel}
          </span>

          <h3 className="text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{checkpoint.heading}</h3>

          <p className="text-[15px] leading-relaxed text-ink-500">{checkpoint.description}</p>

          <ul className="flex flex-col gap-3">
            {checkpoint.points.map((point, index) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.35 }}
                className="flex items-start gap-3 text-sm text-ink-700"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {point}
              </motion.li>
            ))}
          </ul>

          <div className="flex gap-3 rounded-2xl border border-primary-100 bg-primary-50/70 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" strokeWidth={1.75} />
            <p className="text-sm leading-relaxed text-primary-900">{checkpoint.protectionMessage}</p>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-ink-400">{checkpoint.ruleRef}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
