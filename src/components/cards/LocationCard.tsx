import { MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import type { ServiceLocation } from "@/types";

export function LocationCard({ location }: { location: ServiceLocation }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[var(--shadow-premium-lg)]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          <MapPin className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-700">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          {location.status}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink-900">{location.city}</h3>
      <p className="text-sm font-semibold text-primary-600">{location.region}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{location.description}</p>
      <a
        href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800"
      >
        <Phone className="h-4 w-4" />
        Call This Location
      </a>
    </div>
  );
}
