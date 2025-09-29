import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import { getContract } from "../contract";

const ConsumerProfile = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";

  const [walletBalance, setWalletBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfileData = async () => {
    try {
      const contract = await getContract();
      const [wallet] = await contract.getBalances(window.ethereum.selectedAddress);
      setWalletBalance(Number(wallet));

      const subData = await contract.getUserSubscription(window.ethereum.selectedAddress);

      // Only set subscription if plan id is not 0 and expiry is in the future
      if (subData && subData.plan.id !== "0" && Number(subData.expiryTimestamp) > Date.now() / 1000) {
        setSubscription({
          planName: subData.plan.name,
          price: subData.cost,
          validityMonths: subData.plan.validityMonths,
          expiry: new Date(Number(subData.expiryTimestamp) * 1000),
        });
      } else {
        setSubscription(null);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <main className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Consumer Profile</h1>
        </div>

        {/* Greeting / Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900">chargeMOD</h1>
          <p className="text-amber-600 font-semibold text-lg">
            Empowering the Future of E-Mobility
          </p>
          <p className="text-gray-700 text-lg mt-2">
            Welcome back, {userName}. Manage your energy consumption and charging with ease.
          </p>
        </div>

        {/* Profile Details + Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Profile Information</h3>
            <p className="text-gray-600">Name: {userName}</p>
            <p className="text-gray-600">Wallet Balance: ₹{walletBalance}</p>
            <p className="text-gray-600">Location: New Delhi</p>
            <p className="text-gray-600">Date of Birth: 01-Jan-1990</p>
            <button
              onClick={handleLogout}
              className="mt-4 rounded bg-amber-600 text-white px-4 py-2"
            >
              Logout
            </button>
          </div>

          {/* Active Subscription */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">Subscription</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  subscription
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-gray-100 text-gray-500 border-gray-200"
                }`}
              >
                {subscription ? "Active" : "None"}
              </span>
            </div>

            {subscription ? (
              <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 min-h-48">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Left: plan info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {subscription.planName}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="inline-block text-sm font-semibold px-3 py-1 rounded-lg bg-white border">
                        {subscription.price} Tokens / month
                      </span>
                    </div>
                  </div>

                  {/* Right: status */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Expires on {subscription.expiry.toLocaleDateString()}{" "}
                      {subscription.expiry.toLocaleTimeString()}
                    </p>
                    <button
                      className="mt-3 px-4 py-2 rounded-lg bg-gray-200 text-gray-600 cursor-not-allowed"
                    >
                      Active
                    </button>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-emerald-300/60" />
              </div>
            ) : (
              <p className="text-gray-600 mt-4">
                No active subscription. Purchase one from the Subscriptions page.
              </p>
            )}
          </div>
        </div>

        <DashboardFooter />
      </main>
    </div>
  );
};

export default ConsumerProfile;
