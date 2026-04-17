import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/media/product-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";

export function AffiliatePreview() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <FadeIn className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-ice-400">What's in my truck</p>
            <h2 className="mt-2">Gear I actually use.</h2>
          </div>
          <Link
            href="/shop"
            className="text-ice-300 hover:text-ice-400 transition inline-flex items-center gap-1 font-semibold"
          >
            See the full list <ArrowRight size={16} />
          </Link>
        </FadeIn>
        <Stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-xs text-white/45 max-w-3xl">
          As an Amazon Associate Troy earns from qualifying purchases. Every commission funds the free-clean program.
        </p>
      </div>
    </section>
  );
}
