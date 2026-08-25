import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import services from "@/data/services.json";
import blogs from "@/data/blogs.json";
import type { Service, BlogPost } from "@/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = (services as Service[]).map((service) => ({
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = (blogs as BlogPost[]).map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
