"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import testimonials from "@/data/testimonials.json";
import type { Testimonial } from "@/types";

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_2fr] lg:gap-12">
          <Reveal direction="left" className="flex flex-col text-center md:text-left lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2.5 m-auto md:m-0">
              <span className="h-px w-7 bg-primary-600" />
              <span className="text-sm font-semibold uppercase tracking-wide text-ink-500">Testimonials</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl lg:text-[2.6rem]">
              What Our Customers Say About Us
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500">
              Real experiences from vehicle owners who chose a transparent, certified scrapping process.
            </p>
            <div className="mt-8 flex gap-3 mx-auto md:mx-0">
              <button
                type="button"
                aria-label="Previous testimonials"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-colors duration-300 hover:bg-primary-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonials"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-colors duration-300 hover:bg-primary-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>

          <Reveal direction="right" className="min-w-0">
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
              }}
              className="!pb-2"
            >
              {(testimonials as Testimonial[]).map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="!h-auto py-2">
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
