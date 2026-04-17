import { NewsletterForm } from "@/components/forms/newsletter-form";
import { FadeIn } from "@/components/motion/fade-in";

export function NewsletterBlock() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-page max-w-3xl text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-widest text-ice-400">Stay in the loop</p>
          <h2 className="mt-2">Join the revival.</h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">
            One email a month. New transformations. Behind-the-scenes notes. First access when Burdett Blue drops.
          </p>
          <div className="mt-10 flex justify-center">
            <NewsletterForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
