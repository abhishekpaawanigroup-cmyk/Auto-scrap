export type TocItem = { id: string; text: string; level: 2 | 3 };

export type ContentBlock =
  | { type: "heading"; level: 2 | 3; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "callout"; variant: "tip" | "warning" | "info"; title?: string; lines: string[] };

const HEADING_RE = /^#{2,3}\s/;
const CALLOUT_FENCE_RE = /^:::(tip|warning|info)\s*(.*)$/i;
const BLOCKQUOTE_RE = /^>\s?/;
const UL_RE = /^-\s+/;
const OL_RE = /^\d+\.\s+/;
const BLOCK_START_RE = /^(#{2,3}\s|:::|>\s?|-\s|\d+\.\s)/;

export function parseBlogContent(raw: string): { blocks: ContentBlock[]; toc: TocItem[] } {
  const lines = raw.split("\n");
  const blocks: ContentBlock[] = [];
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  function slugify(text: string) {
    const base = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    let id = base || "section";
    let i = 2;
    while (usedIds.has(id)) {
      id = `${base}-${i++}`;
    }
    usedIds.add(id);
    return id;
  }

  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i++;
      continue;
    }

    if (HEADING_RE.test(trimmed)) {
      const level = trimmed.startsWith("### ") ? 3 : 2;
      const text = trimmed.replace(/^#{2,3}\s+/, "");
      const id = slugify(text);
      blocks.push({ type: "heading", level, id, text });
      toc.push({ id, text, level });
      i++;
      continue;
    }

    const fenceMatch = trimmed.match(CALLOUT_FENCE_RE);
    if (fenceMatch) {
      const variant = fenceMatch[1].toLowerCase() as "tip" | "warning" | "info";
      const title = fenceMatch[2].trim() || undefined;
      const bodyLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        if (lines[i].trim()) bodyLines.push(lines[i].trim());
        i++;
      }
      i++;
      blocks.push({ type: "callout", variant, title, lines: bodyLines });
      continue;
    }

    if (BLOCKQUOTE_RE.test(trimmed)) {
      const quoteLines: string[] = [];
      while (i < lines.length && BLOCKQUOTE_RE.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(BLOCKQUOTE_RE, ""));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (UL_RE.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && UL_RE.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(UL_RE, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (OL_RE.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && OL_RE.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(OL_RE, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !BLOCK_START_RE.test(lines[i].trim())) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "paragraph", text: paraLines.join(" ") });
  }

  return { blocks, toc };
}
