export function formatLastSeen(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventsLabel(count: number): string {
  return count === 1 ? "1 event" : `${count} events`;
}
