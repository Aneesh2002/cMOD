import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";

const Subscriptions = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";

  const plans = [
    {
      id: 1,
      name: "ChargeMOD Pay As You Go",
      description: "Pay only for the energy you consume with ET tokens.",
      highlight: "₹30/kWh • ₹30/ET",
      validityMonths: 1,
      styles: "bg-amber-50 border-amber-200",
      titleClass: "text-gray-900",
      textClass: "text-gray-700",
      badgeClass: "bg-amber-100 text-amber-700 border border-amber-200",
      buttonClass: "bg-amber-500 hover:bg-amber-600 text-white",
    },
    {
      id: 2,
      name: "ChargeMOD Basic",
      description: "Fixed monthly ET allocation for predictable usage.",
      highlight: "100 ET / month",
      validityMonths: 1,
      styles: "bg-amber-200 border-amber-300",
      titleClass: "text-gray-900",
      textClass: "text-gray-800",
      badgeClass: "bg-amber-300 text-amber-900 border border-amber-400",
      buttonClass: "bg-amber-600 hover:bg-amber-600/90 text-white",
    },
    {
      id: 3,
      name: "ChargeMOD Pro",
      description: "Unlimited charging for a flat monthly price.",
      highlight: "₹1,999 / month • Unlimited",
      validityMonths: 1,
      styles: "bg-amber-500 border-amber-600",
      titleClass: "text-white",
      textClass: "text-amber-50",
      badgeClass: "bg-amber-600 text-white border border-amber-600",
      buttonClass: "bg-white text-amber-700 hover:bg-amber-50",
    },
  ];

  const handleSelect = (plan) => {
    alert(`Selected: ${plan.name}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right pane: column layout so footer can stick */}
      <div className="flex flex-col flex-1">
        {/* Main grows to push footer down */}
        <main className="flex-1 p-6 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Subscription Plans</h1>
            <div className="flex items-center gap-3">
              <button
                className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
                onClick={() => navigate("/notifications")}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Subtitle / Hint */}
          <p className="text-gray-600">
            Hey {userName}, choose the plan that fits your charging needs. All plans below are simple boxes and show how long they’re valid.
          </p>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border shadow-sm p-6 transition hover:shadow-md ${plan.styles}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${plan.titleClass}`}>
                    {plan.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${plan.badgeClass}`}>
                    {plan.id === 1 ? "Base" : plan.id === 2 ? "Basic" : "Pro"}
                  </span>
                </div>

                <p className={`${plan.textClass} mt-1`}>{plan.description}</p>

                <div className="mt-4">
                  <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-lg border bg-white ${
                      plan.id === 3 ? "text-amber-800" : "text-amber-700"
                    }`}
                  >
                    {plan.highlight}
                  </span>
                </div>

                <div className="mt-4">
                  <p className={`text-sm ${plan.textClass}`}>
                    <span className="font-semibold">Validity:</span>{" "}
                    {plan.validityMonths} month
                    {plan.validityMonths > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => handleSelect(plan)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition ${plan.buttonClass}`}
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer at the very bottom */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Subscriptions;
