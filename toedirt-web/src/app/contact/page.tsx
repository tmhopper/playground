import Link from "next/link";
import { DMForm } from "@/components/forms/DMForm";
import { brand } from "@/lib/copy";

export const metadata = { title: "Slide In My DMs — Toe Dirt" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-jobsite py-14 text-bone">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-marker text-hazard">Contact</p>
          <h1 className="font-display text-4xl uppercase sm:text-5xl">Slide In My DMs</h1>
          <p className="mt-3 max-w-2xl text-bone/90">
            Real inquiries, fake checkouts, or just a friendly hello. I'll hit you back after my shift.
          </p>
        </div>
        <div className="caution-strip" aria-hidden />
      </section>

      <section className="section grid gap-10 md:grid-cols-[1.3fr,1fr]">
        <DMForm />
        <aside className="space-y-6">
          <div className="rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite">
            <h2 className="font-display text-xl uppercase text-dirt-700">Direct Emails</h2>
            <ul className="mt-3 space-y-1 text-sm text-dirt-600">
              <li>
                <span className="font-display uppercase text-dirt-500">General</span>:{" "}
                <a href={`mailto:${brand.emails.hey}`} className="text-hazard hover:underline">
                  {brand.emails.hey}
                </a>
              </li>
              <li>
                <span className="font-display uppercase text-dirt-500">Bookings</span>:{" "}
                <a href={`mailto:${brand.emails.bookings}`} className="text-hazard hover:underline">
                  {brand.emails.bookings}
                </a>
              </li>
              <li>
                <span className="font-display uppercase text-dirt-500">Bob</span>:{" "}
                <a href={`mailto:${brand.emails.bob}`} className="text-hazard hover:underline">
                  {brand.emails.bob}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border-2 border-dirt-300 bg-bone p-6 shadow-jobsite">
            <h2 className="font-display text-xl uppercase text-dirt-700">Find Me Online</h2>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {brand.socials.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-hazard hover:underline">
                    {s.label} · {s.handle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
