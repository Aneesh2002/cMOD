import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileImg from "../images/profile.png";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";

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

const ConsumerProfile = () => {
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

  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const onStorage = () => {
      setWalletBalance(Number(localStorage.getItem("walletBalance") || "0"));
      setUnitsConsumed(Number(localStorage.getItem("unitsConsumed") || "0"));
      setActiveSessions(Number(localStorage.getItem("activeSessions") || "0"));
    };

    window.addEventListener("storage", onStorage);
    onStorage(); // Sync on first load

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 🔒 Hardcoded active subscription
  const activePlan = {
    id: 3,
    name: "ChargeMOD Pro",
    description: "Unlimited charging for a fixed monthly price with unlimited ET tokens.",
    flatMonthlyPrice: "₹1,999 / month",
    expiryText: "Expires on 31 Dec 2025, 23:59 IST",
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Consumer Profile</h1>
          <div className="flex items-center gap-3 relative">
            <button
              className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
              onClick={() => navigate("/notifications")}
            >
              <Bell className="h-5 w-5" />
            </button>

            {/* Profile Button */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:ring-2 hover:ring-amber-600 transition"
            >
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
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

        {/* Greeting / Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900">chargeMOD</h1>
          <p className="text-amber-600 font-semibold text-lg">
            Empowering the Future of E-Mobility
          </p>
          <p className="text-gray-700 text-lg mt-2">
            Welcome back, {userName}. Manage your energy consumption and
            charging with ease.
          </p>
        </div>

        {/* Profile Details + Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <p className="text-gray-600">Name: {userName}</p>
            <p className="text-gray-600">Location: New Delhi</p>
            <p className="text-gray-600">Date of Birth: 01-Jan-1990</p>
          </div>

          {/* Active Subscription */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Subscription</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                Active
              </span>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 min-h-48">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left: plan info */}
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {activePlan.name}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{activePlan.description}</p>

                  <div className="mt-4">
                    <span className="inline-block text-sm font-semibold px-3 py-1 rounded-lg bg-white border">
                      {activePlan.flatMonthlyPrice}
                    </span>
                  </div>
                </div>

                {/* Right: status */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">{activePlan.expiryText}</p>
                  <button
                    className="mt-3 px-4 py-2 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed"
                    disabled
                  >
                    Active
                  </button>
                </div>
              </div>

              {/* Decorative stripe */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-300/60" />
            </div>
          </div>
        </div>

        <DashboardFooter />
      </main>
    </div>
  );
};

export default ConsumerProfile;
