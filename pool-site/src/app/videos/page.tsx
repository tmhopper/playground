"use client";

import { useState, useMemo } from "react";
import { videos, type Platform } from "@/lib/data/videos";
import { VideoCard } from "@/components/media/video-card";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

const filters: { id: Platform | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" },
];

export default function VideosPage() {
  const [filter, setFilter] = useState<Platform | "all">("all");
  const list = useMemo(
    () => (filter === "all" ? videos : videos.filter((v) => v.platform === filter)),
    [filter],
  );

  return (
    <>
      <PageHeader
        eyebrow="The work"
        title={<>Every pool I&apos;ve revived, on camera.</>}
        description={`${videos.length} videos · 4.2M views · since Jan 2026. New transformation every 1–2 weeks.`}
      >
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter videos">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 h-9 rounded-full text-sm font-semibold transition border",
                filter === f.id
                  ? "bg-lime text-ocean-950 border-lime"
                  : "text-white/70 border-white/15 hover:border-white/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="pb-24">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
          {list.length === 0 && (
            <p className="col-span-full text-white/60 text-center py-20">
              No videos match this filter.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
