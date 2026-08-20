"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Button } from "@/components/ui/Button";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";
import { SITE_CONFIG } from "@/constants/site";
import navigation from "@/data/navigation.json";
import type { NavLink } from "@/types";
import { cn } from "@/lib/utils";

export function AnimatedHamburger({
  open,
  onClick,
  light = false,
}: {
  open: boolean;
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border lg:hidden",
        light ? "border-white/40" : "border-ink-200"
      )}
    >
      <span className="relative flex h-4 w-5 flex-col justify-between">
        <motion.span
          animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn("h-[2px] w-full origin-center rounded", light ? "bg-white" : "bg-ink-900")}
        />
        <motion.span
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className={cn("h-[2px] w-full rounded", light ? "bg-white" : "bg-ink-900")}
        />
        <motion.span
          animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
          transition={{ duration: 0.25 }}
          className={cn("h-[2px] w-full origin-center rounded", light ? "bg-white" : "bg-ink-900")}
        />
      </span>
    </button>
  );
}

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { openQuoteModal } = useQuoteModal();
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <Image
                src="/images/logo.png"
                alt={SITE_CONFIG.name}
                width={84}
                height={56}
                className="h-11 w-auto"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {(navigation.mainNav as NavLink[]).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "rounded-xl px-3 py-3 text-[15px] font-semibold",
                      active ? "bg-primary-50 text-primary-700" : "text-ink-900 hover:bg-ink-100"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 border-t border-border p-6">
              <Button
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                variant="outline"
                icon={<Phone className="h-4 w-4" />}
                iconPosition="left"
                className="w-full"
              >
                Call Us Now
              </Button>
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={() => {
                  onClose();
                  openQuoteModal();
                }}
              >
                Get Instant Quote
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
