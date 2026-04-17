import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredVideos } from "@/lib/data/videos";
import { VideoCard } from "@/components/media/video-card";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";

export function FeaturedVideos() {
  return (
    <section className="py-24 md:py-28 bg-ocean-900/30">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-ice-400">The work</p>
            <h2 className="mt-2">Latest transformations.</h2>
          </div>
          <Link
            href="/videos"
            className="text-ice-300 hover:text-ice-400 transition inline-flex items-center gap-1 font-semibold"
          >
            See all 27 videos <ArrowRight size={16} />
          </Link>
        </div>
        <Stagger className="grid md:grid-cols-3 gap-6">
          {featuredVideos.map((v) => (
            <StaggerItem key={v.id}>
              <VideoCard video={v} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
