import type { JobEntry } from "@schemas/job";
import type { Post } from "../../data/posts";
import { BRANCH_ENUM_TO_SLUG } from "./branch";

export type SearchType = "job" | "branch" | "post" | "guide" | "page";

export type SearchDoc = {
  id: string;
  type: SearchType;
  code?: string;
  title: string;
  branch?: string;
  tldr?: string;
  body: string;
  url: string;
  weight: number;
};

const STATIC_GUIDES: { slug: string; title: string; summary: string }[] = [
  {
    slug: "asvab-study-framework",
    title: "The 30-day ASVAB study framework",
    summary: "Week-by-week plan targeting the 4 AFQT subtests first.",
  },
  {
    slug: "usmc-reclass-playbook",
    title: "The USMC reclass playbook",
    summary: "How to time your reclass package and what the board actually looks for.",
  },
  {
    slug: "mos-to-resume",
    title: "MOS → resume: translating without bullshit",
    summary: "Turn a four-digit code into a resume a hiring manager actually reads.",
  },
];

const STATIC_PAGES: { slug: string; title: string; body: string }[] = [
  { slug: "about", title: "About EveryMOS", body: "Why Marc Hopper built EveryMOS. Four audiences. USMC veteran." },
  { slug: "compare", title: "Compare military jobs", body: "Side-by-side comparison of jobs across branches." },
  { slug: "browse", title: "Browse by location, ASVAB, or civilian career", body: "Index pages for all bases, GT thresholds, and civilian translations." },
  { slug: "asvab", title: "ASVAB qualification tool", body: "Find every military job you qualify for by score." },
  { slug: "stats", title: "Database stats", body: "Live coverage of EveryMOS entries by branch and confidence." },
  { slug: "editorial-standards", title: "Editorial standards", body: "How EveryMOS sources, verifies, and flags data." },
  { slug: "contact", title: "Contact", body: "Send a correction, partnership request, or press inquiry." },
  { slug: "newsletter", title: "Newsletter", body: "One email a week. New entries, deep-dives, tools." },
  { slug: "corrections", title: "Corrections log", body: "Public log of corrections to EveryMOS entries." },
  { slug: "privacy", title: "Privacy", body: "What EveryMOS collects and doesn't." },
  { slug: "terms", title: "Terms", body: "Use of this site; disclaimers." },
  { slug: "affiliate-disclosure", title: "Affiliate disclosure", body: "Plain-language explanation of affiliate links." },
  { slug: "accessibility", title: "Accessibility", body: "WCAG 2.2 AA target; report issues." },
];

export function buildSearchDocs(jobs: JobEntry[], posts: Post[]): SearchDoc[] {
  const docs: SearchDoc[] = [];

  // Jobs — highest weight
  for (const j of jobs) {
    docs.push({
      id: `job:${j.id}`,
      type: "job",
      code: j.job_code,
      title: j.job_title,
      branch: j.branch_display,
      tldr: j.description_tldr,
      body: [
        j.description_plain,
        j.occupational_field.name,
        j.occupational_field.code,
        ...(j.training_pipeline ?? []).map((t) => `${t.stage} ${t.school_name} ${t.location}`),
        ...(j.civilian_equivalents ?? []).map((c) => `${c.title} ${c.industry}`),
        ...(j.faq ?? []).map((f) => `${f.question} ${f.answer}`),
        ...(j.notable_holders ?? []).map((h) => h.name),
      ]
        .filter(Boolean)
        .join(" "),
      url: `/jobs/${BRANCH_ENUM_TO_SLUG[j.branch]}/${j.job_code.toLowerCase()}`,
      weight: 10,
    });
  }

  // Branches
  const branchSeen = new Set<string>();
  for (const j of jobs) {
    if (branchSeen.has(j.branch)) continue;
    branchSeen.add(j.branch);
    docs.push({
      id: `branch:${j.branch}`,
      type: "branch",
      title: j.branch_display,
      branch: j.branch_display,
      body: `${j.classification_term} jobs in the ${j.branch_display}`,
      url: `/jobs/${BRANCH_ENUM_TO_SLUG[j.branch]}`,
      weight: 8,
    });
  }

  // Blog posts
  for (const p of posts) {
    docs.push({
      id: `post:${p.slug}`,
      type: "post",
      title: p.title,
      tldr: p.excerpt,
      body: `${p.excerpt} ${p.category} ${p.body}`,
      url: `/blog/${p.slug}`,
      weight: 6,
    });
  }

  // Guides
  for (const g of STATIC_GUIDES) {
    docs.push({
      id: `guide:${g.slug}`,
      type: "guide",
      title: g.title,
      tldr: g.summary,
      body: g.summary,
      url: `/guides/${g.slug}`,
      weight: 5,
    });
  }

  // Pages
  for (const p of STATIC_PAGES) {
    docs.push({
      id: `page:${p.slug}`,
      type: "page",
      title: p.title,
      body: p.body,
      url: `/${p.slug}`,
      weight: 3,
    });
  }

  return docs;
}

export const POPULAR_SEARCHES = [
  "0311 rifleman",
  "cyber",
  "medic",
  "intel",
  "recruiter",
  "ASVAB GT 100",
  "infantry",
  "pilot",
  "MARSOC",
  "combat engineer",
];
