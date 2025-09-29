import React from "react";
import { Dot } from "./icons.jsx";

export default function StatusChip({ status }) {
  const map = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Failed: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        map[status] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      <Dot
        className={
          status === "Confirmed"
            ? "text-emerald-500"
            : status === "Pending"
            ? "text-amber-500"
            : "text-rose-500"
        }
      />
      {status}
    </span>
  );
}
