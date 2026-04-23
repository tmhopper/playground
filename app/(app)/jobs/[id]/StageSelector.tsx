"use client";

import { useTransition } from "react";
import { STAGES, STAGE_LABEL, type Stage } from "@/lib/stages";
import { updateJobStage } from "../actions";

export function StageSelector({ jobId, stage }: { jobId: string; stage: Stage }) {
  const [pending, start] = useTransition();
  return (
    <select
      value={stage}
      disabled={pending}
      onChange={(e) =>
        start(async () => {
          await updateJobStage(jobId, e.target.value as Stage);
        })
      }
      className="h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm dark:border-zinc-700 dark:bg-zinc-950"
    >
      {STAGES.map((s) => (
        <option key={s} value={s}>
          {STAGE_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
