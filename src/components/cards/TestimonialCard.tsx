import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-xl bg-white p-7 text-left shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] sm:p-8">
      <div className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "h-4 w-4",
              index < testimonial.rating ? "fill-accent-500 text-accent-500" : "fill-none text-ink-200"
            )}
          />
        ))}
      </div>

      <p className="flex-1 text-[15px] leading-relaxed text-ink-600">{testimonial.review}</p>

      <div className="flex items-center gap-3 border-t border-border pt-5">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-bold text-ink-900">{testimonial.name}</p>
          <p className="text-xs text-ink-500">{testimonial.location}</p>
        </div>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-[3px] bg-primary-600" aria-hidden />
    </div>
  );
}
