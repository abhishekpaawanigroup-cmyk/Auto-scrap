import { Reveal } from "@/components/ui/Reveal";
import type { TimelineItem } from "@/types";

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-600 via-ink-200 to-transparent sm:left-[31px]" />
      <div className="flex flex-col gap-10">
        {items.map((item, index) => (
          <Reveal key={item.id} direction="left" delay={index * 0.05}>
            <div className="relative flex gap-6 pl-0">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary-200 bg-white text-sm font-bold text-primary-700 shadow-[var(--shadow-premium)] sm:h-16 sm:w-16">
                {item.year}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-ink-900 sm:text-xl">{item.title}</h3>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
