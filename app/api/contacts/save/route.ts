import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  notes?: string;
  companyId?: string;
  jobId?: string;
  relationship?: string;
};

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = (await req.json()) as Body;

  if (!body.name?.trim()) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }

  const contact = await prisma.contact.create({
    data: {
      userId,
      name: body.name.trim(),
      role: body.role?.trim() || null,
      email: body.email?.trim() || null,
      phone: body.phone?.trim() || null,
      linkedinUrl: body.linkedinUrl?.trim() || null,
      notes: body.notes?.trim() || "",
      source: "manual",
    },
  });

  if (body.companyId || body.jobId) {
    await prisma.contactLink.create({
      data: {
        contactId: contact.id,
        companyId: body.companyId || null,
        jobId: body.jobId || null,
        relationship: body.relationship?.trim() || "",
      },
    });
  }

  return NextResponse.json({ contact });
}
