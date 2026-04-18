import type { MetadataRoute } from "next";
import { getAllJobParams, getAllJobs } from "@/lib/data";
import {
  allCivilianSlugs,
  allGtThresholds,
  allLocationSlugs,
} from "@/lib/seo-slugs";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes = [
    "",
    "/jobs",
    "/compare",
    "/browse",
    "/asvab",
    "/guides",
    "/blog",
    "/stats",
    "/about",
    "/newsletter",
    "/contact",
    "/corrections",
    "/editorial-standards",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/accessibility",
  ].map((path) => ({ url: `${base}${path}`, lastModified: now }));

  const jobRoutes = getAllJobParams().map(({ branch, jobCode }) => ({
    url: `${base}/jobs/${branch}/${jobCode}`,
    lastModified: now,
  }));

  const jobs = getAllJobs();
  const locationRoutes = allLocationSlugs(jobs).map(({ slug }) => ({
    url: `${base}/jobs-at/${slug}`,
    lastModified: now,
  }));
  const civilianRoutes = allCivilianSlugs(jobs).map(({ slug }) => ({
    url: `${base}/translates-to/${slug}`,
    lastModified: now,
  }));
  const gtRoutes = allGtThresholds().map((t) => ({
    url: `${base}/asvab/gt/${t}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...jobRoutes, ...locationRoutes, ...civilianRoutes, ...gtRoutes];
}
