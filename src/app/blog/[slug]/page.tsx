import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/ui/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { BlogCard } from "@/components/cards/BlogCard";
import { ArticleBlocks } from "@/components/blog/ArticleBlocks";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ScrapCtaCard } from "@/components/blog/ScrapCtaCard";
import { buildMetadata, blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/utils/format";
import { parseBlogContent } from "@/lib/blogContent";
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

  const others = blogs.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const relatedPosts = [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  const { blocks, toc } = parseBlogContent(post.content);

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
        <PageHero
          eyebrow={post.category}
          breadcrumb={post.title}
          title={post.title}
          description={post.excerpt}
          backgroundImage="/images/blog/hero.png"
        />

        {/* Blog details content area */}
        <Container className="py-14 sm:py-20">
          <Reveal className="mb-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-8 text-sm text-ink-500">
            <span className="flex items-center gap-2 font-semibold text-ink-800">
              <Image
                src={post.authorImage}
                alt={post.author}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              {post.author}
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden />
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            {post.updatedDate && post.updatedDate !== post.date && (
              <>
                <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden />
                <span>Updated {formatDate(post.updatedDate)}</span>
              </>
            )}
            <span className="h-1 w-1 rounded-full bg-ink-300" aria-hidden />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
            <div>
              <Reveal className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-premium)]">
                <div className="relative aspect-[16/9] w-full">
                  <Image src={post.image} alt={post.title} fill priority className="object-cover" />
                </div>
              </Reveal>

              {toc.length > 0 && (
                <div className="mt-8 lg:hidden">
                  <TableOfContents items={toc} />
                </div>
              )}

              <div className="mt-6 lg:hidden">
                <ScrapCtaCard />
              </div>

              <div className="mt-9">
                <ArticleBlocks blocks={blocks} />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <aside className="hidden flex-col gap-6 lg:sticky lg:top-28 lg:flex">
              {toc.length > 0 && <TableOfContents items={toc} />}
              <ScrapCtaCard />
            </aside>
          </div>
        </Container>

        {/* Related Blogs */}
        <section className="bg-surface py-20">
          <Container>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Related Articles</h2>
              <Link
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800 active:text-primary-800 sm:flex"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((item) => (
                <BlogCard key={item.id} post={item} />
              ))}
            </div>
          </Container>
        </section>
      </article>

      <CTABanner
        title="Ready to Turn Your Old Vehicle Into Value?"
        description="Get a free, transparent quote and doorstep pickup - fully documented, fully compliant, and completed in days, not weeks."
      />
    </>
  );
}
