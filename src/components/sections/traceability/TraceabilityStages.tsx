"use client";

import { motion } from "framer-motion";
import { VehicleVerificationSVG } from "@/components/sections/traceability/VehicleVerificationSVG";
import { VerificationBadge } from "@/components/sections/traceability/VerificationBadge";
import type { TraceabilityBadge } from "@/types";

const badgePosition: Record<TraceabilityBadge["position"], string> = {
  "top-left": "-top-3 left-0 sm:-top-5 sm:left-2",
  "top-right": "-top-3 right-0 sm:-top-5 sm:right-2",
  "bottom-left": "-bottom-3 left-0 sm:-bottom-5 sm:left-2",
  "bottom-right": "-bottom-3 right-0 sm:-bottom-5 sm:right-2",
};

function StageBadges({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <>
      {badges.map((badge, index) => (
        <VerificationBadge
          key={badge.id}
          label={badge.label}
          icon={badge.icon}
          position={badge.position}
          delay={0.2 + index * 0.12}
          className={badgePosition[badge.position]}
        />
      ))}
    </>
  );
}

export function IdentityStage({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px]">
      <div className="relative overflow-hidden rounded-2xl">
        <VehicleVerificationSVG className="w-full" />
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-primary-400/60 to-transparent"
          initial={{ left: "-10%" }}
          animate={{ left: "110%" }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.1, ease: "easeInOut" }}
        />
      </div>
      <StageBadges badges={badges} />
    </div>
  );
}

export function CertificateStage({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      <VehicleVerificationSVG
        muted
        className="pointer-events-none absolute inset-0 m-auto w-[150%] max-w-none opacity-[0.05]"
      />
      <div className="relative rounded-2xl border border-ink-200 bg-white p-5 shadow-[var(--shadow-premium-lg)] sm:p-6">
        <div className="flex items-center justify-between border-b border-dashed border-ink-200 pb-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-400 sm:text-[10px]">
            VAHAN · Govt. of India
          </span>
          <span className="grid h-6 w-6 grid-cols-2 gap-0.5 rounded-md bg-ink-900 p-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-full w-full bg-white" />
            ))}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          <div className="h-2.5 w-3/4 rounded-full bg-ink-100" />
          <div className="h-2.5 w-1/2 rounded-full bg-ink-100" />
          <div className="h-2.5 w-2/3 rounded-full bg-ink-100" />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-mono text-[9px] text-ink-400 sm:text-[10px]">CVS/2025/••••••</span>
          <motion.svg width="34" height="34" viewBox="0 0 34 34" initial="hidden" animate="visible">
            <motion.circle
              cx="17"
              cy="17"
              r="15"
              fill="none"
              className="stroke-primary-600"
              strokeWidth="2"
              variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 1 } } }}
            />
            <motion.path
              d="M10,17 L15,22 L24,12"
              fill="none"
              className="stroke-primary-600"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.9 } },
              }}
            />
          </motion.svg>
        </div>
      </div>
      <StageBadges badges={badges} />
    </div>
  );
}

export function CutStage({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px]">
      <div className="relative overflow-hidden rounded-2xl">
        <VehicleVerificationSVG className="w-full" />
        <motion.div
          className="pointer-events-none absolute left-[6%] right-[6%] top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary-600 to-transparent"
          style={{ boxShadow: "0 0 12px 2px rgba(26,126,0,0.55)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.35, 0.75, 1], ease: "easeInOut" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-ink-900/90 px-2 py-1 font-mono text-[9px] text-primary-300 shadow-lg"
      >
        CAM_04 · 14:32:07 IST
      </motion.div>
      <StageBadges badges={badges} />
    </div>
  );
}

const materialNodes = [
  { id: "steel", label: "Steel", x: 30, y: 22 },
  { id: "aluminium", label: "Aluminium", x: 78, y: 34 },
  { id: "copper", label: "Copper", x: 68, y: 78 },
  { id: "plastic", label: "Plastic", x: 20, y: 68 },
];

export function MaterialStage({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px]">
      <div className="relative">
        <VehicleVerificationSVG muted className="w-full opacity-30" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          {materialNodes.map((node, index) => (
            <motion.line
              key={node.id}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              className="stroke-primary-600"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7, strokeDashoffset: [0, -8] }}
              transition={{
                pathLength: { duration: 0.7, delay: 0.15 + index * 0.12 },
                opacity: { duration: 0.4, delay: 0.15 + index * 0.12 },
                strokeDashoffset: { duration: 1.1, repeat: Infinity, ease: "linear" },
              }}
            />
          ))}
          <circle cx="50" cy="50" r="3.5" className="fill-primary-600" />
        </svg>
        {materialNodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + index * 0.12, duration: 0.4 }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className="h-3 w-3 rounded-full border-2 border-primary-500 bg-white shadow-[0_0_0_4px_rgba(26,126,0,0.15)]" />
            <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink-600 shadow-sm">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
      <StageBadges badges={badges} />
    </div>
  );
}

export function ArchiveStage({ badges }: { badges: TraceabilityBadge[] }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      <div className="relative mx-auto flex h-[210px] w-[210px] items-center justify-center sm:h-[250px] sm:w-[250px]">
        <div className="absolute inset-0 rounded-full border border-dashed border-primary-200" />
        <div className="absolute inset-7 rounded-full border border-dashed border-primary-100" />
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary-500 shadow-[0_0_8px_2px_rgba(39,154,44,0.5)]" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary-300 shadow-[0_0_6px_2px_rgba(134,205,148,0.5)]" />
        </motion.div>
        <svg viewBox="0 0 120 120" className="h-[70%] w-[70%]">
          <ellipse cx="60" cy="30" rx="34" ry="12" className="fill-white stroke-ink-800" strokeWidth="2.5" />
          <path
            d="M26,30 L26,55 C26,61.6 41.9,67 60,67 C78.1,67 94,61.6 94,55 L94,30"
            className="fill-white stroke-ink-800"
            strokeWidth="2.5"
          />
          <path
            d="M26,55 L26,80 C26,86.6 41.9,92 60,92 C78.1,92 94,86.6 94,80 L94,55"
            className="fill-white stroke-ink-800"
            strokeWidth="2.5"
          />
          <ellipse cx="60" cy="80" rx="34" ry="12" className="fill-none stroke-ink-800" strokeWidth="2.5" />
          <circle cx="60" cy="56" r="16" className="fill-primary-50 stroke-primary-500" strokeWidth="2" />
          <motion.path
            d="M52,56 l6,6 l12,-13"
            className="fill-none stroke-primary-600"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </svg>
      </div>
      <StageBadges badges={badges} />
    </div>
  );
}
