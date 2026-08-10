import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

interface PageSeoOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
}: PageSeoOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image ?? SITE_CONFIG.ogImage;

  return {
    title,
    description,
    keywords: keywords ?? [...SITE_CONFIG.keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.contact.phoneRaw,
      contactType: "customer service",
      email: SITE_CONFIG.contact.email,
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_CONFIG.url}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.url}/images/logo.png` },
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${post.slug}`,
  };
}
