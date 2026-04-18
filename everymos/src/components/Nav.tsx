import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="mono text-lg font-semibold text-[color:var(--color-ink-900)] no-underline"
        >
          EveryMOS
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/jobs" className="text-[color:var(--color-ink-700)] no-underline hover:text-[color:var(--color-signal)]">
            All Jobs
          </Link>
          <Link href="/jobs/marine-corps" className="hidden text-[color:var(--color-ink-700)] no-underline hover:text-[color:var(--color-signal)] md:inline">
            Marine Corps
          </Link>
          <Link href="/about" className="text-[color:var(--color-ink-700)] no-underline hover:text-[color:var(--color-signal)]">
            About
          </Link>
          <Link
            href="/newsletter"
            className="hidden rounded-md bg-[color:var(--color-ink-900)] px-3 py-2 text-white no-underline hover:bg-[color:var(--color-signal)] sm:inline-block"
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[color:var(--color-rule)] bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="mono text-sm font-semibold text-[color:var(--color-ink-900)]">
            EveryMOS
          </p>
          <p className="mt-3 text-sm opacity-70">
            Every military job, explained straight. Built by Marc Hopper, USMC veteran.
          </p>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-wide opacity-60">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/jobs" className="no-underline hover:underline">Jobs</Link></li>
            <li><Link href="/about" className="no-underline hover:underline">About</Link></li>
            <li><Link href="/newsletter" className="no-underline hover:underline">Newsletter</Link></li>
          </ul>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-wide opacity-60">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/privacy" className="no-underline hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="no-underline hover:underline">Terms</Link></li>
            <li><Link href="/affiliate-disclosure" className="no-underline hover:underline">Affiliate disclosure</Link></li>
            <li><Link href="/accessibility" className="no-underline hover:underline">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-rule)] px-4 py-6 text-center text-xs opacity-60 md:px-8">
        © {new Date().getFullYear()} Marc Hopper. Sources cited on every entry.
      </div>
    </footer>
  );
}
