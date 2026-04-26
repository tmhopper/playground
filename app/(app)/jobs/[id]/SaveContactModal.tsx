"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, X, Loader2, CheckCircle } from "lucide-react";

type Props = {
  jobId: string;
  companyId: string;
  companyName: string;
};

export function SaveContactModal({ jobId, companyId, companyName }: Props) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [relationship, setRelationship] = useState("");

  function reset() {
    setName(""); setRole(""); setEmail(""); setPhone("");
    setLinkedinUrl(""); setNotes(""); setRelationship("");
    setError(""); setSaved(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/contacts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, email, phone, linkedinUrl, notes, jobId, companyId, relationship }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaved(true);
      setTimeout(() => { setOpen(false); reset(); }, 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        <UserPlus className="mr-1 h-3 w-3" /> Save contact
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Save contact</h2>
          <Button variant="ghost" size="sm" onClick={() => { setOpen(false); reset(); }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="mb-4 text-xs text-zinc-500">
          Linked to <strong>{companyName}</strong> and this job.
        </p>

        {saved ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" /> Contact saved!
          </div>
        ) : (
          <form onSubmit={save} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" required />
              </div>
              <div className="space-y-1">
                <Label>Role</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Recruiter" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label>LinkedIn URL</Label>
              <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-1">
              <Label>Relationship to role</Label>
              <Input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Recruiter for role / warm intro" />
            </div>
            <div className="space-y-1">
              <Label>Notes</Label>
              <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => { setOpen(false); reset(); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
                Save contact
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
