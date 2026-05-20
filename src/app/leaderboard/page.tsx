import { LeaderboardList } from "@/components/leaderboard-list";
import { getLeaderboard } from "@/lib/luma/leaderboard";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Event leaderboard</h1>
        <p className="mt-1 text-sm text-fg/60">
          Calendar events ranked by check-ins. Names only — emails are never shown.
        </p>
      </header>
      <LeaderboardList rows={rows} />
    </section>
  );
}
