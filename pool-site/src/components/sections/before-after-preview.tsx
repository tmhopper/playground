import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gallery } from "@/lib/data/gallery";
import { BeforeAfter } from "@/components/media/before-after";
import { FadeIn } from "@/components/motion/fade-in";

export function BeforeAfterPreview() {
  const preview = gallery.slice(0, 2);
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-ice-400">Proof</p>
          <h2 className="mt-2 max-w-3xl">The work speaks for itself. Drag the slider.</h2>
        </FadeIn>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {preview.map((item) => (
            <FadeIn key={item.id} delay={0.1}>
              <BeforeAfter
                before={item.beforeImg}
                after={item.afterImg}
                title={item.title}
                location={item.location}
                story={item.story}
              />
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/gallery"
            className="text-ice-300 hover:text-ice-400 transition inline-flex items-center gap-1 font-semibold"
          >
            Browse the full gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
