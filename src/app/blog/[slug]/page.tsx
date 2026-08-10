import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/ui/CTABanner";
import { BlogCard } from "@/components/cards/BlogCard";
import { buildMetadata, blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/utils/format";
import blogsData from "@/data/blogs.json";
import type { BlogPost } from "@/types";

const blogs = blogsData as BlogPost[];

export function generateStaticParams() {
  return blogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    keywords: post.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogs.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogs.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <article>
        <section className="relative overflow-hidden bg-ink-950 pb-16 pt-20 sm:pb-20 sm:pt-24">
          <div className="absolute inset-0 bg-grid opacity-[0.05]" aria-hidden />
          <Container className="relative z-10 max-w-3xl">
            <Reveal>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Badge variant="dark" className="mt-6">
                {post.category}
              </Badge>
              <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-300">
                <span className="flex items-center gap-2">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </Reveal>
          </Container>
        </section>

        <Container className="max-w-3xl py-14">
          <Reveal className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-premium-lg)]">
            <Image src={post.image} alt={post.title} width={960} height={600} className="h-auto w-full object-cover" />
          </Reveal>

          <div className="prose-content mt-10 flex flex-col gap-5">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[17px] leading-[1.8] text-ink-600">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </Container>

        {related.length > 0 && (
          <section className="bg-surface py-20">
            <Container>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Related Articles</h2>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <BlogCard key={item.id} post={item} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>

      <CTABanner />
    </>
  );
}
