"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useSearch } from "./SearchProvider";
import { TYPE_LABEL } from "@/lib/search";
import { POPULAR_SEARCHES } from "@/lib/search-docs";

export function CommandPalette() {
  const { paletteOpen, closePalette, search, group, ready } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
      try {
        const raw = localStorage.getItem("everymos-recent-searches");
        setRecent(raw ? (JSON.parse(raw) as string[]) : []);
      } catch {
        setRecent([]);
      }
    }
  }, [paletteOpen]);

  const hits = useMemo(() => (query ? search(query, 15) : []), [query, search]);
  const grouped = useMemo(() => group(hits), [hits, group]);

  const flat = useMemo(() => {
    // Flatten in group order for arrow-key nav
    return [
      ...grouped.job,
      ...grouped.branch,
      ...grouped.post,
      ...grouped.guide,
      ...grouped.page,
    ];
  }, [grouped]);

  useEffect(() => {
    if (active >= flat.length) setActive(0);
  }, [flat.length, active]);

  if (!paletteOpen) return null;

  function persistRecent(q: string) {
    if (!q.trim()) return;
    const next = [q.trim(), ...recent.filter((r) => r !== q.trim())].slice(0, 5);
    try {
      localStorage.setItem("everymos-recent-searches", JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setRecent(next);
  }

  function commit(hit: { url: string } | null) {
    if (!hit) {
      if (query.trim()) {
        persistRecent(query);
        router.push(`/search?q=${encodeURIComponent(query)}` as Route);
        closePalette();
      }
      return;
    }
    persistRecent(query || hit.url);
    router.push(hit.url as Route);
    closePalette();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(0, flat.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(flat[active] ?? null);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search EveryMOS"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[10vh]"
      onClick={closePalette}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[color:var(--color-rule)] bg-white shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-[color:var(--color-rule)] px-4 py-3">
          <span className="mono text-xs opacity-60">🔎</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={ready ? "Search jobs, branches, posts, guides…" : "Loading index…"}
            className="h-10 flex-1 bg-transparent text-base outline-none"
            aria-label="Search"
          />
          <kbd className="mono rounded border border-[color:var(--color-rule)] px-2 py-0.5 text-xs opacity-60">
            esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="p-4 text-sm">
              {recent.length > 0 && (
                <>
                  <p className="mono text-xs uppercase tracking-wide opacity-60">Recent</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          onClick={() => setQuery(r)}
                          className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 text-xs hover:border-[color:var(--color-signal)]"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mono mt-4 text-xs uppercase tracking-wide opacity-60">Popular</p>
              <ul className="mt-2 flex flex-wrap gap-2">
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
            </div>
          )}

          {query && flat.length === 0 && ready && (
            <p className="p-6 text-center text-sm opacity-70">
              No matches for &ldquo;{query}&rdquo;. Try simpler terms.
            </p>
          )}

          {query && flat.length > 0 && (
            <div>
              {(["job", "branch", "post", "guide", "page"] as const).map((type) => {
                const list = grouped[type];
                if (list.length === 0) return null;
                return (
                  <section key={type} className="border-b border-[color:var(--color-rule)] last:border-b-0">
                    <p className="mono px-4 pt-3 pb-1 text-xs uppercase tracking-wide opacity-60">
                      {TYPE_LABEL[type]}
                    </p>
                    <ul>
                      {list.map((h) => {
                        const index = flat.indexOf(h);
                        const isActive = index === active;
                        return (
                          <li key={h.id}>
                            <button
                              onClick={() => commit(h)}
                              onMouseEnter={() => setActive(index)}
                              className={
                                "flex w-full items-baseline gap-3 px-4 py-2 text-left " +
                                (isActive
                                  ? "bg-[color:var(--color-paper)]"
                                  : "hover:bg-[color:var(--color-paper)]")
                              }
                            >
                              {h.code && (
                                <span className="mono shrink-0 rounded border border-[color:var(--color-rule)] bg-white px-2 py-0.5 text-xs">
                                  {h.code}
                                </span>
                              )}
                              <span className="flex-1 min-w-0">
                                <span className="block truncate text-sm text-[color:var(--color-ink-900)]">
                                  {h.title}
                                </span>
                                {(h.branch || h.tldr) && (
                                  <span className="block truncate text-xs opacity-60">
                                    {h.branch}
                                    {h.branch && h.tldr ? " · " : ""}
                                    {h.tldr}
                                  </span>
                                )}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-4 py-2 text-xs opacity-70">
          <span className="mono">↑↓ navigate · ↵ open · esc close</span>
          {query && (
            <button
              className="mono underline"
              onClick={() => {
                persistRecent(query);
                router.push(`/search?q=${encodeURIComponent(query)}` as Route);
                closePalette();
              }}
            >
              See all results for &ldquo;{query}&rdquo; →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
