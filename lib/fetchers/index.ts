import { detectAts } from "./detect";
import { fetchGreenhouse } from "./greenhouse";
import { fetchLever } from "./lever";
import { fetchAshby } from "./ashby";
import { fetchWorkable } from "./workable";
import { fetchSmartRecruiters } from "./smartrecruiters";
import { fetchViaFirecrawl } from "./firecrawl";
import { fetchViaJina } from "./jina";
import type { FetchResult } from "./types";

export type { FetchedJob, FetchResult } from "./types";

/**
 * Fetch jobs from a known careers URL.
 * Detects the ATS automatically; falls back to Firecrawl → Jina → error.
 */
export async function fetchJobsFromUrl(url: string, companyName: string): Promise<FetchResult> {
  const detected = detectAts(url);

  if (detected) {
    try {
      switch (detected.ats) {
        case "greenhouse":
          return await fetchGreenhouse(detected.slug, companyName);
        case "lever":
          return await fetchLever(detected.slug, companyName);
        case "ashby":
          return await fetchAshby(detected.slug, companyName);
        case "workable":
          return await fetchWorkable(detected.slug, companyName);
        case "smartrecruiters":
          return await fetchSmartRecruiters(detected.slug, companyName);
        case "workday":
        case "other":
          break; // fall through to web scrapers
      }
    } catch (err) {
      // ATS API failed — fall through to scrapers
      console.warn(`[fetchers] ATS adapter failed for ${url}:`, err);
    }
  }

  // Firecrawl fallback
  if (process.env.FIRECRAWL_API_KEY) {
    try {
      return await fetchViaFirecrawl(url, companyName);
    } catch (err) {
      console.warn("[fetchers] Firecrawl failed:", err);
    }
  }

  // Jina Reader fallback
  try {
    return await fetchViaJina(url, companyName);
  } catch (err) {
    console.warn("[fetchers] Jina failed:", err);
  }

  throw new Error(`Could not fetch jobs from ${url} — all adapters failed.`);
}
