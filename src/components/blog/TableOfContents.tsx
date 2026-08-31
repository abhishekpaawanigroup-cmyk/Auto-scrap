"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/blogContent";

export function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={cn("rounded-2xl border border-border bg-white p-5", className)}>
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-900">
        <List className="h-3.5 w-3.5 text-primary-600" />
        On This Page
      </p>
      <ul className="mt-4 flex flex-col gap-0.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors",
                item.level === 3 ? "pl-8" : "pl-4",
                activeId === item.id
                  ? "border-primary-600 font-semibold text-primary-700"
                  : "border-transparent text-ink-500 hover:text-ink-800 active:text-ink-800"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
