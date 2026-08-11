import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { VehicleType } from "@/types";

export function VehicleCard({ vehicle }: { vehicle: VehicleType }) {
  const Icon = getIcon(vehicle.icon);

  return (
    <Link
      href={`/vehicle-types/${vehicle.slug}`}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-[var(--shadow-premium-lg)]"
    >
      <div
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 min-h-[2lh] text-lg font-bold leading-snug text-ink-900">{vehicle.name}</h3>
        <p className="mt-1 min-h-[2lh] text-sm leading-snug text-ink-500">{vehicle.category}</p>
      </div>
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-semibold text-primary-700">Get Quote</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
