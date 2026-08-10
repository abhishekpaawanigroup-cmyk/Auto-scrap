import Image from "next/image";
import type { TeamMember } from "@/types";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group flex flex-col items-center rounded-2xl border border-border bg-white p-7 text-center shadow-[var(--shadow-premium)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-premium-lg)]">
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary-50 transition-all duration-300 group-hover:ring-primary-100">
        <Image src={member.image} alt={member.name} fill className="object-cover" />
      </div>
      <h3 className="mt-5 text-base font-bold text-ink-900">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-primary-700">{member.role}</p>
      {member.bio && <p className="mt-3 text-sm leading-relaxed text-ink-500">{member.bio}</p>}
    </div>
  );
}
