import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/cards/BlogCard";
import blogs from "@/data/blogs.json";
import type { BlogPost } from "@/types";

export function LatestBlogs() {
  const latest = (blogs as BlogPost[]).slice(0, 6);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionTitle
          eyebrow="Insights & Updates"
          title="Latest From Our Blog"
          description="Policy explainers, environmental deep-dives, and practical guides on vehicle recycling."
        />
        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <RevealItem key={post.id} direction="up">
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 flex justify-center">
          <Button href="/blog" variant="outline" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
            View All Articles
          </Button>
        </div>
      </Container>
    </section>
  );
}
