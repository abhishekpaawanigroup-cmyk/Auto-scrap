import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Carcrush24 for vehicle scrapping quotes, corporate fleet disposal, or general enquiries.",
  path: "/contact",
});

const contactCards = [
  { icon: MapPin, title: "Visit Us", value: SITE_CONFIG.contact.address },
  { icon: Phone, title: "Call Us", value: SITE_CONFIG.contact.phone, href: `tel:${SITE_CONFIG.contact.phoneRaw}` },
  { icon: Mail, title: "Email Us", value: SITE_CONFIG.contact.email, href: `mailto:${SITE_CONFIG.contact.email}` },
  { icon: Clock, title: "Working Hours", value: SITE_CONFIG.contact.hours },
];

const socialLinks = [
  { href: SITE_CONFIG.social.facebook, icon: FaFacebookF, label: "Facebook" },
  { href: SITE_CONFIG.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SITE_CONFIG.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: SITE_CONFIG.social.youtube, icon: FaYoutube, label: "YouTube" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        breadcrumb="Contact"
        title="We're Here to Help"
        description="Have a question about pricing, pickup, or documentation? Reach out - our team responds within one business day."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-ink-500">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] font-semibold leading-snug text-ink-900">
                    {card.value}
                  </p>
                </>
              );
              return (
                <Reveal key={card.title} direction="up">
                  {card.href ? (
                    <a href={card.href} className="block h-full rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-premium)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-premium-lg)] active:-translate-y-1 active:shadow-[var(--shadow-premium-lg)]">
                      {content}
                    </a>
                  ) : (
                    <div className="h-full rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-premium)]">
                      {content}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr]">
            <Reveal direction="left" className="rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-premium)] sm:p-10">
              <SectionTitle
                align="left"
                eyebrow="Send a Message"
                title="Tell Us About Your Vehicle"
                description="Fill out the form and our advisors will reach out with next steps."
                className="mx-0 max-w-none"
              />
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal direction="right" className="flex flex-col gap-6">
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-ink-950">
                <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
                <div className="relative z-10 flex h-full min-h-[280px] flex-col items-center justify-center gap-3 p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-accent-400">
                    <MapPin className="h-7 w-7" />
                  </span>
                  <p className="text-sm font-semibold text-white">{SITE_CONFIG.contact.address}</p>
                  <p className="text-xs text-ink-400">Interactive map integration coming soon</p>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-white p-7">
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink-900">Follow Us</h3>
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white active:border-primary-600 active:bg-primary-600 active:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FAQSection />
    </>
  );
}
