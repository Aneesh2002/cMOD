import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import StatCard from "../NewSupplier/StatCard.jsx";
import StatusChip from "../NewSupplier/StatusChip.jsx";
import { CoinIcon, LeafIcon, ActivityIcon } from "../NewSupplier/icons.jsx";
import { SearchIcon } from "./icons.jsx";

const recentRows = [
  { id: "0xab...def", type: "Renewable Supply", amount: "2,200 TKN", date: "2025-09-18", status: "Confirmed" },
  { id: "0x123...456", type: "Grid Export", amount: "1,500 TKN", date: "2025-09-17", status: "Confirmed" },
  { id: "0x789...abc", type: "Bulk Energy Sale", amount: "3,500 TKN", date: "2025-09-16", status: "Pending" },
];

const energyData = [
  { month: "Apr", kwh: 2200 },
  { month: "May", kwh: 2600 },
  { month: "Jun", kwh: 2300 },
  { month: "Jul", kwh: 2800 },
  { month: "Aug", kwh: 3000 },
  { month: "Sep", kwh: 2520 },
];

export default function Overview() {
  return (
    <div>
      <h1 className="sr-only">Supplier Dashboard</h1>

      {/* Header row: title left, search right */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-gray-800">Overview</h2>

        {/* Searchbar: full width on mobile, fixed width on larger screens */}
        <div className="w-full sm:w-auto">
          <div className="relative w-full sm:w-64 md:w-80">
            <input
              type="text"
              placeholder="Search by TxHash..."
              className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2 text-sm text-gray-800 placeholder:text-gray-400
                         focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              aria-label="Search transactions by TxHash"
            />
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={CoinIcon} label="Token Earnings" value="12,500 TKN" delta="12.5%" deltaDir="down" />
        <StatCard icon={LeafIcon} label="Energy Supplied" value="15,420 kWh" delta="18.2%" deltaDir="down" />
        <StatCard icon={ActivityIcon} label="Total Transactions" value="25" delta="5.8%" deltaDir="down" />
      </section>

      {/* Chart + Recent Transactions */}
      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Energy Supplied (Last 6 Months)</h3>
              <button className="inline-flex items-center rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <circle cx="5" cy="12" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="19" cy="12" r="1.8" />
                </svg>
              </button>
            </div>
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="kwhFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#e5e7eb" }} tickLine={false} width={56} />
                  <Tooltip cursor={{ stroke: "#a7f3d0", strokeWidth: 2 }} contentStyle={{ borderRadius: 8, borderColor: "#e5e7eb" }} />
                  <Area type="monotone" dataKey="kwh" name="kWh" stroke="#059669" strokeWidth={2} fill="url(#kwhFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Recent Transactions</h3>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 font-medium">Transaction ID</th>
                  <th className="px-4 py-2 font-medium">Type</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRows.map((r, idx) => (
                  <tr key={r.id} className={idx % 2 ? "bg-white" : "bg-gray-50/60"}>
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">{r.id}</td>
                    <td className="px-4 py-3 text-gray-700">{r.type}</td>
                    <td className="px-4 py-3 text-gray-900">{r.amount}</td>
                    <td className="px-4 py-3 text-gray-700">{r.date}</td>
                    <td className="px-4 py-3"><StatusChip status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
