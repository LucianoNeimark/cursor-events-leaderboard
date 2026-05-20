import type { LeaderboardRow } from "@/lib/types";

const MOCK_ROWS: LeaderboardRow[] = [
  {
    participant_id: "a1000000-0000-4000-8000-000000000001",
    name: "Alex Chen",
    points: 14,
    events_attended: 14,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000002",
    name: "Jordan Lee",
    points: 12,
    events_attended: 12,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000003",
    name: "Sam Rivera",
    points: 11,
    events_attended: 11,
    last_seen_at: "2026-04-22",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000004",
    name: "Taylor Kim",
    points: 10,
    events_attended: 10,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000005",
    name: "Morgan Blake",
    points: 9,
    events_attended: 9,
    last_seen_at: "2026-03-15",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000006",
    name: "Casey Nguyen",
    points: 8,
    events_attended: 8,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000007",
    name: "Riley Patel",
    points: 8,
    events_attended: 8,
    last_seen_at: "2026-04-22",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000008",
    name: "Jamie Okafor",
    points: 7,
    events_attended: 7,
    last_seen_at: "2026-02-08",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000009",
    name: "Quinn Martinez",
    points: 6,
    events_attended: 6,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000010",
    name: "Avery Johnson",
    points: 6,
    events_attended: 6,
    last_seen_at: "2026-01-20",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000011",
    name: "Drew Williams",
    points: 5,
    events_attended: 5,
    last_seen_at: "2026-04-22",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000012",
    name: "Skyler Brown",
    points: 5,
    events_attended: 5,
    last_seen_at: "2026-03-15",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000013",
    name: "Reese Thompson",
    points: 4,
    events_attended: 4,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000014",
    name: "Parker Davis",
    points: 4,
    events_attended: 4,
    last_seen_at: "2026-02-08",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000015",
    name: "Hayden Garcia",
    points: 3,
    events_attended: 3,
    last_seen_at: "2026-04-22",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000016",
    name: "Blake Anderson",
    points: 3,
    events_attended: 3,
    last_seen_at: "2026-01-20",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000017",
    name: "Emery Wilson",
    points: 2,
    events_attended: 2,
    last_seen_at: "2026-03-15",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000018",
    name: "Finley Moore",
    points: 2,
    events_attended: 2,
    last_seen_at: "2026-02-08",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000019",
    name: "Sage Lewis",
    points: 1,
    events_attended: 1,
    last_seen_at: "2026-05-10",
  },
  {
    participant_id: "a1000000-0000-4000-8000-000000000020",
    name: "Rowan Clark",
    points: 1,
    events_attended: 1,
    last_seen_at: "2026-01-20",
  },
];

function compareRows(a: LeaderboardRow, b: LeaderboardRow): number {
  if (b.points !== a.points) {
    return b.points - a.points;
  }
  return b.last_seen_at.localeCompare(a.last_seen_at);
}

export function getLeaderboard(): LeaderboardRow[] {
  return [...MOCK_ROWS].sort(compareRows);
}

export function getEmptyLeaderboard(): LeaderboardRow[] {
  return [];
}
