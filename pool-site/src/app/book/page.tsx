import type { Metadata } from "next";
import Image from "next/image";
import { BookingForm } from "@/components/forms/booking-form";
import { PageHeader } from "@/components/page-header";
import { brand } from "@/lib/data/brand";

export const metadata: Metadata = {
  title: "Book a Clean",
  description: "Request a pool service. I reply personally within 24 hours.",
};

const steps = [
  { n: 1, title: "I reply within 24 hours", body: "Personally, not an automated system. You get my actual phone number." },
  { n: 2, title: "We pick a time", body: "Flexible scheduling. Weekends available for deep cleans and rescues." },
  { n: 3, title: "I show up with gear", body: "Fully equipped truck. Licensed, insured, uniformed, and on time." },
  { n: 4, title: "Your pool's blue", body: "Video walkthrough when I'm done. Any follow-up check-ins are free." },
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a clean"
        title="Tell me about your pool."
        description="A couple of minutes to fill out. I'll be in touch personally within 24 hours with a firm quote and a time."
      />
      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-[3fr_2fr] gap-12">
          <BookingForm />

          <aside className="space-y-8">
            <div>
              <h3 className="text-xl font-display mb-5">What happens next</h3>
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="shrink-0 h-8 w-8 rounded-full bg-ice-500/20 border border-ice-500/40 text-ice-300 font-bold grid place-items-center">
                      {s.n}
                    </span>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <p className="text-sm text-white/65 mt-1 leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass rounded-xl p-5 flex gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 bg-white/10">
                <Image
                  src={brand.founderPhotoSmall}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{brand.founder}</p>
                <p className="text-xs uppercase tracking-widest text-ice-300 mt-0.5">
                  Owner · Pool Tech
                </p>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  &ldquo;I'm the one who replies. Same person who shows up.&rdquo;
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
