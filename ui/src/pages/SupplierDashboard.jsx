import React from "react";
import {
  Wallet,
  Zap,
  TrendingUp,
  Plus,
  Activity,
  HelpCircle,
  CheckCircle,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardFooter } from "../components/DashboardFooter";
// import { Line } from "react-chartjs-2"; // For the graph

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const supplierName = localStorage.getItem("nameOption") || "1";

  const [totalEnergySupplied, setTotalEnergySupplied] = React.useState(
    Number(localStorage.getItem("totalEnergySupplied") || "0")
  );
  const [totalPaymentReceived, setTotalPaymentReceived] = React.useState(
    Number(localStorage.getItem("totalPaymentReceived") || "0")
  );
  const [transactions, setTransactions] = React.useState(() => {
    const saved = localStorage.getItem("supplierTransactions");
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [issues, setIssues] = React.useState(() => {
    const saved = localStorage.getItem("issues");
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [providerPayouts, setProviderPayouts] = React.useState(() => {
    const saved = localStorage.getItem("providerPayouts");
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [newIssue, setNewIssue] = React.useState("");
  const [notificationCount, setNotificationCount] = React.useState(0);

  // Handle new issue submission
  const handleNewIssue = () => {
    if (!newIssue) return alert("Please enter a valid issue description.");
    const updatedIssues = [
      ...issues,
      { id: Date.now(), description: newIssue, status: "pending" },
    ];
    setIssues(updatedIssues);
    localStorage.setItem("issues", JSON.stringify(updatedIssues));
    setNewIssue("");
    alert("Issue raised successfully.");
  };

  // Re-render transactions and issues based on local storage updates
  React.useEffect(() => {
    const onStorage = () => {
      const savedTransactions = localStorage.getItem("supplierTransactions");
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
      const savedIssues = localStorage.getItem("issues");
      setIssues(savedIssues ? JSON.parse(savedIssues) : []);
      const req = localStorage.getItem("energyRequests");
      setNotificationCount(req ? JSON.parse(req).length : 0);
      
      // Update supplier metrics
      setTotalEnergySupplied(Number(localStorage.getItem("totalEnergySupplied") || "0"));
      setTotalPaymentReceived(Number(localStorage.getItem("totalPaymentReceived") || "0"));

      const payouts = localStorage.getItem("providerPayouts");
      setProviderPayouts(payouts ? JSON.parse(payouts) : []);
    };
    window.addEventListener("storage", onStorage);
    onStorage();
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("nameOption");
    navigate("/login", { replace: true });
  };

  // Dummy chart data for transaction history and energy supplied
  // const transactionHistoryData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  //   datasets: [
  //     {
  //       label: "Transactions",
  //       data: [50, 70, 100, 80, 130, 120, 150, 160, 180],
  //       fill: false,
  //       borderColor: "#34D399", // Green color
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const energySuppliedData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Energy Supplied",
        data: [500, 600, 800, 700, 850, 900, 1000, 1100, 1200],
        fill: false,
        borderColor: "#10B981", // Dark Green color
        tension: 0.1,
      },
    ],
  };

  const KPICard = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`${color} h-5 w-5`} />
            <span className="text-gray-600 text-sm font-medium">{title}</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === "number" ? value.toLocaleString() : value}
            <span className="text-lg font-normal text-gray-500 ml-1">
              {unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-600">
          SUPPLIER DASHBOARD
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {notificationCount}
              </span>
            )}
          </button>
          <button
            className="rounded-xl bg-neutral-900 text-white px-3 py-2 hover:bg-neutral-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-3xl p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-2xl">
                <Zap className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Supplier Dashboard
                </h1>
                <p className="text-green-600 font-semibold text-lg">
                  Manage Your Energy Supply Efficiently
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-lg max-w-2xl">
              Welcome back, Supplier {supplierName}. Track your energy supply
              and payments.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          icon={Zap}
          title="Total Energy Supplied"
          value={totalEnergySupplied}
          unit="kWh"
          color="text-green-500"
        />
        <KPICard
          icon={Wallet}
          title="Total Payment Received"
          value={`₹${totalPaymentReceived.toFixed(2)}`}
          unit=""
          color="text-green-600"
        />
        <KPICard
          icon={Activity}
          title="Transactions Count"
          value={transactions.length}
          unit="transactions"
          color="text-green-700"
        />
      </div>
{/* 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Transaction History
          </h3>
          <div className="h-48 grid place-items-center text-neutral-400">
            [Chart placeholder]
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Total Energy Supplied
          </h3>
          <div className="h-48 grid place-items-center text-neutral-400">
            [Chart placeholder]
          </div>
        </div>
      </div> */}

      {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Raise Issue</h3>
        <div className="space-y-4">
          <textarea
            className="w-full p-4 rounded-lg border-2 border-gray-300"
            placeholder="Describe the issue..."
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            rows={4}
          ></textarea>
          <button
            className="w-full p-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
            onClick={handleNewIssue}
          >
            Raise Issue
          </button>
        </div>
      </div> */}

      <div className="grid lg:grid-cols-1 gap-8">
        {/* <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Raised Issues</h3>
          </div>
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <HelpCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {issue.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {issue.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Payments from Provider</h3>
          </div>
          <div className="space-y-3">
            {providerPayouts.length === 0 ? (
              <div className="text-center text-neutral-500 py-6">No payouts yet</div>
            ) : (
              providerPayouts.slice(0, 10).map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
                >
                  <div>
                    <div className="font-medium text-gray-900">{payout.type}</div>
                    <div className="text-sm text-gray-500">{payout.date}{payout.kwh ? ` • ${payout.kwh} kWh` : ""}</div>
                  </div>
                  <div className="font-bold text-green-600">+₹{payout.amount}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default SupplierDashboard;
