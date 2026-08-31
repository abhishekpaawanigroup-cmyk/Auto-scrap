import { MapPin, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import type { ServiceLocation } from "@/types";

export function LocationCard({ location }: { location: ServiceLocation }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-7 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:border-primary-600 hover:shadow-[var(--shadow-premium-lg)] active:border-primary-600 active:shadow-[var(--shadow-premium-lg)]">
      <div
        className="absolute inset-0 origin-left scale-x-0 bg-primary-600 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-x-100 group-active:scale-x-100"
        aria-hidden
      />
      <div
        className="bg-pattern-diagonal pointer-events-none absolute inset-0 origin-left scale-x-0 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-premium)] group-hover:scale-x-100 group-hover:opacity-100 group-active:scale-x-100 group-active:opacity-100"
        aria-hidden
      />
      
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <MapPin
            className="h-10 w-10 text-primary-600 transition-colors duration-300 group-hover:text-white group-active:text-white"
            strokeWidth={1.5}
          />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-700 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white group-active:bg-white/15 group-active:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 transition-colors duration-300 group-hover:bg-white group-active:bg-white" />
            {location.status}
          </span>
        </div>
        <h3 className="mt-5 text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-white group-active:text-white">
          {location.city}
        </h3>
        <p className="text-sm font-semibold text-primary-600 transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90">
          {location.region}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500 transition-colors duration-300 group-hover:text-white/85 group-active:text-white/85">
          {location.description}
        </p>
        <a
          href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 transition-colors duration-300 group-hover:text-white group-active:text-white"
        >
          <Phone className="h-4 w-4" />
          Call This Location
        </a>
      </div>
    </div>
  );
}
