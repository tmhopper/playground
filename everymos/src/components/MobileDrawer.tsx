"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BranchSeal } from "./BranchSeal";
import { useSearch } from "./SearchProvider";
import type { Branch } from "@schemas/job";

const BRANCHES: { key: Branch; slug: string; label: string }[] = [
  { key: "marine_corps", slug: "marine-corps", label: "Marine Corps" },
  { key: "army", slug: "army", label: "Army" },
  { key: "air_force", slug: "air-force", label: "Air Force" },
  { key: "navy", slug: "navy", label: "Navy" },
  { key: "coast_guard", slug: "coast-guard", label: "Coast Guard" },
  { key: "space_force", slug: "space-force", label: "Space Force" },
];

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const { openPalette } = useSearch();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--color-rule)] bg-white md:hidden"
      >
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" className="mono text-lg">☰</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-[color:var(--color-paper)] md:hidden"
        >
          <div className="flex items-center justify-between border-b border-[color:var(--color-rule)] px-4 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mono text-lg font-semibold text-[color:var(--color-ink-900)] no-underline"
            >
              EveryMOS
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--color-rule)] bg-white"
            >
              <span aria-hidden="true" className="mono text-lg">✕</span>
            </button>
          </div>

          <div className="px-4 pt-4">
            <button
              onClick={() => {
                setOpen(false);
                openPalette();
              }}
              className="flex h-12 w-full items-center gap-3 rounded-lg border border-[color:var(--color-rule)] bg-white px-4 text-left text-base"
            >
              <span aria-hidden="true">🔎</span>
              <span className="opacity-80">Search jobs, branches, blog…</span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <p className="mono text-xs uppercase tracking-wide opacity-60">Branches</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {BRANCHES.map((b) => (
                <li key={b.key}>
                  <Link
                    href={`/jobs/${b.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg border border-[color:var(--color-rule)] bg-white px-3 py-3 no-underline"
                  >
                    <BranchSeal branch={b.key} size={36} />
                    <span className="text-sm font-semibold text-[color:var(--color-ink-900)]">
                      {b.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mono mt-8 text-xs uppercase tracking-wide opacity-60">Tools</p>
            <ul className="mt-3 space-y-1">
              {[
                { href: "/jobs", label: "All jobs" },
                { href: "/compare", label: "Compare" },
                { href: "/browse", label: "Browse (base · ASVAB · career)" },
                { href: "/asvab", label: "ASVAB tool" },
                { href: "/stats", label: "Database stats" },
              ].map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-3 text-base no-underline hover:bg-white"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mono mt-8 text-xs uppercase tracking-wide opacity-60">Content</p>
            <ul className="mt-3 space-y-1">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/guides", label: "Guides" },
                { href: "/newsletter", label: "Newsletter" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-3 text-base no-underline hover:bg-white"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mono mt-8 text-xs uppercase tracking-wide opacity-60">Legal</p>
            <ul className="mt-3 space-y-1">
              {[
                { href: "/editorial-standards", label: "Editorial standards" },
                { href: "/corrections", label: "Corrections log" },
                { href: "/privacy", label: "Privacy" },
                { href: "/terms", label: "Terms" },
                { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
                { href: "/accessibility", label: "Accessibility" },
              ].map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-3 text-sm opacity-80 no-underline hover:bg-white"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
