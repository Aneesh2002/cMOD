// TransactionsPage.jsx (final)
import React from "react";
import { Plus, Activity, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = React.useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem("transactions");
      setTransactions(saved ? JSON.parse(saved) : []);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const userName = localStorage.getItem("nameOption") || "User";

  return (
    <div className="flex min-h-screen bg-white w-full">
      {/* Sidebar (keeps its own width) */}
      <Sidebar />

      {/* Right pane: must include min-w-0 so it can expand */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 px-8 py-6 space-y-8 w-full">
          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl font-bold">Transactions</h1>
            <div className="flex items-center gap-3">
              <button
                className="rounded-xl border px-3 py-2 hover:bg-neutral-50"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
                onClick={() => navigate("/notifications")}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="text-gray-600">
            Hey {userName}, here are your most recent charge and wallet activity logs.
          </p>

          {/* Full-width grid */}
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                <button className="text-amber-600 hover:text-amber-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {transactions.length === 0 ? (
                  <p className="text-gray-500 text-center">No transactions yet.</p>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.amount > 0 ? (
                            <Plus className="h-4 w-4 text-green-600" />
                          ) : (
                            <Activity className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.type}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <span
                        className={`font-bold ${
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default TransactionsPage;
