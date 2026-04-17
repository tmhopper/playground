"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => void (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all",
          scrolled
            ? "bg-ocean-950/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent",
        )}
      >
        <div className="container-page h-16 md:h-18 flex items-center justify-between gap-6">
          <Logo />

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-md transition",
                    active
                      ? "text-ice-300 bg-white/5"
                      : "text-white/75 hover:text-white hover:bg-white/5",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Button href="/nominate" variant="ghost" size="sm">
              Nominate
            </Button>
            <Button href="/book" variant="lime" size="sm">
              Book a Clean →
            </Button>
          </div>

          <button
            className="lg:hidden text-white p-2 -mr-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-30 bg-ocean-950/98 backdrop-blur-lg pt-20 lg:hidden",
          !open && "hidden",
        )}
      >
        <div className="container-page py-6 flex flex-col gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-display font-bold text-white py-3 border-b border-white/10"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/nominate" variant="secondary" size="lg">
              Nominate a Pool
            </Button>
            <Button href="/book" variant="lime" size="lg">
              Book a Clean →
            </Button>
            <Button href="/sponsor" variant="outline" size="lg">
              Sponsor a Clean
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
