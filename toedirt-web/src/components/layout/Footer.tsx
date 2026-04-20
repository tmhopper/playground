import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand } from "@/lib/copy";
import { NewsletterSignup } from "@/components/forms/NewsletterSignup";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/packages", label: "Packages" },
      { href: "/shop", label: "Merch" },
      { href: "/shop/gift-cards", label: "Gift Cards" },
      { href: "/bob", label: "Bob Collabs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "The Dirt" },
      { href: "/about#associates", label: "My Associates" },
      { href: "/press", label: "Press Kit" },
      { href: "/affiliates", label: "Affiliates" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Slide In My DMs" },
      { href: "/terms", label: "Terms of Toe Service" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 bg-dirt-700 text-bone">
      <div className="caution-strip" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo inverse />
          <p className="font-marker text-sm text-caution">{brand.tagline}</p>
          <p className="text-xs text-bone/70">{brand.disclaimer}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-sm uppercase tracking-wider text-caution">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-hazard">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-dirt-600">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h3 className="font-display text-lg uppercase text-caution">Toe Dirt Dispatch</h3>
          <p className="mt-1 text-sm text-bone/80">Weekly dirt to your inbox. Zero spam. One Bob.</p>
          <div className="mt-4 max-w-md">
            <NewsletterSignup />
          </div>
        </div>
      </div>
      <div className="border-t border-dirt-600">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-xs text-bone/70 sm:px-6 lg:px-8">
          <span>Built with dirt and love. © {new Date().getFullYear()} Toe Dirt LLC.</span>
          <div className="flex flex-wrap gap-3">
            {brand.socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-hazard" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
