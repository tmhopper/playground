"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import {
  nominateStep1Schema,
  nominateStep2Schema,
  nominateStep3Schema,
} from "@/lib/validators";
import { cn } from "@/lib/utils";

type Data = {
  propertyAddress?: string;
  city?: string;
  category?: string;
  story?: string;
  yourName?: string;
  yourEmail?: string;
  relationship?: string;
  ownerName?: string;
  ownerContact?: string;
  permissionConfirmed?: boolean;
};

const steps = [
  { label: "About the pool" },
  { label: "About you" },
  { label: "Consent" },
];

export function NominateForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Data>(key: K, value: Data[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(n: number): boolean {
    setErrors({});
    if (n === 0) {
      const res = nominateStep1Schema.safeParse(data);
      if (!res.success) {
        setErrors(
          Object.fromEntries(
            res.error.issues.map((i) => [i.path[0], i.message]),
          ),
        );
        return false;
      }
    }
    if (n === 1) {
      const res = nominateStep2Schema.safeParse(data);
      if (!res.success) {
        setErrors(
          Object.fromEntries(
            res.error.issues.map((i) => [i.path[0], i.message]),
          ),
        );
        return false;
      }
    }
    if (n === 2) {
      const res = nominateStep3Schema.safeParse(data);
      if (!res.success) {
        setErrors(
          Object.fromEntries(
            res.error.issues.map((i) => [i.path[0], i.message]),
          ),
        );
        return false;
      }
    }
    return true;
  }

  async function submit() {
    if (!validateStep(2)) return;
    setSubmitting(true);
    console.log("[demo] nomination submission:", data);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/success?from=nominate");
  }

  function next() {
    if (validateStep(step)) setStep((s) => s + 1);
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <ol className="flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={i} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i < step && "bg-lime",
                i === step && "bg-ice-400",
                i > step && "bg-white/15",
              )}
            />
            <p
              className={cn(
                "mt-2 text-xs uppercase tracking-wider",
                i <= step ? "text-white" : "text-white/40",
              )}
            >
              Step {i + 1} · {s.label}
            </p>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-5">
          <Field label="Property address or cross-streets" id="n-addr" error={errors.propertyAddress}>
            <Input
              id="n-addr"
              value={data.propertyAddress ?? ""}
              onChange={(e) => update("propertyAddress", e.target.value)}
              placeholder="e.g. 1425 E Orange St or 5th & Mill"
              aria-invalid={Boolean(errors.propertyAddress)}
            />
          </Field>
          <Field label="City" id="n-city" error={errors.city}>
            <Input
              id="n-city"
              value={data.city ?? ""}
              onChange={(e) => update("city", e.target.value)}
              aria-invalid={Boolean(errors.city)}
            />
          </Field>
          <Field label="What type of situation is this?" id="n-cat" error={errors.category}>
            <Select
              id="n-cat"
              value={data.category ?? ""}
              onChange={(e) => update("category", e.target.value)}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="">Select…</option>
              <option value="elderly">Elderly homeowner who can't keep up</option>
              <option value="medical">Family mid-medical crisis</option>
              <option value="foreclosure">Foreclosed / bank-owned</option>
              <option value="abandoned">Abandoned / vacant</option>
              <option value="storm">Storm or disaster damage</option>
              <option value="other">Other</option>
            </Select>
          </Field>
          <Field label="Why does this pool need saving?" id="n-story" hint="a paragraph or two" error={errors.story}>
            <Textarea
              id="n-story"
              rows={6}
              value={data.story ?? ""}
              onChange={(e) => update("story", e.target.value)}
              placeholder="The more context the better. Who lives there? How long has it been this way? Why you?"
              aria-invalid={Boolean(errors.story)}
            />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <Field label="Your name" id="n-name" hint="can stay blank">
            <Input
              id="n-name"
              value={data.yourName ?? ""}
              onChange={(e) => update("yourName", e.target.value)}
            />
          </Field>
          <Field label="Your email" id="n-email" hint="optional" error={errors.yourEmail}>
            <Input
              id="n-email"
              type="email"
              value={data.yourEmail ?? ""}
              onChange={(e) => update("yourEmail", e.target.value)}
              placeholder="If you'd like updates"
              aria-invalid={Boolean(errors.yourEmail)}
            />
          </Field>
          <Field label="Your relationship to the property" id="n-rel" error={errors.relationship}>
            <Select
              id="n-rel"
              value={data.relationship ?? ""}
              onChange={(e) => update("relationship", e.target.value)}
              aria-invalid={Boolean(errors.relationship)}
            >
              <option value="">Select…</option>
              <option value="neighbor">Neighbor</option>
              <option value="family">Family member</option>
              <option value="friend">Friend</option>
              <option value="manager">Property / asset manager</option>
              <option value="homeowner">Homeowner myself</option>
            </Select>
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <Field label="Homeowner name" id="n-oname" hint="if known">
            <Input
              id="n-oname"
              value={data.ownerName ?? ""}
              onChange={(e) => update("ownerName", e.target.value)}
            />
          </Field>
          <Field label="Homeowner contact" id="n-ocon" hint="phone or email, if known">
            <Input
              id="n-ocon"
              value={data.ownerContact ?? ""}
              onChange={(e) => update("ownerContact", e.target.value)}
            />
          </Field>
          <label className="flex items-start gap-3 p-4 rounded-md border border-white/15 bg-white/5 cursor-pointer hover:bg-white/10 transition">
            <input
              type="checkbox"
              checked={data.permissionConfirmed ?? false}
              onChange={(e) => update("permissionConfirmed", e.target.checked)}
              className="mt-1 accent-lime"
            />
            <div>
              <p className="font-medium">I understand Troy won't clean the pool without the owner's written permission.</p>
              <p className="text-sm text-white/60 mt-1">
                If you don't have the homeowner's info, that's fine — Troy will try to reach them. For bank-owned or abandoned properties, Troy contacts the asset manager directly.
              </p>
            </div>
          </label>
          {errors.permissionConfirmed && (
            <p className="text-red-400 text-sm">{errors.permissionConfirmed}</p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft size={16} /> Back
        </Button>
        {step < 2 ? (
          <Button type="button" variant="lime" size="lg" onClick={next}>
            Continue <ArrowRight size={16} />
          </Button>
        ) : (
          <Button type="button" variant="lime" size="lg" onClick={submit} disabled={submitting}>
            {submitting ? "Submitting…" : (<>Submit Nomination <Check size={16} /></>)}
          </Button>
        )}
      </div>
    </div>
  );
}
