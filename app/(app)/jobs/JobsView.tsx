"use client";

import { useState } from "react";
import Link from "next/link";
import type { Job, Company, MatchScore } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { STAGES, STAGE_LABEL, STAGE_BG, type Stage } from "@/lib/stages";
import { updateJobStage } from "./actions";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { LayoutGrid, Table as TableIcon } from "lucide-react";

type Row = Job & { company: Company; matchScore: MatchScore | null };

export function JobsView({ jobs }: { jobs: Row[] }) {
  const [view, setView] = useState<"table" | "kanban">("table");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
          <TableIcon className="mr-1 h-4 w-4" /> Table
        </Button>
        <Button variant={view === "kanban" ? "default" : "outline"} size="sm" onClick={() => setView("kanban")}>
          <LayoutGrid className="mr-1 h-4 w-4" /> Kanban
        </Button>
      </div>

      {view === "table" ? <TableView jobs={jobs} /> : <KanbanView jobs={jobs} />}
    </div>
  );
}

function TableView({ jobs }: { jobs: Row[] }) {
  if (!jobs.length) {
    return <p className="rounded-md border border-dashed p-8 text-center text-sm text-zinc-500">No jobs yet.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase text-zinc-500 dark:bg-zinc-900">
          <tr>
            <th className="p-2">Company</th>
            <th className="p-2">Title</th>
            <th className="p-2">Stage</th>
            <th className="p-2">Match</th>
            <th className="p-2">Applied</th>
            <th className="p-2">Next action</th>
            <th className="p-2">Due</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id} className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
              <td className="p-2 font-medium">
                <Link href={`/jobs/${j.id}`} className="hover:underline">
                  {j.company.name}
                </Link>
              </td>
              <td className="p-2">
                <Link href={`/jobs/${j.id}`} className="hover:underline">
                  {j.title}
                </Link>
              </td>
              <td className="p-2"><StagePill stage={j.stage as Stage} /></td>
              <td className="p-2">
                {j.matchScore ? (
                  <Badge variant={j.matchScore.overall >= 70 ? "success" : j.matchScore.overall >= 50 ? "warn" : "secondary"}>
                    {j.matchScore.overall}
                  </Badge>
                ) : (
                  <span className="text-xs text-zinc-400">—</span>
                )}
              </td>
              <td className="p-2 text-xs text-zinc-500">{formatDate(j.appliedAt)}</td>
              <td className="p-2 text-xs">{j.nextAction || <span className="text-zinc-400">—</span>}</td>
              <td className="p-2 text-xs text-zinc-500">{formatDate(j.nextActionDueAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StagePill({ stage }: { stage: Stage }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${STAGE_BG[stage]}`}>
      {STAGE_LABEL[stage]}
    </span>
  );
}

function KanbanView({ jobs }: { jobs: Row[] }) {
  const [local, setLocal] = useState(jobs);

  const grouped = STAGES.map((s) => ({
    stage: s,
    items: local.filter((j) => j.stage === s),
  }));

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const targetStage = result.destination.droppableId as Stage;
    const jobId = result.draggableId;
    if (local.find((j) => j.id === jobId)?.stage === targetStage) return;

    setLocal((prev) => prev.map((j) => (j.id === jobId ? { ...j, stage: targetStage } : j)));
    await updateJobStage(jobId, targetStage);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-3 overflow-x-auto" style={{ gridTemplateColumns: `repeat(${STAGES.length}, minmax(220px, 1fr))` }}>
        {grouped.map((col) => (
          <Droppable droppableId={col.stage} key={col.stage}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`rounded-md p-2 ${STAGE_BG[col.stage]}`}
              >
                <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide">
                  {STAGE_LABEL[col.stage]} <span className="text-zinc-500">({col.items.length})</span>
                </h3>
                <div className="space-y-2">
                  {col.items.map((j, i) => (
                    <Draggable draggableId={j.id} index={i} key={j.id}>
                      {(dp) => (
                        <Link
                          href={`/jobs/${j.id}`}
                          ref={dp.innerRef}
                          {...dp.draggableProps}
                          {...dp.dragHandleProps}
                          className="block rounded-md border border-zinc-200 bg-white p-2 text-xs shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        >
                          <div className="font-medium">{j.title}</div>
                          <div className="text-zinc-500">{j.company.name}</div>
                          {j.matchScore && (
                            <Badge variant={j.matchScore.overall >= 70 ? "success" : "secondary"} className="mt-1">
                              {j.matchScore.overall}
                            </Badge>
                          )}
                        </Link>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
