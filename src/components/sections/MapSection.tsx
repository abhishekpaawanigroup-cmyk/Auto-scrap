import { SITE_CONFIG } from "@/constants/site";

export function MapSection() {
  return (
    <section className="w-full bg-surface">
      <div className="h-[380px] w-full sm:h-[440px] lg:h-[520px]">
        <iframe
          src={SITE_CONFIG.contact.mapEmbedUrl}
          title={`${SITE_CONFIG.name} location map`}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
