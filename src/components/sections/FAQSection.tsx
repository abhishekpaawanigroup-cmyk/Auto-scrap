import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import faqs from "@/data/faqs.json";
import type { FAQ } from "@/types";

export function FAQSection() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionTitle
          eyebrow="Frequently Asked"
          title="Questions, Answered"
          description="Everything you need to know before you request your first quote."
        />
        <Reveal delay={0.15} className="mt-14">
          <Accordion items={faqs as FAQ[]} />
        </Reveal>
      </Container>
    </section>
  );
}
