// src/pages/ConsumerDashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { Wallet, Zap, Activity, Bell, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profile.png";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import Map from "../components/Map";
import StationList from "../components/StationList";

/* ---------- Small dropdown ---------- */
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
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
    >
      {children}
    </div>
  );
};

/* ---------- Generic KPI card (for Units only) ---------- */
const KPICard = ({ icon: Icon, title, value, unit, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center space-x-2 mb-2">
      <Icon className={`${color} h-5 w-5`} />
      <span className="text-gray-600 text-sm font-medium">{title}</span>
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-1">
      {typeof value === "number" ? value.toLocaleString() : value}
      <span className="text-lg font-normal text-gray-500 ml-1">{unit}</span>
    </div>
  </div>
);

export default function ConsumerDashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";

  const [walletBalance, setWalletBalance] = useState(
    Number(localStorage.getItem("walletBalance") || "0")
  );
  const [unitsConsumed, setUnitsConsumed] = useState(
    Number(localStorage.getItem("unitsConsumed") || "0")
  );
  const [activeSessions, setActiveSessions] = useState(
    Number(localStorage.getItem("activeSessions") || "0")
  );

  // ₹ per kWh (for quoting request)
  const providerPricePerKwh = Number(
    localStorage.getItem("providerPricePerKwh") || "5"
  );

  // inputs
  const [addMoneyAmount, setAddMoneyAmount] = useState(100);
  const [payAmountRs, setPayAmountRs] = useState(100);

  const [notificationCount, setNotificationCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  // ---- stations list mock (replace with your data) ----
  const stations = [
    {
      id: 1,
      name: "Tesla Station",
      address: "1780 N Beale Rd, Marysville",
      ports: 10,
      types: ["Tesla (AC/DC) 100 kW", "Nissan (DC) 60 kW"],
      parkingFee: "₹0.1",
      perKwh: "₹0.5",
      arrive: "Today 09:15",
      depart: "11:25",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Olsun Station",
      address: "11931 Giusti Rd, Herald",
      ports: 7,
      types: ["Tesla (AC/DC) 100 kW", "Nissan (DC) 60 kW"],
      parkingFee: "₹0.2",
      perKwh: "₹0.6",
      arrive: "Today 09:11",
      depart: "11:45",
      rating: 4.5,
    },
  ];

  /* ---------- helpers ---------- */
  const readJSON = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key) || fallback);
    } catch {
      return JSON.parse(fallback);
    }
  };
  const writeJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const pushTransaction = (tx) => {
    const list = readJSON("transactions", "[]");
    writeJSON("transactions", [tx, ...list]);
  };

  /* ---------- lifecycle ---------- */
  useEffect(() => {
    const onStorage = () => {
      setWalletBalance(Number(localStorage.getItem("walletBalance") || "0"));
      setUnitsConsumed(Number(localStorage.getItem("unitsConsumed") || "0"));
      setActiveSessions(Number(localStorage.getItem("activeSessions") || "0"));

      const req = localStorage.getItem("energyRequests");
      setNotificationCount(req ? JSON.parse(req).length : 0);
    };
    window.addEventListener("storage", onStorage);
    onStorage(); // initial sync
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  /* ---------- actions ---------- */

  // Add Money (inside Wallet card)
  const handleAddMoney = () => {
    const amount = Number(addMoneyAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Enter a valid amount (> 0)");
      return;
    }
    const newBal = walletBalance + amount;
    setWalletBalance(newBal);
    localStorage.setItem("walletBalance", String(newBal));

    pushTransaction({
      id: Date.now(),
      type: "Wallet Top-up",
      direction: "credit",
      amount,
      currency: "INR",
      note: "Added funds to wallet",
      createdAt: new Date().toISOString(),
    });

    try {
      window.dispatchEvent(new Event("storage"));
    } catch {}
    alert(`Added ₹${amount.toLocaleString()} to your wallet.`);
  };

  // Pay & Get Energy -> SEND REQUEST { kwh, amount }
  const handlePayAndGet = () => {
    const rupees = Number(payAmountRs);
    if (!Number.isFinite(rupees) || rupees <= 0) {
      alert("Enter a valid amount (> 0)");
      return;
    }
    if (rupees > walletBalance) {
      alert("Insufficient wallet balance. Please add money first.");
      return;
    }
    if (providerPricePerKwh <= 0) {
      alert("Invalid price per kWh.");
      return;
    }

    const kwh = Math.round((rupees / providerPricePerKwh) * 100) / 100;

    const request = {
      id: Date.now(),
      kwh,
      amount: rupees,
      amountGross: rupees,
      pricePerKwh: providerPricePerKwh,
      requestedBy: userName,
      createdAt: new Date().toISOString(),
    };

    const list = readJSON("energyRequests", "[]");
    writeJSON("energyRequests", [request, ...list]);
    setNotificationCount(list.length + 1);

    try {
      window.dispatchEvent(new Event("storage"));
    } catch {}

    alert(
      `Request sent to provider: ₹${rupees.toLocaleString()} (~${kwh} kWh). Awaiting approval.`
    );
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right pane: column layout, footer at bottom */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Main */}
        <main className="flex-1 p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">CONSUMER DASHBOARD</h1>
            <div className="flex items-center gap-3 relative">
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
                onClick={() => setShowProfile(!showProfile)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-amber-600 transition"
                aria-label="Profile"
              >
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              </button>

              <Dropdown open={showProfile} setOpen={setShowProfile}>
                <div className="flex flex-col items-center p-4">
                  <img
                    src={profileImg}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2"
                  />
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

          {/* Greeting / Hero */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900">chargeMOD</h1>
            <p className="text-amber-600 font-semibold text-lg">
              Empowering the Future of E-Mobility
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Welcome back, {userName}. Manage your energy consumption and charging with ease.
            </p>
          </div>

          {/* KPI + cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wallet Balance KPI + Add Money */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="text-blue-500 h-5 w-5" />
                <span className="text-gray-600 text-sm font-medium">Wallet Balance</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {walletBalance.toLocaleString()}
                <span className="text-lg font-normal text-gray-500 ml-1">₹</span>
              </div>

              {/* Add Money (compact) */}
              <div className="rounded-xl border bg-neutral-50 p-4">
                <div className="text-xs text-gray-600 mb-2">Add Money</div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    className="w-28 rounded border px-3 py-1.5"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                  />
                  <span className="text-xs text-neutral-600">₹ amount</span>
                  <button
                    type="button"
                    className="rounded bg-amber-600 text-white px-3 py-1.5 hover:bg-amber-700"
                    onClick={handleAddMoney}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Units Consumed KPI */}
            <KPICard
              icon={Activity}
              title="Units Consumed"
              value={unitsConsumed}
              unit="kWh"
              color="text-purple-500"
            />

            {/* Active Sessions (taller card) */}
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

            {/* Pay & Get Energy */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-semibold">Pay & Get Energy</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Price: ₹{providerPricePerKwh}/kWh. This sends a request to the provider. Your wallet
                will be charged and kWh added after approval.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  min={1}
                  className="w-32 rounded border px-3 py-2"
                  value={payAmountRs}
                  onChange={(e) => setPayAmountRs(e.target.value)}
                />
                <span className="text-sm text-neutral-600">₹ amount</span>
                <button
                  type="button"
                  className="rounded border px-4 py-2 hover:bg-neutral-50"
                  onClick={handlePayAndGet}
                >
                  Pay & Get Energy
                </button>
                <span className="text-xs text-gray-500">
                  ≈{" "}
                  {Number(payAmountRs) > 0 && providerPricePerKwh > 0
                    ? (Number(payAmountRs) / providerPricePerKwh).toFixed(2)
                    : "0.00"}{" "}
                  kWh
                </span>
              </div>
            </div>

            {/* Nearest Station (left) */}
            <div className="bg-white rounded-2xl p-0 shadow-lg border border-gray-100 lg:col-span-1 overflow-hidden">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-600" />
                  <h3 className="text-lg font-semibold">Nearest Station</h3>
                </div>
                <span className="text-xs text-gray-500">Auto-detected</span>
              </div>
              <div className="h-72">
                <Map />
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">chargeMOD Station</div>
                  <div className="text-gray-500 text-xs">Approx. 0.4 km • 4 ports available</div>
                </div>
                <button
                  className="rounded-lg bg-amber-600 text-white px-4 py-2 hover:bg-amber-700"
                  onClick={() => alert("Get Directions")}
                >
                  Get Directions
                </button>
              </div>
            </div>

            {/* Stations List (right) — now using the reusable component */}
            <StationList
              stations={stations}
              className="lg:col-span-2"
              onBook={(s) => alert(`Booking started for: ${s.name}`)}
              onSupport={(s) => alert(`Support requested for: ${s.name}`)}
              onFavorite={() => alert("Favorited stations!")}
            />
          </div>
        </main>

        {/* Footer at the very bottom */}
        <DashboardFooter />
      </div>
    </div>
  );
}
