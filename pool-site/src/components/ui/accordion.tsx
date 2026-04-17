"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItemData = { q: string; a: string };

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-ice-300 transition"
              aria-expanded={isOpen}
              aria-controls={`acc-panel-${i}`}
            >
              <span className="font-semibold text-lg">{it.q}</span>
              <ChevronDown
                className={cn(
                  "shrink-0 transition-transform text-white/60",
                  isOpen && "rotate-180 text-ice-400",
                )}
                size={20}
              />
            </button>
            <div
              id={`acc-panel-${i}`}
              role="region"
              hidden={!isOpen}
              className={cn(
                "pb-5 text-white/70 leading-relaxed max-w-3xl",
                !isOpen && "hidden",
              )}
            >
              {it.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
