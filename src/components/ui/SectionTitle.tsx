import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
              light
                ? "border-white/15 bg-white/5 text-accent-400"
                : "border-primary-100 bg-primary-50 text-primary-700"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={cn(
            "text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
            light ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.18}>
          <p className={cn("text-base leading-relaxed sm:text-lg", light ? "text-ink-300" : "text-ink-500")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
