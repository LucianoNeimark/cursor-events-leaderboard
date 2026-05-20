import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Public cache-buster for the leaderboard. Returns a tiny JSON body so
// schedulers like cron-job.org (which cap captured response size) succeed.
// No auth: the only side effect is invalidating a public, read-only cache tag.
export const dynamic = "force-dynamic";

function bustLeaderboardCache() {
  revalidateTag("leaderboard");
  return NextResponse.json(
    { ok: true, revalidated: "leaderboard", now: Date.now() },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function GET() {
  return bustLeaderboardCache();
}

export async function POST() {
  return bustLeaderboardCache();
}
