import { NextResponse } from "next/server";

// Public "fake visitor" pinger for the leaderboard. Returns a tiny JSON body
// so schedulers like cron-job.org (which cap captured response size) succeed.
//
// This intentionally does NOT call revalidateTag / revalidatePath. Those would
// evict the cache, forcing the next real visitor to block on a full Luma
// rebuild — which is the loading screen we're trying to avoid.
//
// Instead we rely on Next.js ISR's stale-while-revalidate: visitors always
// get cached HTML instantly, and a background regeneration kicks in after the
// page's `revalidate` window expires. By internally fetching /leaderboard
// here, we act as a visitor so that SWR fires on schedule even during
// zero-traffic windows. No auth: the only effect is keeping a public,
// read-only cache warm.
export const dynamic = "force-dynamic";

async function pingLeaderboard(request: Request) {
  let pinged = false;
  try {
    const url = new URL("/leaderboard", request.url);
    const res = await fetch(url, {
      headers: { "x-warm-source": "api/revalidate" },
    });
    pinged = res.ok;
  } catch {
    // Best-effort warm; ISR will still refresh on the next real visit.
  }

  return NextResponse.json(
    { ok: true, pinged, target: "/leaderboard", now: Date.now() },
    { headers: { "cache-control": "no-store" } },
  );
}

export async function GET(request: Request) {
  return pingLeaderboard(request);
}

export async function POST(request: Request) {
  return pingLeaderboard(request);
}
