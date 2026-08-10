"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import testimonials from "@/data/testimonials.json";
import type { Testimonial } from "@/types";

export function TestimonialsSection() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Customer Stories"
          title="What Our Customers Say"
          description="Real experiences from vehicle owners who chose a transparent, certified scrapping process."
        />
      </Container>
      <Container className="mt-14">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".testimonial-pagination" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{
            "--swiper-pagination-color": "var(--color-primary-600)",
            "--swiper-pagination-bullet-inactive-color": "var(--color-ink-200)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
          } as React.CSSProperties}
          className="!overflow-visible !pb-14"
        >
          {(testimonials as Testimonial[]).map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="!h-auto py-2">
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonial-pagination mt-2 flex justify-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-ink-200 [&_.swiper-pagination-bullet-active]:bg-primary-600 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all" />
      </Container>
    </section>
  );
}
