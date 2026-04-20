import { BobMascot } from "@/components/brand/BobMascot";

export const metadata = { title: "Bob's Corner — Toe Dirt" };

const tips = [
  {
    title: "Tip #14 — On the value of a quiet toe",
    body:
      "A quiet toe says more than a loud mouth. Rest your toe in a ray of afternoon light. Let it speak for itself. Do not translate.",
  },
  {
    title: "Tip #15 — Hydrate the toe",
    body:
      "A dry toe is a tired toe. Apply moisturizer twice daily, or after any moment of emotional significance.",
  },
  {
    title: "Tip #16 — Know when to deploy the boot hole",
    body:
      "The boot hole is a tool. Not a crutch. Not a lifestyle. A tool. Wield it with restraint.",
  },
];

const playlist = [
  "Jackhammer Jamboree — Concrete Clyde",
  "Dust In The Wind (But Literally) — The Jobsite Jets",
  "Big Toe, Bigger Heart — Ballad of Bob",
  "Tuesday Overalls — Sheetrock Sheila",
];

export default function BobCornerPage() {
  return (
    <>
      <section className="bg-dirt-700 py-14 text-bone">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1fr,1.2fr] lg:px-8">
          <BobMascot size={220} saying="Welcome to the corner." />
          <div>
            <p className="font-marker text-caution">Bob's Corner</p>
            <h1 className="font-display text-4xl uppercase sm:text-5xl">Dispatches from Bob</h1>
            <p className="mt-3 max-w-xl text-bone/90">
              Bob has a weekly comic, a running list of toe tips, and a jobsite playlist that mostly
              works. You'll hear from him on Wednesdays.
            </p>
          </div>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section">
        <header className="mb-8">
          <p className="font-marker text-hazard">Toe Tips of the Week</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700">From the clipboard</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {tips.map((tip) => (
            <article
              key={tip.title}
              className="rounded-xl border-2 border-dirt-300 bg-bone p-5 shadow-jobsite"
            >
              <h3 className="font-display text-lg uppercase text-dirt-700">{tip.title}</h3>
              <p className="mt-2 text-sm text-dirt-600">{tip.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <header className="mb-6">
          <p className="font-marker text-hazard">Bob's Playlist</p>
          <h2 className="font-display text-3xl uppercase text-dirt-700">Jobsite Bangers</h2>
        </header>
        <ul className="rounded-xl border-2 border-dirt-300 bg-bone shadow-jobsite">
          {playlist.map((track, i) => (
            <li
              key={track}
              className="flex items-center justify-between border-b border-dirt-200 px-5 py-4 last:border-b-0"
            >
              <span className="flex items-center gap-3">
                <span className="font-display text-dirt-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-dirt-700">{track}</span>
              </span>
              <span className="font-marker text-xs text-hazard">▶</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
