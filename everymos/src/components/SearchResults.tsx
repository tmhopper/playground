"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSearch } from "./SearchProvider";
import { TYPE_LABEL, type SearchHit } from "@/lib/search";
import { POPULAR_SEARCHES } from "@/lib/search-docs";

const FILTERS = ["all", "job", "branch", "post", "guide", "page"] as const;
type Filter = (typeof FILTERS)[number];

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const { search, group, ready } = useSearch();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [type, setType] = useState<Filter>((params.get("type") as Filter) ?? "all");

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (type !== "all") next.set("type", type);
    const qs = next.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }, [query, type, router]);

  const hits = useMemo(() => (query ? search(query, 100) : []), [query, search]);
  const grouped = useMemo(() => group(hits), [hits, group]);

  const filtered: SearchHit[] = type === "all" ? hits : grouped[type];

  return (
    <>
      <header className="mb-10">
        <h1>Search</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={ready ? "Search jobs, branches, blog…" : "Loading search index…"}
            className="h-12 flex-1 min-w-[240px] rounded-md border border-[color:var(--color-rule)] bg-white px-4 text-base"
            autoFocus
          />
          <kbd className="mono rounded border border-[color:var(--color-rule)] bg-white px-2 py-1 text-xs opacity-60">
            ⌘K
          </kbd>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setType(f)}
              className={
                "mono rounded-md border px-3 py-1 text-xs capitalize " +
                (type === f
                  ? "border-[color:var(--color-ink-900)] bg-[color:var(--color-ink-900)] text-white"
                  : "border-[color:var(--color-rule)] bg-white hover:border-[color:var(--color-signal)]")
              }
              aria-pressed={type === f}
            >
              {f === "all" ? "All" : TYPE_LABEL[f]} {f !== "all" && grouped[f].length > 0 && `(${grouped[f].length})`}
            </button>
          ))}
        </div>
        {query && ready && (
          <p className="mono mt-4 text-sm opacity-70" aria-live="polite">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
          </p>
        )}
      </header>

      {!query && (
        <section className="rounded-lg border border-[color:var(--color-rule)] bg-white p-6 text-sm">
          <p className="mono text-xs uppercase tracking-wide opacity-60">Popular searches</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((p) => (
              <li key={p}>
                <button
                  onClick={() => setQuery(p)}
                  className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 text-xs hover:border-[color:var(--color-signal)]"
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {query && ready && filtered.length === 0 && (
        <div className="rounded-lg border border-[color:var(--color-rule)] bg-white p-8 text-center text-sm opacity-70">
          No matches for &ldquo;{query}&rdquo;. Try broader terms, or remove the type filter.
        </div>
      )}

      {query && filtered.length > 0 && (
        <ul className="space-y-3">
          {filtered.map((h) => (
            <li key={h.id}>
              <Link
                href={h.url}
                className="block rounded-lg border border-[color:var(--color-rule)] bg-white p-5 no-underline hover:border-[color:var(--color-signal)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="mono rounded border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-2 py-0.5 text-xs uppercase">
                      {TYPE_LABEL[h.type]}
                    </span>
                    {h.code && (
                      <span className="mono font-semibold text-[color:var(--color-ink-900)]">
                        {h.code}
                      </span>
                    )}
                    <span className="text-base text-[color:var(--color-ink-900)]">{h.title}</span>
                  </div>
                  {h.branch && (
                    <span className="mono text-xs opacity-60">{h.branch}</span>
                  )}
                </div>
                {h.tldr && <p className="mt-2 text-sm opacity-80">{h.tldr}</p>}
                <p className="mono mt-2 text-xs opacity-50">{h.url}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
