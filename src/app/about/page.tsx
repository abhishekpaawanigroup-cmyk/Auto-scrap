import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye as EyeIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Timeline } from "@/components/ui/Timeline";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ProcessGallery } from "@/components/sections/ProcessGallery";
import { TeamCard } from "@/components/cards/TeamCard";
import { getIcon } from "@/lib/icon-map";
import { buildMetadata } from "@/lib/seo";
import timeline from "@/data/timeline.json";
import coreValues from "@/data/core-values.json";
import team from "@/data/team.json";
import type { TimelineItem, WhyChooseUsItem, TeamMember } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Carcrush24's mission, values, and 12-year journey building India's most trusted end-of-life vehicle recovery network.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Vantage"
        breadcrumb="About"
        title="Building India's Most Trusted Recovery Network"
        description="For over a decade, we've combined regulatory precision with genuine care for the environment - one vehicle at a time."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-premium-lg)]">
              <Image src="/images/about/story.svg" alt="Our story" width={720} height={560} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal direction="right" className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
              
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">
              From a Single Yard to a Pan-India Network
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-500">
              Carcrush24 began in 2013 with a simple observation: India&apos;s vehicle
              scrapping industry was fragmented, informal, and often environmentally careless.
              We set out to build something different - a certified, technology-enabled recovery
              network that vehicle owners could actually trust.
            </p>
            <p className="text-[15px] leading-relaxed text-ink-500">
              Today, we operate as a government-authorized Registered Vehicle Scrapping Facility,
              processing thousands of vehicles annually across more than 100 cities, while holding
              ourselves to a standard of transparency the industry historically lacked.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal direction="up" className="rounded-2xl border border-border bg-surface p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-[var(--shadow-glow)]">
                <Target className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink-900">Our Mission</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                To make responsible vehicle recovery the default choice for every Indian vehicle
                owner - by removing the friction, opacity, and mistrust that has long defined the
                scrapping industry.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.1} className="rounded-2xl border border-border bg-surface p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <EyeIcon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink-900">Our Vision</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                A future where every end-of-life vehicle in India is recovered through a certified
                network - recapturing materials responsibly and measurably reducing the country&apos;s
                automotive carbon footprint.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionTitle
            eyebrow="Core Values"
            title="What Drives Every Decision We Make"
            description="Four principles that shape our facilities, our people, and every customer interaction."
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(coreValues as WhyChooseUsItem[]).map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <RevealItem key={value.id} direction="up">
                  <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-white p-6 shadow-[var(--shadow-premium)]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="text-base font-bold text-ink-900">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-500">{value.description}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionTitle
            eyebrow="Our Journey"
            title="12 Years of Building Trust"
            description="From a single dismantling yard to a certified, pan-India recovery network."
          />
          <div className="mt-16">
            <Timeline items={timeline as TimelineItem[]} />
          </div>
        </Container>
      </section>

      <StatsSection />

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionTitle
            eyebrow="Leadership"
            title="The Team Behind Vantage"
            description="Experienced leaders across operations, compliance, and customer experience."
          />
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(team as TeamMember[]).map((member) => (
              <RevealItem key={member.id} direction="up">
                <TeamCard member={member} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <ProcessGallery />

      <CTABanner
        title="Want To Partner With Us?"
        description="Whether you're an individual vehicle owner or managing a corporate fleet, our team is ready to help."
      />
    </>
  );
}
