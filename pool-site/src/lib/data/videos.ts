export type Platform = "tiktok" | "youtube" | "instagram";

export type Video = {
  id: string;
  platform: Platform;
  title: string;
  thumbnail: string;
  url: string;
  views: number;
  durationSec: number;
  publishedAt: string;
  featured?: boolean;
  caseFile?: string;
};

export const videos: Video[] = [
  {
    id: "ramirez-green",
    platform: "youtube",
    title: "4 years of algae. 36 hours of work.",
    thumbnail: "/images/pool-green-brush-1.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 842000,
    durationSec: 1042,
    publishedAt: "2026-04-02",
    featured: true,
    caseFile: "Ramirez family · Manteca, CA",
  },
  {
    id: "foreclosed-stockton",
    platform: "tiktok",
    title: "The owner cried when she saw it.",
    thumbnail: "/images/pool13-after.jpg",
    url: "https://tiktok.com/@troycleans/video/abc123",
    views: 2100000,
    durationSec: 87,
    publishedAt: "2026-03-26",
    featured: true,
  },
  {
    id: "veteran-modesto",
    platform: "youtube",
    title: "Green-to-blue in one weekend — full process",
    thumbnail: "/images/action-spa-pool.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 540000,
    durationSec: 1630,
    publishedAt: "2026-03-18",
    featured: true,
  },
  {
    id: "tile-restoration",
    platform: "tiktok",
    title: "How I brush a neglected plaster pool without scratching it",
    thumbnail: "/images/action-brushing.jpg",
    url: "https://tiktok.com/@troycleans/video/def456",
    views: 1400000,
    durationSec: 62,
    publishedAt: "2026-03-11",
  },
  {
    id: "pump-diagnosis",
    platform: "youtube",
    title: "Filter grid deep-clean — why your pump is struggling",
    thumbnail: "/images/filter-grids.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 310000,
    durationSec: 742,
    publishedAt: "2026-03-04",
  },
  {
    id: "shock-timelapse",
    platform: "instagram",
    title: "Shock treatment timelapse · 48 hours in 30 seconds",
    thumbnail: "/images/pool-green-brush-2.jpg",
    url: "https://instagram.com/reel/abc",
    views: 980000,
    durationSec: 30,
    publishedAt: "2026-02-28",
  },
  {
    id: "drained-rescue",
    platform: "youtube",
    title: "Drained-pool rescue · scrubbing 4 years of sediment by hand",
    thumbnail: "/images/action-drain-scrub.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 1800000,
    durationSec: 1140,
    publishedAt: "2026-02-19",
  },
  {
    id: "filter-teardown",
    platform: "tiktok",
    title: "What's inside a filter no one's cleaned in 5 years",
    thumbnail: "/images/filter-dirty.jpg",
    url: "https://tiktok.com/@troycleans/video/ghi789",
    views: 3200000,
    durationSec: 45,
    publishedAt: "2026-02-12",
  },
  {
    id: "pebble-tec",
    platform: "youtube",
    title: "Stain removal on Pebble Tec — what actually works",
    thumbnail: "/images/pool-clean-full.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 210000,
    durationSec: 920,
    publishedAt: "2026-02-05",
  },
  {
    id: "community-day",
    platform: "instagram",
    title: "Community Day · 3 pools, 14 volunteers, 1 weekend",
    thumbnail: "/images/pool-chainlink.jpg",
    url: "https://instagram.com/reel/def",
    views: 650000,
    durationSec: 58,
    publishedAt: "2026-01-29",
  },
  {
    id: "gunite-repair",
    platform: "youtube",
    title: "Patching gunite cracks without draining the pool",
    thumbnail: "/images/pool-green-wide.jpg",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 180000,
    durationSec: 810,
    publishedAt: "2026-01-21",
  },
  {
    id: "neighborhood-nominated",
    platform: "tiktok",
    title: "Entire neighborhood nominated this pool. Here's why.",
    thumbnail: "/images/pool-clean-clear.jpg",
    url: "https://tiktok.com/@troycleans/video/jkl012",
    views: 4100000,
    durationSec: 92,
    publishedAt: "2026-01-14",
  },
];

export const featuredVideos = videos.filter((v) => v.featured);
