"use client";

import { useState } from "react";
import type { ResumeVariant } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, safeJsonParse } from "@/lib/utils";
import { Sparkles, Download } from "lucide-react";

type DiffEntry = { section: string; before: string; after: string; reason: string };

export function ResumePanel({ jobId, variants }: { jobId: string; variants: ResumeVariant[] }) {
  const latest = variants[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(latest?.id ?? "");

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Request failed");
      const data = await res.json();
      setActiveId(data.variantId);
      // Refresh to pull latest from server
      window.location.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const active = variants.find((v) => v.id === activeId) ?? latest;
  const diff = active ? safeJsonParse<DiffEntry[]>(active.diffFromBase, []) : [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Tailored résumé</CardTitle>
          <Button size="sm" onClick={generate} disabled={loading}>
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {loading ? "Tailoring..." : variants.length ? "Regenerate" : "Generate"}
          </Button>
        </div>
        {variants.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>{variants.length} version{variants.length === 1 ? "" : "s"}</span>
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                className={
                  "rounded-full px-2 py-0.5 " +
                  (v.id === (active?.id ?? "")
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-200 dark:bg-zinc-800")
                }
              >
                v{v.version} · {formatDate(v.createdAt)}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!active && <p className="text-sm text-zinc-500">No tailored résumé yet.</p>}
        {active && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <a href={`/api/export/resume/${active.id}?format=docx`} className="inline-block">
                <Button size="sm" variant="outline"><Download className="mr-1 h-3.5 w-3.5" /> DOCX</Button>
              </a>
              <a href={`/api/export/resume/${active.id}?format=pdf`} className="inline-block">
                <Button size="sm" variant="outline"><Download className="mr-1 h-3.5 w-3.5" /> PDF</Button>
              </a>
            </div>
            {diff.length ? (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-zinc-500">Changes vs. base ({diff.length})</h4>
                {diff.map((d, i) => (
                  <div key={i} className="rounded-md border border-zinc-200 bg-zinc-50 p-2 text-xs dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="mb-1 flex items-center justify-between">
                      <code className="text-zinc-500">{d.section}</code>
                      <Badge variant="secondary">{d.reason}</Badge>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <div className="mb-1 text-[10px] uppercase text-zinc-400">Before</div>
                        <div className="whitespace-pre-wrap text-zinc-600 line-through decoration-red-400/40">{d.before}</div>
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] uppercase text-emerald-600">After</div>
                        <div className="whitespace-pre-wrap">{d.after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500">No material changes from base résumé.</p>
            )}
          </div>
        )}
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
}
