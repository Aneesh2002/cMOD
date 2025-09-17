import React from "react";
import { Plus, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  return (
     <div>
   <div className="space-y-6 px-0 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          className="rounded-xl border px-3 py-2 hover:bg-neutral-50"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      {/* Recent Transactions UI */}
      <div className="grid lg:grid-cols-1 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Recent Transactions
            </h3>
            <button className="text-amber-600 hover:text-amber-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center">
                No transactions yet.
              </p>
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
                      <p className="font-medium text-gray-900">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      transaction.amount > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₹
                    {Math.abs(transaction.amount)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <DashboardFooter />
    </div>
   </div>
  );
};

export default TransactionsPage;
