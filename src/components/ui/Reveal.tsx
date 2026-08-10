"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale" | "none";

const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

const directionVariants: Record<Direction, Variants> = {
  up: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition },
  },
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition },
  },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={directionVariants[direction]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function RevealGroup({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  return (
    <motion.div className={className} variants={directionVariants[direction]}>
      {children}
    </motion.div>
  );
}

export { staggerContainer };
