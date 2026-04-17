"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Badge } from "@/components/ui/card";

export function BeforeAfter({
  before,
  after,
  title,
  location,
  story,
}: {
  before: string;
  after: string;
  title: string;
  location: string;
  story?: string;
}) {
  return (
    <figure className="group overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <div className="relative">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage src={before} alt={`Before: ${title}`} style={{ objectFit: "cover" }} />
          }
          itemTwo={
            <ReactCompareSliderImage src={after} alt={`After: ${title}`} style={{ objectFit: "cover" }} />
          }
          className="aspect-[4/3]"
          style={{ height: "100%" }}
        />
        <span className="absolute top-3 left-3 z-10 pointer-events-none">
          <Badge tone="ice">Before</Badge>
        </span>
        <span className="absolute top-3 right-3 z-10 pointer-events-none">
          <Badge tone="lime">After</Badge>
        </span>
      </div>
      <figcaption className="p-5">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-xs uppercase tracking-wider text-ice-300 mt-1">{location}</p>
        {story && <p className="text-white/70 text-sm mt-2 leading-relaxed">{story}</p>}
      </figcaption>
    </figure>
  );
}
