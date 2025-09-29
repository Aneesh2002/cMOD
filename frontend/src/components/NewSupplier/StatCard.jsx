import React from "react";
import { ArrowDown, ArrowUp } from "./icons.jsx";

export default function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaDir = "down",
}) {
  const isDown = deltaDir === "down";
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Icon />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {label}
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
          </div>
        </div>
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs ${
            isDown ? "text-rose-500" : "text-emerald-600"
          }`}
        >
          {isDown ? <ArrowDown /> : <ArrowUp />} {delta}
        </div>
      </div>
    </div>
  );
}
