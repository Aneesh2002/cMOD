import React from "react";
import {
  Wallet,
  Zap,
  TrendingUp,
  Plus,
  Activity,
  Smartphone,
  Download,
  HelpCircle,
  CheckCircle,
  User,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardFooter } from "../components/DashboardFooter";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "1";

  const [walletBalance, setWalletBalance] = React.useState(
    Number(localStorage.getItem("walletBalance") || "0")
  );
  const [totalEnergySupplied, setTotalEnergySupplied] = React.useState(
    Number(localStorage.getItem("totalEnergySupplied") || "0")
  );
  const [platformFeeReceived, setPlatformFeeReceived] = React.useState(
    Number(localStorage.getItem("platformFeeReceived") || "0")
  );
  const [platformFeePercent, setPlatformFeePercent] = React.useState(
    Number(localStorage.getItem("platformFeePercent") || "10")
  );
  const [transactions, setTransactions] = React.useState(() => {
    const saved = localStorage.getItem("providerTransactions");
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [energyRequests, setEnergyRequests] = React.useState([]);
  const [notificationCount, setNotificationCount] = React.useState(0);

  const applyGlobalFeeChange = (value) => {
    const next = Math.max(0, Math.min(100, Number(value) || 0));
    setPlatformFeePercent(next);
    localStorage.setItem("platformFeePercent", String(next));
    // notify all dashboards
    window.dispatchEvent(new Event('storage'));
  };

  // Handle energy request acceptance or rejection
  const handleEnergyRequest = (requestId, action) => {
    const currentRequests = [...energyRequests];
    const request = currentRequests.find((r) => r.id === requestId);
    const updatedRequests = currentRequests.filter((request) => request.id !== requestId);

    if (action === "accept") {
      if (!request) return;
      const amount = Number(request.amountGross || request.amount || 0);
      const kwh = Number(request.kwh || 0);

      // Check consumer wallet balance (shared key in this demo)
      const consumerWallet = Number(localStorage.getItem("walletBalance") || "0");
      if (amount > consumerWallet) {
        alert("Consumer has insufficient wallet balance. Request failed.");
        // remove from storage
        const stored = JSON.parse(localStorage.getItem("energyRequests") || "[]").filter((r) => r.id !== requestId);
        localStorage.setItem("energyRequests", JSON.stringify(stored));
        setEnergyRequests(updatedRequests);
        window.dispatchEvent(new Event('storage'));
        return;
      }

      const fee = +(amount * (platformFeePercent / 100)).toFixed(2);
      const energyRs = amount - fee;

      // Update consumer data
      const newConsumerWallet = consumerWallet - amount;
      const newUnits = Number(localStorage.getItem("unitsConsumed") || "0") + kwh;
      localStorage.setItem("walletBalance", String(newConsumerWallet));
      localStorage.setItem("unitsConsumed", String(newUnits));

      const txns = JSON.parse(localStorage.getItem("transactions") || "[]");
      const transactionId = Date.now();
      const transactionDate = new Date().toISOString().slice(0, 10);
      txns.unshift(
        {
          id: transactionId,
          date: transactionDate,
          type: `Energy Purchase (₹${amount})`,
          amount: -amount,
          status: "completed",
          role: "consumer",
          kwh: kwh,
          fee: fee,
        },
        {
          id: transactionId + 1,
          date: transactionDate,
          type: `Platform Fee ${platformFeePercent}%`,
          amount: -fee,
          status: "completed",
          role: "consumer",
        }
      );
      localStorage.setItem("transactions", JSON.stringify(txns.slice(0, 20)));

      // Update supplier data
      const supplierTxns = JSON.parse(localStorage.getItem("supplierTransactions") || "[]");
      supplierTxns.unshift({
        id: transactionId,
        date: transactionDate,
        type: `Energy Sale to Consumer`,
        amount: energyRs,
        status: "completed",
        role: "supplier",
        kwh: kwh,
        consumerAmount: amount,
        fee: fee,
      });
      localStorage.setItem("supplierTransactions", JSON.stringify(supplierTxns.slice(0, 20)));

      const currentSupplied = Number(localStorage.getItem("totalEnergySupplied") || "0");
      const newSupplied = currentSupplied + kwh;
      localStorage.setItem("totalEnergySupplied", String(newSupplied));

      const currentPayment = Number(localStorage.getItem("totalPaymentReceived") || "0");
      const newPayment = currentPayment + energyRs;
      localStorage.setItem("totalPaymentReceived", String(newPayment));

      // Update provider data
      const providerTxns = JSON.parse(localStorage.getItem("providerTransactions") || "[]");
      providerTxns.unshift({
        id: transactionId,
        date: transactionDate,
        type: `Platform Fee from Energy Sale`,
        amount: fee,
        status: "completed",
        role: "provider",
        kwh: kwh,
        totalAmount: amount,
        supplierAmount: energyRs,
      });
      providerTxns.unshift({
        id: transactionId + 2,
        date: transactionDate,
        type: `Payout to Supplier`,
        amount: -energyRs,
        status: "completed",
        role: "provider",
        kwh: kwh,
        totalAmount: amount,
        supplierAmount: energyRs,
      });
      localStorage.setItem("providerTransactions", JSON.stringify(providerTxns.slice(0, 20)));

      const providerPayouts = JSON.parse(localStorage.getItem("providerPayouts") || "[]");
      providerPayouts.unshift({
        id: transactionId + 2,
        date: transactionDate,
        type: "Payout to Supplier",
        amount: energyRs,
        kwh,
        status: "completed",
      });
      localStorage.setItem("providerPayouts", JSON.stringify(providerPayouts.slice(0, 50)));

      const currentPlatformFee = Number(localStorage.getItem("platformFeeReceived") || "0");
      const newPlatformFee = currentPlatformFee + fee;
      localStorage.setItem("platformFeeReceived", String(newPlatformFee));

      const currentProviderSupplied = Number(localStorage.getItem("providerEnergySupplied") || "0");
      const newProviderSupplied = currentProviderSupplied + kwh;
      localStorage.setItem("providerEnergySupplied", String(newProviderSupplied));

      // Remove request from storage
      const stored = JSON.parse(localStorage.getItem("energyRequests") || "[]");
      const filtered = stored.filter((r) => r.id !== requestId);
      localStorage.setItem("energyRequests", JSON.stringify(filtered));

      // sync local provider state
      setWalletBalance(Number(localStorage.getItem("walletBalance") || "0"));
      setTotalEnergySupplied(Number(localStorage.getItem("providerEnergySupplied") || "0"));
      setPlatformFeeReceived(Number(localStorage.getItem("platformFeeReceived") || "0"));

      alert(
        `Accepted: ${kwh} kWh, consumer paid ₹${amount} (fee ₹${fee.toFixed(2)}), supplier gets ₹${energyRs.toFixed(2)}`
      );
    } else {
      // reject: just remove from storage
      const stored = JSON.parse(localStorage.getItem("energyRequests") || "[]");
      const filtered = stored.filter((r) => r.id !== requestId);
      localStorage.setItem("energyRequests", JSON.stringify(filtered));
    }

    setEnergyRequests(updatedRequests);
    // notify all dashboards
    window.dispatchEvent(new Event('storage'));
  };

  // Re-render transactions based on local storage updates
  React.useEffect(() => {
    const onStorage = () => {
      const savedTransactions = localStorage.getItem("providerTransactions");
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : []);
      const savedEnergyRequests = localStorage.getItem("energyRequests");
      setEnergyRequests(
        savedEnergyRequests ? JSON.parse(savedEnergyRequests) : []
      );
      const req = localStorage.getItem("energyRequests");
      setNotificationCount(req ? JSON.parse(req).length : 0);
      setPlatformFeePercent(Number(localStorage.getItem("platformFeePercent") || "10"));
      // Update provider metrics
      setTotalEnergySupplied(Number(localStorage.getItem("providerEnergySupplied") || "0"));
      setPlatformFeeReceived(Number(localStorage.getItem("platformFeeReceived") || "0"));
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

  const KPICard = ({ icon: Icon, title, value, unit, color, trend }) => (
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
          {trend && (
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="text-green-500 h-4 w-4" />
              <span className="text-green-500 font-medium">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">PROVIDER DASHBOARD</h1>
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

      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl">
                <Zap className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Provider Dashboard
                </h1>
                <p className="text-blue-600 font-semibold text-lg">
                  Empowering the Future of E‑Mobility
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-lg max-w-2xl">
              Welcome back, Provider {userName}. Manage your energy supply and
              resolve issues with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          icon={Wallet}
          title="Platform Fee Balance"
          value={`₹${platformFeeReceived.toFixed(2)}`}
          unit=""
          color="text-blue-500"
        />
        <KPICard
          icon={Zap}
          title="Total Energy Supplied"
          value={totalEnergySupplied}
          unit="kWh"
          color="text-indigo-500"
        />
        <KPICard
          icon={Activity}
          title="Total Transactions"
          value={transactions.length}
          unit="transactions"
          color="text-teal-500"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            onClick={() => navigate("/add-supplier")}
          >
            <Plus className="text-blue-500 h-6 w-6" />
            <span className="font-semibold text-gray-700">Add Supplier</span>
          </button>
          {/* <button
            className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
            onClick={() => navigate("/resolve-issues")}
          >
            <HelpCircle className="text-red-500 h-6 w-6" />
            <span className="font-semibold text-gray-700">Resolve Issues</span>
          </button> */}
          <div className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200">
            <label className="text-sm text-neutral-700">Platform Fee (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              className="w-20 rounded border px-2 py-1"
              value={platformFeePercent}
              onChange={(e) => applyGlobalFeeChange(e.target.value)}
            />
            <span className="text-xs text-neutral-500">Applies across dashboards</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Energy Requests</h3>
          </div>
          <div className="space-y-3">
            {energyRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      (request.amountGross || request.amount || 0) > 0 ? "bg-blue-100" : "bg-red-100"
                    }`}
                  >
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Request for {request.kwh} kWh of energy
                    </p>
                    <p className="text-sm text-gray-500">₹{request.amountGross || request.amount}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    className="text-green-500 font-medium"
                    onClick={() => handleEnergyRequest(request.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="text-red-500 font-medium"
                    onClick={() => handleEnergyRequest(request.id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
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
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                    {transaction.kwh && (
                      <p className="text-xs text-gray-400">{transaction.kwh} kWh</p>
                    )}
                  </div>
                </div>
                <span
                  className={`font-bold ${
                    transaction.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}₹
                  {Math.abs(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default ProviderDashboard;
