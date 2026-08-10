import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { buildMetadata } from "@/lib/seo";
import blogs from "@/data/blogs.json";
import type { BlogPost } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Policy explainers, environmental deep-dives, and practical guides on vehicle scrapping and recycling in India.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & Updates"
        breadcrumb="Blog"
        title="Vehicle Recycling Insights & Updates"
        description="Practical guides, policy explainers, and environmental deep-dives from our team."
      />

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <BlogListing posts={blogs as BlogPost[]} />
        </Container>
      </section>
    </>
  );
}
