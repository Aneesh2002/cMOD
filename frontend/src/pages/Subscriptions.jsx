import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import { getContract } from "../contract";

const Subscriptions = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const plans = [
    {
      id: 1,
      name: "ChargeMOD Pay As You Go",
      description: "Pay only for the energy you consume with ET tokens.",
      highlight: "₹30/kWh • ₹30/ET",
      validityMonths: 1,
      cost: 30,
      styles: "bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200",
      titleClass: "text-neutral-900",
      textClass: "text-neutral-900",
      badgeClass: "bg-neutral-700 text-neutral-300 border border-neutral-600",
      buttonClass: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    {
      id: 2,
      name: "ChargeMOD Basic",
      description: "Fixed monthly ET allocation for predictable usage.",
      highlight: "100 ET / month",
      validityMonths: 1,
      cost: 100,
      styles: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
      titleClass: "text-neutral-100",
      textClass: "text-neutral-100",
      badgeClass: "bg-amber-600 text-white border-amber-500",
      buttonClass: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    {
      id: 3,
      name: "ChargeMOD Pro",
      description: "Unlimited charging for a flat monthly price.",
      highlight: "₹1,999 / month • Unlimited",
      validityMonths: 1,
      cost: 1999,
      styles: "bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900",
      titleClass: "text-white",
      textClass: "text-neutral-200",
      badgeClass: "bg-amber-600 text-white border-none",
      buttonClass: "bg-amber-600 text-white hover:bg-neutral-100",
    },
  ];

  const handleSelect = async (plan) => {
    try {
      setLoadingPlanId(plan.id);
      const contract = await getContract();

      // Get user's wallet balance
      const [walletBalance] = await contract.getBalances(window.ethereum.selectedAddress);

      if (Number(walletBalance) < plan.cost) {
        alert("Insufficient wallet balance. Please top up before purchasing this plan.");
        setLoadingPlanId(null);
        return;
      }

      // Call contract to purchase subscription
      const tx = await contract.purchaseSubscription(plan.id);
      await tx.wait();

      alert(`Subscription "${plan.name}" purchased successfully!`);
      setLoadingPlanId(null);

      // Redirect to profile or refresh page
      navigate("/consumer-profile");
    } catch (err) {
      console.error(err);
      alert("Failed to purchase subscription.");
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 p-8 space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-neutral-900">Subscription Plans</h1>
          </div>

          <p className="text-lg text-neutral-600">
            Hey <span className="font-semibold text-neutral-900">{userName}</span>, choose the plan that fits your charging needs. All plans are valid for one month.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl border shadow-lg p-8 transition-all duration-300 transform hover:scale-105 ${plan.styles}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-2xl font-semibold ${plan.titleClass}`}>{plan.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${plan.badgeClass}`}>
                    {plan.id === 1 ? "Standard" : plan.id === 2 ? "Popular" : "Pro"}
                  </span>
                </div>

                <p className={`${plan.textClass} mt-2`}>{plan.description}</p>

                <div className="mt-6">
                  <span
                    className={`inline-block text-xl font-bold px-4 py-2 rounded-xl border-2 ${
                      plan.id === 3 ? "text-white border-amber-600" : "text-amber-600 border-amber-600 bg-white"
                    }`}
                  >
                    {plan.highlight}
                  </span>
                </div>

                <div className="mt-4">
                  <p className={`text-sm ${plan.textClass}`}>
                    <span className="font-semibold">Validity:</span> {plan.validityMonths} month{plan.validityMonths > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => handleSelect(plan)}
                    disabled={loadingPlanId === plan.id}
                    className={`w-full px-6 py-3 rounded-xl font-bold transition-all duration-300 ${plan.buttonClass} ${loadingPlanId === plan.id ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loadingPlanId === plan.id ? "Processing..." : "Select Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default Subscriptions;
