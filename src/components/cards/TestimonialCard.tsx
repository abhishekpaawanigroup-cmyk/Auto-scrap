import Image from "next/image";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex h-full flex-col items-center rounded-xl bg-ink-100 px-6 pb-8 pt-14 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-8">
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={72}
        height={72}
        className="absolute -top-9 left-1/2 h-[72px] w-[72px] -translate-x-1/2 rounded-full border-4 border-white object-cover shadow-md"
      />
      <p className="flex-1 text-[15px] leading-relaxed text-ink-600">
        <span className="mr-1 font-serif text-2xl leading-none text-primary-600">&ldquo;</span>
        {testimonial.review}
        <span className="ml-1 font-serif text-2xl leading-none text-primary-600">&rdquo;</span>
      </p>
      <p className="mt-6 text-sm">
        <span className="font-bold text-primary-600">{testimonial.name}</span>{" "}
        <span className="text-ink-500">
          &middot; {testimonial.location}, {testimonial.vehicle}
        </span>
      </p>
    </div>
  );
}
