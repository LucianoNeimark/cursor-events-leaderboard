import { LeaderboardList } from "@/components/leaderboard-list";
import { getLeaderboard } from "@/lib/luma/leaderboard";

// ISR with stale-while-revalidate: serves cached HTML instantly and refreshes
// in the background after this many seconds. The Luma data cache uses the same
// TTL.
export const revalidate = 7200;

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Event leaderboard</h1>
        <p className="mt-1 text-sm text-fg/60">Cursor community events in Buenos Aires.</p>
      </header>
      <LeaderboardList rows={rows} />
    </section>
  );
}
