import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  glass = false,
}: {
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 p-6",
        glass ? "glass" : "bg-white/[0.03]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "lime" | "ice" | "warning";
  className?: string;
}) {
  const tones = {
    default: "bg-white/10 text-white/80",
    lime: "bg-lime/90 text-ocean-950",
    ice: "bg-ice-500/20 text-ice-300 border border-ice-500/40",
    warning: "bg-amber-500/20 text-amber-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
