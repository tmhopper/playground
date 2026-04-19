"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setState("done");
    setEmail("");
  }

  if (state === "done") {
    return (
      <p className="rounded-md border-2 border-caution bg-caution/10 px-4 py-3 text-sm text-caution">
        You're subscribed. Bob just put you on the fridge.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@jobsite.com"
        className="flex-1 rounded-md border-2 border-dirt-400 bg-bone px-3 py-2 text-sm text-dirt-700 placeholder:text-concrete focus:border-hazard focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-hazard disabled:opacity-60"
      >
        {state === "loading" ? "Dusting off…" : "Subscribe"}
      </button>
    </form>
  );
}
