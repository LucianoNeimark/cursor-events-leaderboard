import { unstable_cache } from "next/cache";
import {
  getEventApiId,
  getGuestDisplayName,
  listEventGuests,
  listEvents,
} from "@/lib/luma/client";
import { isMockDataEnabled } from "@/lib/luma/config";
import { isValidEmail, normalizeEmail } from "@/lib/luma/normalize";
import { getLeaderboard as getMockLeaderboard } from "@/lib/mock/leaderboard";
import type { LeaderboardRow } from "@/lib/types";

function compareRows(a: LeaderboardRow, b: LeaderboardRow): number {
  if (b.points !== a.points) {
    return b.points - a.points;
  }
  return b.last_seen_at.localeCompare(a.last_seen_at);
}

function toEventDate(isoDateTime: string): string {
  return isoDateTime.slice(0, 10);
}

/** Guest was checked in at the door (Luma sets checked_in_at on check-in). */
export function hasCheckedIn(guest: { checked_in_at: string | null }): boolean {
  return Boolean(guest.checked_in_at?.trim());
}

type AggregatedParticipant = {
  participant_id: string;
  name: string;
  points: number;
  events_attended: number;
  last_seen_at: string;
};

async function buildLeaderboardFromLuma(): Promise<LeaderboardRow[]> {
  const events = await listEvents();
  const byEmail = new Map<string, AggregatedParticipant>();

  for (const event of events) {
    const eventApiId = getEventApiId(event);
    if (!eventApiId) {
      continue;
    }

    const eventDate = toEventDate(event.start_at);
    const guests = await listEventGuests(eventApiId);

    for (const guest of guests) {
      if (!hasCheckedIn(guest)) {
        continue;
      }

      const email = normalizeEmail(guest.user_email ?? "");
      if (!isValidEmail(email)) {
        continue;
      }

      const participantId = `email:${email}`;
      const displayName = getGuestDisplayName(guest);
      const existing = byEmail.get(email);

      if (!existing) {
        byEmail.set(email, {
          participant_id: participantId,
          name: displayName,
          points: 1,
          events_attended: 1,
          last_seen_at: eventDate,
        });
        continue;
      }

      existing.points += 1;
      existing.events_attended += 1;
      if (eventDate > existing.last_seen_at) {
        existing.last_seen_at = eventDate;
        existing.name = displayName;
      }
    }
  }

  return [...byEmail.values()].sort(compareRows);
}

const LEADERBOARD_REVALIDATE_SECONDS = 120;

const getCachedLeaderboard = unstable_cache(
  async () => buildLeaderboardFromLuma(),
  ["leaderboard", "calendar"],
  { revalidate: LEADERBOARD_REVALIDATE_SECONDS, tags: ["leaderboard"] },
);

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  if (isMockDataEnabled()) {
    return getMockLeaderboard();
  }

  return getCachedLeaderboard();
}
