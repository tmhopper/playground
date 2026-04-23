import Link from "next/link";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { STAGE_LABEL, type Stage } from "@/lib/stages";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const userId = await requireUserId();

  const [withNextAction, recentJobs, staleWatch, recentScores] = await Promise.all([
    prisma.job.findMany({
      where: { userId, nextAction: { not: "" } },
      include: { company: true },
      orderBy: [{ nextActionDueAt: "asc" }, { updatedAt: "desc" }],
      take: 10,
    }),
    prisma.job.findMany({
      where: { userId },
      include: { company: true, matchScore: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.company.findMany({
      where: { userId, watchFrequency: { in: ["daily", "fast", "alert"] } },
      orderBy: { lastCheckedAt: "asc" },
      take: 10,
    }),
    prisma.job.findMany({
      where: { userId, matchScore: { isNot: null } },
      include: { company: true, matchScore: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const profile = await prisma.profile.findUnique({ where: { userId } });
  const profileIncomplete =
    !profile?.background || !profile?.resumeText || profile.resumeText.length < 200;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Today</h1>
        <p className="text-sm text-zinc-500">Your queue at a glance.</p>
      </div>

      {profileIncomplete && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-sm">Your profile is incomplete.</strong>
                <p className="text-sm text-zinc-500">
                  AI features work much better with a résumé uploaded and background filled in.
                </p>
              </div>
              <Link href="/profile" className="text-sm font-medium text-blue-600 hover:underline">
                Go to profile →
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Next actions</CardTitle></CardHeader>
          <CardContent>
            {withNextAction.length ? (
              <ul className="space-y-2">
                {withNextAction.map((j) => (
                  <li key={j.id} className="flex items-start justify-between gap-2 text-sm">
                    <Link href={`/jobs/${j.id}`} className="flex-1 hover:underline">
                      <div className="font-medium">{j.nextAction}</div>
                      <div className="text-xs text-zinc-500">
                        {j.company.name} · {j.title}
                      </div>
                    </Link>
                    <div className="text-xs text-zinc-500">{formatDate(j.nextActionDueAt)}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">No open next-actions.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Watchlist due</CardTitle></CardHeader>
          <CardContent>
            {staleWatch.length ? (
              <ul className="space-y-2">
                {staleWatch.map((c) => (
                  <li key={c.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-zinc-500">
                        {c.watchFrequency} · last {c.lastCheckedAt ? c.lastCheckedAt.toLocaleDateString() : "never"}
                      </div>
                    </div>
                    <Badge variant="secondary">{c.ats}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">Watchlist is empty. <Link href="/companies" className="text-blue-600 hover:underline">Add companies →</Link></p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Recent activity</CardTitle></CardHeader>
          <CardContent>
            {recentJobs.length ? (
              <ul className="space-y-2">
                {recentJobs.map((j) => (
                  <li key={j.id} className="flex items-center justify-between text-sm">
                    <Link href={`/jobs/${j.id}`} className="flex-1 hover:underline">
                      <div className="font-medium">{j.title}</div>
                      <div className="text-xs text-zinc-500">{j.company.name}</div>
                    </Link>
                    <Badge variant="secondary">{STAGE_LABEL[j.stage as Stage]}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">No jobs yet. <Link href="/match" className="text-blue-600 hover:underline">Score your first →</Link></p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Top matches</CardTitle></CardHeader>
          <CardContent>
            {recentScores.length ? (
              <ul className="space-y-2">
                {recentScores
                  .sort((a, b) => (b.matchScore?.overall ?? 0) - (a.matchScore?.overall ?? 0))
                  .map((j) => (
                    <li key={j.id} className="flex items-center justify-between text-sm">
                      <Link href={`/jobs/${j.id}`} className="flex-1 hover:underline">
                        <div className="font-medium">{j.title}</div>
                        <div className="text-xs text-zinc-500">{j.company.name}</div>
                      </Link>
                      <Badge
                        variant={
                          (j.matchScore?.overall ?? 0) >= 70
                            ? "success"
                            : (j.matchScore?.overall ?? 0) >= 50
                            ? "warn"
                            : "secondary"
                        }
                      >
                        {j.matchScore?.overall}
                      </Badge>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">No scored jobs yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
