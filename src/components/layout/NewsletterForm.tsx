"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: replace with POST /api/newsletter once backend is available
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-5 py-3 text-sm text-accent-400">
        <CheckCircle2 className="h-4 w-4" />
        You&apos;re subscribed!
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="h-12 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-ink-500 focus:border-accent-500 focus:outline-none"
      />
      <button
        type="submit"
        className="group flex h-12 items-center justify-center gap-2 rounded-full bg-accent-500 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-400"
      >
        Subscribe
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
