"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight, Clock, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedHamburger, MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppIconButton } from "@/components/layout/WhatsAppIconButton";
import { useQuoteModal } from "@/components/layout/QuoteModalProvider";
import { SITE_CONFIG } from "@/constants/site";
import navigation from "@/data/navigation.json";
import type { NavLink } from "@/types";

const topbarSocial = [
  { href: SITE_CONFIG.social.facebook, icon: FaFacebookF, label: "Facebook" },
  { href: SITE_CONFIG.social.instagram, icon: FaInstagram, label: "Instagram" },
  { href: SITE_CONFIG.social.youtube, icon: FaYoutube, label: "YouTube" },
];

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { openQuoteModal } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Topbar - a normal (non-sticky) block; it scrolls away and the sticky <header> below takes over */}
      <div className="relative z-40 hidden bg-primary-800 lg:block">
        <Container className="flex h-11 items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-accent-400"
            >
              <Mail className="h-3.5 w-3.5 text-accent-400" />
              <span className="font-semibold text-accent-400">Email:</span> {SITE_CONFIG.contact.email}
            </a>
            <span className="hidden items-center gap-1.5 xl:flex">
              <Clock className="h-3.5 w-3.5 text-accent-400" />
              <span className="font-semibold text-accent-400">Working Hours:</span> {SITE_CONFIG.contact.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-5 xl:flex">
              <Link href="/#locations" className="relative transition-colors hover:text-accent-400">
                Service Locations
              </Link>
              <Link href="/blog" className="relative transition-colors hover:text-accent-400">
                Blog
              </Link>
              <Link href="/contact" className="relative transition-colors hover:text-accent-400">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center gap-3 border-l border-white/15 pl-5">
              {topbarSocial.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-accent-400 transition-colors hover:text-white"
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Main nav - always solid white; sticky to the whole document so it stays pinned after the topbar scrolls away */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-black/[0.05] bg-white transition-shadow duration-300",
          scrolled ? "shadow-[0_3px_16px_-4px_rgba(3,69,47,0.18)] py-2" : "shadow-[0_2px_10px_-4px_rgba(3,69,47,0.08)]"
        )}
      >
        <Container className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-16" : "h-20")}>
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={`${SITE_CONFIG.name} logo`}
              width={120}
              height={80}
              priority
              className="h-12 w-auto transition-all duration-300 sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {(navigation.mainNav as NavLink[]).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative mx-1 flex items-center px-3 py-2.5 text-sm font-bold uppercase tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    active ? "text-primary-600" : "text-primary-800 hover:text-primary-600"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-1 left-3 right-3 h-[2px] origin-left rounded-full bg-primary-600 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-stretch gap-4 lg:flex">
            <div className="flex items-center gap-4 rounded-lg bg-primary-600 py-2.5 pl-5 pr-2.5">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                className="flex items-center gap-3 text-white transition-opacity hover:opacity-90"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] font-medium text-white/75">Need assistance?</span>
                  <span className="text-sm font-bold">{SITE_CONFIG.contact.phone}</span>
                </span>
              </a>
              <Button
                type="button"
                onClick={openQuoteModal}
                size="sm"
                variant="white"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Get Instant Quote
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <WhatsAppIconButton />
            <AnimatedHamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
