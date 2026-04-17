"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { sponsorTiers } from "@/lib/data/sponsors";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { sponsorSchema } from "@/lib/validators";

export function SponsorForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [publicName, setPublicName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    const resolvedAmount = custom ? Number(custom) : amount;
    const result = sponsorSchema.safeParse({
      amount: resolvedAmount,
      name,
      email,
      publicName,
      message,
    });
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setSubmitting(true);
    console.log("[demo] sponsor contribution:", result.data);
    // Stub: replace with Stripe Checkout session
    await new Promise((r) => setTimeout(r, 900));
    router.push(`/success?from=sponsor&amount=${resolvedAmount}`);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-white/80 mb-3">Pick a tier</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sponsorTiers.map((tier) => {
            const active = amount === tier.amount && !custom;
            return (
              <button
                key={tier.amount}
                type="button"
                onClick={() => {
                  setAmount(tier.amount);
                  setCustom("");
                }}
                className={cn(
                  "rounded-lg p-4 text-left border transition",
                  active
                    ? "border-lime bg-lime/10 shadow-[0_0_30px_-10px_rgba(205,255,0,0.5)]"
                    : "border-white/15 bg-white/5 hover:border-white/30",
                )}
              >
                <div className="text-2xl font-display font-bold">${tier.amount}</div>
                <div className="text-xs uppercase tracking-wider text-white/60 mt-1">
                  {tier.label}
                </div>
                {"recommended" in tier && tier.recommended && (
                  <div className="text-[10px] mt-2 text-lime font-bold uppercase tracking-widest">
                    Most chosen
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Field label="Or enter a custom amount (USD)" id="s-custom">
        <Input
          id="s-custom"
          type="number"
          min="1"
          inputMode="numeric"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="$"
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Your name (private)" id="s-name" error={errors.name}>
          <Input
            id="s-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Email" id="s-email" error={errors.email}>
          <Input
            id="s-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <Field label="Display name on the supporter wall" id="s-public" hint="blank = Anonymous">
        <Input
          id="s-public"
          value={publicName}
          onChange={(e) => setPublicName(e.target.value)}
          placeholder="e.g. 'Sarah P.' or 'The Martinez Family'"
        />
      </Field>

      <Field label="A note for Troy" id="s-msg" hint="optional">
        <Textarea
          id="s-msg"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>

      <Button type="submit" variant="lime" size="lg" disabled={submitting} className="w-full">
        {submitting ? "Processing…" : `Contribute $${custom || amount}`}
      </Button>
      <p className="text-xs text-white/50 text-center">
        This demo doesn't charge — Stripe integration is commented in the source. You'll get a thank-you and a photo/video link when your sponsored clean happens.
      </p>
    </form>
  );
}
