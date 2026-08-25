import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary-700/25 blur-[110px]" aria-hidden />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent-500/15 blur-[110px]" aria-hidden />
      <Container className="relative z-10">
        <Reveal className="flex items-center gap-2 text-sm text-ink-400">
          <Link href="/" className="hover:text-white active:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-accent-400">{breadcrumb}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.14}>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
