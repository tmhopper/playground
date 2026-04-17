import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md bg-white/5 border border-white/15 px-4 h-11 text-white placeholder:text-white/40",
        "focus:outline-none focus:border-ice-400 focus:bg-white/10 transition",
        "aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-500/5",
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 min-h-[7rem]",
        "focus:outline-none focus:border-ice-400 focus:bg-white/10 transition resize-y",
        "aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-500/5",
        className,
      )}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-md bg-white/5 border border-white/15 px-4 h-11 text-white",
        "focus:outline-none focus:border-ice-400 focus:bg-white/10 transition",
        "aria-[invalid=true]:border-red-400",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export function Label({
  children,
  htmlFor,
  hint,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-sm font-medium text-white/85">{children}</span>
      {hint && <span className="text-white/40 text-sm ml-2">· {hint}</span>}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-400 text-sm mt-1.5">{message}</p>;
}

export function Field({
  label,
  hint,
  error,
  id,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}
