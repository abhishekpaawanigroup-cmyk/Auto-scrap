import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
  variant = "light",
}: {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "outline";
}) {
  const variants = {
    light: "bg-primary-50 text-primary-700 border-primary-100",
    dark: "bg-ink-900 text-white border-ink-800",
    outline: "bg-white text-ink-700 border-ink-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
