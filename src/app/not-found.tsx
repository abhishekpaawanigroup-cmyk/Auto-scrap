import { ArrowLeft, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 py-20">
      <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-700/25 blur-[120px]" aria-hidden />
      <Container className="relative z-10 flex flex-col items-center text-center">
        <Reveal direction="scale">
          <p className="text-8xl font-bold text-white sm:text-9xl">
            4<span className="text-gradient-primary">0</span>4
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            This Page Has Already Been Scrapped
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-300">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get
            you back on track.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg" icon={<ArrowLeft className="h-5 w-5" />} iconPosition="left">
            Back to Home
          </Button>
          <Button
            href="/contact"
            size="lg"
            variant="ghost"
            className="text-white hover:bg-white/10 active:bg-white/10"
            icon={<Search className="h-5 w-5" />}
            iconPosition="left"
          >
            Contact Support
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
