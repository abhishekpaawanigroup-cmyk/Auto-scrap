"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
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

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const { openQuoteModal } = useQuoteModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header className={isHome ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50"}>
      <div
        className={cn(
          "relative border-b transition-all duration-300 ease-[var(--ease-premium)]",
          scrolled
            ? "border-black/[0.06] bg-white/80 backdrop-blur-[14px] shadow-[var(--shadow-premium)]"
            : transparent
              ? "border-transparent bg-transparent"
              : "border-transparent bg-white"
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image
              src={transparent ? "/images/logo1.png" : "/images/logo.png"}
              alt={`${SITE_CONFIG.name} logo`}
              width={120}
              height={80}
              priority
              className="h-14 w-auto sm:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {(navigation.mainNav as NavLink[]).map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                    transparent
                      ? active
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : active
                        ? "text-primary-700"
                        : "text-ink-700 hover:text-primary-700"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-1.5 left-4 right-4 h-[2px] origin-left rounded-full transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100",
                      transparent ? "bg-white" : "bg-primary-600",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                transparent
                  ? "border-white/40 text-white hover:border-white hover:bg-white/10"
                  : "border-[#483d3e] text-ink-700 hover:border-primary-600 hover:text-primary-700"
              )}
              aria-label="Call us"
            >
              <Phone className="h-[18px] w-[18px]" />
            </a>
            <Button
              type="button"
              onClick={openQuoteModal}
              size="md"
              variant={transparent ? "outline-white" : "primary"}
              className={cn(!transparent && "border border-primary-600 hover:border-primary-700")}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get Instant Quote
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <WhatsAppIconButton />
            <AnimatedHamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} light={transparent} />
          </div>
        </Container>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
