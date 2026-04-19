"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";

export function GalleryGrid({ items, gated }: { items: PortfolioItem[]; gated?: boolean }) {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border-2 border-dirt-300 text-left shadow-jobsite transition hover:border-hazard"
            style={{ background: `linear-gradient(135deg, ${item.palette[0]}, ${item.palette[1]})` }}
          >
            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-display text-6xl text-bone/30"
            >
              {item.title.split(" ")[0]}
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-dirt-900/70 p-3 text-bone">
              <span className="block font-display text-sm uppercase">{item.title}</span>
              <span className="block font-marker text-xs text-caution">{item.caption}</span>
            </span>
            {gated ? (
              <span className="absolute inset-0 flex items-center justify-center bg-dirt-900/80 text-center font-display uppercase text-caution">
                Members Only
                <span className="sr-only">(the gate is the joke)</span>
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-dirt-900/85 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-xl border-4 border-hazard bg-bone shadow-jobsite"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[4/5] w-full"
              style={{ background: `linear-gradient(135deg, ${active.palette[0]}, ${active.palette[1]})` }}
            />
            <div className="space-y-2 p-5">
              <h3 className="font-display text-2xl uppercase text-dirt-700">{active.title}</h3>
              <p className="font-marker text-sm text-hazard">{active.caption}</p>
              <button type="button" onClick={() => setActive(null)} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
