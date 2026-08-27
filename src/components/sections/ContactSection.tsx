import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE_CONFIG } from "@/constants/site";

const contactDetails = [
  { icon: MapPin, title: "Visit Us", value: SITE_CONFIG.contact.address },
  { icon: Phone, title: "Call Us", value: SITE_CONFIG.contact.phone, href: `tel:${SITE_CONFIG.contact.phoneRaw}` },
  { icon: Mail, title: "Email Us", value: SITE_CONFIG.contact.email, href: `mailto:${SITE_CONFIG.contact.email}` },
];

const socialLinks = [
  { href: SITE_CONFIG.social.facebook, icon: FaFacebookF, label: "Facebook" },
  { href: SITE_CONFIG.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SITE_CONFIG.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: SITE_CONFIG.social.youtube, icon: FaYoutube, label: "YouTube" },
];

export function ContactSection() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal direction="left" className="flex flex-col">
            <Badge variant="light" className="self-start">Get In Touch</Badge>
            <h2 className="mt-5 text-3xl font-bold leading-[1.15] text-ink-900 sm:text-4xl lg:text-[2.5rem]">
              Let&apos;s Start a <span className="text-gradient-primary">Conversation</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-500">
              Every vehicle has a story, and every conversation starts with a simple hello. Reach
              out for pickup requests, instant quotes, or support - we&apos;d love to hear from
              you.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-bold text-ink-900">{detail.title}</span>
                      <span className="mt-0.5 text-sm leading-snug text-ink-500">{detail.value}</span>
                    </span>
                  </>
                );
                return detail.href ? (
                  <a
                    key={detail.title}
                    href={detail.href}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-premium)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-premium-lg)] active:-translate-y-0.5 active:shadow-[var(--shadow-premium-lg)]"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={detail.title}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-[var(--shadow-premium)]"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <span className="text-sm font-semibold text-primary-600">Follow our journey</span>
              <div className="mt-3 flex items-center gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white active:border-primary-600 active:bg-primary-600 active:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" className="rounded-3xl border border-border bg-white p-6 shadow-[var(--shadow-premium-lg)] sm:p-8">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
