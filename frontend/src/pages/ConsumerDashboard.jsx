import React, { useState, useRef, useEffect } from "react";
import {
  Wallet,
  Zap,
  TrendingUp,
  Plus,
  Activity,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profile.png";
import { DashboardFooter } from "../components/DashboardFooter";
import Map from "../components/Map";
import StationMap1 from "../components/StationMap1";
import StationMap2 from "../components/StationMap2";
import StationMap3 from "../components/StationMap3";

const Dropdown = ({ children, open, setOpen }) => {
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      {children}
    </div>
  );
};

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";

  const [walletBalance, setWalletBalance] = React.useState(
    Number(localStorage.getItem("walletBalance") || "0")
  );
  const [unitsConsumed, setUnitsConsumed] = React.useState(
    Number(localStorage.getItem("unitsConsumed") || "0")
  );
  const [consumeKwh, setConsumeKwh] = React.useState(5);
  const [buyAmountRs, setBuyAmountRs] = React.useState(100);
  const providerPricePerKwh = Number(localStorage.getItem("providerPricePerKwh") || "5");
  const [activeSessions, setActiveSessions] = React.useState(
    Number(localStorage.getItem("activeSessions") || "0")
  );
  const [notificationCount, setNotificationCount] = React.useState(0);

  // dropdown state
  const [showProfile, setShowProfile] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);

  // KPIs
  const kpiData = { walletBalance, unitsConsumed, activeSessions };

  React.useEffect(() => {
    const onStorage = () => {
      setWalletBalance(Number(localStorage.getItem("walletBalance") || "0"));
      setUnitsConsumed(Number(localStorage.getItem("unitsConsumed") || "0"));
      setActiveSessions(Number(localStorage.getItem("activeSessions") || "0"));
      const req = localStorage.getItem("energyRequests");
      setNotificationCount(req ? JSON.parse(req).length : 0);
    };
    window.addEventListener("storage", onStorage);
    onStorage();
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

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
            <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CONSUMER DASHBOARD</h1>
        <div className="flex items-center gap-3 relative">
          <button
            className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Transactions Button */}
        <button
  className="rounded-full border-2 border-gray-300 px-3 py-1 hover:ring-2 hover:ring-amber-600 transition"
  onClick={() => navigate("/transactions-page")}
>
  Transactions
</button>

          {/* Profile Button */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-amber-600 transition"
          >
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </button>
          <Dropdown open={showProfile} setOpen={setShowProfile}>
            <div className="flex flex-col items-center mt-[150px] p-4">
              <img src={profileImg} alt="Profile" className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2" />
              <p className="font-medium text-gray-900 mb-2">{userName}</p>
              <button
                onClick={handleLogout}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Greeting */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900">chargeMOD</h1>
        <p className="text-amber-600 font-semibold text-lg">
          Empowering the Future of E-Mobility
        </p>
        <p className="text-gray-700 text-lg mt-2">
          Welcome back, {userName}. Manage your energy consumption and charging with ease.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KPICard icon={Wallet} title="Wallet Balance" value={walletBalance} unit="₹" color="text-blue-500" />
        <KPICard icon={Activity} title="Units Consumed" value={unitsConsumed} unit="kWh" color="text-purple-500" />
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 row-span-2 flex flex-col">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="text-amber-500 h-5 w-5" />
            <span className="text-gray-600 text-sm font-medium">Active Sessions</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-4">{activeSessions}</div>
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
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
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
          <h3 className="text-xl font-bold mb-4">Pay and Get</h3>
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
              onClick={() => alert("Pay & Get Energy")}
            >
              Pay & Get Energy
            </button>
          </div>
        </div>
      </div>

    {/* Nearby Stations Section */}
<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
  <h3 className="text-xl font-bold mb-4">Nearby Stations</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    {/* Map 1 */}
    <div className="h-60 rounded-xl overflow-hidden  shadow bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 bg-amber-500">
        <h3 className="text-base font-semibold text-white">chargeMOD Station 1</h3>
      </div>
      {/* Map */}
      <div className="flex-1">
        <StationMap1 />
      </div>
    </div>

    {/* Map 2 */}
    <div className="h-60 rounded-xl overflow-hidden  shadow bg-white flex flex-col">
      <div className="px-4 py-2 bg-amber-500">
        <h3 className="text-base font-semibold text-white">KSEB Charging Station</h3>
      </div>
      <div className="flex-1">
        <StationMap2 />
      </div>
    </div>

    {/* Map 3 */}
    <div className="h-60 rounded-xl overflow-hidden  shadow bg-white flex flex-col">
      <div className="px-4 py-2 bg-amber-500">
        <h3 className="text-base font-semibold text-white">EESL Charging Station</h3>
      </div>
      <div className="flex-1">
        <StationMap3 />
      </div>
    </div>

  </div>
</div>



      {/* Map */}
      <div className="bg-white rounded-2xl p-6 shadow-lg  border-gray-100">
        <h3 className="text-xl font-bold mb-4">Charging Locations - Thiruvananthapuram</h3>
        <Map />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default ConsumerDashboard;
