"use client";

import { Phone, ShieldCheck, Truck, Wallet, Leaf } from "lucide-react";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";
import { SITE_CONFIG } from "@/constants/site";

const TRUST_POINTS = [
  { label: "Free Doorstep Pickup", Icon: Truck },
  { label: "Instant Payment", Icon: Wallet },
  { label: "Legal RC Cancellation", Icon: ShieldCheck },
  { label: "Eco-Friendly Recycling", Icon: Leaf },
];

export function ScrapCtaCard({ className }: { className?: string }) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-ink-950 p-6 shadow-[var(--shadow-premium-lg)] ${className ?? ""}`}>
      <h3 className="text-lg font-bold text-white">Ready to Scrap Your Vehicle?</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-300">
        Get a free, no-obligation quote and doorstep pickup - completed in days, not weeks.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={openQuoteModal}
          className="flex h-11 items-center justify-center rounded-full bg-accent-500 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400 active:bg-accent-400"
        >
          Get Free Quote
        </button>
        <a
          href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
          className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/5 active:border-white/30 active:bg-white/5"
        >
          <Phone className="h-4 w-4" />
          Call Now
        </a>
      </div>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5">
        {TRUST_POINTS.map(({ label, Icon }) => (
          <li key={label} className="flex items-center gap-2.5 text-sm text-ink-300">
            <Icon className="h-4 w-4 shrink-0 text-accent-400" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
