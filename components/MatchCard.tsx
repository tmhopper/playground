"use client";

import type { MatchScore } from "@/lib/ai/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DIMS: Array<[keyof MatchScore["reasoning"], string]> = [
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["domain", "Domain"],
  ["culture", "Culture"],
  ["logistics", "Logistics"],
];

function scoreColor(n: number) {
  if (n >= 80) return "bg-emerald-500";
  if (n >= 65) return "bg-lime-500";
  if (n >= 50) return "bg-amber-500";
  if (n >= 35) return "bg-orange-500";
  return "bg-red-500";
}

function scoreBadgeVariant(n: number): "success" | "warn" | "danger" {
  if (n >= 70) return "success";
  if (n >= 50) return "warn";
  return "danger";
}

export function MatchCard({ score }: { score: MatchScore }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Match</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={scoreBadgeVariant(score.overall)} className="text-lg">
              {score.overall}
            </Badge>
            <span className="text-sm text-zinc-500">/ 100 overall</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{score.summary}</p>

        <div className="space-y-2">
          {DIMS.map(([key, label]) => {
            const value = score[key as keyof MatchScore] as number;
            const reasoning = score.reasoning[key];
            return (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{label}</span>
                  <span className="tabular-nums">{value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className={cn("h-full transition-all", scoreColor(value))}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-500">{reasoning}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">Strengths</h4>
            <ul className="space-y-1 text-sm">
              {score.strengths.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-600">Gaps</h4>
            {score.gaps.length ? (
              <ul className="space-y-1 text-sm">
                {score.gaps.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">None flagged.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
