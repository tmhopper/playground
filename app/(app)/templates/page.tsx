import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPES = ["coverLetter", "coldEmail", "linkedinDM", "followup"];

async function createTemplate(formData: FormData) {
  "use server";
  const { requireUserId } = await import("@/lib/auth");
  const userId = await requireUserId();
  await prisma.template.create({
    data: {
      userId,
      name: (formData.get("name") as string) || "Untitled",
      type: (formData.get("type") as string) || "coverLetter",
      subject: (formData.get("subject") as string) || "",
      body: (formData.get("body") as string) || "",
    },
  });
  revalidatePath("/templates");
}

async function deleteTemplate(formData: FormData) {
  "use server";
  const { requireUserId } = await import("@/lib/auth");
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const t = await prisma.template.findFirst({ where: { id, userId } });
  if (!t) return;
  await prisma.template.delete({ where: { id } });
  revalidatePath("/templates");
}

export default async function TemplatesPage() {
  const userId = await requireUserId();
  const templates = await prisma.template.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Templates</h1>
        <p className="text-sm text-zinc-500">Reusable cover letters, cold emails, follow-ups.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>New template</CardTitle></CardHeader>
        <CardContent>
          <form action={createTemplate} className="space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1"><Label>Name</Label><Input name="name" required /></div>
              <div className="space-y-1">
                <Label>Type</Label>
                <select name="type" className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1"><Label>Subject</Label><Input name="subject" /></div>
            </div>
            <div className="space-y-1"><Label>Body</Label><Textarea name="body" rows={8} placeholder="Use {{company}}, {{role}}, {{name}} as placeholders." /></div>
            <Button type="submit">Save template</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {templates.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{t.type}</Badge>
                  <form action={deleteTemplate}>
                    <input type="hidden" name="id" value={t.id} />
                    <Button type="submit" variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </form>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {t.subject && <p className="text-xs text-zinc-500 mb-1">Subject: {t.subject}</p>}
              <pre className="whitespace-pre-wrap text-sm">{t.body}</pre>
            </CardContent>
          </Card>
        ))}
        {!templates.length && <p className="text-sm text-zinc-500">No templates yet.</p>}
      </div>
    </div>
  );
}
