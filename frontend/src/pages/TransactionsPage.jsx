<<<<<<< HEAD
const TotalTransactionsSection = ({ transactions }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">All Transactions</h2>
                <div className="flex space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-lg hover:bg-gray-50">
                        <Filter className="h-4 w-4" /><span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border rounded-lg hover:bg-green-700">
                        <Download className="h-4 w-4" /><span>Export</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Transaction Hash</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => {
                            const statusColor = tx.status === 'Confirmed' ? 'bg-green-100 text-green-800' : tx.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800';
                            return (
                                <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-900">{tx.id}</td>
                                    <td className="px-6 py-4 flex items-center space-x-2"><tx.icon className="h-5 w-5 text-gray-400" /><span>{tx.type}</span></td>
                                    <td className="px-6 py-4 font-semibold">{tx.amount}</td>
                                    <td className="px-6 py-4">{tx.date}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{tx.status}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-6">
                <span className="text-sm text-gray-600">Showing 1 to 10 of {transactions.length} results</span>
                <div className="flex space-x-1">
                    <button className="p-2 rounded-md hover:bg-gray-100"><ChevronLeft className="h-5 w-5"/></button>
                    <button className="p-2 rounded-md hover:bg-gray-100"><ChevronRight className="h-5 w-5"/></button>
                </div>
            </div>
        </div>
    )
=======
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
>>>>>>> 36cab07b949f5006f70cfeebd5349f335fa01fc2
};

export default TransactionsPage;
