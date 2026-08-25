"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  value: string;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder,
  theme = "dark",
  className,
  name,
  hasError = false,
}: {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  theme?: "dark" | "light";
  className?: string;
  name?: string;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";
  const hasValue = Boolean(value);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-xl border px-4 text-left text-sm outline-none transition-colors",
          hasError
            ? "border-amber-500 focus:border-amber-500"
            : isDark
              ? "border-white/10 bg-white/5 text-white focus:border-accent-500"
              : "border-ink-200 bg-white text-ink-900 focus:border-primary-500",
          hasError && isDark && "bg-white/5 text-white",
          hasError && !isDark && "bg-white text-ink-900"
        )}
      >
        <span className={cn("truncate", !hasValue && "text-ink-400")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open && "rotate-180",
            "text-ink-400"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "thin-scrollbar absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-auto overscroll-contain rounded-xl border p-1.5 shadow-[var(--shadow-premium-lg)]",
              isDark ? "border-white/10 bg-ink-900" : "border-border bg-white"
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                      isDark ? "text-ink-200 hover:bg-white/10 active:bg-white/10" : "text-ink-700 hover:bg-ink-100 active:bg-ink-100",
                      isSelected && (isDark ? "bg-white/10 text-white" : "bg-primary-50 text-primary-700")
                    )}
                  >
                    {option.label}
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-accent-500" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
