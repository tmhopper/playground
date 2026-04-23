import { prisma } from "@/lib/db";
import { safeJsonParse, truncate } from "@/lib/utils";

export type PortfolioLink = { label: string; url: string };

const MAX_SAMPLE_CHARS = 8000;
const MAX_RESUME_CHARS = 12000;

export async function buildProfileBlock(userId: string): Promise<string> {
  const profile = await prisma.profile.findUnique({ where: { userId } });
  const samples = await prisma.writingSample.findMany({
    where: { userId, isVoicePinned: true },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  const portfolio = safeJsonParse<PortfolioLink[]>(profile?.portfolioLinks, []);

  const parts: string[] = [];
  parts.push("# Candidate Profile");
  parts.push("(This block is cached. The user below is the candidate; when we say 'you', we mean them.)");

  if (profile?.background) {
    parts.push("\n## Background\n" + profile.background.trim());
  }
  if (profile?.skills) {
    parts.push("\n## Skills\n" + profile.skills.trim());
  }
  if (profile?.goals) {
    parts.push("\n## Career Goals\n" + profile.goals.trim());
  }

  const prefs: string[] = [];
  if (profile?.salaryMin || profile?.salaryMax) {
    prefs.push(
      `Salary range: ${profile.currency ?? "USD"} ${profile.salaryMin ?? "?"}–${profile.salaryMax ?? "?"}`
    );
  }
  if (profile?.locations) prefs.push(`Preferred locations: ${profile.locations}`);
  if (profile?.workModes) prefs.push(`Work modes: ${profile.workModes}`);
  if (prefs.length) {
    parts.push("\n## Preferences\n- " + prefs.join("\n- "));
  }

  if (portfolio.length) {
    parts.push(
      "\n## Portfolio\n" +
        portfolio.map((l) => `- ${l.label}: ${l.url}`).join("\n")
    );
  }

  if (profile?.resumeText) {
    parts.push("\n## Current Résumé (plain text)\n" + truncate(profile.resumeText, MAX_RESUME_CHARS));
  }

  if (profile?.voiceRules) {
    parts.push("\n## Voice Rules (auto-extracted from writing samples)\n" + profile.voiceRules.trim());
  }

  if (samples.length) {
    parts.push("\n## Writing Samples (pinned for voice matching)");
    for (const s of samples) {
      parts.push(
        `\n### ${s.title}${s.source ? " — " + s.source : ""}\n` + truncate(s.content, MAX_SAMPLE_CHARS)
      );
    }
  }

  if (parts.length <= 2) {
    parts.push(
      "\n(No profile data yet — the candidate has not filled out their profile. Ask them to complete it.)"
    );
  }

  return parts.join("\n");
}
