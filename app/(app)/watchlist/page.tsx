import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle } from "lucide-react";
import { markChecked } from "../companies/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

const CADENCES = [
  { key: "daily", label: "Daily", hint: "Check every day" },
  { key: "fast", label: "Fast", hint: "Check every 2–3 days" },
  { key: "alert", label: "Alert", hint: "Watch for any new posting" },
];

export default async function WatchlistPage() {
  const userId = await requireUserId();
  const watched = await prisma.company.findMany({
    where: { userId, watchFrequency: { in: ["daily", "fast", "alert"] } },
    orderBy: [{ watchFrequency: "asc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Watchlist</h1>
        <p className="text-sm text-zinc-500">
          Companies you want to check regularly for new postings. (Phase 2 will auto-scan these.)
        </p>
      </div>

      {CADENCES.map((cad) => {
        const rows = watched.filter((c) => c.watchFrequency === cad.key);
        if (!rows.length) return null;
        return (
          <Card key={cad.key}>
            <CardHeader>
              <CardTitle>
                {cad.label} <span className="text-sm font-normal text-zinc-500">· {cad.hint}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {rows.map((c) => {
                  const last = c.lastCheckedAt ? c.lastCheckedAt.toLocaleDateString() : null;
                  const stale =
                    !c.lastCheckedAt ||
                    Date.now() - c.lastCheckedAt.getTime() > (cad.key === "daily" ? 1 : cad.key === "fast" ? 3 : 7) * 86400_000;
                  return (
                    <div
                      key={c.id}
                      className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-zinc-500">
                            Last checked: {last ?? "never"}{" "}
                            {stale && <Badge variant="warn" className="ml-1">due</Badge>}
                          </div>
                        </div>
                        <Badge variant="secondary">{c.ats}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {c.website && (
                          <a href={c.website} target="_blank" rel="noopener">
                            <Button size="sm" variant="outline">
                              <ExternalLink className="mr-1 h-3 w-3" /> Site
                            </Button>
                          </a>
                        )}
                        <form action={markChecked}>
                          <input type="hidden" name="id" value={c.id} />
                          <Button type="submit" size="sm" variant="outline">
                            <CheckCircle className="mr-1 h-3 w-3" /> Mark checked
                          </Button>
                        </form>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {!watched.length && (
        <Card>
          <CardContent className="p-8 text-center text-sm text-zinc-500">
            No companies on your watchlist.{" "}
            <Link href="/companies" className="text-blue-600 hover:underline">
              Add some →
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
