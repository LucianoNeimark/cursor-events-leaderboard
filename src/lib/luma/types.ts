export type LumaPaginatedResponse<T> = {
  entries: T[];
  has_more: boolean;
  next_cursor?: string;
};

export type LumaEvent = {
  platform: string;
  id: string;
  api_id?: string;
  name: string;
  start_at: string;
};

export type LumaGuest = {
  user_email: string;
  user_name: string | null;
  user_first_name: string | null;
  user_last_name: string | null;
  approval_status: string;
  checked_in_at: string | null;
};
