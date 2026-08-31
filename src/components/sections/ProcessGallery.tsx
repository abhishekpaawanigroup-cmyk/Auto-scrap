"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";
import gallery from "@/data/gallery.json";
import type { GalleryItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const SWIPE_THRESHOLD = 60;

// The one tile rendered as a wide hero. With 8 items and one 2-col-wide tile,
// the grid totals 9 cells - an exact multiple of the 3-column desktop grid,
// so every row fills completely with no leftover gaps.
const FEATURED_ID = "g1";

export function ProcessGallery() {
  const items = gallery as GalleryItem[];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Inside The Process"
          title="A Look Inside Our Facility"
          description="From inspection to shredding - a transparent view into how your vehicle is recovered and recycled."
        />

        <RevealGroup className="mt-14 grid auto-rows-[210px] grid-cols-2 gap-4 sm:auto-rows-[260px] sm:grid-cols-3 sm:gap-5 lg:auto-rows-[300px] lg:gap-6">
          {items.map((item, index) => {
            const isFeatured = item.id === FEATURED_ID;
            return (
              <RevealItem
                key={item.id}
                direction="scale"
                className={isFeatured ? "col-span-2" : undefined}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-ink-100 text-left shadow-[var(--shadow-premium)] outline-none transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] hover:shadow-[var(--shadow-premium-lg)] focus-visible:-translate-y-1 focus-visible:shadow-[var(--shadow-premium-lg)] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes={
                      isFeatured
                        ? "(min-width: 1024px) 860px, (min-width: 640px) 660px, 100vw"
                        : "(min-width: 1024px) 420px, (min-width: 640px) 320px, 50vw"
                    }
                    className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary-700 shadow-sm backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>
                  <p
                    className={cn(
                      "absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 font-bold text-white",
                      isFeatured ? "text-lg sm:text-2xl" : "text-sm sm:text-base"
                    )}
                  >
                    {item.title}
                  </p>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>

      <AnimatePresence>
        {activeIndex !== null && (
          <FocusedGallery
            items={items}
            activeIndex={activeIndex}
            onChangeIndex={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function FocusedGallery({
  items,
  activeIndex,
  onChangeIndex,
  onClose,
}: {
  items: GalleryItem[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}) {
  useLockBodyScroll(true);
  const active = items[activeIndex];
  const dragState = useRef({ startX: 0, moved: false, dragging: false });

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < items.length - 1;
  const goPrev = useCallback(() => onChangeIndex(Math.max(0, activeIndex - 1)), [activeIndex, onChangeIndex]);
  const goNext = useCallback(
    () => onChangeIndex(Math.min(items.length - 1, activeIndex + 1)),
    [activeIndex, items.length, onChangeIndex]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  // Window-level listeners (not setPointerCapture) so a plain click still
  // fires natively - capturing here would redirect it to this div instead.
  const onWindowPointerMove = useCallback((e: PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 6) dragState.current.moved = true;
  }, []);
  const onWindowPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!dragState.current.dragging) return;
      dragState.current.dragging = false;
      window.removeEventListener("pointermove", onWindowPointerMove);
      const dx = e.clientX - dragState.current.startX;
      if (dx > SWIPE_THRESHOLD) goPrev();
      else if (dx < -SWIPE_THRESHOLD) goNext();
    },
    [onWindowPointerMove, goPrev, goNext]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
    };
  }, [onWindowPointerMove, onWindowPointerUp]);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragState.current = { startX: e.clientX, moved: false, dragging: true };
    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp, { once: true });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm sm:p-8"
    >
      <span className="absolute left-5 top-5 z-10 font-mono text-sm font-semibold text-white/70 sm:left-8 sm:top-8">
        {activeIndex + 1} / {items.length}
      </span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-500 hover:text-ink-950 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-500 hover:text-ink-950 sm:left-5"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-500 hover:text-ink-950 sm:right-5"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        className="relative flex max-h-full w-full flex-1 touch-pan-y items-center justify-center"
        onPointerDown={onPointerDown}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative w-full max-w-3xl"
          >
            <div className="relative max-h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={active.image}
                alt={active.title}
                width={1000}
                height={750}
                draggable={false}
                className="h-auto max-h-[70vh] w-full object-contain"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-1 pb-2 pt-4 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="text-base font-bold text-white sm:text-lg">{active.title}</p>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
          {active.category}
        </span>
      </div>
    </motion.div>
  );
}
