"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { Stage } from "@/lib/stages";

export async function createJob(formData: FormData) {
  const userId = await requireUserId();
  const companyName = (formData.get("company") as string).trim();
  const title = (formData.get("title") as string).trim();
  if (!companyName || !title) return;

  const existing = await prisma.company.findFirst({ where: { userId, name: companyName } });
  const company = existing ?? (await prisma.company.create({ data: { userId, name: companyName } }));

  const job = await prisma.job.create({
    data: {
      userId,
      companyId: company.id,
      title,
      location: (formData.get("location") as string) || null,
      workMode: (formData.get("workMode") as string) || null,
      url: (formData.get("url") as string) || null,
      description: (formData.get("description") as string) || "",
      stage: (formData.get("stage") as Stage) || "Saved",
      nextAction: (formData.get("nextAction") as string) || "",
      notes: (formData.get("notes") as string) || "",
      source: "manual",
    },
  });
  revalidatePath("/jobs");
  return job.id;
}

export async function updateJobStage(jobId: string, stage: Stage) {
  const userId = await requireUserId();
  const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
  if (!job) return;

  const data: Parameters<typeof prisma.job.update>[0]["data"] = { stage };
  const now = new Date();
  if (stage === "Applied" && !job.appliedAt) data.appliedAt = now;
  if (stage === "FollowingUp" && !job.followupAt) data.followupAt = now;
  if (stage === "Interview" && !job.interviewAt) data.interviewAt = now;
  if (stage === "Forget" && !job.forgetAt) data.forgetAt = now;

  await prisma.job.update({ where: { id: jobId }, data });
  await prisma.trackerEvent.create({
    data: { jobId, kind: "stageChange", payload: JSON.stringify({ from: job.stage, to: stage }) },
  });
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
}

export async function updateJobField(jobId: string, field: string, value: string) {
  const userId = await requireUserId();
  const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
  if (!job) return;
  const allowed = [
    "title",
    "location",
    "workMode",
    "url",
    "description",
    "nextAction",
    "reference",
    "notes",
    "reqNumber",
  ];
  if (!allowed.includes(field)) return;
  await prisma.job.update({ where: { id: jobId }, data: { [field]: value } });
  revalidatePath(`/jobs/${jobId}`);
}

export async function deleteJob(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const job = await prisma.job.findFirst({ where: { id, userId } });
  if (!job) return;
  await prisma.job.delete({ where: { id } });
  revalidatePath("/jobs");
}
