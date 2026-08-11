"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

const connectorClasses: Record<string, string> = {
  "top-left": "-bottom-3 left-6 h-3 w-px origin-top",
  "top-right": "-bottom-3 right-6 h-3 w-px origin-top",
  "bottom-left": "-top-3 left-6 h-3 w-px origin-bottom",
  "bottom-right": "-top-3 right-6 h-3 w-px origin-bottom",
};

export function VerificationBadge({
  label,
  icon,
  position,
  delay = 0,
  className,
}: {
  label: string;
  icon: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay?: number;
  className?: string;
}) {
  const Icon = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: position.startsWith("top") ? -10 : 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute z-20", className)}
      role="status"
      aria-label={label}
    >
      <span aria-hidden className={cn("absolute bg-primary-400/60", connectorClasses[position])} />
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.6 }}
        className="flex items-center gap-0 rounded-full border border-primary-100 bg-white/95 p-1.5 shadow-[0_8px_24px_-8px_rgba(16,24,39,0.18)] backdrop-blur-sm sm:gap-2 sm:rounded-xl sm:px-3 sm:py-2"
        title={label}
      >
        <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 sm:h-6 sm:w-6">
          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
          <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
        </span>
        <span className="hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-wide text-ink-700 sm:ml-0 sm:inline sm:text-[11px]">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
