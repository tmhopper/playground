import * as React from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("pt-32 md:pt-40 pb-12 md:pb-16 relative", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_30%_0%,rgba(34,211,238,0.12),transparent)]" />
      <div className="container-page">
        {eyebrow && (
          <p className="text-xs uppercase tracking-widest text-ice-400 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/50 mb-6">
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => (
          <li key={i} className="flex items-center gap-2">
            {t.href ? (
              <a href={t.href} className="hover:text-ice-300 transition">{t.label}</a>
            ) : (
              <span className="text-white/70">{t.label}</span>
            )}
            {i < trail.length - 1 && <span aria-hidden className="text-white/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
