"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import testimonials from "@/data/testimonials.json";
import type { Testimonial } from "@/types";

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Customer Stories"
            title="What Our Customers Say"
            description="Real experiences from vehicle owners who chose a transparent, certified scrapping process."
            align="left"
            className="max-w-2xl"
          />
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => swiperRef.current?.slidePrev()}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink-500 shadow-[var(--shadow-premium)] transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => swiperRef.current?.slideNext()}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink-500 shadow-[var(--shadow-premium)] transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
      <Container className="mt-14">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={24}
          loop
          speed={900}
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-2"
        >
          {(testimonials as Testimonial[]).map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="!h-auto pb-2 pt-9">
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
