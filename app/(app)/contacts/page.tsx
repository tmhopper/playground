import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createContact, deleteContact } from "./actions";
import { Trash2, Mail, Phone, Link2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const userId = await requireUserId();
  const [contacts, companies] = await Promise.all([
    prisma.contact.findMany({
      where: { userId },
      include: { links: { include: { company: true, job: true } } },
      orderBy: [{ name: "asc" }],
    }),
    prisma.company.findMany({ where: { userId }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <p className="text-sm text-zinc-500">{contacts.length} people</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add contact</CardTitle></CardHeader>
        <CardContent>
          <form action={createContact} className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1"><Label>Name</Label><Input name="name" required /></div>
            <div className="space-y-1"><Label>Role</Label><Input name="role" placeholder="Recruiter, Hiring Manager..." /></div>
            <div className="space-y-1">
              <Label>Company</Label>
              <select name="companyId" className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                <option value="">—</option>
                {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-1"><Label>Email</Label><Input name="email" type="email" /></div>
            <div className="space-y-1"><Label>Phone</Label><Input name="phone" /></div>
            <div className="space-y-1"><Label>LinkedIn</Label><Input name="linkedinUrl" placeholder="https://linkedin.com/in/..." /></div>
            <div className="space-y-1 md:col-span-3"><Label>Notes</Label><Textarea name="notes" rows={2} /></div>
            <div className="md:col-span-3"><Button type="submit">Add contact</Button></div>
          </form>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Linked to</th>
              <th className="p-2">Reach</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-t border-zinc-200 dark:border-zinc-800 align-top">
                <td className="p-2">
                  <div className="font-medium">{c.name}</div>
                  {c.notes && <div className="text-xs text-zinc-500">{c.notes}</div>}
                </td>
                <td className="p-2 text-xs">{c.role || "—"}</td>
                <td className="p-2 text-xs">
                  {c.links.map((l) => (
                    <Badge key={l.id} variant="secondary" className="mr-1">
                      {l.company?.name ?? l.job?.title ?? "—"}
                    </Badge>
                  ))}
                </td>
                <td className="p-2 text-xs">
                  <div className="flex gap-2">
                    {c.email && (<a href={`mailto:${c.email}`} title={c.email}><Mail className="h-4 w-4" /></a>)}
                    {c.phone && (<a href={`tel:${c.phone}`} title={c.phone}><Phone className="h-4 w-4" /></a>)}
                    {c.linkedinUrl && (<a href={c.linkedinUrl} target="_blank" title="LinkedIn"><Link2 className="h-4 w-4" /></a>)}
                  </div>
                </td>
                <td className="p-2">
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={c.id} />
                    <Button type="submit" variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </form>
                </td>
              </tr>
            ))}
            {!contacts.length && (
              <tr><td colSpan={5} className="p-6 text-center text-sm text-zinc-500">No contacts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
