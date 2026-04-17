import Link from "next/link";
import { Logo } from "./logo";
import { brand } from "@/lib/data/brand";
import { footerNav } from "@/lib/nav";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const socials = [
  { label: "TikTok", href: brand.socials.tiktok },
  { label: "YouTube", href: brand.socials.youtube },
  { label: "Instagram", href: brand.socials.instagram },
];

export function Footer() {
  return (
    <footer className="bg-ocean-950 border-t border-white/10 mt-24">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-[1.4fr_2fr]">
        <div className="space-y-5">
          <Logo animated={false} />
          <p className="text-white/65 max-w-sm leading-relaxed">
            {brand.tagline} Founded by {brand.founder}. Serving {brand.primaryCity} and the East Valley.
          </p>
          <NewsletterForm compact />
          <div className="flex gap-4 pt-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-ice-300 transition text-sm font-semibold"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <FooterCol title="Explore" links={footerNav.explore} />
          <FooterCol title="Services" links={footerNav.services} />
          <FooterCol title="Legal" links={footerNav.legal} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. Licensed {brand.licenseNumber}. Insured.
          </p>
          <p>
            As an Amazon Associate Troy earns from qualifying purchases. All affiliate links are marked.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-white/80 hover:text-ice-300 transition text-sm">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
