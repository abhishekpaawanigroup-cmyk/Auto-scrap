import { Clock, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/constants/site";

const socialLinks = [
  { href: SITE_CONFIG.social.facebook, icon: FaFacebookF, label: "Facebook" },
  { href: SITE_CONFIG.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SITE_CONFIG.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
  { href: SITE_CONFIG.social.youtube, icon: FaYoutube, label: "YouTube" },
];

export function TopBar() {
  return (
    <div className="hidden bg-ink-950 text-ink-300 lg:block">
      <Container className="flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-accent-500" />
            {SITE_CONFIG.contact.hours}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-accent-500" />
            <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-white">
              {SITE_CONFIG.contact.phone}
            </a>
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-accent-500" />
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white">
              {SITE_CONFIG.contact.email}
            </a>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-ink-300 transition-colors hover:bg-primary-500 hover:text-ink-950"
            >
              <Icon className="h-3 w-3" />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
