import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { monthly } from "../../data/seed";

export function HeroDashboardPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-white/50">This month</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white num">GH₵125,400</p>
      <p className="mt-1 text-sm text-teal">Revenue · +12.5%</p>
      <div className="mt-8 h-36">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly}>
            <XAxis dataKey="month" tick={{ fill: "#8aa", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#071526", border: "none", borderRadius: 12, color: "#fff" }} />
            <Area type="monotone" dataKey="revenue" stroke="#0e9f90" fill="rgba(14,159,144,0.18)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
