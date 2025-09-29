import React, { useState } from "react";
import { Wallet, Zap, Activity } from "lucide-react";
import KPICard from "./KPICard"; // make sure KPICard is a separate component

const Overview = ({ platformFeeReceived, totalEnergySupplied, transactions, setActiveSection }) => {
  const userName = localStorage.getItem("nameOption") || "1";
  const [platformFeePercent, setPlatformFeePercent] = useState(Number(localStorage.getItem("platformFeePercent") || "10"));

  const applyGlobalFeeChange = (value) => {
    const next = Math.max(0, Math.min(100, Number(value) || 0));
    setPlatformFeePercent(next);
    localStorage.setItem("platformFeePercent", String(next));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Provider {userName}!</h1>
        <p className="text-gray-500">Here's a summary of your activities.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard icon={Wallet} title="Platform Fee Balance" value={`₹${platformFeeReceived.toFixed(2)}`} color="text-blue-500" />
        <KPICard icon={Zap} title="Total Energy Supplied" value={totalEnergySupplied} unit="kWh" color="text-indigo-500" />
        <KPICard icon={Activity} title="Total Transactions" value={transactions.length} color="text-teal-500" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveSection("energy_req")}
            className="flex items-center justify-center space-x-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <Zap className="text-green-500 h-6 w-6" />
            <span className="font-semibold text-gray-700">View Energy Requests</span>
          </button>

          <div className="flex items-center justify-center space-x-3 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <label className="text-sm text-gray-700 font-medium">Platform Fee:</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-center"
              value={platformFeePercent}
              onChange={(e) => applyGlobalFeeChange(e.target.value)}
            />
            <span className="text-gray-700 font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 px-4 font-medium">TYPE</th>
                <th className="py-3 px-4 font-medium">DATE</th>
                <th className="py-3 px-4 font-medium text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700 font-medium">{t.type}</td>
                  <td className="py-3 px-4 text-gray-500">{t.date}</td>
                  <td className={`py-3 px-4 font-bold text-right ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {t.amount > 0 ? `+₹${t.amount.toFixed(2)}` : `-₹${Math.abs(t.amount).toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
