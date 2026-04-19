"use client";

import { useSearch } from "./SearchProvider";

export function HeaderSearch() {
  const { openPalette, ready } = useSearch();

  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Open search"
      className="group flex items-center gap-2 rounded-md border border-[color:var(--color-rule)] bg-white px-3 py-2 text-sm text-[color:var(--color-ink-700)] hover:border-[color:var(--color-signal)]"
    >
      <span aria-hidden="true" className="opacity-60">🔎</span>
      <span className="opacity-70">
        {ready ? "Search jobs, branches…" : "Loading search…"}
      </span>
      <kbd className="mono ml-6 rounded border border-[color:var(--color-rule)] px-1.5 py-0.5 text-[10px] opacity-70">
        ⌘K
      </kbd>
    </button>
  );
}
