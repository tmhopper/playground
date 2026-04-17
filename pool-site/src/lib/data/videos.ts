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
    title: "4 years of algae. 6 hours of work.",
    thumbnail:
      "https://images.unsplash.com/photo-1572839150175-e75a91e2ed17?w=960&q=80",
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
    thumbnail:
      "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=960&q=80",
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
    thumbnail:
      "https://images.unsplash.com/photo-1533094602577-198d3beab8ea?w=960&q=80",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 540000,
    durationSec: 1630,
    publishedAt: "2026-03-18",
    featured: true,
  },
  {
    id: "tile-restoration",
    platform: "tiktok",
    title: "Pulling 12 years of calcium off the tile line",
    thumbnail:
      "https://images.unsplash.com/photo-1576484100175-1977e3d0c9f1?w=960&q=80",
    url: "https://tiktok.com/@troycleans/video/def456",
    views: 1400000,
    durationSec: 62,
    publishedAt: "2026-03-11",
  },
  {
    id: "pump-diagnosis",
    platform: "youtube",
    title: "Diagnosing a pump that won't prime (free fix)",
    thumbnail:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=960&q=80",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 310000,
    durationSec: 742,
    publishedAt: "2026-03-04",
  },
  {
    id: "shock-timelapse",
    platform: "instagram",
    title: "Shock treatment timelapse · 48 hours in 30 seconds",
    thumbnail:
      "https://images.unsplash.com/photo-1562511211-68f30ca83fa3?w=960&q=80",
    url: "https://instagram.com/reel/abc",
    views: 980000,
    durationSec: 30,
    publishedAt: "2026-02-28",
  },
  {
    id: "widow-guadalupe",
    platform: "youtube",
    title: "Her husband built this pool. It hadn't run in 6 years.",
    thumbnail:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=960&q=80",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 1800000,
    durationSec: 1140,
    publishedAt: "2026-02-19",
  },
  {
    id: "filter-teardown",
    platform: "tiktok",
    title: "What's inside a filter no one's cleaned in 5 years",
    thumbnail:
      "https://images.unsplash.com/photo-1629905607580-9d68c4f8d35f?w=960&q=80",
    url: "https://tiktok.com/@troycleans/video/ghi789",
    views: 3200000,
    durationSec: 45,
    publishedAt: "2026-02-12",
  },
  {
    id: "pebble-tec",
    platform: "youtube",
    title: "Stain removal on Pebble Tec — what actually works",
    thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=960&q=80",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 210000,
    durationSec: 920,
    publishedAt: "2026-02-05",
  },
  {
    id: "community-day",
    platform: "instagram",
    title: "Community Day · 3 pools, 14 volunteers, 1 weekend",
    thumbnail:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=960&q=80",
    url: "https://instagram.com/reel/def",
    views: 650000,
    durationSec: 58,
    publishedAt: "2026-01-29",
  },
  {
    id: "gunite-repair",
    platform: "youtube",
    title: "Patching gunite cracks without draining the pool",
    thumbnail:
      "https://images.unsplash.com/photo-1566840547093-a8e4abe9180c?w=960&q=80",
    url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    views: 180000,
    durationSec: 810,
    publishedAt: "2026-01-21",
  },
  {
    id: "neighborhood-nominated",
    platform: "tiktok",
    title: "Entire neighborhood nominated this pool. Here's why.",
    thumbnail:
      "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=960&q=80",
    url: "https://tiktok.com/@troycleans/video/jkl012",
    views: 4100000,
    durationSec: 92,
    publishedAt: "2026-01-14",
  },
];

export const featuredVideos = videos.filter((v) => v.featured);
