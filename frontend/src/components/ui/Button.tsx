import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

const variants = {
  primary:
    "bg-teal text-white hover:bg-teal-2 shadow-sm shadow-teal/20",
  secondary:
    "bg-white text-navy ring-1 ring-line hover:bg-paper",
  ghost: "text-navy hover:bg-mint",
  danger: "bg-loss text-white hover:bg-red-700",
  dark: "bg-black text-white hover:bg-zinc-900",
  outline:
    "border border-white/20 bg-white/5 text-white hover:bg-white/10",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
