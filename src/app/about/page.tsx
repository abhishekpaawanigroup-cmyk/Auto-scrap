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
        eyebrow="About CarCrush24"
        breadcrumb="About"
        title="Building India's Most Trusted Recovery Network"
        description="For over a decade, we've combined regulatory precision with genuine care for the environment - one vehicle at a time."
        backgroundImage="/images/about/hero.png"
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-premium-lg)]">
              <Image
                src="/images/about/story.png"
                alt="Our story"
                width={720}
                height={600}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal direction="right" className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700">
              
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-ink-900 sm:text-4xl">
              Where Responsible Vehicle Recycling Begins
            </h2>
            <p className="text-[15px] leading-relaxed text-ink-500">
              At CarCrush24, we believe that vehicle scrapping should be simple, transparent, and environmentally responsible. Our mission is to make the end-of-life vehicle process easier for owners while ensuring every vehicle is handled through responsible recycling and recovery practices.
            </p>
            <p className="text-[15px] leading-relaxed text-ink-500">
              From collection and dismantling to the recovery of reusable materials, we focus on creating a reliable and seamless experience at every step. By combining trusted processes with a commitment to sustainability, we aim to give old vehicles a responsible new purpose and contribute to a cleaner future.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <Reveal>
            {/* Mobile: simple stacked cards */}
            <div className="grid grid-cols-1 gap-6 sm:hidden">
              <div className="rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-8">
                <h3 className="text-2xl font-bold uppercase leading-tight text-white">
                  Our
                  <br />
                  Mission
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  Our vision is to build a cleaner and more sustainable future by transforming the way end-of-life vehicles are handled. We aim to create a responsible vehicle recycling ecosystem where every old vehicle is processed with care, valuable materials are recovered efficiently, and unnecessary waste is reduced.
                </p>
                <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 text-white">
                  <Target className="h-7 w-7" strokeWidth={1.75} />
                </span>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-[var(--shadow-glow)]">
                  <EyeIcon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-2xl font-bold uppercase leading-tight text-ink-900">
                  Our
                  <br />
                  Vision
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-500">
                  To create a future where every end-of-life vehicle is handled through a responsible, transparent, and sustainable recycling process. We envision reducing automotive waste, recovering valuable materials efficiently, and contributing to a cleaner, greener future for generations to come.
                </p>
              </div>
            </div>

            {/* Tablet/Desktop: single diagonal-split card */}
            <div className="relative hidden overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-premium-lg)] sm:block">
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500"
                style={{ clipPath: "polygon(0% 0%, 66% 0%, 24% 100%, 0% 100%)" }}
                aria-hidden
              />
              <div className="relative grid min-h-[380px] grid-cols-2 lg:min-h-[420px]">
                <div className="relative z-10 flex flex-col justify-between p-10 sm:max-w-[70%] lg:p-14">
                  <div>
                    <h3 className="text-3xl font-bold uppercase leading-tight text-white lg:text-4xl">
                      Our Mission
                    </h3>
                    <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/85">
                      To provide transparent, responsible, and hassle-free vehicle scrapping services that deliver maximum value to vehicle owners while ensuring environmentally conscious recycling and contributing to a cleaner, more sustainable future.
                    </p>
                  </div>
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/70 text-white">
                    <Target className="h-8 w-8" strokeWidth={1.75} />
                  </span>
                </div>

                <div className="relative z-10 ml-auto flex flex-col justify-between p-10 text-right sm:max-w-[75%] lg:p-14">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 shadow-[var(--shadow-premium)]">
                    <EyeIcon className="h-8 w-8" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-3xl text-left font-bold uppercase leading-tight text-ink-900 lg:text-4xl">
                      Our Vision
                    </h3>
                    <p className="mt-5 ml-auto max-w-xs text-left text-[15px] leading-relaxed text-ink-500">
                      To become India’s most trusted and preferred vehicle scrapping partner, setting new standards for responsible recycling, transparency, environmental sustainability, and an exceptional customer experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
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
                  <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:border-primary-600 hover:shadow-[var(--shadow-premium-lg)] active:border-primary-600 active:shadow-[var(--shadow-premium-lg)]">
                    <div
                      className="absolute inset-0 origin-top-left scale-0 bg-primary-600 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-100 group-active:scale-100"
                      aria-hidden
                    />
                    <div
                      className="bg-pattern-diagonal pointer-events-none absolute inset-0 origin-top-left scale-0 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-premium)] group-hover:scale-100 group-hover:opacity-100 group-active:scale-100 group-active:opacity-100"
                      aria-hidden
                    />
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white group-active:bg-white/15 group-active:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="relative z-10 text-base font-bold text-ink-900 transition-colors duration-300 group-hover:text-white group-active:text-white">
                      {value.title}
                    </h3>
                    <p className="relative z-10 text-sm leading-relaxed text-ink-500 transition-colors duration-300 group-hover:text-white/85 group-active:text-white/85">
                      {value.description}
                    </p>
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

      <section className="bg-surface py-20">
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
