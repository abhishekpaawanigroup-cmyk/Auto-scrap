import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { LegalContent, type LegalSection } from "@/components/sections/LegalContent";
import { buildMetadata } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Read ${SITE_CONFIG.name}'s privacy policy to understand how we collect, use, and protect your personal information.`,
  path: "/privacy-policy",
});

const sections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: [
      "We collect information you provide directly to us when requesting a quote, scheduling a pickup, or contacting our support team - including your name, phone number, email address, vehicle details, and pickup location.",
      "We may also collect limited technical information such as browser type and device information to help us improve our website experience.",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: [
      "Your information is used to process vehicle valuations, coordinate pickups, complete RC cancellation paperwork, and communicate with you about the status of your request.",
      "We do not sell your personal information to third parties. Information is shared only with regulatory bodies (such as RTOs) as required to complete vehicle deregistration on your behalf.",
    ],
  },
  {
    heading: "3. Data Security",
    body: [
      "We implement industry-standard safeguards to protect your data against unauthorized access, alteration, or disclosure, including encrypted data transmission and restricted internal access controls.",
    ],
  },
  {
    heading: "4. Cookies & Tracking",
    body: [
      "Our website may use cookies to improve functionality and understand how visitors interact with our content. You can control cookie preferences through your browser settings.",
    ],
  },
  {
    heading: "5. Your Rights",
    body: [
      "You may request access to, correction of, or deletion of your personal data at any time by contacting our support team using the details on our Contact page.",
    ],
  },
  {
    heading: "6. Changes to This Policy",
    body: [
      "We may update this Privacy Policy periodically. Material changes will be communicated via our website. Continued use of our services after changes constitutes acceptance of the revised policy.",
    ],
  },
  {
    heading: "7. Contact Us",
    body: [
      `If you have questions about this Privacy Policy, please reach out to us at ${SITE_CONFIG.contact.email} or ${SITE_CONFIG.contact.phone}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        breadcrumb="Privacy Policy"
        title="Privacy Policy"
        description="Last updated: January 1, 2026"
      />
      <section className="bg-surface py-20 sm:py-28">
        <Container className="max-w-3xl">
          <LegalContent sections={sections} />
        </Container>
      </section>
    </>
  );
}
