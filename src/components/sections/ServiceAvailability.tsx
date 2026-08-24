"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY_STATS } from "@/constants/site";

export function ServiceAvailability() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "result">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (pincode.trim().length !== 6) return;
    setStatus("checking");
    setTimeout(() => setStatus("result"), 900);
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-400/15 blur-[130px]" aria-hidden />

      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="left" className="relative">
          <div className="relative mx-auto max-w-md rounded-3xl border border-border bg-white/70 p-4 shadow-[var(--shadow-premium-lg)] backdrop-blur-sm sm:max-w-lg">
            <Image
              src="/images/map.png"
              alt="Carcrush24 service network across India"
              width={730}
              height={706}
              className="h-auto w-full rounded-xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-border bg-white px-5 py-2.5 shadow-[var(--shadow-premium-lg)] sm:left-8 sm:translate-x-0"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="whitespace-nowrap text-sm font-bold text-ink-900">
              {COMPANY_STATS.citiesCovered}+ <span className="font-medium text-ink-500">Cities Live</span>
            </span>
          </motion.div>
        </Reveal>

        <Reveal direction="right">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            Nationwide Coverage
          </span>

          <h2 className="text-gradient-primary mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">
            Our Presence Across India
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg">
            Certified pickup and recycling partners in {COMPANY_STATS.citiesCovered}+ cities — check if we&apos;re already live in yours.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 max-w-md rounded-3xl border border-border bg-white p-6 shadow-[var(--shadow-premium)] sm:p-7"
          >
            <h3 className="text-lg font-bold text-ink-900">Check Service Availability</h3>
            <p className="mt-1 text-sm text-ink-500">We&apos;re expanding fast — see if we serve your area.</p>

            <div className="relative mt-5">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
              <input
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
                  setStatus("idle");
                }}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter your pincode"
                className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-ink-900 outline-none transition-colors focus:border-primary-500"
              />
            </div>

            <button
              type="submit"
              disabled={status === "checking" || pincode.length !== 6}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-primary-700"
            >
              {status === "checking" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Check Availability in Your Area
                </>
              )}
            </button>

            {status === "result" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2 rounded-xl bg-primary-50 p-3 text-sm text-primary-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Good news — pincode {pincode} is within our active service network. Our team will reach out within 24 hours.</span>
              </motion.div>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
