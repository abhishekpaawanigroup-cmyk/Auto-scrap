import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icon-map";

const benefits = [
  { label: "Free Doorstep Pickup", icon: "Truck" },
  { label: "Instant Digital Payment", icon: "Wallet" },
  { label: "Govt. Certified Facility", icon: "ShieldCheck" },
  { label: "Transparent Valuation", icon: "Eye" },
  { label: "Eco-Friendly Recycling", icon: "Recycle" },
  { label: "Pan-India Network", icon: "Globe2" },
];

export function TrustStrip() {
  return (
    <section className="relative z-20 mt-10 sm:-mt-16 ">
      <Container>
        <RevealGroup
          staggerDelay={0.06}
          className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-white/95 p-4 shadow-[var(--shadow-premium-lg)] backdrop-blur-sm sm:grid-cols-3 sm:gap-4 sm:p-6 lg:grid-cols-6"
        >
          {benefits.map((benefit) => {
            const Icon = getIcon(benefit.icon);
            return (
              <RevealItem key={benefit.label} direction="up">
                <div className="group flex h-full flex-col items-center gap-2.5 rounded-2xl px-3 py-4 text-center transition-colors duration-300 hover:bg-primary-50 active:bg-primary-50 sm:gap-3 sm:py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-all duration-300 ease-[var(--ease-premium)] group-hover:-translate-y-0.5 group-hover:bg-primary-600 group-hover:text-white group-active:-translate-y-0.5 group-active:bg-primary-600 group-active:text-white sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-bold leading-snug text-ink-800 sm:text-[13px]">
                    {benefit.label}
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
