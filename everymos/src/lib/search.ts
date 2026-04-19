import MiniSearch from "minisearch";
import type { SearchDoc, SearchType } from "./search-docs";

export type SearchHit = {
  id: string;
  type: SearchType;
  code?: string;
  title: string;
  branch?: string;
  tldr?: string;
  url: string;
  score: number;
};

export function buildIndex(docs: SearchDoc[]): MiniSearch<SearchDoc> {
  const ms = new MiniSearch<SearchDoc>({
    idField: "id",
    fields: ["title", "code", "branch", "tldr", "body"],
    storeFields: ["id", "type", "code", "title", "branch", "tldr", "url"],
    searchOptions: {
      boost: { title: 4, code: 6, branch: 1.5, tldr: 2 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: "AND",
    },
  });
  ms.addAll(docs);
  return ms;
}

export function search(index: MiniSearch<SearchDoc>, query: string, limit = 20): SearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const results = index.search(q);
  return results.slice(0, limit).map((r) => ({
    id: r.id,
    type: r.type as SearchType,
    code: r.code,
    title: r.title,
    branch: r.branch,
    tldr: r.tldr,
    url: r.url,
    score: r.score,
  }));
}

export function groupHits(hits: SearchHit[]): Record<SearchType, SearchHit[]> {
  const out: Record<SearchType, SearchHit[]> = {
    job: [],
    branch: [],
    post: [],
    guide: [],
    page: [],
  };
  for (const h of hits) out[h.type].push(h);
  return out;
}

export const TYPE_LABEL: Record<SearchType, string> = {
  job: "Jobs",
  branch: "Branches",
  post: "Blog",
  guide: "Guides",
  page: "Pages",
};
