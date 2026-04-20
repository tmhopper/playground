"use client";

import { useCart } from "@/lib/cart-store";

export function AddToCartButton({ id, name, price }: { id: string; name: string; price: number }) {
  const add = useCart((s) => s.add);
  return (
    <button
      type="button"
      onClick={() => add({ id, name, price, kind: "product" })}
      className="btn-hazard"
    >
      Add To Toolbelt
    </button>
  );
}
