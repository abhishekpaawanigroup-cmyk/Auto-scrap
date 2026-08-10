"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types";

export function Accordion({ items }: { items: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors duration-300",
              isOpen ? "border-primary-200 shadow-[var(--shadow-premium)]" : "border-border"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="text-base font-semibold text-ink-900 sm:text-lg">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-primary-600 bg-primary-600 text-white"
                    : "border-ink-200 text-ink-500"
                )}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[15px] leading-relaxed text-ink-500 sm:px-7">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
