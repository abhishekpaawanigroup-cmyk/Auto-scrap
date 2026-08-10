"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { formatNumber } from "@/utils/format";
import { cn } from "@/lib/utils";

export function Counter({
  end,
  suffix = "",
  duration = 2000,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, value } = useCountUp(end, duration);

  return (
    <div ref={ref} className={cn("tabular-nums", className)}>
      {formatNumber(value)}
      {suffix}
    </div>
  );
}
