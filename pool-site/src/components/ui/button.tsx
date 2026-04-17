import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "lime";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-ice-500 text-ocean-950 hover:bg-ice-400 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.5)]",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 border border-white/20",
  ghost: "text-white hover:bg-white/10",
  outline: "border border-white/30 text-white hover:bg-white/10",
  lime:
    "bg-lime text-ocean-950 hover:bg-lime-dark shadow-[0_10px_30px_-10px_rgba(205,255,0,0.5)] font-bold",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className"> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn("btn", variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    return (
      <Link {...(rest as React.ComponentProps<typeof Link>)} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {children}
    </button>
  );
}
