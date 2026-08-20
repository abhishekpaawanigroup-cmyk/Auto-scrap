"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white" | "accent" | "outline-white";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white shadow-[var(--shadow-glow)] hover:bg-primary-700 focus-visible:outline-primary-600",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-800 focus-visible:outline-ink-900",
  outline:
    "border border-ink-200 text-ink-900 hover:border-primary-600 hover:text-primary-700 bg-white",
  ghost: "text-ink-900 hover:bg-ink-100",
  white: "bg-white text-ink-900 hover:bg-ink-100 shadow-[var(--shadow-premium)]",
  accent:
    "bg-accent-500 text-ink-950 shadow-[var(--shadow-glow)] hover:bg-accent-600 focus-visible:outline-accent-500",
  "outline-white":
    "bg-transparent border border-white/60 text-white hover:bg-white hover:text-ink-900 focus-visible:outline-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

interface ButtonAsLink
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "right",
      className,
      children,
      ...props
    },
    ref
  ) {
    const classes = cn(
      "relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-tight transition-all duration-300 ease-[var(--ease-premium)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const content = (
      <>
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </>
    );

    if ("href" in props && props.href) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(classes, "group")}
          {...rest}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(classes, "group")}
        {...(props as ButtonAsButton)}
      >
        {content}
      </button>
    );
  }
);
