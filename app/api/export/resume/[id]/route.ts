import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ResumeSchema } from "@/lib/ai/schemas";
import { renderResumeDocx } from "@/lib/export/docx";
import { renderResumePdf } from "@/lib/export/pdf";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const userId = await requireUserId();
  const { id } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const format = (searchParams.get("format") || "docx").toLowerCase();

  const variant = await prisma.resumeVariant.findUnique({
    where: { id },
    include: { job: { include: { company: true } } },
  });
  if (!variant || variant.job.userId !== userId) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const parsed = ResumeSchema.safeParse(JSON.parse(variant.structuredJson));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid resume data" }, { status: 500 });
  }
  const resume = parsed.data;

  const baseName = `${resume.header.name || "resume"} - ${variant.job.company.name} - ${variant.job.title}`.replace(
    /[^a-z0-9 -]/gi,
    ""
  );

  if (format === "pdf") {
    const buf = await renderResumePdf(resume);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${baseName}.pdf"`,
      },
    });
  }

  const docx = await renderResumeDocx(resume);
  return new NextResponse(new Uint8Array(docx), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${baseName}.docx"`,
    },
  });
}
