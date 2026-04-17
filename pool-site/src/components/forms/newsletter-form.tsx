"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { newsletterSchema } from "@/lib/validators";
import { cn } from "@/lib/utils";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check email");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/success?from=newsletter");
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", compact ? "max-w-sm" : "max-w-lg")}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email"
          aria-invalid={Boolean(error)}
          className="flex-1 rounded-md bg-white/5 border border-white/15 px-4 h-11 text-white placeholder:text-white/40 focus:outline-none focus:border-ice-400 transition"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 rounded-md bg-lime text-ocean-950 font-bold px-4 h-11 hover:bg-lime-dark transition disabled:opacity-60"
        >
          {submitting ? <Check size={16} /> : <ArrowRight size={16} />}
          <span className="hidden sm:inline">{submitting ? "Joining…" : "Subscribe"}</span>
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
      <p className="text-white/45 text-xs mt-2">
        One email a month. New transformations, behind-the-scenes, first access to Burdett Blue.
      </p>
    </form>
  );
}
