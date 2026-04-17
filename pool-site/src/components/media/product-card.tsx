import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/card";
import type { Product } from "@/lib/data/products";

export function ProductCard({ product }: { product: Product }) {
  const categoryLabel: Record<Product["category"], string> = {
    chemicals: "Chemicals",
    tools: "Tools",
    safety: "Safety",
    testing: "Testing",
    pumps: "Pumps & Filters",
  };

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width:1024px) 25vw, 50vw"
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge tone="ice">{categoryLabel[product.category]}</Badge>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold leading-snug">{product.name}</h3>
        <p className="text-sm text-white/70 leading-relaxed flex-1">&ldquo;{product.review}&rdquo;</p>
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <span className="text-white font-bold">{product.price}</span>
          <a
            href={product.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ocean-950 bg-lime px-3 py-2 rounded-md hover:bg-lime-dark transition"
          >
            Buy on Amazon <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
