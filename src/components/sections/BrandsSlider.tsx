"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import brands from "@/data/brands.json";
import type { Brand } from "@/types";

export function BrandsSlider() {
  return (
    <section className="border-y border-border bg-white py-16 sm:py-20">
      <Container>
        <SectionTitle
          eyebrow="All Brands Welcome"
          title="We Buy Vehicles of Every Make"
          description="No matter the manufacturer, our valuation engine and dismantling process supports every major brand on Indian roads."
        />
      </Container>
      <div className="mt-12">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={24}
          loop
          speed={4000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          breakpoints={{
            480: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
        >
          {(brands as Brand[]).map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex h-20 items-center justify-center rounded-xl border border-border bg-surface px-6 opacity-80 transition-opacity hover:opacity-100">
                <Image src={brand.logo} alt={brand.name} width={140} height={48} className="h-8 w-auto object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
