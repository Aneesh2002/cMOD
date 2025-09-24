import React from "react";
import { Plus, Activity } from "lucide-react";

const TotalTransactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">All Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="py-3 px-4 font-medium">Transaction Type</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium">Energy (kWh)</th>
              <th className="py-3 px-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${t.amount > 0 ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {t.amount > 0 ? (
                          <Plus className="h-4 w-4 text-green-600" />
                        ) : (
                          <Activity className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{t.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500">{t.date}</td>
                  <td className="py-4 px-4 text-gray-600">{t.kwh || "-"}</td>
                  <td
                    className={`py-4 px-4 font-bold text-right ${
                      t.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalTransactions;
