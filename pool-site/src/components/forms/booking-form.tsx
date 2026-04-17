"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { z } from "zod";
import { bookingSchema } from "@/lib/validators";
import { services } from "@/lib/data/services";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";

type FormData = z.infer<typeof bookingSchema>;

function BookingFormInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: params.get("service") ?? "" },
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    console.log("[demo] booking submission:", data);
    // Stub: replace with Resend / Formspree / your backend
    await new Promise((r) => setTimeout(r, 800));
    router.push("/success?from=book");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Field label="Full name" id="b-name" error={errors.name?.message}>
        <Input id="b-name" {...register("name")} aria-invalid={Boolean(errors.name)} />
      </Field>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Email" id="b-email" error={errors.email?.message}>
          <Input id="b-email" type="email" {...register("email")} aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Phone" id="b-phone" error={errors.phone?.message}>
          <Input id="b-phone" type="tel" {...register("phone")} aria-invalid={Boolean(errors.phone)} />
        </Field>
      </div>
      <Field label="Property address" id="b-addr" error={errors.address?.message}>
        <Input id="b-addr" {...register("address")} aria-invalid={Boolean(errors.address)} />
      </Field>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Service" id="b-service" error={errors.service?.message}>
          <Select id="b-service" {...register("service")} aria-invalid={Boolean(errors.service)}>
            <option value="">Select a service…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.price}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Preferred date" id="b-date" hint="optional">
          <Input id="b-date" type="date" {...register("preferredDate")} />
        </Field>
      </div>
      <Field label="Anything I should know?" id="b-notes" hint="optional">
        <Textarea id="b-notes" rows={5} {...register("notes")} placeholder="Pool size, equipment quirks, access notes, pets on site, etc." />
      </Field>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <Button type="submit" variant="lime" size="lg" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Request Booking"}
      </Button>
      <p className="text-xs text-white/50 text-center">
        I reply personally within 24 hours. Pricing is firm — no surprise line items.
      </p>
    </form>
  );
}

export function BookingForm() {
  return (
    <Suspense fallback={<div className="text-white/50">Loading…</div>}>
      <BookingFormInner />
    </Suspense>
  );
}
