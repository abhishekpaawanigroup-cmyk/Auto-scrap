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
