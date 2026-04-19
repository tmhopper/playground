"use client";

import { useState } from "react";
import { PackageCard } from "@/components/shop/PackageCard";
import { addOns, categoryLabels, packages, type PackageCategory } from "@/lib/packages";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";

const filters: ({ id: "all" | PackageCategory; label: string })[] = [
  { id: "all", label: "All Packages" },
  { id: "construction", label: categoryLabels.construction },
  { id: "furries", label: categoryLabels.furries },
  { id: "fetish", label: categoryLabels.fetish },
  { id: "tootling", label: categoryLabels.tootling },
  { id: "pov", label: categoryLabels.pov },
  { id: "comedy", label: categoryLabels.comedy },
];

export default function PackagesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const add = useCart((s) => s.add);

  const filtered =
    filter === "all" ? packages : packages.filter((p) => p.categories.includes(filter));

  return (
    <>
      <section className="bg-jobsite py-14 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">Services &amp; Packages</p>
          <h1 className="font-display text-4xl uppercase sm:text-5xl">Pick Your Tier</h1>
          <p className="mt-3 max-w-2xl text-bone/90">
            Every package is a working bit. Every checkout lands softly. Concrete Club sits outside the
            site and gets handled in DMs.
          </p>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border-2 px-4 py-2 font-display text-xs uppercase tracking-wider transition",
                filter === f.id
                  ? "border-hazard bg-hazard text-dirt-800"
                  : "border-dirt-400 bg-bone text-dirt-700 hover:border-hazard"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>

        <div className="mt-16">
          <header className="mb-6">
            <p className="font-marker text-hazard">Stack 'em</p>
            <h2 className="font-display text-3xl uppercase text-dirt-700">Add-Ons</h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-xl border-2 border-dirt-300 bg-bone p-5 shadow-jobsite"
              >
                <div>
                  <p className="font-display uppercase text-dirt-700">{a.name}</p>
                  <p className="font-marker text-sm text-hazard">+ ${a.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    add({ id: `addon:${a.id}`, name: a.name, price: a.price, kind: "addon" })
                  }
                  className="btn-outline"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
