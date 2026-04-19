"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav } from "@/lib/copy";
import { useCart } from "@/lib/cart-store";
import { useState } from "react";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const count = useCart((s) => s.count());
  const setOpen = useCart((s) => s.setOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="caution-strip" aria-hidden />
      <header className="sticky top-0 z-40 border-b-2 border-hazard bg-dirt-50/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />
          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-display text-sm uppercase tracking-wider text-dirt-700 transition hover:text-hazard",
                    active && "text-hazard"
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-hazard" aria-hidden />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open cart"
              className="relative rounded-md border-2 border-dirt-700 p-2 text-dirt-700 transition hover:bg-dirt-700 hover:text-bone"
            >
              <ShoppingCart size={18} />
              {count > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-hazard px-1 text-[10px] font-bold text-bone">
                  {count}
                </span>
              ) : null}
            </button>
            <Link
              href="/contact"
              className="hidden rounded-md bg-hazard px-3 py-2 font-display text-xs uppercase tracking-wider text-dirt-800 shadow-jobsite transition hover:bg-hazard-dark hover:text-bone sm:inline-flex"
            >
              DM Me
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-md border-2 border-dirt-700 p-2 text-dirt-700 lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
