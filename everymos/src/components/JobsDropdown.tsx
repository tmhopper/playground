"use client";

import Link from "next/link";
import { useState } from "react";
import { BranchSeal } from "./BranchSeal";
import type { Branch } from "@schemas/job";

const BRANCHES: { key: Branch; slug: string; label: string; term: string }[] = [
  { key: "marine_corps", slug: "marine-corps", label: "Marine Corps", term: "MOS" },
  { key: "army", slug: "army", label: "Army", term: "MOS" },
  { key: "air_force", slug: "air-force", label: "Air Force", term: "AFSC" },
  { key: "navy", slug: "navy", label: "Navy", term: "Rating" },
  { key: "coast_guard", slug: "coast-guard", label: "Coast Guard", term: "Rating" },
  { key: "space_force", slug: "space-force", label: "Space Force", term: "SFSC" },
];

export function JobsDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="text-sm text-[color:var(--color-ink-700)] no-underline hover:text-[color:var(--color-signal)]"
      >
        Jobs ▾
      </button>
      {open && (
        <div className="absolute left-0 top-full z-40 mt-1 w-[320px] rounded-lg border border-[color:var(--color-rule)] bg-white p-3 shadow-lg">
          <Link
            href="/jobs"
            className="mono block rounded px-2 py-2 text-xs uppercase tracking-wide opacity-60 no-underline hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-signal)]"
          >
            All jobs →
          </Link>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {BRANCHES.map((b) => (
              <li key={b.key}>
                <Link
                  href={`/jobs/${b.slug}`}
                  className="flex items-center gap-2 rounded px-2 py-2 text-sm no-underline hover:bg-[color:var(--color-paper)]"
                >
                  <BranchSeal branch={b.key} size={28} />
                  <div className="min-w-0">
                    <div className="font-semibold text-[color:var(--color-ink-900)]">
                      {b.label}
                    </div>
                    <div className="mono text-xs opacity-60">{b.term}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-[color:var(--color-rule)] pt-2">
            <Link
              href="/browse"
              className="block rounded px-2 py-1 text-xs no-underline hover:bg-[color:var(--color-paper)]"
            >
              Browse by base, ASVAB, or civilian career →
            </Link>
            <Link
              href="/compare"
              className="block rounded px-2 py-1 text-xs no-underline hover:bg-[color:var(--color-paper)]"
            >
              Compare jobs side-by-side →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
