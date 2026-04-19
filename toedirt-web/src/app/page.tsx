import Link from "next/link";
import { BobMascot } from "@/components/brand/BobMascot";
import { PackageCard } from "@/components/shop/PackageCard";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";
import { asSeenIn, brand, testimonials } from "@/lib/copy";
import { packages } from "@/lib/packages";

const featuredServices = [
  { title: "Construction Toes", blurb: "Steel-toes off, standards high.", href: "/portfolio/construction" },
  { title: "Toe Furries", blurb: "Plush meets plaster.", href: "/portfolio/furries" },
  { title: "Hard Fetishes", blurb: "Hardware with a sense of humor.", href: "/portfolio/fetish" },
  { title: "Tootling", blurb: "Leisure-grade toe cinema.", href: "/portfolio/tootling" },
  { title: "Kinky POV", blurb: "Members-only parody.", href: "/portfolio/pov" },
  { title: "Comedy Skits", blurb: "Bob writes the bits.", href: "/bob" },
];

export default function HomePage() {
  const pom = packages.find((p) => p.featured) ?? packages[0];

  return (
    <>
      <section className="relative overflow-hidden bg-jobsite text-bone">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr,1fr] md:py-24 lg:px-8">
          <div className="space-y-6">
            <p className="font-marker text-hazard">Now accepting DMs</p>
            <h1 className="font-display text-5xl uppercase leading-none tracking-wider sm:text-6xl lg:text-7xl">
              Toe Dirt
            </h1>
            <p className="max-w-xl text-lg text-bone/90">
              {brand.kicker} — a classy, down-to-earth construction guy with a camera, a schedule, and a
              mascot named Bob. Packages start at $99.99. Dignity sold separately.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/packages" className="btn-hazard">
                Browse Packages
              </Link>
              <Link href="/contact" className="btn-outline border-bone text-bone hover:bg-bone hover:text-dirt-800">
                Slide In My DMs
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <BobMascot size={320} saying="Mind the caution tape." />
          </div>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="bg-bone py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-6 lg:px-8">
          <span className="font-marker text-sm text-concrete">As seen in:</span>
          {asSeenIn.map((pub) => (
            <span key={pub} className="font-display text-xs uppercase tracking-widest text-dirt-500">
              {pub}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <header className="mb-10 text-center">
          <p className="font-marker text-hazard">What's on the menu</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700 sm:text-4xl">Featured Services</h2>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex flex-col justify-between gap-4 rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite transition hover:-translate-y-1 hover:border-hazard"
            >
              <div>
                <h3 className="font-display text-xl uppercase text-dirt-700 group-hover:text-hazard">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-dirt-600">{s.blurb}</p>
              </div>
              <span className="font-marker text-sm text-hazard">Enter →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-dirt-700 py-16 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 text-center">
            <p className="font-marker text-caution">Toe Dirt Dispatch presents</p>
            <h2 className="font-display text-3xl uppercase sm:text-4xl">Bob's Intro Reel</h2>
          </header>
          <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl border-4 border-caution bg-dirt-800">
            <div className="flex h-full items-center justify-center bg-jobsite">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-hazard text-dirt-800 shadow-hazard">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden>
                  <polygon points="5,3 21,12 5,21" />
                </svg>
              </div>
              <span className="sr-only">Intro reel placeholder</span>
            </div>
          </div>
          <p className="mt-4 text-center font-marker text-caution">Video production in progress.</p>
        </div>
      </section>

      <section className="section">
        <header className="mb-10 text-center">
          <p className="font-marker text-hazard">Word on the jobsite</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700 sm:text-4xl">Testimonials</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite"
            >
              <blockquote className="font-marker text-lg text-dirt-700">"{t.quote}"</blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-widest text-concrete">
                — {t.author}, {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-8 rounded-xl border-4 border-hazard bg-bone p-8 shadow-jobsite md:grid-cols-[1fr,1.4fr]">
          <div className="flex flex-col justify-center gap-3">
            <p className="font-marker text-hazard">Package of the month</p>
            <h2 className="font-display text-3xl uppercase text-dirt-700">{pom.name}</h2>
            <p className="text-sm text-dirt-600">{pom.headline}</p>
            <Link href="/packages" className="btn-hazard w-max">
              See All Tiers
            </Link>
          </div>
          <div>
            <PackageCard pkg={pom} />
          </div>
        </div>
      </section>

      <section className="bg-dirt-50 py-16">
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">Toe Dirt Dispatch</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700">Weekly dirt to your inbox</h2>
          <p className="mt-2 text-sm text-dirt-600">
            One email a week. Package drops, Bob comics, and the occasional dispatch from the field.
          </p>
          <div className="mt-6">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </>
  );
}
