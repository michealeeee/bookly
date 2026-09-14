import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthly, transactions } from "../../data/seed";
import { money } from "../../lib/format";
import { Badge } from "../ui/Badge";

export function HeroDashboardPreview() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-white">Apex Trade · September</p>
        <span className="rounded-full bg-teal/20 px-2 py-0.5 text-xs text-teal">Live preview</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Revenue", "GH₵125,400"],
          ["Expenses", "GH₵78,250"],
          ["Profit", "GH₵47,150"],
          ["Cash", "GH₵62,500"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-navy-2/80 p-3">
            <p className="text-[11px] text-white/50">{k}</p>
            <p className="mt-1 text-sm font-semibold text-white num">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthly}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e9f90" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#0e9f90" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#9ab", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ background: "#071526", border: "1px solid #234", borderRadius: 12, color: "#fff" }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#0e9f90" fill="url(#rev)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 space-y-2">
        {transactions.slice(0, 3).map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
            <span className="truncate text-white/80">{t.description}</span>
            <div className="flex items-center gap-2">
              <Badge>{t.status}</Badge>
              <span className={`num ${t.amount < 0 ? "text-red-300" : "text-teal"}`}>{money(t.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
