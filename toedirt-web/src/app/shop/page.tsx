import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

export const metadata = { title: "Shop — Toe Dirt" };

export default function ShopPage() {
  return (
    <>
      <section className="bg-jobsite py-14 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">Merch</p>
          <h1 className="font-display text-4xl uppercase sm:text-5xl">The Toe Dirt Shop</h1>
          <p className="mt-3 max-w-2xl text-bone/90">
            Physical goods from a fictional brand. Every order routes to Bob. Every checkout is a vibe
            check.
          </p>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
