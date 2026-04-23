import Link from "next/link";
import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createCompany, deleteCompany, updateWatchFrequency } from "./actions";
import { Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

const ATS = ["greenhouse", "lever", "ashby", "workday", "workable", "smartrecruiters", "other"];
const FREQ = ["none", "alert", "fast", "daily"];

export default async function CompaniesPage() {
  const userId = await requireUserId();
  const companies = await prisma.company.findMany({
    where: { userId },
    include: { jobs: true },
    orderBy: [{ name: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Companies</h1>
        <p className="text-sm text-zinc-500">{companies.length} tracked</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Add a company</CardTitle></CardHeader>
        <CardContent>
          <form action={createCompany} className="grid gap-3 md:grid-cols-5">
            <div className="space-y-1"><Label>Name</Label><Input name="name" required /></div>
            <div className="space-y-1"><Label>Website</Label><Input name="website" placeholder="https://" /></div>
            <div className="space-y-1">
              <Label>ATS</Label>
              <select name="ats" defaultValue="other" className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                {ATS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <Label>Watch</Label>
              <select name="watchFrequency" defaultValue="none" className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-2 text-sm dark:border-zinc-700 dark:bg-zinc-950">
                {FREQ.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex items-end"><Button type="submit" className="w-full">Add</Button></div>
          </form>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">ATS</th>
              <th className="p-2">Jobs</th>
              <th className="p-2">Watch</th>
              <th className="p-2">Last checked</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-t border-zinc-200 dark:border-zinc-800">
                <td className="p-2 font-medium">
                  {c.website ? (
                    <a href={c.website} target="_blank" className="hover:underline">{c.name}</a>
                  ) : (
                    c.name
                  )}
                </td>
                <td className="p-2"><Badge variant="secondary">{c.ats}</Badge></td>
                <td className="p-2 text-xs"><Link href="/jobs" className="hover:underline">{c.jobs.length}</Link></td>
                <td className="p-2">
                  <form action={updateWatchFrequency} className="flex gap-1">
                    <input type="hidden" name="id" value={c.id} />
                    <select
                      name="watchFrequency"
                      defaultValue={c.watchFrequency}
                      onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                      className="h-8 rounded-md border border-zinc-300 bg-white px-2 text-xs dark:border-zinc-700 dark:bg-zinc-950"
                    >
                      {FREQ.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </form>
                </td>
                <td className="p-2 text-xs text-zinc-500">
                  {c.lastCheckedAt ? c.lastCheckedAt.toLocaleDateString() : "—"}
                </td>
                <td className="p-2">
                  <form action={deleteCompany}>
                    <input type="hidden" name="id" value={c.id} />
                    <Button type="submit" variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </form>
                </td>
              </tr>
            ))}
            {!companies.length && (
              <tr><td colSpan={6} className="p-6 text-center text-sm text-zinc-500">No companies yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
