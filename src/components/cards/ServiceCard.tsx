import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = getIcon(service.icon);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[var(--shadow-premium-lg)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-[var(--shadow-glow)]">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <h3 className="mt-6 text-xl font-bold text-ink-900">{service.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{service.shortDescription}</p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {service.benefits.slice(0, 2).map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-ink-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
