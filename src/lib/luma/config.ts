export function isMockDataEnabled(): boolean {
  const value = process.env.MOCK_DATA?.trim().toLowerCase();
  return value === "true" || value === "1";
}

export function getLumaApiKey(): string {
  const key = process.env.LUMA_API_KEY?.trim();
  if (!key) {
    throw new Error(
      "LUMA_API_KEY is not set. Add it to .env.local or set MOCK_DATA=true for local development.",
    );
  }
  return key;
}
