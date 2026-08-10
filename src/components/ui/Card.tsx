import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)]",
        hover && "hover:-translate-y-1 hover:shadow-[var(--shadow-premium-lg)] hover:border-primary-200",
        className
      )}
    >
      {children}
    </div>
  );
}
