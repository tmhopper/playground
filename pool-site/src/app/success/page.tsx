import { Suspense } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/data/brand";

const messages: Record<string, { title: string; body: string }> = {
  book: {
    title: "Got it. I'll be in touch.",
    body: "I reply personally within 24 hours with a firm quote and a time. Check your email and text messages.",
  },
  nominate: {
    title: "Nomination received. Thank you.",
    body: "I read every nomination personally. If this one's a fit, I'll reach out through the owner and loop you back in if you left contact info.",
  },
  newsletter: {
    title: "You're on the list.",
    body: "One email a month. Zero spam. First transformation headed your way within a week or two.",
  },
  waitlist: {
    title: "On the Burdett Blue list.",
    body: "You'll be first to know the day it drops. Founder-tier discount locked in for the first 500 signups.",
  },
  sponsor: {
    title: "Thank you. Genuinely.",
    body: "Your contribution goes straight to supplies for the next clean. You'll get a photo update and a link to the finished video when your sponsored job goes up.",
  },
  volunteer: {
    title: "You're in.",
    body: "I'll add you to the next Community Day roster and email you the details a week out.",
  },
  media: {
    title: "Inquiry received.",
    body: "I'll reply within 48 hours. For urgent deadlines, text the press line.",
  },
  default: {
    title: "Thanks — I'll be in touch.",
    body: "You should hear from me within 24–48 hours.",
  },
};

function SuccessInner({ from }: { from: string | null }) {
  const msg = messages[from ?? "default"] ?? messages.default;
  return (
    <section className="min-h-[80vh] grid place-items-center py-24">
      <div className="container-page max-w-xl text-center">
        <div className="mx-auto h-20 w-20 rounded-full bg-lime text-ocean-950 grid place-items-center shadow-[0_0_60px_rgba(205,255,0,0.5)]">
          <Check size={36} strokeWidth={3} />
        </div>
        <h1 className="mt-10">{msg.title}</h1>
        <p className="mt-6 text-lg text-white/70 leading-relaxed">{msg.body}</p>
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          <Button href="/videos" variant="lime">Watch latest video</Button>
          <Button href={brand.socials.tiktok} variant="outline">Follow on TikTok</Button>
          <Button href="/" variant="ghost">Back home</Button>
        </div>
      </div>
    </section>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const sp = await searchParams;
  return (
    <Suspense>
      <SuccessInner from={sp.from ?? null} />
    </Suspense>
  );
}
