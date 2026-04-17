import type { MetadataRoute } from "next";
import { posts } from "@/lib/data/posts";
import { cities } from "@/lib/data/cities";
import { brand } from "@/lib/data/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = brand.siteUrl;
  const now = new Date();

  const staticRoutes = [
    "",
    "/videos",
    "/gallery",
    "/services",
    "/book",
    "/nominate",
    "/sponsor",
    "/shop",
    "/merch",
    "/about",
    "/reviews",
    "/faq",
    "/blog",
    "/areas",
    "/privacy",
    "/terms",
    "/disclosure",
    "/accessibility",
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${base}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...cities.map((c) => ({
      url: `${base}/areas/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
