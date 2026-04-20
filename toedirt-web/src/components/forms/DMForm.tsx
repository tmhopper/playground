"use client";

import { useState } from "react";
import { packages as allPackages, categoryLabels, type PackageCategory } from "@/lib/packages";

const referrals = [
  "Instagram",
  "TikTok",
  "Saw his boot hole in person",
  "Bob told me",
  "Other",
] as const;

const categoryKeys = Object.keys(categoryLabels) as PackageCategory[];

export function DMForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budget, setBudget] = useState(500);
  const [categories, setCategories] = useState<PackageCategory[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      package: form.get("package"),
      budget,
      categories,
      brief: form.get("brief"),
      referral: form.get("referral"),
    };
    try {
      await fetch("/api/dm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-xl border-4 border-hazard bg-bone p-6 text-center shadow-jobsite">
        <h3 className="font-display text-2xl uppercase text-hazard">DM Received</h3>
        <p className="mt-2 text-sm text-dirt-600">
          I'll hit you back after my shift. In the meantime, Bob will send you a welcome meme.
        </p>
      </div>
    );
  }

  function toggleCategory(c: PackageCategory) {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-display uppercase text-dirt-700">Name</span>
          <input
            required
            name="name"
            className="rounded-md border-2 border-dirt-300 bg-bone px-3 py-2 focus:border-hazard focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-display uppercase text-dirt-700">Email</span>
          <input
            required
            type="email"
            name="email"
            className="rounded-md border-2 border-dirt-300 bg-bone px-3 py-2 focus:border-hazard focus:outline-none"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-display uppercase text-dirt-700">Desired Package</span>
        <select
          name="package"
          defaultValue="gold"
          className="rounded-md border-2 border-dirt-300 bg-bone px-3 py-2 focus:border-hazard focus:outline-none"
        >
          {allPackages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col gap-2 text-sm">
        <span className="font-display uppercase text-dirt-700">Budget: ${budget.toLocaleString()}</span>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="accent-hazard"
        />
        <div className="flex justify-between text-xs text-concrete">
          <span>$0</span>
          <span>$5,000+</span>
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 font-display text-sm uppercase text-dirt-700">Preferred Categories</legend>
        <div className="flex flex-wrap gap-2">
          {categoryKeys.map((c) => {
            const active = categories.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className={
                  "rounded-full border-2 px-3 py-1 text-xs font-display uppercase tracking-wide transition " +
                  (active
                    ? "border-hazard bg-hazard text-dirt-800"
                    : "border-dirt-400 bg-bone text-dirt-700 hover:border-hazard")
                }
              >
                {categoryLabels[c]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-display uppercase text-dirt-700">What do you want?</span>
        <textarea
          name="brief"
          rows={4}
          placeholder="Be specific — or don't."
          className="rounded-md border-2 border-dirt-300 bg-bone px-3 py-2 focus:border-hazard focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-display uppercase text-dirt-700">How did you find Toe Dirt?</span>
        <select
          name="referral"
          className="rounded-md border-2 border-dirt-300 bg-bone px-3 py-2 focus:border-hazard focus:outline-none"
        >
          {referrals.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={submitting} className="btn-hazard w-full disabled:opacity-60">
        {submitting ? "Sending DM…" : "Slide It In"}
      </button>
    </form>
  );
}
