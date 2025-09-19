import React from "react";
import { Plus, Activity } from "lucide-react";

const RecentTransactions = ({
  transactions = [],
  title = "Recent Transactions",
  emptyText = "No transactions yet.",
  limit, // e.g., 5 — leave undefined to show all
  onViewAll, // optional callback
  className = "",
}) => {
  const items = Array.isArray(transactions)
    ? (limit ? transactions.slice(0, limit) : transactions)
    : [];

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            View All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">{emptyText}</p>
        ) : (
          items.map((t) => {
            const amount = Number(t?.amount || 0);
            const isCredit = amount > 0;
            const displayAmount = `${isCredit ? "+" : ""}₹${Math.abs(amount)}`;
            return (
              <div
                key={t.id ?? `${t.type}-${t.date}-${displayAmount}`}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      isCredit ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {isCredit ? (
                      <Plus className="h-4 w-4 text-green-600" />
                    ) : (
                      <Activity className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t?.type ?? "Transaction"}</p>
                    <p className="text-sm text-gray-500">{t?.date ?? ""}</p>
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    isCredit ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {displayAmount}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
