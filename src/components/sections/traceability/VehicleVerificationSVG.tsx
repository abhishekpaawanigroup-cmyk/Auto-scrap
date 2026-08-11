export function VehicleVerificationSVG({
  className,
  muted = false,
}: {
  className?: string;
  muted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 440 215"
      fill="none"
      className={className}
      role="img"
      aria-label="Technical illustration of a vehicle"
    >
      <ellipse cx="215" cy="199" rx="150" ry="7" className="fill-ink-900/[0.06]" />

      <path
        d="M55,170 C48,148 54,118 76,103 C90,94 101,89 116,87 L131,59 C151,38 191,30 221,30 C252,30 288,41 303,61 L320,89 C334,91 348,98 360,111 C374,124 380,148 376,170 L55,170 Z"
        className={muted ? "fill-ink-100 stroke-ink-300" : "fill-ink-50 stroke-ink-800"}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <path
        d="M140,95 C150,70 190,55 220,55 C250,55 280,68 292,93 C270,88 245,85 220,85 C195,85 165,88 140,95 Z"
        className={muted ? "fill-ink-200/60 stroke-ink-300" : "fill-white stroke-primary-600/70"}
        strokeWidth="1.75"
      />
      <line x1="175" y1="59" x2="175" y2="89" className={muted ? "stroke-ink-300" : "stroke-ink-800/70"} strokeWidth="1.5" />
      <line x1="256" y1="61" x2="256" y2="90" className={muted ? "stroke-ink-300" : "stroke-ink-800/70"} strokeWidth="1.5" />
      <line x1="204" y1="98" x2="204" y2="168" className={muted ? "stroke-ink-300" : "stroke-ink-800/40"} strokeWidth="1.5" />

      <rect x="56" y="119" width="14" height="7" rx="2.5" className={muted ? "fill-ink-300" : "fill-primary-500/70"} />
      <rect x="356" y="121" width="16" height="8" rx="2.5" className={muted ? "fill-ink-300" : "fill-primary-400/80"} />

      <g className={muted ? "text-ink-300" : "text-ink-800"}>
        <circle cx="102" cy="171" r="27" className="fill-white stroke-current" strokeWidth="2.5" />
        <circle cx="102" cy="171" r="11" className="fill-none stroke-current" strokeWidth="1.75" />
        <circle cx="330" cy="171" r="27" className="fill-white stroke-current" strokeWidth="2.5" />
        <circle cx="330" cy="171" r="11" className="fill-none stroke-current" strokeWidth="1.75" />
      </g>
    </svg>
  );
}
