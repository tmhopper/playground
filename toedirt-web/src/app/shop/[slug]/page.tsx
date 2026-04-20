import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { AddToCartButton } from "./AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="bg-jobsite py-10 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link href="/shop" className="font-marker text-hazard hover:underline">
            ← Back to shop
          </Link>
        </div>
      </section>

      <section className="section grid gap-10 md:grid-cols-2">
        <div className="aspect-square w-full rounded-xl border-4 border-dirt-300 bg-jobsite shadow-jobsite">
          <div className="flex h-full items-center justify-center font-display text-6xl uppercase text-bone/20">
            {product.name.split(" ")[0]}
          </div>
        </div>
        <div className="space-y-4">
          {product.bobApproved ? <span className="badge-hazard">Bob Approved</span> : null}
          <h1 className="font-display text-4xl uppercase text-dirt-700">{product.name}</h1>
          <p className="font-marker text-lg text-hazard">{product.tagline}</p>
          <p className="font-display text-3xl text-dirt-700">${product.price}</p>
          <p className="text-dirt-600">{product.description}</p>
          <AddToCartButton
            id={`product:${product.slug}`}
            name={product.name}
            price={product.price}
          />
          <div>
            <h2 className="mt-6 font-display text-lg uppercase text-dirt-700">Reviews</h2>
            <ul className="mt-3 space-y-3">
              {product.reviews.map((r) => (
                <li key={r.author} className="rounded-lg border-2 border-dirt-300 bg-bone p-4">
                  <p className="font-display uppercase text-dirt-700">
                    {r.author}{" "}
                    <span className="font-marker text-caution-dark">
                      {"★".repeat(r.rating)}
                      <span className="text-concrete">{"★".repeat(5 - r.rating)}</span>
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-dirt-600">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <header className="mb-6">
          <h2 className="font-display text-2xl uppercase text-dirt-700">You might also haul home</h2>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
