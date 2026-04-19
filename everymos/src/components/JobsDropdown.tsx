"use client";

import Link from "next/link";
import { useState } from "react";
import { BranchSeal } from "./BranchSeal";
import type { Branch } from "@schemas/job";

type BranchMeta = {
  key: Branch;
  slug: string;
  label: string;
  term: string;
  popular: { code: string; title: string }[];
};

const BRANCHES: BranchMeta[] = [
  {
    key: "marine_corps",
    slug: "marine-corps",
    label: "Marine Corps",
    term: "MOS · 4-digit",
    popular: [
      { code: "0311", title: "Rifleman" },
      { code: "0317", title: "Scout Sniper" },
      { code: "0321", title: "Recon" },
    ],
  },
  {
    key: "army",
    slug: "army",
    label: "Army",
    term: "MOS",
    popular: [
      { code: "11B", title: "Infantryman" },
      { code: "68W", title: "Combat Medic" },
    ],
  },
  {
    key: "air_force",
    slug: "air-force",
    label: "Air Force",
    term: "AFSC · 5-char",
    popular: [
      { code: "1D7X1", title: "Cyber Defense" },
      { code: "1C4X1", title: "TACP" },
    ],
  },
  {
    key: "navy",
    slug: "navy",
    label: "Navy",
    term: "Rating",
    popular: [
      { code: "BM", title: "Boatswain's Mate" },
      { code: "HM", title: "Hospital Corpsman" },
    ],
  },
  {
    key: "coast_guard",
    slug: "coast-guard",
    label: "Coast Guard",
    term: "Rating",
    popular: [
      { code: "ME", title: "Maritime Enforcement" },
      { code: "AST", title: "Rescue Swimmer" },
    ],
  },
  {
    key: "space_force",
    slug: "space-force",
    label: "Space Force",
    term: "SFSC",
    popular: [{ code: "5C0X1", title: "Cyberspace Ops" }],
  },
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
        <div
          className="absolute left-1/2 top-full z-40 mt-1 w-[680px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-[color:var(--color-rule)] bg-white p-4 shadow-lg"
        >
          <div className="flex items-baseline justify-between">
            <p className="mono text-xs uppercase tracking-wide opacity-60">By branch</p>
            <Link
              href="/jobs"
              className="mono text-xs opacity-70 no-underline hover:text-[color:var(--color-signal)]"
            >
              All jobs →
            </Link>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
            {BRANCHES.map((b) => (
              <li key={b.key} className="min-w-0">
                <Link
                  href={`/jobs/${b.slug}`}
                  className="mb-2 flex items-center gap-2 no-underline"
                >
                  <BranchSeal branch={b.key} size={32} />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[color:var(--color-ink-900)]">
                      {b.label}
                    </div>
                    <div className="mono truncate text-[10px] opacity-60">{b.term}</div>
                  </div>
                </Link>
                <ul className="ml-10 space-y-0.5">
                  {b.popular.map((p) => (
                    <li key={p.code}>
                      <Link
                        href={`/jobs/${b.slug}/${p.code.toLowerCase()}`}
                        className="flex items-baseline gap-2 rounded px-1 py-0.5 text-xs no-underline hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-signal)]"
                      >
                        <span className="mono opacity-60">{p.code}</span>
                        <span className="truncate">{p.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[color:var(--color-rule)] pt-3 text-xs">
            <Link href="/compare" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 no-underline hover:border-[color:var(--color-signal)]">
              Compare jobs
            </Link>
            <Link href="/browse" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 no-underline hover:border-[color:var(--color-signal)]">
              Browse by base · ASVAB · career
            </Link>
            <Link href="/asvab" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 no-underline hover:border-[color:var(--color-signal)]">
              ASVAB tool
            </Link>
            <Link href="/stats" className="rounded-md border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] px-3 py-1 no-underline hover:border-[color:var(--color-signal)]">
              Database stats
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
