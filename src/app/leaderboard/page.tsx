import { LeaderboardList } from "@/components/leaderboard-list";
import { getLeaderboard } from "@/lib/mock/leaderboard";

export default function LeaderboardPage() {
  const rows = getLeaderboard();

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Event leaderboard</h1>
        <p className="mt-1 text-sm text-fg/60">
          Ranked by events attended. Names only — emails are never shown.
        </p>
      </header>
      <LeaderboardList rows={rows} />
    </section>
  );
}
