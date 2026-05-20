"use client";

import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSent(true);
    setIsSubmitting(false);
  }

  return (
    <section className="max-w-sm">
      <header className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight text-fg">Sign in</h1>
        <p className="mt-1 text-sm text-fg/60">Sign in to view the leaderboard.</p>
      </header>

      {sent ? (
        <p className="rounded-lg bg-card px-4 py-4 text-fg" role="status">
          Check your email for the magic link.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-card-03 bg-card px-3 py-2 text-fg placeholder:text-fg/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg border border-card-03 bg-card px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-card-01 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {isSubmitting ? "Sending…" : "Send magic link"}
          </button>
        </form>
      )}
    </section>
  );
}
