"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/MatchCard";
import type { MatchScore } from "@/lib/ai/schemas";

export function MatchScorer() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState<MatchScore | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, start] = useTransition();
  const router = useRouter();

  async function run() {
    setLoading(true);
    setError(null);
    setScore(null);
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, jobDescription: description }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(body.error || "Request failed");
      }
      const data = await res.json();
      setScore(data.score as MatchScore);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  async function saveAsJob() {
    if (!score) return;
    start(async () => {
      const res = await fetch("/api/jobs/from-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle || "Untitled role",
          company: company || "Unknown company",
          description,
          score,
        }),
      });
      if (res.ok) {
        const { jobId } = await res.json();
        router.push(`/jobs/${jobId}`);
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Job description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Senior Producer" />
            </div>
            <div className="space-y-1">
              <Label>Company</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              rows={14}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the full JD here."
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={run} disabled={loading || !description.trim()}>
              {loading ? "Scoring..." : "Score match"}
            </Button>
            {score && (
              <Button variant="outline" onClick={saveAsJob} disabled={saving}>
                {saving ? "Saving..." : "Save as job"}
              </Button>
            )}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </CardContent>
      </Card>

      <div>
        {score ? (
          <MatchCard score={score} />
        ) : (
          <Card className="h-full">
            <CardContent className="flex h-full items-center justify-center p-10 text-sm text-zinc-500">
              Match result will appear here.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
