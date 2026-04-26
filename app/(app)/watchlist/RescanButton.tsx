"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";

type Props = {
  companyId: string;
  companyName: string;
  careersUrls: string; // JSON string
};

type FetchedJob = {
  title: string;
  url?: string;
  location?: string;
  workMode?: string;
};

export function RescanButton({ companyId, companyName, careersUrls }: Props) {
  const [loading, setLoading] = useState(false);
  const [newJobs, setNewJobs] = useState<FetchedJob[] | null>(null);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState<number | null>(null);

  async function rescan() {
    setLoading(true);
    setError("");
    setNewJobs(null);
    try {
      const urls = JSON.parse(careersUrls) as { label: string; url: string }[];
      if (!urls.length) { setError("No careers URL configured."); return; }

      const res = await fetch("/api/fetch/careers-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urls[0].url, companyName, companyId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");

      const fresh: FetchedJob[] = (data.jobs ?? []).filter((j: FetchedJob) =>
        (data.freshUrls ?? []).includes(j.url)
      );
      setNewJobs(fresh);
      setTotalCount((data.jobs ?? []).length);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button size="sm" variant="outline" disabled={loading} onClick={rescan}>
        {loading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-1 h-3 w-3" />}
        Rescan
      </Button>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {newJobs !== null && !error && (
        <div className="text-xs">
          {newJobs.length === 0 ? (
            <span className="text-zinc-500">No new listings (total: {totalCount})</span>
          ) : (
            <div className="space-y-1">
              <span className="font-medium text-green-700">{newJobs.length} new listing{newJobs.length !== 1 ? "s" : ""}:</span>
              {newJobs.slice(0, 5).map((j, i) => (
                <div key={i} className="flex items-center gap-1">
                  {j.workMode && <Badge variant="secondary" className="text-xs">{j.workMode}</Badge>}
                  {j.url ? (
                    <a href={j.url} target="_blank" rel="noopener" className="text-blue-600 hover:underline">
                      {j.title}
                    </a>
                  ) : (
                    <span>{j.title}</span>
                  )}
                </div>
              ))}
              {newJobs.length > 5 && <span className="text-zinc-500">+{newJobs.length - 5} more</span>}
              <div className="pt-1">
                <Link href="/discover" className="text-blue-600 hover:underline">
                  Open in Discover →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
