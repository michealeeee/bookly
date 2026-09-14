import { TrendingDown, TrendingUp } from "lucide-react";
import { money } from "../../lib/format";
import { Card } from "./Card";

export function KpiCard({
  label,
  value,
  delta,
  prefix,
}: {
  label: string;
  value: number;
  delta?: number;
  prefix?: string;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="p-5">
      <p className="text-sm text-slate">{label}</p>
      <p className="mt-2 break-all text-xl font-semibold tracking-tight text-navy num sm:text-2xl">
        {prefix}
        {money(value)}
      </p>
      {delta != null && (
        <p className={`mt-2 inline-flex items-center gap-1 text-sm ${up ? "text-gain" : "text-loss"}`}>
          {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {up ? "+" : ""}
          {delta}%
        </p>
      )}
    </Card>
  );
}
