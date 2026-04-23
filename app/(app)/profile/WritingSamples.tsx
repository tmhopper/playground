"use client";

import { useState, useTransition } from "react";
import type { WritingSample } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Pin, PinOff, Trash2, Plus, RefreshCw } from "lucide-react";
import {
  deleteWritingSample,
  regenerateVoiceRules,
  saveWritingSample,
  toggleVoicePin,
} from "./actions";

export function WritingSamples({
  samples,
  voiceRules,
}: {
  samples: WritingSample[];
  voiceRules: string;
}) {
  const [adding, setAdding] = useState(false);
  const [pending, start] = useTransition();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">Voice rules</h3>
          <p className="text-xs text-zinc-500">Auto-generated from pinned samples. Re-run after you change pins.</p>
        </div>
        <form
          action={() =>
            start(async () => {
              await regenerateVoiceRules();
            })
          }
        >
          <Button type="submit" variant="outline" size="sm" disabled={pending}>
            <RefreshCw className="mr-1 h-3.5 w-3.5" />
            {pending ? "Generating..." : "Regenerate"}
          </Button>
        </form>
      </div>
      <pre className="whitespace-pre-wrap rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950">
        {voiceRules || "(No rules yet — pin 2–3 samples then click Regenerate.)"}
      </pre>

      <div className="flex items-center justify-between pt-4">
        <h3 className="text-sm font-semibold">Samples ({samples.length})</h3>
        <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
          <Plus className="mr-1 h-3.5 w-3.5" /> Add sample
        </Button>
      </div>

      {adding && <SampleEditor onDone={() => setAdding(false)} />}

      <div className="space-y-2">
        {samples.map((s) => (
          <SampleRow key={s.id} sample={s} />
        ))}
        {samples.length === 0 && !adding && (
          <p className="text-sm text-zinc-500">No samples yet. Add a blog post, email, or anything that sounds like you.</p>
        )}
      </div>
    </div>
  );
}

function SampleRow({ sample }: { sample: WritingSample }) {
  const [editing, setEditing] = useState(false);
  if (editing) return <SampleEditor sample={sample} onDone={() => setEditing(false)} />;

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <strong className="text-sm">{sample.title}</strong>
          {sample.source && <Badge variant="secondary">{sample.source}</Badge>}
          {sample.isVoicePinned && <Badge variant="success">pinned</Badge>}
        </div>
        <div className="flex gap-1">
          <form action={toggleVoicePin}>
            <input type="hidden" name="id" value={sample.id} />
            <Button type="submit" size="icon" variant="ghost" title={sample.isVoicePinned ? "Unpin" : "Pin"}>
              {sample.isVoicePinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </Button>
          </form>
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
          <form action={deleteWritingSample}>
            <input type="hidden" name="id" value={sample.id} />
            <Button type="submit" size="icon" variant="ghost" title="Delete">
              <Trash2 className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-zinc-500">{sample.content.slice(0, 280)}</p>
    </div>
  );
}

function SampleEditor({
  sample,
  onDone,
}: {
  sample?: WritingSample;
  onDone: () => void;
}) {
  const [pending, start] = useTransition();
  return (
    <form
      action={(fd) =>
        start(async () => {
          await saveWritingSample(fd);
          onDone();
        })
      }
      className="space-y-3 rounded-md border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950"
    >
      {sample && <input type="hidden" name="id" value={sample.id} />}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" defaultValue={sample?.title} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="source">Source (optional)</Label>
          <Input id="source" name="source" defaultValue={sample?.source} placeholder="Blog, email to X, essay draft..." />
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" rows={8} defaultValue={sample?.content} required />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isVoicePinned"
            defaultChecked={sample?.isVoicePinned ?? false}
            className="h-4 w-4"
          />
          Pin for voice
        </label>
        <div className="ml-auto flex gap-2">
          <Button type="button" variant="outline" onClick={onDone}>Cancel</Button>
          <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save sample"}</Button>
        </div>
      </div>
    </form>
  );
}
