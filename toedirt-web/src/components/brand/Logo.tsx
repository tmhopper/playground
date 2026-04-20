import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Toe Dirt home"
      className={cn("inline-flex items-baseline gap-1 font-display leading-none", className)}
    >
      <span className={cn("text-2xl uppercase tracking-wider", inverse ? "text-bone" : "text-dirt-700")}>
        T
      </span>
      <span className="relative">
        <span className={cn("text-2xl uppercase tracking-wider", inverse ? "text-bone" : "text-dirt-700")}>
          OE
        </span>
        <span
          aria-hidden
          className="absolute -top-3 left-[0.55em] block h-2 w-2 rounded-full bg-hazard shadow-hazard"
        />
      </span>
      <span className={cn("ml-1 text-2xl uppercase tracking-wider", inverse ? "text-hazard" : "text-hazard")}>
        DIRT
      </span>
    </Link>
  );
}
