import { Nav, Footer } from "@/components/Nav";

export const metadata = { title: "Affiliate disclosure" };

export default function DisclosurePage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Affiliate disclosure</h1>
        <p className="mt-6 opacity-80">Last updated: April 17, 2026</p>
        <p className="mt-6">
          Some links on EveryMOS are affiliate links. That means if you click and buy
          something, I may earn a small commission at no extra cost to you.
        </p>
        <p className="mt-4">
          Affiliate revenue does not influence what I recommend. A cert program or book
          gets mentioned because it&rsquo;s useful, not because it pays. When I link to a
          DoD COOL cert-prep provider, that link is there because the cert is recognized
          for the job in question — the affiliate relationship is a secondary detail.
        </p>
        <p className="mt-4">
          If you&rsquo;d rather avoid affiliate links, a plain Google search for the same
          product gets you the same result. I won&rsquo;t be offended.
        </p>
      </main>
      <Footer />
    </>
  );
}
