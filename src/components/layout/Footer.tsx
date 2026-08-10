import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { BackToTop } from "@/components/layout/BackToTop";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { SITE_CONFIG } from "@/constants/site";
import navigation from "@/data/navigation.json";

const socialLinks = [
  { href: SITE_CONFIG.social.facebook, icon: FaFacebookF, label: "Facebook" },
  { href: SITE_CONFIG.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SITE_CONFIG.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: SITE_CONFIG.social.youtube, icon: FaYoutube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="absolute inset-0 bg-grid opacity-[0.03]" aria-hidden />
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <div className="w-fit rounded-xl bg-white p-2">
              <Image src="/images/logo.png" alt={SITE_CONFIG.name} width={64} height={64} />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-400">
              India&apos;s premium end-of-life vehicle recovery company. Government-authorized
              scrapping, instant valuation, and certified eco-friendly recycling.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-ink-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" links={navigation.footerQuickLinks} />
          <FooterColumn title="Our Services" links={navigation.footerServices} />

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Contact Us</h4>
            <a href={`https://maps.google.com`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-ink-400 hover:text-white">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
              {SITE_CONFIG.contact.address}
            </a>
            <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="flex items-center gap-3 text-sm text-ink-400 hover:text-white">
              <Phone className="h-4 w-4 shrink-0 text-accent-500" />
              {SITE_CONFIG.contact.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-3 text-sm text-ink-400 hover:text-white">
              <Mail className="h-4 w-4 shrink-0 text-accent-500" />
              {SITE_CONFIG.contact.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-ink-400">
              <Clock className="h-4 w-4 shrink-0 text-accent-500" />
              {SITE_CONFIG.contact.hours}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Newsletter</h4>
            <p className="text-sm leading-relaxed text-ink-400">
              Subscribe for scrapping tips, policy updates, and recycling news.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            {navigation.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink-500 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <BackToTop />
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-bold uppercase tracking-wide text-white">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
