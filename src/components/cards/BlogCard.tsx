import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { formatDate } from "@/utils/format";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-premium)] transition-all duration-300 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium-lg)] active:-translate-y-1.5 active:shadow-[var(--shadow-premium-lg)]"
    >
      <div className={`relative w-full overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-ink-500">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-primary-700 group-active:text-primary-700">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
          Read More
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
