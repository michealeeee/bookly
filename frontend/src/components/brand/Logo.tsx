import { cn } from "../../lib/cn";

export function Logo({
  inverted = false,
  compact = false,
  className,
}: {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-xl shadow-sm",
          inverted ? "bg-white/10 text-teal" : "bg-navy text-teal",
        )}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <rect x="5" y="6" width="15" height="20" rx="2.5" fill="currentColor" opacity="0.35" />
          <rect x="12" y="6" width="15" height="20" rx="2.5" fill="currentColor" />
          <path d="M16 11h7M16 16h7M16 21h5" stroke={inverted ? "#071526" : "#071526"} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className={cn("text-[1.35rem] font-semibold tracking-tight", inverted ? "text-white" : "text-navy")}>
          Bookly
        </span>
      )}
    </div>
  );
}
