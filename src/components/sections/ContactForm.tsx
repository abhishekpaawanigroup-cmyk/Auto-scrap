"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: replace with POST /api/contact once backend is available
    setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 px-8 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary-600" />
        <h3 className="text-lg font-bold text-ink-900">Message Sent!</h3>
        <p className="max-w-sm text-sm text-ink-500">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" type="text" placeholder="Your name" required />
        <Field label="Phone Number" type="tel" placeholder="+91 00000 00000" required />
      </div>
      <Field label="Email Address" type="email" placeholder="you@example.com" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-700">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your vehicle and how we can help..."
          className="w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex h-13 items-center justify-center gap-2 rounded-full bg-primary-600 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-primary-700 active:bg-primary-700 disabled:opacity-70"
      >
        {status === "submitting" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink-700">{label}</label>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-ink-200 bg-white px-4 text-sm outline-none focus:border-primary-500"
      />
    </div>
  );
}
