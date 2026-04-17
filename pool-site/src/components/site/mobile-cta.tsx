import Link from "next/link";

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-ocean-950/92 backdrop-blur-md border-t border-white/15 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2">
      <Link
        href="/nominate"
        className="flex-1 h-12 rounded-md border border-white/25 text-white font-semibold text-sm grid place-items-center"
      >
        Nominate
      </Link>
      <Link
        href="/book"
        className="flex-1 h-12 rounded-md bg-lime text-ocean-950 font-bold text-sm grid place-items-center"
      >
        Book a Clean →
      </Link>
    </div>
  );
}
