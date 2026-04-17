"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { volunteerSchema, mediaSchema, waitlistSchema } from "@/lib/validators";

type VolData = z.infer<typeof volunteerSchema>;
type MedData = z.infer<typeof mediaSchema>;

export function VolunteerForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolData>({ resolver: zodResolver(volunteerSchema) });

  async function onSubmit(data: VolData) {
    setSubmitting(true);
    console.log("[demo] volunteer signup:", data);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/success?from=volunteer");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" id="v-n" error={errors.name?.message}>
          <Input id="v-n" {...register("name")} aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Email" id="v-e" error={errors.email?.message}>
          <Input id="v-e" type="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
        </Field>
      </div>
      <Field label="How could you help?" id="v-s" hint="e.g. carrying gear, filming, social media" error={errors.skills?.message}>
        <Textarea id="v-s" rows={3} {...register("skills")} aria-invalid={Boolean(errors.skills)} />
      </Field>
      <Field label="When are you available?" id="v-a" error={errors.availability?.message}>
        <Input id="v-a" {...register("availability")} placeholder="Weekends · after 5pm · etc." aria-invalid={Boolean(errors.availability)} />
      </Field>
      <Button type="submit" variant="lime" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Sign up to volunteer"}
      </Button>
    </form>
  );
}

export function MediaContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedData>({ resolver: zodResolver(mediaSchema) });

  async function onSubmit(data: MedData) {
    setSubmitting(true);
    console.log("[demo] media contact:", data);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/success?from=media");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Your name" id="m-n" error={errors.name?.message}>
          <Input id="m-n" {...register("name")} aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label="Outlet" id="m-o" error={errors.outlet?.message}>
          <Input id="m-o" {...register("outlet")} aria-invalid={Boolean(errors.outlet)} />
        </Field>
      </div>
      <Field label="Email" id="m-e" error={errors.email?.message}>
        <Input id="m-e" type="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
      </Field>
      <Field label="Subject" id="m-s" error={errors.subject?.message}>
        <Input id="m-s" {...register("subject")} aria-invalid={Boolean(errors.subject)} />
      </Field>
      <Field label="Message" id="m-m" error={errors.message?.message}>
        <Textarea id="m-m" rows={4} {...register("message")} aria-invalid={Boolean(errors.message)} />
      </Field>
      <Button type="submit" variant="lime" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
}

export function WaitlistForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check email");
      return;
    }
    setSubmitting(true);
    console.log("[demo] waitlist:", email);
    await new Promise((r) => setTimeout(r, 700));
    router.push("/success?from=waitlist");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email"
          className="flex-1 rounded-md bg-white/5 border border-white/15 px-4 h-12 text-white placeholder:text-white/40 focus:outline-none focus:border-ice-400 transition"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-lime text-ocean-950 font-bold px-6 h-12 hover:bg-lime-dark transition disabled:opacity-60"
        >
          {submitting ? "Adding…" : "Notify me when it drops"}
        </button>
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <p className="text-white/50 text-xs mt-3">
        Founder-tier discount for the first 500 on the list.
      </p>
    </form>
  );
}
