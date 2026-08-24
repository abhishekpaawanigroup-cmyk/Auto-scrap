import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-7 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:border-primary-600 hover:bg-primary-600 hover:shadow-[var(--shadow-premium-lg)]">
      <div
        className="bg-pattern-diagonal pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col">
        <Icon
          className="h-12 w-12 text-primary-600 transition-colors duration-300 group-hover:text-white"
          strokeWidth={1.5}
        />
        <h3 className="mt-6 text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-500 transition-colors duration-300 group-hover:text-white/85">
          {service.shortDescription}
        </p>
        <ul className="mt-5 flex flex-col gap-2.5">
          {service.benefits.slice(0, 2).map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm text-ink-600 transition-colors duration-300 group-hover:text-white/85"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 transition-colors duration-300 group-hover:text-white" />
              {benefit}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-700 transition-colors duration-300 group-hover:text-white"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
