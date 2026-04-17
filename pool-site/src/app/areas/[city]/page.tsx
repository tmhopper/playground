import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities } from "@/lib/data/cities";
import { services } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import { PageHeader, Breadcrumbs } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/data/brand";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const match = cities.find((c) => c.slug === city);
  if (!match) return {};
  return {
    title: `Pool Cleaning in ${match.name}, ${match.state}`,
    description: `${brand.companyName} — licensed pool cleaning, maintenance, and green-to-clean rescues in ${match.name}. Honest pricing, no contracts, filmed on camera.`,
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = cities.find((c) => c.slug === city);
  if (!data) notFound();

  const localReview =
    testimonials.find((t) =>
      t.location.toLowerCase().includes(data.name.toLowerCase()),
    ) ?? testimonials[0];

  return (
    <>
      <div className="container-page pt-32 md:pt-40">
        <Breadcrumbs trail={[{ label: "Service areas" }, { label: data.name }]} />
      </div>
      <PageHeader
        eyebrow={`${data.state} · ${data.population} residents`}
        title={<>Pool cleaning in {data.name}.</>}
        description={data.localNote}
      />

      <section className="pb-20">
        <div className="container-page grid lg:grid-cols-[2fr_1fr] gap-10">
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl">Neighborhoods I service in {data.name}</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-white/80">
                {data.neighborhoods.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/55">
                Don't see your neighborhood? Message me — I almost always cover more than what's listed.
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl">Local conditions</h2>
              <dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <dt className="text-white/50 uppercase tracking-widest text-xs">Monsoon</dt>
                  <dd className="mt-1 text-white font-semibold">{data.monsoonSeason}</dd>
                </div>
                <div>
                  <dt className="text-white/50 uppercase tracking-widest text-xs">Calcium</dt>
                  <dd className="mt-1 text-white font-semibold capitalize">{data.calciumLevel}</dd>
                </div>
                <div>
                  <dt className="text-white/50 uppercase tracking-widest text-xs">Response time</dt>
                  <dd className="mt-1 text-white font-semibold">{data.responseTime}</dd>
                </div>
              </dl>
            </Card>

            <Card>
              <h2 className="text-2xl">Services available in {data.name}</h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/book?service=${s.id}`}
                    className="block rounded-lg border border-white/10 p-4 hover:border-ice-500/40 transition"
                  >
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-sm text-ice-300 mt-1">{s.price}</div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card glass>
              <p className="text-sm text-white/65 italic leading-relaxed">
                &ldquo;{localReview.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold">
                — {localReview.name}, {localReview.location}
              </p>
            </Card>
            <Button href="/book" variant="lime" size="lg" className="w-full">
              Book a clean in {data.name}
            </Button>
            <p className="text-center text-sm text-white/50">
              Or <Link href="/nominate" className="underline hover:text-ice-300">nominate a pool</Link> in your neighborhood.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
