"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, Plus, CheckCircle } from "lucide-react";
import type { FetchedJob } from "@/lib/fetchers/types";

type JobRow = FetchedJob & { saved?: boolean; jobId?: string };

export function DiscoverClient() {
  const [url, setUrl] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [source, setSource] = useState("");
  const [savingIdx, setSavingIdx] = useState<number | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  async function discover() {
    if (!url.trim() && !company.trim()) {
      setError("Enter a careers page URL or company name.");
      return;
    }
    setError("");
    setLoading(true);
    setJobs([]);
    setSelected(new Set());

    try {
      const careersUrl = url.trim() || `https://${company.trim().toLowerCase().replace(/\s+/g, "")}.com/careers`;
      const companyName = company.trim() || new URL(careersUrl).hostname.replace(/^www\./, "");

      const res = await fetch("/api/fetch/careers-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: careersUrl, companyName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");

      setJobs((data.jobs ?? []).map((j: FetchedJob) => ({ ...j })));
      setSource(data.source ?? "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function saveJob(idx: number) {
    const j = jobs[idx];
    setSavingIdx(idx);
    try {
      const res = await fetch("/api/jobs/bulk-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: [{ ...j, source: "greenhouse" }] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setJobs((prev) => prev.map((row, i) => (i === idx ? { ...row, saved: true, jobId: data.saved?.[0] } : row)));
    } finally {
      setSavingIdx(null);
    }
  }

  async function saveSelected() {
    const toSave = Array.from(selected).filter((i) => !jobs[i].saved);
    if (!toSave.length) return;
    setSavingAll(true);
    try {
      const res = await fetch("/api/jobs/bulk-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobs: toSave.map((i) => ({ ...jobs[i] })) }),
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
    } finally {
      setSavingAll(false);
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
        <h1 className="text-2xl font-semibold">Discover Jobs</h1>
        <p className="text-sm text-zinc-500">
          Paste a careers page URL and pull every open listing automatically.
        </p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-1">
              <Label>Careers page URL</Label>
              <Input
                placeholder="https://boards.greenhouse.io/stripe"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && discover()}
              />
            </div>
            <div className="space-y-1">
              <Label>Company name</Label>
              <Input
                placeholder="Stripe"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && discover()}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button onClick={discover} disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching…</> : "Fetch jobs"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {jobs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              {jobs.length} jobs via <span className="font-medium">{source}</span>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select all
              </Button>
              <Button
                size="sm"
                disabled={selected.size === 0 || savingAll}
                onClick={saveSelected}
              >
                {savingAll ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Plus className="mr-1 h-3 w-3" />}
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
                      checked={selected.size === jobs.length}
                      onChange={() => selected.size === jobs.length ? setSelected(new Set()) : selectAll()}
                    />
                  </th>
                  <th className="p-2 text-left">Title</th>
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
                        onChange={() => toggleSelect(i)}
                        disabled={j.saved}
                      />
                    </td>
                    <td className="p-2">
                      <div className="font-medium">{j.title}</div>
                      {j.company && j.company !== company && (
                        <div className="text-xs text-zinc-500">{j.company}</div>
                      )}
                    </td>
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
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={savingIdx === i}
                            onClick={() => saveJob(i)}
                          >
                            {savingIdx === i ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Plus className="mr-1 h-3 w-3" />
                            )}
                            Save
                          </Button>
                        )}
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
