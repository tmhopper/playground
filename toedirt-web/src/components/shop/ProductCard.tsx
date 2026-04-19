"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border-2 border-dirt-300 bg-bone shadow-jobsite transition hover:border-hazard">
      <div className="relative aspect-square w-full bg-jobsite">
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-7xl uppercase text-bone/20"
        >
          {product.name.split(" ")[0]}
        </div>
        {product.bobApproved ? (
          <span className="absolute left-3 top-3 rounded bg-caution px-2 py-1 font-marker text-xs uppercase text-dirt-800">
            Bob Approved
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="font-display uppercase text-dirt-700">
            <Link href={`/shop/${product.slug}`} className="hover:text-hazard">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-concrete">{product.tagline}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-dirt-700">${product.price}</span>
          <button
            type="button"
            onClick={() =>
              add({
                id: `product:${product.slug}`,
                name: product.name,
                price: product.price,
                kind: "product",
              })
            }
            className="rounded-md bg-dirt-700 px-3 py-2 font-display text-xs uppercase tracking-wide text-bone transition hover:bg-hazard hover:text-dirt-800"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
