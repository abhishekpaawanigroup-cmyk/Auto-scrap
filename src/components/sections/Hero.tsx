"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";
import { SITE_CONFIG } from "@/constants/site";

export function Hero() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/banners/hero-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_35%]"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <div
        className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-primary-500/20 blur-[110px] motion-safe:animate-float"
        aria-hidden
      />
      <div
        className="absolute -right-16 bottom-24 h-64 w-64 rounded-full bg-accent-400/20 blur-[110px]"
        aria-hidden
      />

      <Container className="relative z-10 flex min-h-[560px] flex-col items-center justify-center py-24 text-center sm:min-h-[760px] sm:py-28">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:text-sm"
        >
          
          Government-Authorized Vehicle Scrapping
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
        >
          Scrap Your Old Vehicle
          <br />
          the Smart &amp; Responsible Way
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
        >
          Carcrush24 makes vehicle scrapping effortless - free doorstep pickup, transparent valuation, instant payment, and certified eco-friendly recycling for cars, bikes and commercial vehicles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button
            type="button"
            onClick={openQuoteModal}
            size="lg"
            variant="primary"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Scrap My Vehicle
          </Button>
          <Button
            href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
            size="lg"
            variant="outline-white"
            icon={<PhoneCall className="h-5 w-5" />}
            iconPosition="left"
          >
            Get a Free Quote
          </Button>
        </motion.div>

        
      </Container>
    </section>
  );
}
