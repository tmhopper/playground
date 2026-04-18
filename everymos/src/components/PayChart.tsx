type Row = { paygrade: string; yos: number; monthly: number; annual: number };

export function PayChart({
  rows,
  accent,
  effectiveDate,
}: {
  rows: Row[];
  accent: string;
  effectiveDate: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="mono text-xs opacity-60">Pay data not available for this category.</p>
    );
  }

  // Group by paygrade, keep a representative set of YOS points
  const byGrade = new Map<string, Row[]>();
  for (const r of rows) {
    const arr = byGrade.get(r.paygrade) ?? [];
    arr.push(r);
    byGrade.set(r.paygrade, arr);
  }
  const paygrades = [...byGrade.keys()];
  const maxMonthly = Math.max(...rows.map((r) => r.monthly));

  // Highlight YOS steps that matter: 0, 4, 10, 20
  const yosSteps = [0, 4, 10, 20];

  return (
    <div>
      <p className="mono text-xs opacity-60">
        Base pay only. Effective {effectiveDate}. Values are illustrative — verify against DFAS.
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-[color:var(--color-rule)] bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-[color:var(--color-rule)] bg-[color:var(--color-paper)]">
              <th className="p-2 text-left mono text-xs uppercase tracking-wide opacity-60">
                Paygrade
              </th>
              {yosSteps.map((y) => (
                <th
                  key={y}
                  className="p-2 text-right mono text-xs uppercase tracking-wide opacity-60"
                >
                  {y === 0 ? "Entry" : `${y}y`}
                </th>
              ))}
              <th className="p-2 mono text-xs uppercase tracking-wide opacity-60">Bar</th>
            </tr>
          </thead>
          <tbody>
            {paygrades.map((pg) => {
              const steps: Record<number, number> = {};
              for (const r of byGrade.get(pg)!) steps[r.yos] = r.monthly;
              const topRate = Math.max(...byGrade.get(pg)!.map((r) => r.monthly));
              const barPct = Math.round((topRate / maxMonthly) * 100);
              return (
                <tr
                  key={pg}
                  className="border-b border-[color:var(--color-rule)] last:border-b-0"
                >
                  <td className="p-2 mono font-semibold text-[color:var(--color-ink-900)]">
                    {pg}
                  </td>
                  {yosSteps.map((y) => {
                    const val = steps[y];
                    return (
                      <td key={y} className="p-2 text-right mono">
                        {val ? `$${val.toLocaleString()}` : "—"}
                      </td>
                    );
                  })}
                  <td className="p-2" style={{ width: 160 }}>
                    <div
                      className="h-3 rounded"
                      style={{
                        background: `linear-gradient(90deg, ${accent} 0%, ${accent} ${barPct}%, transparent ${barPct}%)`,
                        border: `1px solid var(--color-rule)`,
                      }}
                      aria-label={`Top monthly base pay at ${pg}: $${topRate.toLocaleString()}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
