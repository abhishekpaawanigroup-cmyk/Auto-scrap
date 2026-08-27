"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  Upload,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";

const SUBJECT_OPTIONS = [
  { label: "General Inquiry", value: "general-inquiry" },
  { label: "Vehicle Pickup Request", value: "pickup-request" },
  { label: "Get a Quote", value: "get-quote" },
  { label: "Documentation & RC Cancellation", value: "documentation" },
  { label: "Corporate / Fleet Disposal", value: "corporate" },
  { label: "Complaint / Feedback", value: "feedback" },
  { label: "Other", value: "other" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s-]{10,15}$/;
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  urgentPickup: boolean;
  attachment: FileList | null;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general-inquiry",
      message: "",
      urgentPickup: false,
      attachment: null,
    },
  });

  const attachment = watch("attachment");
  const attachedFile = attachment && attachment.length > 0 ? attachment[0] : null;

  function onSubmit() {
    setStatus("submitting");
    // TODO: replace with POST /api/contact once backend is available
    setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 px-8 py-14 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-primary-600" />
        <h3 className="text-lg font-bold text-ink-900">Message Sent!</h3>
        <p className="max-w-sm text-sm text-ink-500">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className="mt-3 text-sm font-semibold text-primary-600 underline-offset-4 transition-colors hover:text-primary-700 hover:underline active:text-primary-700 active:underline"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Full Name" error={errors.name?.message}>
          <IconInputField
            icon={User}
            placeholder="Your name"
            hasError={Boolean(errors.name)}
            {...register("name", {
              required: "Please enter your name",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
          />
        </FormField>

        <FormField label="Email Address" error={errors.email?.message}>
          <IconInputField
            icon={Mail}
            type="email"
            placeholder="you@example.com"
            hasError={Boolean(errors.email)}
            {...register("email", {
              required: "Please enter your email",
              pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
            })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Phone Number" error={errors.phone?.message}>
          <IconInputField
            icon={Phone}
            type="tel"
            placeholder="+91 98765 43210"
            hasError={Boolean(errors.phone)}
            {...register("phone", {
              required: "Please enter your phone number",
              pattern: { value: PHONE_PATTERN, message: "Enter a valid phone number" },
            })}
          />
        </FormField>

        <FormField label="Subject" error={errors.subject?.message}>
          <Controller
            name="subject"
            control={control}
            rules={{ required: "Please select a subject" }}
            render={({ field }) => (
              <Dropdown
                theme="light"
                placeholder="Select Subject"
                options={SUBJECT_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                hasError={Boolean(errors.subject)}
              />
            )}
          />
        </FormField>
      </div>

      <FormField label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Tell us about your vehicle and how we can help..."
          className={textareaClasses(Boolean(errors.message))}
          {...register("message", {
            required: "Please enter your message",
            minLength: { value: 10, message: "Message must be at least 10 characters" },
          })}
        />
      </FormField>

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
        <input
          type="checkbox"
          className="h-4 w-4 shrink-0 rounded border-ink-300 accent-primary-600"
          {...register("urgentPickup")}
        />
        This is an urgent vehicle pickup request
      </label>

      <div>
        <input
          id="attachment"
          type="file"
          accept="image/*"
          className="hidden"
          {...register("attachment", {
            validate: (files) => {
              const file = files && files.length > 0 ? files[0] : null;
              if (!file) return true;
              if (!file.type.startsWith("image/")) return "Only image files are allowed";
              if (file.size > MAX_ATTACHMENT_SIZE) return "Image must be smaller than 5MB";
              return true;
            },
          })}
        />
        {attachedFile ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-primary-300 bg-primary-50 px-4 py-3 text-sm">
            <span className="truncate text-ink-700">{attachedFile.name}</span>
            <button
              type="button"
              aria-label="Remove attachment"
              onClick={() => setValue("attachment", null, { shouldValidate: true })}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-white hover:text-ink-900 active:bg-white active:text-ink-900"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="attachment"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 px-4 py-3.5 text-sm text-ink-400 transition-colors hover:border-primary-400 hover:text-primary-600"
          >
            <Upload className="h-4 w-4" />
            Attach a vehicle photo (optional)
          </label>
        )}
        {errors.attachment?.message && (
          <p className="mt-1.5 pl-1 text-xs font-medium text-amber-600">{errors.attachment.message}</p>
        )}
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
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function textareaClasses(hasError: boolean) {
  return `w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 ${
    hasError ? "border-amber-500 focus:border-amber-500" : "border-ink-200 focus:border-primary-500"
  }`;
}

const IconInputField = forwardRef<
  HTMLInputElement,
  { icon: LucideIcon; hasError?: boolean } & React.InputHTMLAttributes<HTMLInputElement>
>(function IconInputField({ icon: Icon, hasError = false, className = "", ...props }, ref) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
      <input
        ref={ref}
        {...props}
        className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm text-ink-900 outline-none transition-colors placeholder:text-ink-400 ${
          hasError ? "border-amber-500 focus:border-amber-500" : "border-ink-200 focus:border-primary-500"
        } ${className}`}
      />
    </div>
  );
});

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink-700">
        {label} <span className="text-amber-600">*</span>
      </label>
      {children}
      {error && <p className="pl-1 text-xs font-medium text-amber-600">{error}</p>}
    </div>
  );
}
