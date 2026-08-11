"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { VehicleCard } from "@/components/cards/VehicleCard";
import { cn } from "@/lib/utils";
import type { VehicleType } from "@/types";

export function VehicleTypesGrid({ vehicles }: { vehicles: VehicleType[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(vehicles.map((v) => v.category)))],
    [vehicles]
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? vehicles : vehicles.filter((v) => v.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
              active === category
                ? "border-primary-600 bg-primary-600 text-white"
                : "border-ink-200 bg-white text-ink-600 hover:border-primary-300 hover:text-primary-700"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {filtered.map((vehicle) => (
          <motion.div key={vehicle.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
            <VehicleCard vehicle={vehicle} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
