"use client";

import { useTransition } from "react";
import type { Profile } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { safeJsonParse } from "@/lib/utils";
import { saveProfile } from "./actions";

type PortfolioLink = { label: string; url: string };

export function ProfileForm({ profile }: { profile: Profile }) {
  const [pending, start] = useTransition();
  const links = safeJsonParse<PortfolioLink[]>(profile.portfolioLinks, []);
  const portfolioText = links.map((l) => `${l.label} | ${l.url}`).join("\n");

  return (
    <form
      className="space-y-5"
      action={(fd) =>
        start(async () => {
          await saveProfile(fd);
        })
      }
    >
      <div className="space-y-2">
        <Label htmlFor="resume">Résumé (PDF, DOCX, or TXT)</Label>
        <Input id="resume" name="resume" type="file" accept=".pdf,.docx,.txt" />
        {profile.resumeFileName ? (
          <p className="text-xs text-zinc-500">
            Current: {profile.resumeFileName} ({profile.resumeText.length.toLocaleString()} chars extracted)
          </p>
        ) : (
          <p className="text-xs text-zinc-500">No résumé uploaded yet.</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="background">Background</Label>
          <Textarea
            id="background"
            name="background"
            rows={5}
            defaultValue={profile.background}
            placeholder="A few paragraphs about who you are and what you've done."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="goals">Career goals</Label>
          <Textarea
            id="goals"
            name="goals"
            rows={5}
            defaultValue={profile.goals}
            placeholder="What you're looking for next and why."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          rows={3}
          defaultValue={profile.skills}
          placeholder="Comma-separated or bulleted list — whatever feels natural."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="salaryMin">Salary min</Label>
          <Input id="salaryMin" name="salaryMin" type="number" defaultValue={profile.salaryMin ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryMax">Salary max</Label>
          <Input id="salaryMax" name="salaryMax" type="number" defaultValue={profile.salaryMax ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" name="currency" defaultValue={profile.currency} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workModes">Work modes</Label>
          <Input id="workModes" name="workModes" defaultValue={profile.workModes} placeholder="remote, hybrid" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="locations">Preferred locations</Label>
        <Input
          id="locations"
          name="locations"
          defaultValue={profile.locations}
          placeholder="Los Angeles, New York, Remote"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolioLinks">Portfolio links (one per line, format: Label | URL)</Label>
        <Textarea
          id="portfolioLinks"
          name="portfolioLinks"
          rows={4}
          defaultValue={portfolioText}
          placeholder={"LinkedIn | https://linkedin.com/in/you\nPortfolio | https://yoursite.com"}
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
