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

  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });

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

  return (
    <section className="overflow-hidden bg-surface py-20">
      <Container>
        <SectionTitle
          eyebrow="Inside The Process"
          title="A Look Inside Our Facility"
          description="From inspection to shredding - a transparent view into how your vehicle is recovered and recycled. Drag to explore."
        />
      </Container>

      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        className={cnJoin(
          "no-scrollbar mt-14 flex touch-pan-x snap-x snap-proximity gap-0 overflow-x-auto lg:snap-none",
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
              className="relative h-[280px] w-[82vw] shrink-0 snap-center overflow-hidden outline-none sm:h-[340px] sm:w-[300px] lg:h-[476px] lg:w-[381px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="pointer-events-none object-cover"
              />
              <div
                className={cnJoin(
                  "absolute inset-0 flex items-center justify-center bg-primary-900/0 transition-colors duration-300",
                  isHovered && "bg-primary-900/50"
                )}
              >
                <span
                  className={cnJoin(
                    "flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300",
                    isHovered && "scale-100 opacity-100"
                  )}
                >
                  <Expand className="h-4 w-4" />
                </span>
              </div>
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 to-transparent px-3 pb-3 pt-8 text-left text-xs font-semibold text-white sm:text-sm">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>

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
            <div className="relative max-h-[70vh] w-full overflow-hidden rounded-lg border border-white/10">
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
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">{active.category}</span>
      </div>
    </motion.div>
  );
}
