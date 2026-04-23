import { MatchScorer } from "./MatchScorer";

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Match scorer</h1>
        <p className="text-sm text-zinc-500">Paste a job description and see how well it fits your profile.</p>
      </div>
      <MatchScorer />
    </div>
  );
}
