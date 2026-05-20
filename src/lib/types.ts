export type LeaderboardRow = {
  participant_id: string;
  name: string;
  points: number;
  events_attended: number;
  last_seen_at: string;
};

export type UploadSummary = {
  event_id: string;
  new_participants: number;
  new_attendances: number;
  skipped_duplicates: number;
};
