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
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profile.png";
import { DashboardFooter } from "../components/DashboardFooter";
import Map from "../components/Map";
import bell from "../images/bell.png";

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "1";

  const [walletBalance, setWalletBalance] = React.useState(
    Number(localStorage.getItem("walletBalance") || "0")
  );
  const [unitsConsumed, setUnitsConsumed] = React.useState(
    Number(localStorage.getItem("unitsConsumed") || "0")
  );
  const [consumeKwh, setConsumeKwh] = React.useState(5);
  const [buyAmountRs, setBuyAmountRs] = React.useState(100);
  const platformFeePercent = Number(
    localStorage.getItem("platformFeePercent") || "10"
  );
  const providerPricePerKwh = Number(
    localStorage.getItem("providerPricePerKwh") || "5"
  );
  const [transactions, setTransactions] = React.useState(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) return JSON.parse(saved);
    return [];
  });
  const [activeSessions, setActiveSessions] = React.useState(
    Number(localStorage.getItem("activeSessions") || "0")
  );
  const [notificationCount, setNotificationCount] = React.useState(0);
  const kpiData = {
    walletBalance,
    unitsConsumed,
    activeSessions,
  };

  React.useEffect(() => {
    const onStorage = () => {
      setWalletBalance(Number(localStorage.getItem("walletBalance") || "0"));
      setUnitsConsumed(Number(localStorage.getItem("unitsConsumed") || "0"));
      const saved = localStorage.getItem("transactions");
      setTransactions(saved ? JSON.parse(saved) : []);
      const req = localStorage.getItem("energyRequests");
      setNotificationCount(req ? JSON.parse(req).length : 0);
    };
    window.addEventListener("storage", onStorage);
    onStorage();
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("nameOption");
    // Keep wallet/units unless you want to clear them too
    navigate("/login", { replace: true });
  };

  const handleConsume = () => {
    const kwh = Number(consumeKwh);
    if (!kwh || kwh <= 0) return alert("Enter valid kWh");
    const total = kwh * providerPricePerKwh;
    const currentWallet = Number(localStorage.getItem("walletBalance") || "0");
    if (total > currentWallet) return alert("Insufficient wallet balance");
    const newWallet = currentWallet - total;
    const newUnits = Number(localStorage.getItem("unitsConsumed") || "0") + kwh;
    localStorage.setItem("walletBalance", String(newWallet));
    localStorage.setItem("unitsConsumed", String(newUnits));
    const txns = JSON.parse(localStorage.getItem("transactions") || "[]");
    txns.unshift({
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      type: "Charging Session",
      amount: -total,
      status: "completed",
    });
    localStorage.setItem("transactions", JSON.stringify(txns.slice(0, 20)));
    const newSessions =
      Number(localStorage.getItem("activeSessions") || "0") + 1;
    localStorage.setItem("activeSessions", String(newSessions));
    setWalletBalance(newWallet);
    setUnitsConsumed(newUnits);
    setTransactions(txns.slice(0, 20));
    setActiveSessions(newSessions);
    alert(`Consumed ${kwh} kWh (₹${total})`);
  };

  const handleBuyEnergyWithRs = () => {
    const amount = Number(buyAmountRs);
    if (!amount || amount <= 0) return alert("Enter a valid amount (₹)");

    // Compute kWh based on provider price; fee will be applied by provider on accept
    const kwh = +(amount / providerPricePerKwh).toFixed(2);

    // Create energy request for provider approval
    const requestId = Date.now();
    const energyRequests = JSON.parse(
      localStorage.getItem("energyRequests") || "[]"
    );

    energyRequests.unshift({
      id: requestId,
      createdAt: new Date().toISOString(),
      consumerName: userName,
      amountGross: amount,
      kwh,
      status: "pending",
      // For display convenience
      note: `Request: Pay ₹${amount} for ~${kwh} kWh`
    });

    localStorage.setItem("energyRequests", JSON.stringify(energyRequests.slice(0, 50)));

    // Notify other dashboards
    window.dispatchEvent(new Event('storage'));

    alert("Request sent to provider. You'll be charged only if accepted.");
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
    <h1 className="text-3xl font-bold">CONSUMER DASHBORD</h1>
    <div className="flex items-center gap-3">
      {/* Notifications Button */}
      <button
  onClick={() => navigate("/notifications")}
  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-amber-600 transition flex items-center justify-center"
  aria-label="Notifications"
>
  <img
    src={bell}
    alt="Notifications"
    className="w-6 h-6 object-contain"
  />
  {notificationCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5">
      {notificationCount}
    </span>
  )}
</button>

      {/* Profile Image Button (acts as logout) */}
      <button
        onClick={handleLogout}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-amber-600 transition"
        aria-label="Logout"
      >
        <img
          src={profileImg}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>

      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl">
                <Zap className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  chargeMOD
                </h1>
                <p className="text-amber-600 font-semibold text-lg">
                  Empowering the Future of E‑Mobility
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-lg max-w-2xl">
              Welcome back, User {userName}. Manage your energy consumption and
              charging with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Wallet Balance */}
  <KPICard
    icon={Wallet}
    title="Wallet Balance"
    value={`₹${kpiData.walletBalance.toFixed(2)}`}
    unit=""
    color="text-blue-500"
  />

  {/* Units Consumed */}
  <KPICard
    icon={Activity}
    title="Units Consumed"
    value={kpiData.unitsConsumed}
    unit="kWh"
    color="text-purple-500"
  />

  {/* Active Sessions (spans 2 rows) */}
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 row-span-2 flex flex-col">
    <div className="flex items-center space-x-2 mb-3">
      <Zap className="text-amber-500 h-5 w-5" />
      <span className="text-gray-600 text-sm font-medium">Active Sessions</span>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-4">
      {kpiData.activeSessions}
    </div>
    {/* Dummy Graph */}
    <div className="flex-1 flex items-end space-x-2 h-48">
      <div className="w-4 bg-amber-200 h-12 rounded"></div>
      <div className="w-4 bg-amber-400 h-20 rounded"></div>
      <div className="w-4 bg-amber-500 h-32 rounded"></div>
      <div className="w-4 bg-amber-300 h-16 rounded"></div>
      <div className="w-4 bg-amber-600 h-40 rounded"></div>
    </div>
  </div>

  {/* Quick Actions */}
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
    <button
      className="flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all duration-200 w-full"
      onClick={() => navigate("/topup")}
    >
      <Plus className="text-amber-500 h-6 w-6" />
      <span className="font-semibold text-gray-700">Top Up Wallet</span>
    </button>
  </div>

  {/* Pay and Get */}
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <h3 className="text-xl font-bold text-gray-900 mb-4">Pay and Get</h3>
    <div className="flex items-center space-x-3">
      <input
        type="number"
        min={1}
        className="w-28 rounded border px-3 py-2"
        value={buyAmountRs}
        onChange={(e) => setBuyAmountRs(e.target.value)}
      />
      <span className="text-sm text-neutral-600">₹ amount</span>
      <button
        type="button"
        className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
        onClick={handleBuyEnergyWithRs}
      >
        Pay & Get Energy
      </button>
    </div>
  </div>
</div>

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
            {transactions.map((transaction) => (
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
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
  <h3 className="text-xl font-bold text-gray-900 mb-4">
    Charging Locations - Thiruvananthapuram
  </h3>
  <Map />
</div>

      <DashboardFooter />
    </div>
  );
};

export default ConsumerDashboard;



// Add footer below main content
