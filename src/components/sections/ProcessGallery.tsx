"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import gallery from "@/data/gallery.json";
import type { GalleryItem } from "@/types";

export function ProcessGallery() {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const items = gallery as GalleryItem[];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Inside The Process"
          title="A Look Inside Our Facility"
          description="From inspection to shredding — a transparent view into how your vehicle is recovered and recycled."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={(index % 4) * 0.06}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-ink-950/80 via-ink-950/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-9 w-9 items-center justify-center self-end rounded-full bg-white/15 text-white backdrop-blur">
                    <Expand className="h-4 w-4" />
                  </span>
                  <p className="mt-auto text-sm font-semibold text-white">{item.title}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl"
            >
              <Image src={active.image} alt={active.title} width={800} height={600} className="h-auto w-full" />
              <p className="absolute bottom-0 left-0 right-0 bg-ink-950/70 p-4 text-sm font-semibold text-white">
                {active.title}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
