"use client";

import { portfolioCategories } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {portfolioCategories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onChange(cat.slug)}
          className={cn(
            "rounded-full border-2 px-4 py-2 font-display text-xs uppercase tracking-wider transition",
            active === cat.slug
              ? "border-hazard bg-hazard text-dirt-800"
              : "border-dirt-400 bg-bone text-dirt-700 hover:border-hazard hover:text-hazard"
          )}
        >
          {cat.name}
          {cat.gated ? <span className="ml-2 text-[10px] text-rust">18+</span> : null}
        </button>
      ))}
    </div>
  );
}
