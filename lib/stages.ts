export const STAGES = [
  "Saved",
  "Interested",
  "Applied",
  "FollowingUp",
  "Interview",
  "Offer",
  "Rejected",
  "Forget",
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_LABEL: Record<Stage, string> = {
  Saved: "Saved",
  Interested: "Interested",
  Applied: "Applied",
  FollowingUp: "Following up",
  Interview: "Interview",
  Offer: "Offer",
  Rejected: "Rejected",
  Forget: "Forget",
};

export const STAGE_BG: Record<Stage, string> = {
  Saved: "bg-zinc-100 dark:bg-zinc-800",
  Interested: "bg-blue-100 dark:bg-blue-900/40",
  Applied: "bg-indigo-100 dark:bg-indigo-900/40",
  FollowingUp: "bg-violet-100 dark:bg-violet-900/40",
  Interview: "bg-emerald-100 dark:bg-emerald-900/40",
  Offer: "bg-amber-100 dark:bg-amber-900/40",
  Rejected: "bg-red-100 dark:bg-red-900/40",
  Forget: "bg-zinc-100 dark:bg-zinc-900",
};
