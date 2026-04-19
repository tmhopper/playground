"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { nav, brand } from "@/lib/copy";
import { cn } from "@/lib/cn";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 transition lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-dirt-900/60 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-dirt-50 shadow-jobsite transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="caution-strip" aria-hidden />
        <div className="flex items-center justify-between border-b border-dirt-200 px-5 py-4">
          <span className="font-display text-lg uppercase text-dirt-700">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md border-2 border-dirt-700 p-2 text-dirt-700"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-md border-b-2 border-dirt-200 px-3 py-4 font-display text-lg uppercase tracking-wide text-dirt-700 transition hover:bg-hazard/10 hover:text-hazard"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-dirt-200 p-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="btn-hazard w-full"
          >
            DM Me
          </Link>
          <p className="mt-3 font-marker text-xs text-concrete">{brand.tagline}</p>
        </div>
      </aside>
    </div>
  );
}
