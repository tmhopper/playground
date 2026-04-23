import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STAGES, STAGE_LABEL } from "@/lib/stages";
import { createJob } from "../actions";

export default function NewJobPage() {
  async function action(formData: FormData) {
    "use server";
    const id = await createJob(formData);
    if (id) redirect(`/jobs/${id}`);
    else redirect("/jobs");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">New job</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manual entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Company</Label>
                <Input name="company" required />
              </div>
              <div className="space-y-1">
                <Label>Title</Label>
                <Input name="title" required />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <Label>Location</Label>
                <Input name="location" />
              </div>
              <div className="space-y-1">
                <Label>Work mode</Label>
                <Input name="workMode" placeholder="remote / hybrid / onsite" />
              </div>
              <div className="space-y-1">
                <Label>Stage</Label>
                <select
                  name="stage"
                  defaultValue="Saved"
                  className="flex h-9 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {STAGE_LABEL[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>URL</Label>
              <Input name="url" type="url" placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea name="description" rows={6} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Next action</Label>
                <Input name="nextAction" placeholder="Apply and Email, Linkedin Shelly..." />
              </div>
              <div className="space-y-1">
                <Label>Notes</Label>
                <Input name="notes" />
              </div>
            </div>
            <Button type="submit">Create job</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
