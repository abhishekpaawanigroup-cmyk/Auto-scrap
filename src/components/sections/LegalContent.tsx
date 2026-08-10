import { Reveal } from "@/components/ui/Reveal";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, index) => (
        <Reveal key={section.heading} delay={index * 0.03}>
          <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">{section.heading}</h2>
          <div className="mt-3 flex flex-col gap-3">
            {section.body.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-500">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
