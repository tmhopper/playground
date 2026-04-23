"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { extractPdfText } from "@/lib/parse/pdf";
import { extractDocxText } from "@/lib/parse/docx";
import { generateVoiceRules } from "@/lib/ai/voice-rules";

export async function saveProfile(formData: FormData) {
  const userId = await requireUserId();

  const portfolioRaw = (formData.get("portfolioLinks") as string) || "";
  const portfolio = portfolioRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|").map((s) => s.trim());
      return { label, url: rest.join("|") || label };
    });

  await prisma.profile.update({
    where: { userId },
    data: {
      background: (formData.get("background") as string) || "",
      skills: (formData.get("skills") as string) || "",
      goals: (formData.get("goals") as string) || "",
      salaryMin: parseIntOrNull(formData.get("salaryMin")),
      salaryMax: parseIntOrNull(formData.get("salaryMax")),
      currency: (formData.get("currency") as string) || "USD",
      locations: (formData.get("locations") as string) || "",
      workModes: (formData.get("workModes") as string) || "",
      portfolioLinks: JSON.stringify(portfolio),
    },
  });

  const file = formData.get("resume") as File | null;
  if (file && file.size > 0) {
    const buf = Buffer.from(await file.arrayBuffer());
    let text = "";
    try {
      if (file.type.includes("pdf") || file.name.toLowerCase().endsWith(".pdf")) {
        text = await extractPdfText(buf);
      } else if (file.name.toLowerCase().endsWith(".docx")) {
        text = await extractDocxText(buf);
      } else if (file.type.includes("text") || file.name.toLowerCase().endsWith(".txt")) {
        text = buf.toString("utf8");
      } else {
        text = buf.toString("utf8");
      }
    } catch (e) {
      console.error("resume parse failed", e);
    }
    if (text.trim()) {
      await prisma.profile.update({
        where: { userId },
        data: { resumeFileName: file.name, resumeText: text.trim() },
      });
    }
  }

  revalidatePath("/profile");
}

function parseIntOrNull(v: FormDataEntryValue | null): number | null {
  if (typeof v !== "string" || !v.trim()) return null;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
}

export async function saveWritingSample(formData: FormData) {
  const userId = await requireUserId();
  const id = (formData.get("id") as string) || null;
  const title = (formData.get("title") as string) || "Untitled";
  const content = (formData.get("content") as string) || "";
  const source = (formData.get("source") as string) || "";
  const isVoicePinned = formData.get("isVoicePinned") === "on";

  if (id) {
    await prisma.writingSample.update({
      where: { id },
      data: { title, content, source, isVoicePinned },
    });
  } else {
    await prisma.writingSample.create({
      data: { userId, title, content, source, isVoicePinned },
    });
  }
  revalidatePath("/profile");
}

export async function deleteWritingSample(formData: FormData) {
  await requireUserId();
  const id = formData.get("id") as string;
  if (!id) return;
  await prisma.writingSample.delete({ where: { id } });
  revalidatePath("/profile");
}

export async function toggleVoicePin(formData: FormData) {
  await requireUserId();
  const id = formData.get("id") as string;
  const sample = await prisma.writingSample.findUnique({ where: { id } });
  if (!sample) return;
  await prisma.writingSample.update({
    where: { id },
    data: { isVoicePinned: !sample.isVoicePinned },
  });
  revalidatePath("/profile");
}

export async function regenerateVoiceRules() {
  const userId = await requireUserId();
  await generateVoiceRules(userId);
  revalidatePath("/profile");
}
