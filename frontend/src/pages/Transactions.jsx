import React, { useState, useEffect } from "react";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [userRole, setUserRole] = useState("consumer");

  useEffect(() => {
    const role = localStorage.getItem("role") || "consumer";
    setUserRole(role);
    
    // Load transactions based on user role
    const loadTransactions = () => {
      let transactionKey = "transactions";
      if (role === "supplier") {
        transactionKey = "supplierTransactions";
      } else if (role === "provider") {
        transactionKey = "providerTransactions";
      }
      
      const saved = localStorage.getItem(transactionKey);
      setTransactions(saved ? JSON.parse(saved) : []);
    };
    
    loadTransactions();
    
    // Listen for storage changes
    const handleStorage = () => loadTransactions();
    window.addEventListener("storage", handleStorage);
    
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Transaction History - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </h1>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              {userRole === "supplier" && <th className="px-4 py-2">Energy (kWh)</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={userRole === "supplier" ? "5" : "4"} className="px-4 py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{t.date}</td>
                  <td className="px-4 py-2">{t.type}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      t.amount < 0 ? "text-red-600" : "text-emerald-600"
                    }`}
                  >
                    {t.amount < 0 ? "-" : "+"}₹{Math.abs(t.amount)}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      t.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  {userRole === "supplier" && t.kwh && (
                    <td className="px-4 py-2 text-blue-600 font-medium">
                      {t.kwh} kWh
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
