import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface VehicleType {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  icon: string;
  description: string;
  averagePrice: string;
  features: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  benefits: string[];
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  vehicle: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface EnvironmentalStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  percentage: number;
  icon: string;
}

export interface IconType {
  Icon?: LucideIcon;
}

export interface TraceabilityBadge {
  id: string;
  label: string;
  icon: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export interface TraceabilityCheckpoint {
  id: number;
  number: string;
  navTitle: string;
  navIcon: string;
  stepLabel: string;
  heading: string;
  description: string;
  points: string[];
  protectionMessage: string;
  ruleRef: string;
  badges: TraceabilityBadge[];
}
