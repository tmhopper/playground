import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  animated = true,
}: {
  className?: string;
  href?: string;
  animated?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-baseline gap-0.5 font-display font-bold tracking-tight", className)}
      aria-label="Troy Cleans — home"
    >
      <span className="text-white/95 text-xl">troy&nbsp;cleans</span>
      <span className="relative inline-block h-2 w-2 rounded-full bg-ice-400 translate-y-[-2px]">
        {animated && <span className="absolute inset-0 rounded-full ripple-dot" aria-hidden />}
      </span>
    </Link>
  );
}
