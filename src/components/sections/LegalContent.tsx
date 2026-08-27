import { Reveal } from "@/components/ui/Reveal";

export type LegalListBlock = { items: string[] };
export type LegalDefinitionBlock = { definitions: { term: string; description: string }[] };
export type LegalBodyBlock = string | LegalListBlock | LegalDefinitionBlock;

export interface LegalSection {
  heading: string;
  body: LegalBodyBlock[];
}

function isListBlock(block: LegalBodyBlock): block is LegalListBlock {
  return typeof block === "object" && "items" in block;
}

function isDefinitionBlock(block: LegalBodyBlock): block is LegalDefinitionBlock {
  return typeof block === "object" && "definitions" in block;
}

export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, index) => (
        <Reveal key={section.heading} delay={index * 0.03}>
          <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">{section.heading}</h2>
          <div className="mt-3 flex flex-col gap-3">
            {section.body.map((block, i) => {
              if (isListBlock(block)) {
                return (
                  <ul key={i} className="flex flex-col gap-2.5 py-1">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink-500">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (isDefinitionBlock(block)) {
                return (
                  <ul key={i} className="flex flex-col gap-2.5 py-1">
                    {block.definitions.map((def, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink-500">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>
                          <span className="font-semibold text-ink-900">{def.term}: </span>
                          {def.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-[15px] leading-relaxed text-ink-500">
                  {block}
                </p>
              );
            })}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
