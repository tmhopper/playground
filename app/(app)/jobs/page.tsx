import Link from "next/link";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { JobsView } from "./JobsView";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const userId = await requireUserId();
  const jobs = await prisma.job.findMany({
    where: { userId },
    include: { company: true, matchScore: true },
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <p className="text-sm text-zinc-500">{jobs.length} tracked</p>
        </div>
        <Link href="/jobs/new">
          <Button>
            <Plus className="mr-1 h-4 w-4" />
            Add job
          </Button>
        </Link>
      </div>
      <JobsView jobs={jobs} />
    </div>
  );
}
