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
import { TopBar } from "@/components/layout/TopBar";
import { AnimatedHamburger, MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppIconButton } from "@/components/layout/WhatsAppIconButton";
import { SITE_CONFIG } from "@/constants/site";
import navigation from "@/data/navigation.json";
import type { NavLink } from "@/types";

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={cn(
          "relative border-b transition-all duration-300",
          scrolled
            ? "border-border bg-white/85 backdrop-blur-xl shadow-[var(--shadow-premium)]"
            : "border-transparent bg-white"
        )}
      >
        <Container className={cn("flex items-center justify-between transition-all duration-300", scrolled ? "h-[76px]" : "h-[80px]")}>
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt={SITE_CONFIG.name}
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
                    active ? "text-primary-700" : "text-ink-700 hover:text-primary-700"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "pointer-events-none absolute bottom-1.5 left-4 right-4 h-[2px] origin-left rounded-full bg-primary-600 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100",
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#483d3e] text-ink-700 transition-colors hover:border-primary-600 hover:text-primary-700"
              aria-label="Call us"
            >
              <Phone className="h-[18px] w-[18px]" />
            </a>
            <Button href="/contact" size="md" icon={<ArrowRight className="h-4 w-4" />}>
              Get Instant Quote
            </Button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <WhatsAppIconButton />
            <AnimatedHamburger open={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
          </div>
        </Container>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
