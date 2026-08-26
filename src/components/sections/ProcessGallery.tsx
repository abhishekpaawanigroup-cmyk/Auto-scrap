"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import gallery from "@/data/gallery.json";
import type { GalleryItem } from "@/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const DRAG_THRESHOLD = 6;
const FOCUS_SWIPE_THRESHOLD = 60;
const AUTOPLAY_INTERVAL = 4000;

function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const listener = () => setCanHover(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return canHover;
}

export function ProcessGallery() {
  const items = gallery as GalleryItem[];
  const canHover = useCanHover();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });

  const updateScrollProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setScrollProgress(max > 0 ? track.scrollLeft / max : 0);
  }, []);

  // Mirrors of state read inside the autoplay interval so the timer never
  // needs to be torn down and rebuilt every time hover/drag state changes.
  const isDraggingRef = useRef(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  isDraggingRef.current = isDragging;
  hoveredIndexRef.current = hoveredIndex;
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const id = window.setInterval(() => {
      if (isDraggingRef.current || hoveredIndexRef.current !== null || activeIndexRef.current !== null) return;
      const firstItem = track.firstElementChild as HTMLElement | null;
      const step = firstItem?.getBoundingClientRect().width || track.clientWidth;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft + step;
      track.scrollTo({ left: next >= maxScroll - 2 ? 0 : next, behavior: "smooth" });
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("resize", updateScrollProgress);
    return () => window.removeEventListener("resize", updateScrollProgress);
  }, [updateScrollProgress]);

  // Window-level listeners (not setPointerCapture) so a plain click still fires
  // natively on the pressed button - capturing on the track redirects the
  // resulting click event to the capturing element instead of the button.
  const onWindowPointerMove = useCallback((e: PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) dragState.current.moved = true;
    track.scrollLeft = dragState.current.startScroll - dx;
  }, []);
  const onWindowPointerUp = useCallback(() => {
    window.removeEventListener("pointermove", onWindowPointerMove);
    setIsDragging(false);
  }, [onWindowPointerMove]);

  function onTrackPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    setIsDragging(true);
    window.addEventListener("pointermove", onWindowPointerMove);
    window.addEventListener("pointerup", onWindowPointerUp, { once: true });
  }

  function handleOpen(index: number) {
    if (dragState.current.moved) return;
    setActiveIndex(index);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
    };
  }, [onWindowPointerMove, onWindowPointerUp]);

  const activeDotIndex = Math.round(scrollProgress * (items.length - 1));

  return (
    <section className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Inside The Process"
          title="A Look Inside Our Facility"
          description="From inspection to shredding - a transparent view into how your vehicle is recovered and recycled. Drag to explore."
        />
      </Container>

      <div className="relative mt-14">
        <div
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
          onScroll={updateScrollProgress}
          className={cnJoin(
            "no-scrollbar flex touch-pan-x snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-2 sm:gap-6 sm:px-6 lg:snap-none lg:px-8",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          )}
        >
          {items.map((item, index) => {
            const isHovered = canHover && hoveredIndex === index;

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => canHover && setHoveredIndex(index)}
                onMouseLeave={() => canHover && setHoveredIndex(null)}
                onClick={() => handleOpen(index)}
                className="group relative aspect-[3/2] w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-ink-100 shadow-[var(--shadow-premium)] outline-none transition-[transform,box-shadow] duration-300 ease-[var(--ease-premium)] focus-visible:-translate-y-1 focus-visible:shadow-[var(--shadow-premium-lg)] focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:w-[380px] lg:w-[440px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 78vw"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.06]"
                />
                <div
                  className={cnJoin(
                    "absolute inset-0 bg-ink-950/0 transition-colors duration-300",
                    isHovered && "bg-ink-950/40"
                  )}
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary-700 shadow-sm backdrop-blur-sm">
                  {item.category}
                </span>
                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-ink-950/40 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cnJoin(
                    "absolute inset-0 flex scale-75 items-center justify-center text-white opacity-0 transition-all duration-300",
                    isHovered && "scale-100 opacity-100"
                  )}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                    <Expand className="h-4 w-4" />
                  </span>
                </span>
                <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent px-4 pb-3.5 pt-10 text-left text-sm font-bold text-white sm:text-base">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-surface to-transparent sm:w-16 lg:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-surface to-transparent sm:w-16 lg:w-24" />
      </div>

      <Container>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/10">
            <div
              style={{ width: `${Math.max(scrollProgress * 100, items.length > 1 ? 6 : 100)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-[width] duration-150 ease-out"
            />
          </div>
          <span className="shrink-0 font-mono text-xs font-semibold text-ink-400">
            {String(activeDotIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
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

function cnJoin(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
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
    if (Math.abs(dx) > DRAG_THRESHOLD) dragState.current.moved = true;
  }, []);
  const onWindowPointerUp = useCallback(
    (e: PointerEvent) => {
      if (!dragState.current.dragging) return;
      dragState.current.dragging = false;
      window.removeEventListener("pointermove", onWindowPointerMove);
      const dx = e.clientX - dragState.current.startX;
      if (dx > FOCUS_SWIPE_THRESHOLD) goPrev();
      else if (dx < -FOCUS_SWIPE_THRESHOLD) goNext();
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
