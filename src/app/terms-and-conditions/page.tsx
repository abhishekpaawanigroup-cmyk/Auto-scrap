import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent, type LegalSection } from "@/components/sections/LegalContent";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Review the terms and conditions governing your use of ${SITE_CONFIG.name}'s vehicle scrapping and recycling services.`,
  path: "/terms-and-conditions",
});

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      `By requesting a quote, scheduling a pickup, or otherwise using ${SITE_CONFIG.name}'s services, you agree to be bound by these Terms & Conditions.`,
    ],
  },
  {
    heading: "2. Service Description",
    body: [
      "We provide vehicle scrapping, RC cancellation assistance, pollution certificate support, and related documentation services through our network of government-authorized facilities.",
      "Vehicle valuations are estimates based on the information you provide and are subject to confirmation upon physical inspection.",
    ],
  },
  {
    heading: "3. Ownership & Documentation",
    body: [
      "You confirm that you are the legal owner of the vehicle or are authorized to act on the owner's behalf, and that all documentation provided is accurate and valid.",
      "We reserve the right to decline service if ownership or documentation cannot be verified.",
    ],
  },
  {
    heading: "4. Payment Terms",
    body: [
      "Payment is made digitally at the time of vehicle pickup, based on the final inspected valuation. Quoted prices prior to inspection are estimates and may be adjusted based on the vehicle's actual condition.",
    ],
  },
  {
    heading: "5. Cancellation",
    body: [
      "You may cancel a scheduled pickup at any time prior to collection without penalty. Once a vehicle is collected and payment is issued, the transaction is final.",
    ],
  },
  {
    heading: "6. Limitation of Liability",
    body: [
      `${SITE_CONFIG.name} is not liable for delays caused by third parties, including RTOs, beyond our reasonable control. We will make commercially reasonable efforts to complete documentation processes within stated timelines.`,
    ],
  },
  {
    heading: "7. Governing Law",
    body: [
      "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi.",
    ],
  },
  {
    heading: "8. Contact Us",
    body: [
      `For questions regarding these Terms & Conditions, contact us at ${SITE_CONFIG.contact.email} or ${SITE_CONFIG.contact.phone}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumb="Terms & Conditions"
        title="Terms & Conditions"
        description="Last updated: January 1, 2026"
        backgroundImage="/images/banners/t&c.png"
      />
      <section className="bg-surface py-20 sm:py-28">
        <Container className="max-w-3xl">
          <LegalContent sections={sections} />
        </Container>
      </section>
    </>
  );
}
