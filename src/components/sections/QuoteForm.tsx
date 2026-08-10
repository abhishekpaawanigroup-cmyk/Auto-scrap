"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";

const VEHICLE_TYPE_OPTIONS = [
  { label: "Select Vehicle Type", value: "" },
  { label: "Car", value: "car" },
  { label: "Truck", value: "truck" },
  { label: "Bike", value: "bike" },
  { label: "Planes", value: "planes" },
  { label: "Commercial Vehicles", value: "commercial-vehicles" },
];

const COUNTRY_CODE_OPTIONS = [
  { label: "+91", value: "+91" },
  { label: "+1", value: "+1" },
  { label: "+44", value: "+44" },
  { label: "+971", value: "+971" },
  { label: "+61", value: "+61" },
];

export function QuoteForm({ variant = "glass" }: { variant?: "glass" | "light" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [vehicleType, setVehicleType] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: replace with POST /api/quote once backend is available
    setTimeout(() => setStatus("success"), 900);
  }

  const isGlass = variant === "glass";
  const theme = isGlass ? "dark" : "light";

  return (
    <div
      className={
        isGlass
          ? "w-full max-w-md rounded-3xl border border-white/10 bg-ink-950/95 p-7 shadow-[var(--shadow-premium-lg)] backdrop-blur-xl sm:p-8"
          : "w-full max-w-md rounded-3xl border border-border bg-white p-7 shadow-[var(--shadow-premium-lg)] sm:p-8"
      }
    >
      <div className="text-center">
        <h3 className={`text-2xl font-bold ${isGlass ? "text-white" : "text-ink-900"}`}>
          Get Instant Quote
        </h3>
        <span className="relative mx-auto mt-3 block h-1 w-16 overflow-hidden rounded-full">
          <motion.span
            className="absolute inset-y-0 left-0 w-10 rounded-full bg-accent-500"
            animate={{ x: [0, 24, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <p className={`mx-auto mt-4 max-w-[260px] text-sm leading-relaxed ${isGlass ? "text-ink-300" : "text-ink-500"}`}>
          Fill the details below and get the best price for your vehicle
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col items-center gap-3 py-6 text-center"
        >
          <CheckCircle2 className="h-12 w-12 text-accent-500" />
          <p className={`text-sm font-semibold ${isGlass ? "text-white" : "text-ink-900"}`}>
            Request received!
          </p>
          <p className={`text-sm ${isGlass ? "text-ink-300" : "text-ink-500"}`}>
            Our team will call you within 30 minutes with your quote.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
          <Dropdown
            theme={theme}
            name="vehicleType"
            placeholder="Select Vehicle Type"
            options={VEHICLE_TYPE_OPTIONS}
            value={vehicleType}
            onChange={setVehicleType}
          />
          <InputField isGlass={isGlass} placeholder="Enter Vehicle Brand" required />
          <InputField isGlass={isGlass} placeholder="Enter Model" required />
          <InputField
            isGlass={isGlass}
            placeholder="Enter Registration Year"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
          />
          <div className="flex gap-3">
            <Dropdown
              theme={theme}
              placeholder="Code"
              options={COUNTRY_CODE_OPTIONS}
              value={countryCode}
              onChange={setCountryCode}
              className="w-24 shrink-0"
            />
            <input
              type="tel"
              required
              placeholder="Enter Mobile Number"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              className={`${inputClasses(isGlass)} flex-1`}
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 flex h-13 items-center justify-center gap-2 rounded-full bg-accent-500 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-accent-600 disabled:opacity-70"
          >
            {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Quote Now"}
          </button>
          <p className={`flex items-center justify-center gap-1.5 text-center text-xs ${isGlass ? "text-ink-400" : "text-ink-500"}`}>
            <ShieldCheck className="h-3.5 w-3.5 text-accent-500" />
            100% Secure &amp; Hassle-Free Process
          </p>
        </form>
      )}
    </div>
  );
}

function inputClasses(isGlass: boolean) {
  return `h-12 w-full rounded-xl border px-4 text-sm outline-none transition-colors ${
    isGlass
      ? "border-white/10 bg-white/5 text-white placeholder:text-ink-400 focus:border-accent-500"
      : "border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:border-primary-500"
  }`;
}

function InputField({
  isGlass,
  className = "",
  ...props
}: { isGlass: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses(isGlass)} ${className}`} />;
}
