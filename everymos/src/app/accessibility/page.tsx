import { Nav, Footer } from "@/components/Nav";

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
        <h1>Accessibility</h1>
        <p className="mt-6">
          EveryMOS is built to meet WCAG 2.2 AA. That means readable contrast, keyboard
          navigation, screen-reader support, and respect for reduced-motion preferences.
        </p>
        <h2 className="mt-10 text-xl">If something&rsquo;s broken.</h2>
        <p className="mt-3">
          Email <a href="mailto:marc@everymos.com">marc@everymos.com</a> with a link and a
          short description. I&rsquo;ll fix it or tell you why I can&rsquo;t.
        </p>
        <h2 className="mt-10 text-xl">What&rsquo;s shipped.</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Skip-to-content link on every page.</li>
          <li>Visible focus ring on every interactive element.</li>
          <li><code>prefers-reduced-motion</code> disables animation.</li>
          <li>Semantic HTML landmarks (nav, main, footer) everywhere.</li>
          <li>Text-equivalent lists for every data visualization.</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
