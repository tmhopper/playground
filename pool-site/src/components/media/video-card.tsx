import Image from "next/image";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/card";
import { asset, formatViews } from "@/lib/utils";
import type { Video } from "@/lib/data/videos";

const platformLabel = { tiktok: "TikTok", youtube: "YouTube", instagram: "Instagram" } as const;

export function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-ice-500/40 transition"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={asset(video.thumbnail)}
          alt={video.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge tone="ice">{platformLabel[video.platform]}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <span className="h-14 w-14 rounded-full bg-lime text-ocean-950 grid place-items-center shadow-[0_0_40px_rgba(205,255,0,0.6)]">
            <Play className="ml-0.5" size={24} fill="currentColor" />
          </span>
        </div>
        <div className="absolute bottom-3 right-3 text-xs text-white/80 font-semibold bg-black/50 rounded px-2 py-0.5">
          {Math.floor(video.durationSec / 60)}:{String(video.durationSec % 60).padStart(2, "0")}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold leading-snug text-white/95 line-clamp-2 min-h-[3em]">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-white/55">
          <span>{formatViews(video.views)} views</span>
          <span aria-hidden>·</span>
          <span>{new Date(video.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </a>
  );
}
