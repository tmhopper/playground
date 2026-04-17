import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center py-24">
      <div className="container-page text-center max-w-lg">
        <p className="text-xs uppercase tracking-widest text-ice-400">404</p>
        <h1 className="mt-4 text-display">This pool's gone missing.</h1>
        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          The page you're looking for isn't here. But if you know a pool that needs saving, now's a good time to tell me about it.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="lime">Back home</Button>
          <Button href="/nominate" variant="outline">Nominate a pool</Button>
        </div>
      </div>
    </section>
  );
}
