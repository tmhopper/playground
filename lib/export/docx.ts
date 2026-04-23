import { Document, Packer, Paragraph, HeadingLevel, TextRun, AlignmentType } from "docx";
import type { Resume } from "@/lib/ai/schemas";

export async function renderResumeDocx(resume: Resume): Promise<Buffer> {
  const children: Paragraph[] = [];

  const h = resume.header;
  children.push(
    new Paragraph({
      children: [new TextRun({ text: h.name, bold: true, size: 36 })],
      alignment: AlignmentType.CENTER,
    })
  );
  const contactBits = [h.title, h.email, h.phone, h.location].filter(Boolean).join(" · ");
  if (contactBits) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contactBits, size: 20 })],
        alignment: AlignmentType.CENTER,
      })
    );
  }
  if (h.links.length) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: h.links.map((l) => `${l.label}: ${l.url}`).join(" · "), size: 20 })],
        alignment: AlignmentType.CENTER,
      })
    );
  }

  if (resume.summary) {
    children.push(sectionHeading("Summary"));
    children.push(new Paragraph({ children: [new TextRun({ text: resume.summary, size: 22 })] }));
  }

  children.push(sectionHeading("Experience"));
  for (const exp of resume.experience) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: exp.title, bold: true, size: 24 }),
          new TextRun({ text: ` — ${exp.company}`, size: 24 }),
          exp.location ? new TextRun({ text: ` (${exp.location})`, size: 22, italics: true }) : new TextRun(""),
          new TextRun({
            text: ` ${exp.startDate ?? ""}${exp.endDate ? "–" + exp.endDate : ""}`,
            size: 22,
            italics: true,
          }),
        ],
      })
    );
    for (const b of exp.bullets) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: b, size: 22 })],
          bullet: { level: 0 },
        })
      );
    }
  }

  if (resume.education.length) {
    children.push(sectionHeading("Education"));
    for (const ed of resume.education) {
      const line = [ed.degree, ed.field].filter(Boolean).join(", ");
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: ed.school, bold: true, size: 24 }),
            new TextRun({ text: line ? ` — ${line}` : "", size: 22 }),
            new TextRun({
              text: ` ${ed.startDate ?? ""}${ed.endDate ? "–" + ed.endDate : ""}`,
              size: 22,
              italics: true,
            }),
          ],
        })
      );
      for (const d of ed.details) {
        children.push(new Paragraph({ children: [new TextRun({ text: d, size: 22 })], bullet: { level: 0 } }));
      }
    }
  }

  if (resume.skills.length) {
    children.push(sectionHeading("Skills"));
    children.push(new Paragraph({ children: [new TextRun({ text: resume.skills.join(", "), size: 22 })] }));
  }

  if (resume.projects.length) {
    children.push(sectionHeading("Projects"));
    for (const p of resume.projects) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: p.name, bold: true, size: 24 }),
            p.url ? new TextRun({ text: ` — ${p.url}`, size: 22 }) : new TextRun(""),
          ],
        })
      );
      children.push(new Paragraph({ children: [new TextRun({ text: p.description, size: 22 })] }));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}

function sectionHeading(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24 })],
  });
}
