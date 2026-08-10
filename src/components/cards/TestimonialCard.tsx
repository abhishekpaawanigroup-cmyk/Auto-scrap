import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-[var(--shadow-premium)] sm:p-8">
      <Quote className="h-8 w-8 text-primary-200" strokeWidth={1.5} />
      <div className="mt-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent-500 text-accent-500" : "fill-ink-200 text-ink-200"}`}
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-600">
        &ldquo;{testimonial.review}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-bold text-ink-900">{testimonial.name}</p>
          <p className="text-xs text-ink-500">
            {testimonial.location} &middot; {testimonial.vehicle}
          </p>
        </div>
      </div>
    </div>
  );
}
