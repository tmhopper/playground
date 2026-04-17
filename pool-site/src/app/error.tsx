"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="min-h-[80vh] grid place-items-center py-24">
      <div className="container-page text-center max-w-lg">
        <p className="text-xs uppercase tracking-widest text-red-400">500</p>
        <h1 className="mt-4 text-display">Something broke.</h1>
        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          I got a filter clogged somewhere in the backend. Give it a reload and it usually clears up.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button onClick={() => reset()} variant="lime">Try again</Button>
          <Button href="/" variant="outline">Back home</Button>
        </div>
      </div>
    </section>
  );
}
