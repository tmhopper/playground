"use client";

import { Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { PackageTier } from "@/lib/packages";
import { cn } from "@/lib/cn";

export function PackageCard({ pkg }: { pkg: PackageTier }) {
  const add = useCart((s) => s.add);
  return (
    <article
      className={cn(
        "relative flex flex-col gap-4 rounded-xl border-2 bg-bone p-6 shadow-jobsite transition",
        pkg.featured ? "border-hazard -translate-y-1" : "border-dirt-300"
      )}
    >
      {pkg.featured ? (
        <span className="absolute -top-3 left-6 rounded bg-hazard px-3 py-1 font-display text-xs uppercase text-dirt-800">
          Most Booked
        </span>
      ) : null}
      <header>
        <h3 className="font-display text-xl uppercase text-dirt-700">{pkg.name}</h3>
        <p className="mt-1 font-marker text-sm text-hazard">{pkg.headline}</p>
      </header>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl text-dirt-700">
          ${pkg.priceLabel ? pkg.price.toLocaleString() : pkg.price.toFixed(2)}
        </span>
        {pkg.priceLabel ? <span className="text-xs text-concrete">{pkg.priceLabel}</span> : null}
      </div>
      <ul className="flex-1 space-y-2 text-sm text-dirt-600">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 text-hazard" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          add({
            id: `package:${pkg.id}`,
            name: pkg.name,
            price: pkg.price,
            kind: "package",
          })
        }
        className={pkg.featured ? "btn-hazard" : "btn-outline"}
      >
        {pkg.cta}
      </button>
    </article>
  );
}
