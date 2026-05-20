"use client";

import { useState, type FormEvent } from "react";
import type { UploadSummary } from "@/lib/types";

function simulateUpload(): UploadSummary {
  return {
    event_id: "550e8400-e29b-41d4-a716-446655440000",
    new_participants: 12,
    new_attendances: 45,
    skipped_duplicates: 3,
  };
}

export default function UploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [summary, setSummary] = useState<UploadSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSummary(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");
    const eventName = String(formData.get("event_name") ?? "").trim();
    const eventDate = String(formData.get("event_date") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      setError("Please select a CSV file.");
      return;
    }

    if (!eventName || !eventDate) {
      setError("Event name and date are required.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSummary(simulateUpload());
    setIsSubmitting(false);
    form.reset();
  }

  return (
    <section>
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Upload event attendees</h1>
        <p className="mt-1 text-sm text-fg/60">
          Upload a Luma guest-list CSV. Data is mocked in this preview — nothing is saved yet.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="event_name" className="mb-1.5 block text-sm font-medium text-fg">
            Event name
          </label>
          <input
            id="event_name"
            name="event_name"
            type="text"
            required
            className="w-full rounded-lg border border-card-03 bg-card px-3 py-2 text-fg placeholder:text-fg/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            placeholder="Cursor meetup — São Paulo"
          />
        </div>

        <div>
          <label htmlFor="event_date" className="mb-1.5 block text-sm font-medium text-fg">
            Event date
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            required
            className="w-full rounded-lg border border-card-03 bg-card px-3 py-2 text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>

        <div>
          <label htmlFor="file" className="mb-1.5 block text-sm font-medium text-fg">
            Luma CSV file
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".csv,text/csv"
            required
            className="w-full rounded-lg border border-card-03 bg-card px-3 py-2 text-sm text-fg file:mr-3 file:rounded file:border-0 file:bg-card-02 file:px-3 file:py-1 file:text-sm file:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </div>

        {error ? (
          <p className="text-sm text-fg" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isSubmitting ? "Uploading…" : "Upload CSV"}
        </button>
      </form>

      {summary ? (
        <div className="mt-6 rounded-lg bg-card px-4 py-4" role="status">
          <p className="font-medium text-fg">
            {summary.new_attendances} attendees added across {summary.new_participants} new
            participants.
          </p>
          <p className="mt-1 text-sm text-fg/60">
            {summary.skipped_duplicates} duplicate rows skipped.
          </p>
        </div>
      ) : null}
    </section>
  );
}
