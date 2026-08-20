"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";

const benefits = [
  { icon: Truck, label: "Same Day Pickup" },
  { icon: Wallet, label: "Instant Payment" },
  { icon: ShieldCheck, label: "RVSF Certified" },
];

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

      <Container className="relative z-10 flex min-h-[640px] flex-col items-center justify-center py-28 text-center sm:min-h-[900px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
        >
          Turn Your Old Vehicle
          <br />
          Into Instant Cash
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
        >
          We buy all types of old, damaged, and non-working vehicles. Get the best price, free pickup, instant payment and eco-friendly recycling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <Button
            type="button"
            onClick={openQuoteModal}
            size="lg"
            variant="primary"
            icon={<ArrowRight className="h-5 w-5" />}
            className="!text-ink-950"
          >
            Get Instant Quote
          </Button>
        </motion.div>
      </Container>

      
      <div className="h-8 sm:h-0" aria-hidden />
    </section>
  );
}
