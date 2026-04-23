import { requireUserId } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileForm } from "./ProfileForm";
import { WritingSamples } from "./WritingSamples";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const userId = await requireUserId();

  let profile = await prisma.profile.findUnique({ where: { userId } });
  if (!profile) {
    profile = await prisma.profile.create({ data: { userId } });
  }

  const samples = await prisma.writingSample.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-zinc-500">
          This content is cached and included in every AI call. The better it is, the better every match, cover
          letter, and résumé will be.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Background &amp; résumé</CardTitle>
          <CardDescription>Upload your résumé as PDF or DOCX; fill out the rest in your own words.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Writing samples &amp; voice</CardTitle>
          <CardDescription>
            Paste 2–3 samples that sound most like you. Pin them to teach the model your voice. Voice rules auto-regenerate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WritingSamples samples={samples} voiceRules={profile.voiceRules} />
        </CardContent>
      </Card>
    </div>
  );
}
