import { LeaderboardList } from "@/components/leaderboard-list";
import { getLeaderboard } from "@/lib/luma/leaderboard";

// ISR with stale-while-revalidate: serves cached HTML instantly and refreshes
// in the background after this many seconds. The Luma data cache uses the same
// TTL. Paired with a ~1 min cron pinger at /api/revalidate so the background
// regen fires on schedule even with zero live traffic.
export const revalidate = 120;

function getSubtitle(): string {
  const city = process.env.CITY?.trim();
  return city ? `Cursor community events in ${city}.` : "Cursor community events.";
}

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Event leaderboard</h1>
        <p className="mt-1 text-sm text-fg/60">{getSubtitle()}</p>
      </header>
      <LeaderboardList rows={rows} />
    </section>
  );
}
