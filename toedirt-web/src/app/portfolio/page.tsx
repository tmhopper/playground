"use client";

import { useState } from "react";
import { portfolioCategories } from "@/lib/portfolio";
import { CategoryTabs } from "@/components/portfolio/CategoryTabs";
import { GalleryGrid } from "@/components/portfolio/GalleryGrid";

export default function PortfolioPage() {
  const [active, setActive] = useState(portfolioCategories[0].slug);
  const category = portfolioCategories.find((c) => c.slug === active) ?? portfolioCategories[0];

  return (
    <>
      <section className="bg-jobsite py-14 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">Portfolio</p>
          <h1 className="font-display text-4xl uppercase sm:text-5xl">The Dirt Archive</h1>
          <p className="mt-3 max-w-2xl text-bone/90">
            Six categories. Hundreds of parodies. One overqualified big toe. All imagery on this page is
            placeholder art — the real portfolio goes behind member logins on launch day.
          </p>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section">
        <CategoryTabs active={active} onChange={setActive} />
        <header className="mt-8 mb-6">
          <h2 className="font-display text-2xl uppercase text-dirt-700">{category.name}</h2>
          <p className="font-marker text-hazard">{category.description}</p>
        </header>
        <GalleryGrid items={category.items} gated={category.gated} />
      </section>
    </>
  );
}
