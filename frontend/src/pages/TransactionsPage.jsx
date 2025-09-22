
// TransactionsPage.jsx
import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import RecentTransactions from "../components/RecentTransactions";

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
      {/* Sidebar */}
      <Sidebar />

      {/* Right pane */}
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
            <RecentTransactions
              transactions={transactions}
              onViewAll={() => navigate("/transactions")} // hook this to a real route if needed
              // limit={10} // uncomment to limit how many rows show
            />
          </div>
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default TransactionsPage;
