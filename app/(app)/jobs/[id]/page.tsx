import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STAGES, STAGE_LABEL, type Stage } from "@/lib/stages";
import { formatDate, safeJsonParse } from "@/lib/utils";
import { contactSearchLinks } from "@/lib/contacts/searchUrls";
import { StageSelector } from "./StageSelector";
import { CoverLetterPanel } from "./CoverLetterPanel";
import { ResumePanel } from "./ResumePanel";
import { ScoreButton } from "./ScoreButton";
import { MatchCard } from "@/components/MatchCard";
import type { MatchScore } from "@/lib/ai/schemas";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function JobDetail({ params }: { params: Promise<{ id: string }> }) {
  const userId = await requireUserId();
  const { id } = await params;

  const job = await prisma.job.findFirst({
    where: { id, userId },
    include: {
      company: true,
      matchScore: true,
      coverLetters: { orderBy: { createdAt: "desc" } },
      resumeVariants: { orderBy: { createdAt: "desc" } },
      contactLinks: { include: { contact: true } },
    },
  });
  if (!job) return notFound();

  const score: MatchScore | null = job.matchScore
    ? {
        overall: job.matchScore.overall,
        skills: job.matchScore.skills,
        experience: job.matchScore.experience,
        domain: job.matchScore.domain,
        culture: job.matchScore.culture,
        logistics: job.matchScore.logistics,
        reasoning: safeJsonParse(job.matchScore.reasoning, {
          skills: "",
          experience: "",
          domain: "",
          culture: "",
          logistics: "",
        }),
        strengths: safeJsonParse<string[]>(job.matchScore.strengths, []),
        gaps: safeJsonParse<string[]>(job.matchScore.gaps, []),
        summary: "",
      }
    : null;

  const searchLinks = contactSearchLinks({
    company: job.company.name,
    role: job.title,
    location: job.location ?? undefined,
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm text-zinc-500">
            <Link href="/jobs" className="hover:underline">Jobs</Link> ·{" "}
            <Link href={`/companies`} className="hover:underline">
              {job.company.name}
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{job.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {job.location && <span>{job.location}</span>}
            {job.workMode && <Badge variant="secondary">{job.workMode}</Badge>}
            {job.url && (
              <a href={job.url} target="_blank" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                Listing <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
        <StageSelector jobId={job.id} stage={job.stage as Stage} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Job description</CardTitle></CardHeader>
            <CardContent>
              {job.description ? (
                <pre className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">{job.description}</pre>
              ) : (
                <p className="text-sm text-zinc-500">No description saved.</p>
              )}
            </CardContent>
          </Card>

          <CoverLetterPanel jobId={job.id} existing={job.coverLetters} />
          <ResumePanel jobId={job.id} variants={job.resumeVariants} />
        </div>

        <div className="space-y-5">
          {score ? <MatchCard score={score} /> : <NoScoreCard jobId={job.id} />}

          <Card>
            <CardHeader><CardTitle>Tracking</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Stage" value={STAGE_LABEL[job.stage as Stage]} />
              <Row label="Applied" value={formatDate(job.appliedAt)} />
              <Row label="Follow-up" value={formatDate(job.followupAt)} />
              <Row label="Interview" value={formatDate(job.interviewAt)} />
              <Row label="Next action" value={job.nextAction || "—"} />
              <Row label="Due" value={formatDate(job.nextActionDueAt)} />
              <Row label="Reference" value={job.reference || "—"} />
              <Row label="Req #" value={job.reqNumber || "—"} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Find contacts</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              {searchLinks.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener" className="block text-blue-600 hover:underline">
                  {l.label} ↗
                </a>
              ))}
              <div className="pt-2 text-xs text-zinc-500">
                {job.contactLinks.length} contact{job.contactLinks.length === 1 ? "" : "s"} linked to this job.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex justify-between gap-2 text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className="text-right">{value || "—"}</span>
    </div>
  );
}

function NoScoreCard({ jobId }: { jobId: string }) {
  return (
    <Card>
      <CardHeader><CardTitle>Match</CardTitle></CardHeader>
      <CardContent>
        <p className="mb-3 text-sm text-zinc-500">No score yet for this job.</p>
        <ScoreButton jobId={jobId} />
      </CardContent>
    </Card>
  );
}

export const revalidate = 0;
