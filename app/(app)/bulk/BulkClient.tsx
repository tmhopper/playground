"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, CheckCircle, ExternalLink } from "lucide-react";

type ParsedJob = {
  title: string;
  company: string;
  location?: string;
  workMode?: string;
  url?: string;
  description?: string;
};

type JobRow = ParsedJob & { saved?: boolean; jobId?: string };

export function BulkClient() {
  const [text, setText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  async function parse() {
    if (!text.trim()) { setError("Paste some job listings first."); return; }
    setError("");
    setParsing(true);
    setJobs([]);
    setSelected(new Set());
    try {
      const res = await fetch("/api/ai/bulk-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Parse failed");
      setJobs((data.jobs ?? []).map((j: ParsedJob) => ({ ...j })));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setParsing(false);
    }
  }

  async function saveSelected() {
    const toSave = Array.from(selected).filter((i) => !jobs[i]?.saved);
    if (!toSave.length) return;
    setSaving(true);
    try {
      const res = await fetch("/api/jobs/bulk-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: toSave.map((i) => ({ ...jobs[i], source: "bulk" })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const savedIds: string[] = data.saved ?? [];
      setJobs((prev) =>
        prev.map((row, i) => {
          const pos = toSave.indexOf(i);
          return pos !== -1 ? { ...row, saved: true, jobId: savedIds[pos] } : row;
        })
      );
      setSelected(new Set());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function toggleSelect(idx: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  function selectAll() {
    setSelected(new Set(jobs.map((_, i) => i)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bulk Import</h1>
        <p className="text-sm text-zinc-500">
          Paste any messy text — a careers page dump, LinkedIn feed, email — and Claude extracts every job.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Paste jobs</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            rows={12}
            placeholder="Paste job listings here — titles, descriptions, URLs, anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Button onClick={parse} disabled={parsing}>
              {parsing
                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Parsing with Claude…</>
                : "Parse jobs"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {jobs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">{jobs.length} jobs found</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select all
              </Button>
              <Button
                size="sm"
                disabled={selected.size === 0 || saving}
                onClick={saveSelected}
              >
                {saving ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Plus className="mr-1 h-3 w-3" />}
                Save selected ({selected.size})
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-xs uppercase text-zinc-500 dark:bg-zinc-900">
                <tr>
                  <th className="w-8 p-2">
                    <input
                      type="checkbox"
                      checked={selected.size === jobs.filter((j) => !j.saved).length && jobs.some((j) => !j.saved)}
                      onChange={() => {
                        const unsaved = jobs.map((j, i) => !j.saved ? i : -1).filter((i) => i !== -1);
                        selected.size === unsaved.length ? setSelected(new Set()) : setSelected(new Set(unsaved));
                      }}
                    />
                  </th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Company</th>
                  <th className="p-2 text-left">Location</th>
                  <th className="p-2 text-left">Mode</th>
                  <th className="p-2" />
                </tr>
              </thead>
              <tbody>
                {jobs.map((j, i) => (
                  <tr key={i} className="border-t border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selected.has(i)}
                        disabled={j.saved}
                        onChange={() => toggleSelect(i)}
                      />
                    </td>
                    <td className="p-2 font-medium">{j.title}</td>
                    <td className="p-2 text-zinc-600">{j.company || "—"}</td>
                    <td className="p-2 text-zinc-600">{j.location || "—"}</td>
                    <td className="p-2">
                      {j.workMode && <Badge variant="secondary">{j.workMode}</Badge>}
                    </td>
                    <td className="p-2">
                      <div className="flex items-center justify-end gap-2">
                        {j.url && (
                          <a href={j.url} target="_blank" rel="noopener">
                            <Button size="sm" variant="ghost">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </a>
                        )}
                        {j.saved ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <CheckCircle className="h-3 w-3" /> Saved
                          </span>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
