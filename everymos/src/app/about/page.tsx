import { Nav, Footer } from "@/components/Nav";

export const metadata = {
  title: "About",
  description: "Why I built EveryMOS and what it's for.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Why I built EveryMOS.</h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed">
          <p>
            I enlisted in the Marine Corps and spent years learning a job the rest of the
            country couldn&rsquo;t name. When I got out, I realized something simple: no one
            could explain what I&rsquo;d actually done. Not recruiters. Not HR departments.
            Not even the paperwork I walked out with.
          </p>
          <p>
            So I started writing it down. EveryMOS is what that turned into — a reference
            for every military job across every branch, with sources cited and no recruiter
            spin.
          </p>
          <p>
            This site speaks to four kinds of people: folks thinking about enlisting,
            service members figuring out their next move, veterans translating their
            experience, and the families and civilians trying to understand what a loved
            one does.
          </p>
          <p>
            Everything here gets checked against official branch sources first. When I
            can&rsquo;t confirm something, I say so. When sources conflict, I flag it.
            That&rsquo;s the whole standard.
          </p>
        </div>

        <h2 className="mt-16 text-2xl">What this site is.</h2>
        <ul className="mt-4 space-y-2 text-base">
          <li>A reference for every military job across all six branches.</li>
          <li>Sourced, cited, and honest about what&rsquo;s uncertain.</li>
          <li>Useful for recruits, service members, veterans, and families.</li>
        </ul>

        <h2 className="mt-12 text-2xl">What this site isn&rsquo;t.</h2>
        <ul className="mt-4 space-y-2 text-base">
          <li>A recruiting tool. I don&rsquo;t work for any branch.</li>
          <li>A promise. Pay, training length, and deployment tempo change — verify current policy before deciding.</li>
          <li>Legal, medical, or military advice.</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
