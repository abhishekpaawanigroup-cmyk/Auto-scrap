import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_CONFIG } from "@/constants/site";

export function CTABanner({
  title = "Ready to Scrap Your Vehicle?",
  description = "Get the best price for your old vehicle. Free pickup, instant payment, and a fully eco-friendly process - completed in days, not weeks.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />
      <div
        className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-600/25 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden
      />

      {/* halftone dot cluster, corner-faded */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-64 w-64 opacity-70 sm:h-80 sm:w-80"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.6) 1.4px, transparent 1.4px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage: "radial-gradient(circle at top right, black, transparent 68%)",
          maskImage: "radial-gradient(circle at top right, black, transparent 68%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgb(39 154 44 / 0.7) 1.4px, transparent 1.4px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage: "radial-gradient(circle at bottom left, black, transparent 68%)",
          maskImage: "radial-gradient(circle at bottom left, black, transparent 68%)",
        }}
        aria-hidden
      />

      {/* thin diagonal lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/4 top-0 h-[160%] w-px -translate-y-1/4 -rotate-[22deg] bg-white/10" />
        <div className="absolute left-[29%] top-0 h-[160%] w-px -translate-y-1/4 -rotate-[22deg] bg-white/5" />
        <div className="absolute right-1/3 top-0 h-[160%] w-px -translate-y-1/4 rotate-[18deg] bg-accent-400/10" />
      </div>

      {/* rounded bracket outlines */}
      <div
        className="pointer-events-none absolute -left-8 bottom-10 h-16 w-44 -rotate-12 rounded-full border border-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 top-14 h-12 w-36 rotate-[20deg] rounded-full border border-accent-400/15"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <Reveal direction="left" className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-300 sm:text-lg">{description}</p>
          </Reveal>
          <Reveal direction="right" className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="lg" variant="primary" icon={<ArrowRight className="h-5 w-5" />}>
              Book Free Pickup
            </Button>
            <Button
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              size="lg"
              variant="white"
              icon={<Phone className="h-5 w-5" />}
              iconPosition="left"
            >
              {SITE_CONFIG.contact.phone}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
