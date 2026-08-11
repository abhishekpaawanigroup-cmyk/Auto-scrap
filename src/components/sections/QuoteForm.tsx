"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { BrandCombobox } from "@/components/ui/BrandCombobox";

const VEHICLE_TYPE_OPTIONS = [
  { label: "Select Vehicle Type", value: "" },
  { label: "Car", value: "car" },
  { label: "Truck", value: "truck" },
  { label: "Bike", value: "bike" },
  { label: "Planes", value: "planes" },
  { label: "Commercial Vehicles", value: "commercial-vehicles" },
];

interface QuoteFormValues {
  name: string;
  mobile: string;
  vehicleType: string;
  registrationNo: string;
  brand: string;
}

const INDIA_REG_NO_PATTERN = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;

export function QuoteForm({ variant = "glass" }: { variant?: "glass" | "light" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    mode: "onTouched",
    defaultValues: { name: "", mobile: "", vehicleType: "", registrationNo: "", brand: "" },
  });

  function onSubmit() {
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
          <button
            type="button"
            onClick={() => {
              reset();
              setStatus("idle");
            }}
            className={`mt-3 text-sm font-semibold underline-offset-4 transition-colors hover:underline ${
              isGlass ? "text-accent-400 hover:text-accent-300" : "text-primary-600 hover:text-primary-700"
            }`}
          >
            Submit Another Request
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col gap-3" noValidate>
          <FormField error={errors.name?.message}>
            <InputField
              isGlass={isGlass}
              placeholder="Enter Your Name"
              hasError={Boolean(errors.name)}
              {...register("name", { required: "Please enter your name" })}
            />
          </FormField>

          <FormField error={errors.mobile?.message}>
            <div className="flex gap-3">
              <span
                className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border text-sm font-medium ${
                  isGlass
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-ink-200 bg-white text-ink-900"
                }`}
              >
                +91
              </span>
              <InputField
                isGlass={isGlass}
                className="flex-1"
                type="tel"
                placeholder="Enter Mobile Number"
                inputMode="numeric"
                maxLength={10}
                hasError={Boolean(errors.mobile)}
                {...register("mobile", {
                  required: "Please enter your mobile number",
                  pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" },
                })}
              />
            </div>
          </FormField>

          <FormField error={errors.vehicleType?.message}>
            <Controller
              name="vehicleType"
              control={control}
              rules={{ required: "Please select a vehicle type" }}
              render={({ field }) => (
                <Dropdown
                  theme={theme}
                  placeholder="Select Vehicle Type"
                  options={VEHICLE_TYPE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  hasError={Boolean(errors.vehicleType)}
                />
              )}
            />
          </FormField>

          <FormField error={errors.registrationNo?.message} hint="Must be a valid Indian registration number, e.g. MH12AB1234">
            <InputField
              isGlass={isGlass}
              placeholder="Enter Registration Number"
              className="uppercase placeholder:normal-case"
              hasError={Boolean(errors.registrationNo)}
              {...register("registrationNo", {
                required: "Please enter the vehicle registration number",
                pattern: { value: INDIA_REG_NO_PATTERN, message: "Enter a valid Indian registration number, e.g. MH12AB1234" },
                setValueAs: (v: string) => v.toUpperCase(),
              })}
            />
          </FormField>

          <FormField error={errors.brand?.message}>
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Please select or enter the vehicle brand" }}
              render={({ field }) => (
                <BrandCombobox
                  theme={theme}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  hasError={Boolean(errors.brand)}
                />
              )}
            />
          </FormField>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 flex h-13 items-center justify-center gap-2 rounded-full bg-primary-600 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-primary-700 disabled:opacity-70"
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

function inputClasses(isGlass: boolean, hasError: boolean) {
  if (hasError) {
    return `h-12 w-full rounded-xl border px-4 text-sm outline-none transition-colors border-amber-500 focus:border-amber-500 ${
      isGlass ? "bg-white/5 text-white placeholder:text-ink-400" : "bg-white text-ink-900 placeholder:text-ink-400"
    }`;
  }
  return `h-12 w-full rounded-xl border px-4 text-sm outline-none transition-colors ${
    isGlass
      ? "border-white/10 bg-white/5 text-white placeholder:text-ink-400 focus:border-accent-500"
      : "border-ink-200 bg-white text-ink-900 placeholder:text-ink-400 focus:border-primary-500"
  }`;
}

const InputField = forwardRef<
  HTMLInputElement,
  { isGlass: boolean; className?: string; hasError?: boolean } & React.InputHTMLAttributes<HTMLInputElement>
>(function InputField({ isGlass, className = "", hasError = false, ...props }, ref) {
  return <input ref={ref} {...props} className={`${inputClasses(isGlass, hasError)} ${className}`} />;
});

function FormField({
  error,
  hint,
  children,
}: {
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      {children}
      {error ? (
        <p className="mt-1.5 pl-1 text-xs font-medium text-amber-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 pl-1 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}
