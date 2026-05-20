import { formatEventsLabel, formatLastSeen } from "@/lib/format";
import type { LeaderboardRow } from "@/lib/types";

type LeaderboardListProps = {
  rows: LeaderboardRow[];
};

export function LeaderboardList({ rows }: LeaderboardListProps) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg bg-card px-4 py-8 text-center text-fg/60">
        No check-ins recorded yet. Check back after the next event.
      </p>
    );
  }

  return (
    <ol className="space-y-2" aria-label="Leaderboard rankings">
      {rows.map((row, index) => {
        const rank = index + 1;
        const isFirst = rank === 1;

        return (
          <li
            key={row.participant_id}
            className={`flex items-center gap-4 rounded-lg bg-card px-4 py-3 transition-colors hover:bg-card-01 ${
              isFirst ? "border-l-4 border-accent" : ""
            }`}
          >
            <span
              className={`w-8 shrink-0 text-lg font-medium tabular-nums ${
                isFirst ? "text-accent" : "text-fg/60"
              }`}
              aria-label={`Rank ${rank}`}
            >
              {rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-fg">{row.name}</p>
              <p className="text-sm text-fg/60">
                {formatEventsLabel(row.events_attended)} · Last seen {formatLastSeen(row.last_seen_at)}
              </p>
            </div>
            <p className="shrink-0 text-lg font-medium tabular-nums text-fg">
              {row.points}
              <span className="sr-only"> points</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
