import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container-px mx-auto w-full max-w-[1320px]", className)}>
      {children}
    </div>
  );
}
