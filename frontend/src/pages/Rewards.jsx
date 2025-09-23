// src/pages/WalletPage.jsx
import React, { useState } from "react";
import { Bell, Wallet, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import { LogOut } from "lucide-react";

const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(500);
  const [tokenBalance, setTokenBalance] = useState(50);
  const [redeemAmount, setRedeemAmount] = useState("");

  const navigate = useNavigate();

  const handleRedeem = () => {
    const amount = parseInt(redeemAmount, 10);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (amount > tokenBalance) {
      alert("Not enough tokens to redeem.");
      return;
    }

    setTokenBalance(tokenBalance - amount);
    setWalletBalance(walletBalance + amount * 10); // 1 token = ₹10
    setRedeemAmount("");
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Main content */}
        <main className="flex-1 p-8 flex flex-col space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-neutral-900">Wallet</h1>
            <div className="flex items-center gap-4">
            </div>
          </div>

          {/* Wallet + Token balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200 flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-neutral-500">Wallet Balance</h2>
                <p className="text-3xl font-bold text-neutral-900 mt-1">₹{walletBalance}</p>
              </div>
            </div>

            <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200 flex items-center gap-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-neutral-500">Token Balance</h2>
                <p className="text-3xl font-bold text-neutral-900 mt-1">
                  {tokenBalance} Tokens
                </p>
              </div>
            </div>
          </div>

          {/* Redeem section */}
          <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Redeem Tokens</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Convert your tokens to wallet balance at a rate of <span className="font-semibold text-amber-600">1 Token = ₹10</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                placeholder="Enter token amount"
                className="flex-1 border-neutral-300 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600 transition"
              />
              <button
                onClick={handleRedeem}
                className="px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
              >
                Redeem
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default WalletPage;