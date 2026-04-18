import type { JobEntry } from "@schemas/job";

export function TrainingTimeline({ pipeline }: { pipeline: JobEntry["training_pipeline"] }) {
  const totalWeeks = pipeline.reduce((s, t) => s + t.duration_weeks, 0);

  return (
    <div>
      {/* Desktop: horizontal bar timeline */}
      <div className="hidden lg:block">
        <div className="flex overflow-hidden rounded-lg border border-[color:var(--color-rule)] bg-white">
          {pipeline.map((stage, i) => {
            const widthPct = totalWeeks > 0 ? (stage.duration_weeks / totalWeeks) * 100 : 100 / pipeline.length;
            return (
              <div
                key={i}
                className="relative border-r border-[color:var(--color-rule)] p-4 last:border-r-0"
                style={{ width: `${Math.max(widthPct, 10)}%` }}
              >
                <div className="mono text-xs opacity-60">Step {i + 1}</div>
                <div className="mt-1 font-semibold text-[color:var(--color-ink-900)]">{stage.stage}</div>
                <div className="mono mt-1 text-xs">{stage.duration_weeks} wk</div>
                <div className="mt-2 text-xs opacity-70">{stage.school_name}</div>
                <div className="text-xs opacity-60">{stage.location}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: stacked cards */}
      <ol className="space-y-4 lg:hidden">
        {pipeline.map((stage, i) => (
          <li key={i} className="rounded-lg border border-[color:var(--color-rule)] bg-white p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="mono text-xs opacity-60">Step {i + 1}</span>
                <span className="text-base font-semibold text-[color:var(--color-ink-900)]">{stage.stage}</span>
              </div>
              <span className="mono text-xs opacity-60">{stage.duration_weeks} weeks</span>
            </div>
            <p className="mt-2 text-sm opacity-80">{stage.school_name} · {stage.location}</p>
            {stage.description && <p className="mt-3 text-sm">{stage.description}</p>}
            {stage.prerequisite && (
              <p className="mono mt-2 text-xs opacity-60">Prerequisite: {stage.prerequisite}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
