import { BobMascot } from "@/components/brand/BobMascot";
import { associates, milestones, brand } from "@/lib/copy";

export const metadata = { title: "The Dirt — About Toe Dirt" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-jobsite py-16 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">The Dirt</p>
          <h1 className="font-display text-4xl uppercase sm:text-6xl">About Toe Dirt</h1>
          <p className="mt-4 max-w-2xl text-lg text-bone/90">
            Toe Dirt is the professional alias of a hard-working construction guy, a working-class sense of
            humor, and the internet's most committed toe-forward side hustle. {brand.tagline}
          </p>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section grid gap-10 md:grid-cols-[1.4fr,1fr]">
        <article className="space-y-4 text-dirt-700">
          <h2 className="font-display text-2xl uppercase">Origin story</h2>
          <p>
            It started on a regular Tuesday. A boot blew out at the jobsite, a foreman laughed, and a big
            toe caught the late-afternoon light. A phone was raised. A photo was posted. A DM arrived.
            Then a hundred more.
          </p>
          <p>
            What followed is now the stuff of boot-hole legend — a quiet pivot from subcontractor to
            content creator, a full-service brand built on dirt, daylight, and a peculiar kind of dignity.
            Today, Toe Dirt ships six services, seven merch items, and one comedy mascot who refuses to
            stay off-camera.
          </p>
          <p>
            All commerce on this site is parody. The bit is the business. The business is the bit.
          </p>
        </article>
        <aside className="rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite">
          <div className="flex items-center gap-4">
            <BobMascot size={110} />
            <div>
              <h3 className="font-display text-xl uppercase text-dirt-700">Meet Bob</h3>
              <p className="mt-1 text-sm text-dirt-600">
                Mascot, comic, quiet hero. Bob runs his own corner of the site. Do not email him directly.
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section id="associates" className="bg-bone py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <p className="font-marker text-hazard">The crew</p>
            <h2 className="font-display text-3xl uppercase text-dirt-700">My Associates</h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {associates.map((a) => (
              <article
                key={a.name}
                className="rounded-xl border-2 border-dirt-300 bg-dirt-50 p-5 shadow-jobsite"
              >
                <h3 className="font-display text-lg uppercase text-dirt-700">{a.name}</h3>
                <p className="mt-1 font-marker text-sm text-hazard">{a.role}</p>
                <p className="mt-2 text-sm text-dirt-600">{a.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <header className="mb-10">
          <p className="font-marker text-hazard">Timeline</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700">Milestones</h2>
        </header>
        <ol className="relative border-l-4 border-hazard pl-6">
          {milestones.map((m) => (
            <li key={m.year} className="mb-8 last:mb-0">
              <span className="absolute -left-[10px] h-4 w-4 rounded-full bg-hazard shadow-hazard" />
              <p className="font-display text-2xl uppercase text-dirt-700">{m.year}</p>
              <p className="mt-1 text-dirt-600">{m.event}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
