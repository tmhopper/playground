import * as React from "react";

export function Marquee({
  items,
  separator = "•",
}: {
  items: readonly string[];
  separator?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-ocean-900/60 py-5">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="text-white/70 font-semibold tracking-widest text-sm flex items-center gap-12 uppercase"
          >
            {it}
            <span aria-hidden className="text-ice-400">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
