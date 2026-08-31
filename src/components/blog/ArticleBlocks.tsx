import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/lib/blogContent";

const CALLOUT_STYLES = {
  tip: {
    wrap: "border-primary-200 bg-primary-50",
    icon: "bg-primary-600 text-white",
    title: "text-primary-800",
    text: "text-primary-700",
    Icon: Lightbulb,
    defaultTitle: "Quick Tip",
  },
  warning: {
    wrap: "border-amber-200 bg-amber-50",
    icon: "bg-amber-500 text-white",
    title: "text-amber-900",
    text: "text-amber-800",
    Icon: AlertTriangle,
    defaultTitle: "Important",
  },
  info: {
    wrap: "border-accent-500/30 bg-accent-500/10",
    icon: "bg-accent-500 text-ink-950",
    title: "text-accent-700",
    text: "text-ink-700",
    Icon: Info,
    defaultTitle: "Good to Know",
  },
} as const;

export function ArticleBlocks({ blocks }: { blocks: ContentBlock[] }) {
  let paragraphCount = 0;

  return (
    <div className="prose-content flex flex-col gap-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const HeadingTag = block.level === 2 ? "h2" : "h3";
            return (
              <HeadingTag
                key={index}
                id={block.id}
                className={cn(
                  "scroll-mt-28 font-bold text-ink-900",
                  block.level === 2 ? "mt-4 text-2xl sm:text-[1.75rem]" : "mt-2 text-xl"
                )}
              >
                {block.text}
              </HeadingTag>
            );
          }
          case "paragraph": {
            paragraphCount++;
            return (
              <p
                key={index}
                className={cn(
                  "text-[17px] leading-[1.85] text-ink-600",
                  paragraphCount === 1 &&
                    "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-primary-600"
                )}
              >
                {block.text}
              </p>
            );
          }
          case "ul":
            return (
              <ul key={index} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[17px] leading-[1.7] text-ink-600">
                    <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="flex flex-col gap-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-[17px] leading-[1.7] text-ink-600">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary-500 bg-primary-50/60 py-3 pl-5 pr-4 text-lg font-medium italic leading-relaxed text-ink-800"
              >
                {block.text}
              </blockquote>
            );
          case "callout": {
            const style = CALLOUT_STYLES[block.variant];
            const Icon = style.Icon;
            return (
              <div key={index} className={cn("flex gap-3.5 rounded-2xl border p-5", style.wrap)}>
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", style.icon)}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <p className={cn("text-sm font-bold uppercase tracking-wide", style.title)}>
                    {block.title || style.defaultTitle}
                  </p>
                  {block.lines.map((line, i) => (
                    <p key={i} className={cn("text-[15px] leading-relaxed", style.text)}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
