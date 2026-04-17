"use client";

import { useState, useMemo } from "react";
import { products, type ProductCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/media/product-card";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "chemicals", label: "Chemicals" },
  { id: "tools", label: "Tools" },
  { id: "testing", label: "Testing" },
  { id: "safety", label: "Safety" },
  { id: "pumps", label: "Pumps & Filters" },
];

export default function ShopPage() {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const list = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.category === cat)),
    [cat],
  );
  return (
    <>
      <PageHeader
        eyebrow="What's in my truck"
        title="Gear I actually use."
        description="Every product here is in my truck right now. Buying through these links funds the free-clean program."
      >
        <div className="rounded-lg bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white/70 max-w-2xl">
          <strong className="text-white">Affiliate disclosure.</strong> As an Amazon Associate Troy earns from qualifying purchases. Every recommendation is based on personal use — nothing is here because a brand paid for it.
        </div>
      </PageHeader>

      <section className="pb-24">
        <div className="container-page">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={cn(
                  "px-4 h-9 rounded-full text-sm font-semibold transition border",
                  cat === c.id
                    ? "bg-lime text-ocean-950 border-lime"
                    : "text-white/70 border-white/15 hover:border-white/40",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
