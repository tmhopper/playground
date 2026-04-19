"use client";

import { useEffect, useState } from "react";
import { BobMascot } from "@/components/brand/BobMascot";

const STORAGE_KEY = "toedirt-age-gate";
const TTL_MS = 24 * 60 * 60 * 1000;

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setOpen(true);
        return;
      }
      const ts = Number(raw);
      if (!Number.isFinite(ts) || Date.now() - ts > TTL_MS) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dirt readiness confirmation"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-dirt-900/85 p-4"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border-4 border-hazard bg-dirt-50 shadow-jobsite">
        <div className="caution-strip" aria-hidden />
        <div className="flex flex-col items-center gap-4 px-6 py-8 text-center">
          <BobMascot size={140} saying="Heads up, partner." />
          <h2 className="font-display text-3xl uppercase tracking-wider text-dirt-700">
            Ready for this much dirt?
          </h2>
          <p className="max-w-sm text-sm text-dirt-600">
            Toe Dirt is a PG-13 parody brand. Nothing you'll see here is explicit, but it{" "}
            <em>is</em> committed to the bit. By continuing, you confirm you're 18+ and have a sense of
            humor.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={accept} className="btn-hazard">
              Bring On The Dirt
            </button>
            <a href="https://www.disneyplus.com" className="btn-outline">
              I'll See Myself Out
            </a>
          </div>
        </div>
        <div className="caution-strip" aria-hidden />
      </div>
    </div>
  );
}
