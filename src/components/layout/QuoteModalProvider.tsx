"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { QuoteForm } from "@/components/sections/QuoteForm";

interface QuoteModalContextValue {
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider");
  }
  return ctx;
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuoteModal = useCallback(() => setOpen(true), []);
  const closeQuoteModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openQuoteModal, closeQuoteModal }), [openQuoteModal, closeQuoteModal]);

  useLockBodyScroll(open);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeQuoteModal}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-950/70 px-4 py-10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <button
                type="button"
                onClick={closeQuoteModal}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 shadow-[var(--shadow-premium-lg)] transition-colors hover:text-primary-600"
              >
                <X className="h-4 w-4" />
              </button>
              <QuoteForm variant="glass" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </QuoteModalContext.Provider>
  );
}
