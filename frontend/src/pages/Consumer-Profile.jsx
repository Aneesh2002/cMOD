import React, { useState, useRef, useEffect } from "react";
import { Wallet, Zap, Activity, Bell, MapPin, User } from "lucide-react";
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

  // Updated Subscription plans (based on the new ET and cMT system)
  const plans = [
    {
      id: 1,
      name: "ChargeMOD Pay As You Go",
      description: "Pay only for the energy you consume with ET tokens.",
      pricePerET: 30, // 1 ET = ₹30
      pricePerKwh: 30, // 1 kWh = ₹30
      buttonText: "Claim Offer",
    },
    {
      id: 2,
      name: "ChargeMOD Basic",
      description: "Fixed rate for monthly energy usage. Receive a fixed amount of ET tokens.",
      monthlyET: 100, // Amount of ET provided monthly
      buttonText: "Claim Offer",
    },
    {
      id: 3,
      name: "ChargeMOD Pro",
      description: "Unlimited charging for a fixed price. Unlimited ET tokens.",
      buttonText: "Claim Offer",
    },
  ];

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

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <p className="text-gray-600">Name: {userName}</p>
            <p className="text-gray-600">Location: New Delhi</p>
            <p className="text-gray-600">Date of Birth: 01-Jan-1990</p>
          </div>

          {/* Subscription Plan Cards */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Subscription Plans</h3>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-gray-800">
                      {plan.name}
                    </span>
                    <span className="text-sm text-gray-500">{plan.description}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {plan.pricePerET && (
                      <span className="text-xl font-bold text-gray-900">
                        ₹{plan.pricePerET}/ET
                      </span>
                    )}
                    {plan.pricePerKwh && (
                      <span className="text-xl font-bold text-gray-900">
                        ₹{plan.pricePerKwh}/kWh
                      </span>
                    )}
                    {plan.monthlyET && (
                      <span className="text-xl font-bold text-gray-900">
                        {plan.monthlyET} ET/month
                      </span>
                    )}
                    <button
                      className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all"
                      onClick={() => alert(`${plan.name} - ${plan.buttonText}`)}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DashboardFooter />
      </main>
    </div>
  );
};

export default ConsumerProfile;
