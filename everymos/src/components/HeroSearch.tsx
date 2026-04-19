"use client";

import { useSearch } from "./SearchProvider";

export function HeroSearch() {
  const { openPalette, ready } = useSearch();
  return (
    <button
      type="button"
      onClick={openPalette}
      className="group flex w-full max-w-xl items-center gap-3 rounded-lg border border-[color:var(--color-rule)] bg-white px-5 py-4 text-left text-base shadow-sm hover:border-[color:var(--color-signal)] hover:shadow"
    >
      <span className="text-xl opacity-60" aria-hidden="true">🔎</span>
      <span className="flex-1 opacity-80">
        {ready ? "Search a job, code, or keyword — try 0311, cyber, medic" : "Loading search…"}
      </span>
      <kbd className="mono rounded border border-[color:var(--color-rule)] px-2 py-0.5 text-xs opacity-70">
        ⌘K
      </kbd>
    </button>
  );
}
