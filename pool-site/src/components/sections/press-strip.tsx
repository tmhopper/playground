import { pressItems } from "@/lib/data/press";

export function PressStrip() {
  return (
    <section className="py-14 border-y border-white/10 bg-ocean-950">
      <div className="container-page">
        <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-8">
          As seen on
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {pressItems.map((item) => (
            <li key={item.name} className="text-center">
              <div className="font-display font-bold text-xl text-white/70">{item.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/35 mt-1">
                {item.detail}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
