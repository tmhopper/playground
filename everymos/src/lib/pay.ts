import { readFileSync } from "node:fs";
import { join } from "node:path";

type YosRates = Record<string, number>;

type PayTable = {
  source: string;
  effective_date: string;
  currency: string;
  type: string;
  note: string;
  enlisted: Record<string, YosRates>;
  officer: Record<string, YosRates>;
  warrant_officer: Record<string, YosRates>;
};

let _cache: PayTable | null = null;

export function loadPayTable(): PayTable {
  if (_cache) return _cache;
  const raw = readFileSync(join(process.cwd(), "data", "pay-tables.json"), "utf8");
  _cache = JSON.parse(raw) as PayTable;
  return _cache;
}

export function payForRange(
  category: "enlisted" | "officer" | "warrant_officer",
  paygrades: string[],
): { paygrade: string; yos: number; monthly: number; annual: number }[] {
  const table = loadPayTable();
  const section = table[category];
  const rows: { paygrade: string; yos: number; monthly: number; annual: number }[] = [];
  for (const pg of paygrades) {
    const rates = section[pg];
    if (!rates) continue;
    for (const [yos, monthly] of Object.entries(rates)) {
      if (monthly <= 0) continue;
      rows.push({ paygrade: pg, yos: Number(yos), monthly, annual: monthly * 12 });
    }
  }
  return rows;
}

const ENLISTED_ALL = ["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9"];
const OFFICER_ALL = ["O-1", "O-2", "O-3", "O-4", "O-5"];
const WARRANT_ALL = ["W-1", "W-2", "W-3"];

export function paygradesForCategory(
  category: "enlisted" | "officer" | "warrant_officer",
): string[] {
  switch (category) {
    case "officer":
      return OFFICER_ALL;
    case "warrant_officer":
      return WARRANT_ALL;
    default:
      return ENLISTED_ALL;
  }
}

export function payTableMeta(): { effective_date: string; note: string; source: string } {
  const t = loadPayTable();
  return { effective_date: t.effective_date, note: t.note, source: t.source };
}
