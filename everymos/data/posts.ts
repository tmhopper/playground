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
    slug: "four-asvab-mistakes",
    title: "The four ASVAB mistakes almost everyone makes",
    date: "2026-04-17",
    category: "ASVAB",
    read_time: "5 min",
    excerpt:
      "The test is easier than the study materials make it look. Here's where time gets wasted.",
    body: `The ASVAB is a timed, multiple-choice, adaptive-ish battery that decides what jobs you qualify for. Most of the people I know who bombed it didn't bomb the content — they bombed the prep.

## 1. Studying every section equally

The AFQT (the overall score) is computed from four subtests: Arithmetic Reasoning, Word Knowledge, Paragraph Comprehension, and Mathematics Knowledge. That's it. The other subtests (General Science, Auto and Shop Info, Mechanical Comprehension, Electronics, Assembling Objects) only matter for specific composite line scores.

If you don't have a target MOS that needs those line scores, ignore them during prep. Most 400-page study books are optimized for the wrong goal.

## 2. Not taking a practice test first

You should never start studying without knowing where you actually stand. Take a timed practice test the first day. It tells you which of the four AFQT subtests is your weakest — that's where the study hours should go.

## 3. Ignoring the math

Half of the AFQT is math. The math is not hard — it's middle-school and early high-school level — but the test doesn't give you a calculator, and the time pressure hits people who haven't done long division by hand since 8th grade.

Drill it. Twenty problems a day for two weeks closes most of the gap.

## 4. Skipping the follow-up if you score low

You can retake the ASVAB. First retake is a month after the first test; second is a month after the first retake; third is six months later. If your first score doesn't qualify you for the MOS you want, take the month and test again.

Also — already-serving Marines and soldiers can retake via the in-service testing program. Your ASVAB is not permanent.

---

The test is a gate, not a verdict. People who treat it like a gate pass it with the score they need.`,
  },
  {
    slug: "b-billet-strategy",
    title: "The quiet logic of the B-billet tour",
    date: "2026-04-17",
    category: "Transition",
    read_time: "7 min",
    excerpt:
      "Recruiter, drill instructor, MSG, SOI instructor. Three years outside your unit. Here's why the career Marines pick them.",
    body: `The Marine Corps calls them B-billets — special-duty assignments outside your operational unit. Recruiter, drill instructor, Marine Security Guard at an embassy, Combat Instructor at the School of Infantry. Three years each, sometimes extended. Every other service has its own version: Army drill sergeant, Navy RDC, Air Force MTI.

Most junior Marines hear "B-billet" and picture three years of screaming at recruits. That's the stereotype, and it's not wrong for DI duty. But B-billets are also a quiet career accelerator, and the career Marines know it.

## Why they help

**Promotion.** Marines with successful B-billet tours consistently advance faster than Marines who spend their entire career in operational units. Boards reward the evaluated leadership in a hard, high-visibility job. You get noticed. Your fitness reports run through a chain that actually reads them.

**Perspective.** You spend three years seeing the service from a different angle. Recruiters see the civilian side — what 18-year-olds think the Marine Corps is, what their parents are afraid of, what the local economy is doing. DIs see how Marines are made, which changes what you expect from your own junior Marines when you get back to the fleet. MSG duty means you run security at embassies and work alongside State Department and the intelligence community.

**Relationships.** You leave with a network outside your MOS community. Recruiters end up with contacts across every district. DIs cross paths with senior enlisted from every specialty. MSG stands you up alongside Marines from every MOS who also got picked.

## Why people avoid them

They're hard. Long hours. High standards. Constant scrutiny. You get moved to a new city for three years, often away from your operational community and friends. The workload on recruiter duty is famously brutal; DI duty is a full-time physical and psychological grind.

Also — B-billets interrupt your operational clock. If you're trying to deploy every two years or you love what your unit does, three years at a recruiting substation in Ohio feels like exile.

## How to pick

Line up your B-billet against your career goal.

- **If you want to make Gunnery Sergeant and beyond:** take the B-billet. Any of them. Make it count.
- **If you want to stay operational and lateral to something hard (recon, MARSOC, scout sniper):** go before the B-billet. You can B-billet after.
- **If you want to get out at 4 or 8:** skip. It only matters if you're staying in.
- **If you have family considerations (single parent, military spouse, chronically ill dependent):** talk honestly with your career counselor about which B-billet is workable. MSG with dependents is complicated; recruiter near family is usually doable.

## The pattern I saw

The Marines who ended up at E-8 and E-9 almost all had a B-billet on their record. Not because B-billet was magic — because it's a filter. The Corps is telling you it trusts you with a hard job outside your comfort zone, and the people who pass through it are the ones who get evaluated for the next hard job.

If you're planning on a 20-year career, the question isn't whether to do a B-billet. It's which one and when.`,
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
