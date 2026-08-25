"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";
import type { BlogPost } from "@/types";

const PAGE_SIZE = 6;

export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery = post.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const recentPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  const popularPosts = [...posts].slice(0, 4).reverse();

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="h-12 w-full rounded-full border border-ink-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                category === cat
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-ink-200 bg-white text-ink-600 hover:border-primary-300 active:border-primary-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {paginated.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {paginated.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-ink-500">
            No articles match your search. Try a different keyword or category.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  page === p ? "bg-primary-600 text-white" : "bg-white text-ink-600 hover:bg-ink-100 active:bg-ink-100"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="flex flex-col gap-8">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-900">Recent Posts</h3>
          <div className="mt-5 flex flex-col gap-4">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug text-ink-900 group-hover:text-primary-700 group-active:text-primary-700">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{formatDate(post.date)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-900">Popular Posts</h3>
          <div className="mt-5 flex flex-col gap-4">
            {popularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug text-ink-900 group-hover:text-primary-700 group-active:text-primary-700">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink-900">Categories</h3>
          <ul className="mt-5 flex flex-col gap-2.5">
            {categories
              .filter((c) => c !== "All")
              .map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setPage(1);
                    }}
                    className="flex w-full items-center justify-between text-sm text-ink-600 hover:text-primary-700 active:text-primary-700"
                  >
                    {cat}
                    <span className="text-xs text-ink-400">
                      {posts.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary-800">Newsletter</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-700">
            Get recycling news and policy updates in your inbox.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </aside>
    </div>
  );
}
