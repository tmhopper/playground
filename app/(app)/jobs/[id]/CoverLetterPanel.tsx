"use client";

import { useState } from "react";
import type { CoverLetter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function CoverLetterPanel({
  jobId,
  existing,
}: {
  jobId: string;
  existing: CoverLetter[];
}) {
  const latest = existing[0];
  const [text, setText] = useState(latest?.text ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setText("");
    try {
      const res = await fetch("/api/ai/cover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        setText(buffer);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(text);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cover letter</CardTitle>
          <div className="flex gap-2">
            {text && (
              <Button size="sm" variant="outline" onClick={copy}>Copy</Button>
            )}
            <Button size="sm" onClick={generate} disabled={loading}>
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              {loading ? "Writing..." : latest ? "Regenerate" : "Generate"}
            </Button>
          </div>
        </div>
        {latest && !loading && (
          <p className="text-xs text-zinc-500">
            {existing.length} version{existing.length === 1 ? "" : "s"} · last {formatDate(latest.createdAt)}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {text || loading ? (
          <Textarea rows={16} value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <p className="text-sm text-zinc-500">No cover letter yet.</p>
        )}
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
}
