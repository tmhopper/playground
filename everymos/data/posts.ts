export type Post = {
  slug: string;
  title: string;
  date: string;
  category: "Jobs Deep-Dive" | "Transition" | "ASVAB" | "News" | "Tools";
  read_time: string;
  excerpt: string;
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: "how-to-read-a-job-entry",
    title: "How to read a job entry on EveryMOS",
    date: "2026-04-17",
    category: "Tools",
    read_time: "4 min",
    excerpt:
      "Every page on this site follows the same structure. Here's a walk-through of what each section means and how to use it.",
    body: `I designed the job pages to answer the questions I would have asked at 18 — if I could have gotten a straight answer.

Here's what each section means, and how to read it without assuming anything you shouldn't.

## The header

Three things matter: the code (mono font, branch-accented), the title, and the **confidence badge**. If it says "uncertain" or "stub," the entry is a draft and I haven't finished verifying it. The TL;DR below the header is one sentence — the shortest honest description of the job.

## Requirements

ASVAB is displayed two ways: the **raw requirement** (what the branch publishes, exactly) and the structured composites. The raw string is the source of truth; the composites are there so I can eventually build a "what jobs do I qualify for" tool.

Clearance levels range from **none** to **TS/SCI**. Higher clearance = longer pipeline, more paperwork, and a more valuable record when you separate.

## Training pipeline

This is the path from enlistment to MOS-qualified. Each step shows the school, location, and how many weeks. The total at the top is the honest "how long until I'm doing the job" number.

## Career roadmap

This is the section most sites skip and the one that matters most.

**Standard progression** shows rank-by-rank what you'll typically be doing. The typical years-in-service ranges are illustrative — real promotion depends on cutting scores, zones, and billet availability, which shift year to year.

**B-billets** are special-duty tours. Recruiter, drill instructor, Marine Security Guard, SOI instructor. They're typically three years, they put you outside your operational unit, and they can accelerate promotion if you do well.

**Lateral moves** are other jobs in the same occupational field. Some are "walk in and request it"; some require selection courses with high washout rates. I note which is which.

**Reclassification** is how you leave the MOS entirely. Usually gated on re-enlistment and classification approval, and not guaranteed — the Marine Corps has to need you in the new MOS.

## Civilian crosswalk

Civilian jobs that translate. O*NET codes link to Department of Labor data. Transferable certifications are what you can earn through DoD COOL while you're in, which translates directly to resumes on the outside.

## Sources

Every entry cites its sources. Official branch sites (\`.mil\`) beat classification manuals; classification manuals beat third-party sites. If I couldn't verify something, the confidence drops and it goes in the notes.

---

That's the whole structure. Read the confidence badge first, the career roadmap second, the civilian crosswalk third. Everything else is reference.`,
  },
  {
    slug: "0311-rifleman-deep-dive",
    title: "Why 0311 is the Marine Corps' ground-combat backbone",
    date: "2026-04-17",
    category: "Jobs Deep-Dive",
    read_time: "6 min",
    excerpt:
      "The rifleman is the Marine everything else supports. Here's what that actually means once you get to the fleet.",
    body: `Every Marine is a rifleman. It's a cliché, and also true. But the MOS 0311 — the actual rifleman — sits at the center of Marine Corps combat operations in a way no other specialty does.

## What the job actually is

As an 0311 you run a fire team, a squad, or eventually a platoon. Your day-to-day is training to fight on foot — patrolling, room clearing, fire-and-maneuver drills, live-fire exercises, and the endless logistics of getting a small unit from point A to point B ready to shoot.

On a pump (deployment), the rhythm shifts to actual operations. In combat, the rifleman closes with the enemy. In peacetime training rotations — MEU floats, MWX at Twentynine Palms, Philippines deployments — you're rehearsing the same thing.

## What makes the job hard

Weight. Distance. Weather. Boredom punctuated by intensity. Long days when you're cold or tired and still have to perform. The best 0311s I knew weren't the biggest or the fastest — they were the ones who could keep making decent decisions at hour 40.

The culture is direct. If you're slow or lazy or unclear, someone's going to tell you. That's not cruelty — it's how small-unit leadership corrects itself in real time. You get used to it.

## The career arc

Enlist. Boot camp. School of Infantry. First unit assignment. You'll be a fire team member for a year or two, then a fire team leader once you're a Corporal. By E-5 you're a squad leader running 12–13 Marines. By E-6 you're a platoon sergeant, and at that point the career-infantry track laterals you to 0369.

In between, the B-billets: recruiter, drill instructor, Marine Security Guard at an embassy. Three years each. Hard work, but they accelerate promotion and give you perspective outside the infantry.

Some 0311s lateral to 0321 Recon (high bar — BRC has brutal attrition) or to 0317 Scout Sniper (status currently under review as part of Force Design). A smaller number try MARSOC. The rest stay in the infantry and spend a career getting better at one hard thing.

## What it's worth afterward

Civilian translation for 0311 is honest: law enforcement, security, federal agencies. The discipline transfers. The leadership transfers. The specific technical skills (M16, M240, M320) don't transfer directly — but the proof that you can lead small teams under pressure does, and that's what you sell.

DoD COOL doesn't fund a lot for 0311 directly. The bigger lever is the Post-9/11 GI Bill and SkillBridge in your last six months.

## What I'd tell someone considering it

If you want technical skills that make you rich on the outside, 0311 is the wrong MOS. If you want to prove to yourself that you can do a hard thing with a small team and carry that forward, it's the right one.

There's no third reason.`,
  },
  {
    slug: "lateral-vs-reclass",
    title: "Lateral moves vs. reclass: what actually happens when you want to change jobs",
    date: "2026-04-17",
    category: "Transition",
    read_time: "5 min",
    excerpt:
      "Two words that get used interchangeably but mean very different things for your career and your contract.",
    body: `If you've spent any time in a military unit, you've heard both "lateral move" and "reclass" thrown around. They're not the same thing. Using them interchangeably will get you bad advice.

## Lateral move

A lateral move is a shift from one MOS to another **within the same occupational field** or **via an existing qualification pipeline**.

Examples:
- A 0311 who passes the Scout Sniper Basic Course and picks up 0317 as a secondary MOS.
- A comms Marine who shifts between 0621 and 0627 based on unit needs and additional training.
- An Army 11B who becomes an 11C (Indirect Fire Infantryman) through internal unit assignment and additional training.

Lateral moves are usually:
- Approved at the unit or community-manager level.
- Don't require re-enlistment.
- Keep you on your current contract.
- Happen faster (months, not years).

## Reclassification (reclass)

A reclass is a **formal MOS change**, typically out of your current occupational field entirely.

Examples:
- A 0311 rifleman who re-enlists and reclassifies to 0231 Intelligence Specialist.
- An Army 25B Information Technology Specialist who reclassifies to 35F All-Source Intelligence Analyst.
- A Navy BM who reclassifies to a technical rating like ET (Electronics Technician).

Reclasses are usually:
- Approved at the service-level classification board.
- Gated on re-enlistment or a specific window in your contract.
- Require you to meet the ASVAB line scores for the new MOS.
- Subject to "needs of the service" — if the new MOS isn't under-strength, your package may not get approved.
- Involve going to a new school from scratch.

## Why this matters

If someone tells you to "just lateral over" to a different MOS, and that MOS is in a different occupational field, they're using the wrong word and you're going to end up disappointed.

The honest version: if you want to stay in the same field, a lateral move might work. If you want to leave the field entirely, you're looking at a reclass, which means re-enlistment, paperwork, approval at a higher level, and possibly a wait.

## What to do about it

1. **Identify the target MOS.** Get the code, not a nickname.
2. **Check your ASVAB line scores.** If you don't meet the composite minimum for the target MOS, you can't reclass into it regardless of everything else. You can retake the ASVAB while on active duty if needed.
3. **Ask your classification rep** — not your buddy, not a recruiter who hasn't seen you in three years. Your admin shop or career counselor is the source of truth for what's currently authorized.
4. **Time it right.** Most services only process reclass packages during a re-enlistment window.

No one's going to walk you through this if you don't ask. Start asking twelve months before your EAS.`,
  },
];
