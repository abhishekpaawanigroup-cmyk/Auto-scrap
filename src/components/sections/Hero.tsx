"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/sections/QuoteForm";

const benefits = [
  { icon: Truck, label: "Same Day Pickup" },
  { icon: Wallet, label: "Instant Payment" },
  { icon: ShieldCheck, label: "RVSF Certified" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <video
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      {/* Dark wash: solid on the left for text legibility, fading out over the photo on the right. Kept neutral so it doesn't muddy the photo's own colors. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/95 to-ink-950/70 sm:via-ink-950/70 sm:to-ink-950/20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/65 via-transparent to-ink-950/10" aria-hidden />
      {/* Brand-green glow accents carry the theme instead of tinting the whole photo */}
      <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary-500/30 blur-[110px]" aria-hidden />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent-500/20 blur-[130px]" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" aria-hidden />


      <Container className="relative z-10 grid grid-cols-1 gap-16 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-28">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-500"
          >
           
            India&apos;s Trusted End-of-Life Vehicle Recovery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            Turn Your Old Vehicle
            <br />
            <span className="text-primary-500">Into Instant Value</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-white leading-relaxed text-ink-300 sm:text-lg"
          >
            We buy all types of old, damaged, and non-working vehicles. Get the best price, free pickup, instant payment and eco-friendly recycling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/contact" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
              Get Instant Quote
            </Button>
            <Button
              href="/how-it-works"
              size="lg"
              variant="ghost"
              className="text-white bg-white/10 hover:bg-white/20"
              icon={<PlayCircle className="h-5 w-5" />}
              iconPosition="left"
            >
              How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="no-scrollbar mt-10 flex flex-nowrap gap-x-5 overflow-x-auto sm:gap-x-8"
          >
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label} className="flex shrink-0 items-center gap-2 text-xs text-white sm:gap-2.5 sm:text-sm">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-accent-400 sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="whitespace-nowrap">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <QuoteForm variant="glass" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
