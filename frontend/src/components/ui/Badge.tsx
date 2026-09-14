import { cn } from "../../lib/cn";

const tones: Record<string, string> = {
  Draft: "bg-slate/10 text-slate",
  Sent: "bg-sky-50 text-sky-800",
  Open: "bg-sky-50 text-sky-800",
  "Partially Paid": "bg-amber-50 text-amber-800",
  Partial: "bg-amber-50 text-amber-800",
  Paid: "bg-emerald-50 text-emerald-800",
  Received: "bg-emerald-50 text-emerald-800",
  Overdue: "bg-red-50 text-red-700",
  Cancelled: "bg-zinc-100 text-zinc-600",
  Cleared: "bg-emerald-50 text-emerald-800",
  Pending: "bg-amber-50 text-amber-800",
  Reconciled: "bg-teal/10 text-teal-2",
  Unmatched: "bg-orange-50 text-orange-800",
  Active: "bg-emerald-50 text-emerald-800",
  Inactive: "bg-zinc-100 text-zinc-600",
  Invited: "bg-indigo-50 text-indigo-700",
  Submitted: "bg-sky-50 text-sky-800",
  "Manager Review": "bg-amber-50 text-amber-800",
  Approved: "bg-emerald-50 text-emerald-800",
  Rejected: "bg-red-50 text-red-700",
  Reimbursed: "bg-teal/10 text-teal-2",
  Posted: "bg-emerald-50 text-emerald-800",
  Accepted: "bg-emerald-50 text-emerald-800",
  Declined: "bg-red-50 text-red-700",
  Expired: "bg-zinc-100 text-zinc-600",
  Trial: "bg-indigo-50 text-indigo-700",
  "Past due": "bg-red-50 text-red-700",
  Income: "bg-emerald-50 text-emerald-800",
  Expense: "bg-red-50 text-red-700",
  Deposit: "bg-sky-50 text-sky-800",
  Withdrawal: "bg-orange-50 text-orange-800",
  Transfer: "bg-violet-50 text-violet-800",
  Adjustment: "bg-zinc-100 text-zinc-700",
};

export function Badge({ children, tone }: { children: string; tone?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone || children] || "bg-mint text-teal-2",
      )}
    >
      {children}
    </span>
  );
}
