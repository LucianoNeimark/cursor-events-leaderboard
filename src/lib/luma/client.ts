import { getLumaApiKey } from "@/lib/luma/config";
import type { LumaEvent, LumaGuest, LumaPaginatedResponse } from "@/lib/luma/types";

const LUMA_API_BASE = "https://public-api.luma.com";
const REVALIDATE_SECONDS = 60;

type LumaFetchOptions = {
  path: string;
  searchParams?: Record<string, string | undefined>;
};

async function lumaFetch<T>({ path, searchParams }: LumaFetchOptions): Promise<T> {
  const url = new URL(`${LUMA_API_BASE}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url, {
    headers: {
      "x-luma-api-key": getLumaApiKey(),
      Accept: "application/json",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Luma API ${response.status} ${response.statusText} for ${path}${body ? `: ${body.slice(0, 200)}` : ""}`,
    );
  }

  return response.json() as Promise<T>;
}

async function fetchAllPages<T>(
  fetchPage: (cursor?: string) => Promise<LumaPaginatedResponse<T>>,
): Promise<T[]> {
  const items: T[] = [];
  let cursor: string | undefined;

  do {
    const page = await fetchPage(cursor);
    items.push(...page.entries);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);

  return items;
}

export async function listEvents(): Promise<LumaEvent[]> {
  return fetchAllPages((pagination_cursor) =>
    lumaFetch<LumaPaginatedResponse<LumaEvent>>({
      path: "/v1/calendar/list-events",
      searchParams: pagination_cursor ? { pagination_cursor } : undefined,
    }),
  );
}

export async function listEventGuests(eventApiId: string): Promise<LumaGuest[]> {
  return fetchAllPages((pagination_cursor) =>
    lumaFetch<LumaPaginatedResponse<LumaGuest>>({
      path: "/v1/event/get-guests",
      searchParams: {
        event_api_id: eventApiId,
        ...(pagination_cursor ? { pagination_cursor } : {}),
      },
    }),
  );
}

export function getEventApiId(event: LumaEvent): string {
  return event.id || event.api_id || "";
}

export function getGuestDisplayName(guest: LumaGuest): string {
  if (guest.user_name?.trim()) {
    return guest.user_name.trim();
  }

  const parts = [guest.user_first_name, guest.user_last_name]
    .map((part) => part?.trim())
    .filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" ");
  }

  return guest.user_email.split("@")[0] ?? "Unknown";
}
