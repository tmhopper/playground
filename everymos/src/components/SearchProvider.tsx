"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import MiniSearch from "minisearch";
import type { SearchDoc } from "@/lib/search-docs";
import { buildIndex, search, groupHits, type SearchHit } from "@/lib/search";

type Ctx = {
  ready: boolean;
  search: (q: string, limit?: number) => SearchHit[];
  group: (hits: SearchHit[]) => ReturnType<typeof groupHits>;
  openPalette: () => void;
  closePalette: () => void;
  paletteOpen: boolean;
};

const SearchContext = createContext<Ctx | null>(null);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be inside SearchProvider");
  return ctx;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const indexRef = useRef<MiniSearch<SearchDoc> | null>(null);
  const [ready, setReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/search-index.json");
        if (!res.ok) return;
        const { docs } = (await res.json()) as { docs: SearchDoc[] };
        if (cancelled) return;
        indexRef.current = buildIndex(docs);
        setReady(true);
      } catch {
        /* ignore; search degrades to disabled */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Global ⌘K / Ctrl+K
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const value: Ctx = {
    ready,
    search: (q, limit = 20) =>
      indexRef.current ? search(indexRef.current, q, limit) : [],
    group: (hits) => groupHits(hits),
    openPalette: () => setPaletteOpen(true),
    closePalette: () => setPaletteOpen(false),
    paletteOpen,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
