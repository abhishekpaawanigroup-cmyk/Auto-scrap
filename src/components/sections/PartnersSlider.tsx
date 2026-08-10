import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import partners from "@/data/partners.json";
import type { Brand } from "@/types";

export function PartnersSlider() {
  return (
    <section className="bg-white py-16">
      <Container>
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            Certified &amp; Recognized By
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {(partners as Brand[]).map((partner) => (
            <Image
              key={partner.id}
              src={partner.logo}
              alt={partner.name}
              width={140}
              height={56}
              className="h-14 w-auto opacity-90 transition-opacity hover:opacity-100"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
