import type { MetadataRoute } from "next";
import { getAllJobParams } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const staticRoutes = [
    "",
    "/jobs",
    "/about",
    "/newsletter",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/accessibility",
  ].map((path) => ({ url: `${base}${path}`, lastModified: now }));

  const jobRoutes = getAllJobParams().map(({ branch, jobCode }) => ({
    url: `${base}/jobs/${branch}/${jobCode}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...jobRoutes];
}
