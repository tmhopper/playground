import { stats } from "@/lib/data/stats";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";

export function StatsStrip() {
  return (
    <section className="py-16 md:py-20 border-y border-white/10 bg-ocean-900/40">
      <div className="container-page">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center md:text-left">
              <div className="text-5xl md:text-6xl font-display font-bold text-ice-400 leading-none">
                {"prefix" in s && s.prefix ? s.prefix : ""}
                {s.value}
                {"suffix" in s && s.suffix ? s.suffix : ""}
              </div>
              <div className="mt-3 text-sm uppercase tracking-widest text-white/60">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
