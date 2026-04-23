"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function createCompany(formData: FormData) {
  const userId = await requireUserId();
  const name = ((formData.get("name") as string) || "").trim();
  if (!name) return;
  await prisma.company.create({
    data: {
      userId,
      name,
      website: (formData.get("website") as string) || null,
      ats: (formData.get("ats") as string) || "other",
      watchFrequency: (formData.get("watchFrequency") as string) || "none",
      notes: (formData.get("notes") as string) || "",
    },
  });
  revalidatePath("/companies");
  revalidatePath("/watchlist");
}

export async function updateWatchFrequency(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const watchFrequency = formData.get("watchFrequency") as string;
  const company = await prisma.company.findFirst({ where: { id, userId } });
  if (!company) return;
  await prisma.company.update({ where: { id }, data: { watchFrequency } });
  revalidatePath("/companies");
  revalidatePath("/watchlist");
}

export async function markChecked(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const company = await prisma.company.findFirst({ where: { id, userId } });
  if (!company) return;
  await prisma.company.update({ where: { id }, data: { lastCheckedAt: new Date() } });
  revalidatePath("/watchlist");
}

export async function deleteCompany(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const company = await prisma.company.findFirst({ where: { id, userId } });
  if (!company) return;
  await prisma.company.delete({ where: { id } });
  revalidatePath("/companies");
  revalidatePath("/watchlist");
}
