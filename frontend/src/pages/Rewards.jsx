// src/pages/WalletPage.jsx
import React, { useState, useEffect } from "react";
import { Wallet, Bubbles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import { ethers } from "ethers";
import { contractAddress, abi } from "../contract";

const WalletPage = () => {
  const [wallet, setWallet] = useState("0");
  const [tokens, setTokens] = useState("0");
  const [energyTokens, setEnergyTokens] = useState("0");

  // Separate state for each input box
  const [walletAmount, setWalletAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [energyAmount, setEnergyAmount] = useState("");

  const navigate = useNavigate();

  // Load balances from contract
  const loadBalances = async () => {
    try {
      if (!window.ethereum) return alert("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const [walletBalance, tokenBalance] = await contract.getBalances(addr);
      setWallet(walletBalance.toString());
      setTokens(tokenBalance.toString());

      // Mock energy token for now
      setEnergyTokens("75");
    } catch (err) {
      console.error("Error loading balances:", err);
    }
  };

  const handleTopUp = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.topUpFiat(amt);
      await tx.wait();
      loadBalances();
      setWalletAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to top up wallet");
    }
  };

  const handleBuyTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.buyTokens(amt);
      await tx.wait();
      loadBalances();
      setTokenAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to buy tokens");
    }
  };

  const handleSellTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.sellTokens(amt);
      await tx.wait();
      loadBalances();
      setTokenAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to sell tokens");
    }
  };

  const handleBuyEnergyTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");

      setEnergyTokens((prev) => (Number(prev) + amt).toString());
      alert(`Successfully purchased ${amt} energy tokens!`);
      loadBalances();
      setEnergyAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to buy energy tokens");
    }
  };

  const handleSellEnergyTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");
      if (Number(energyTokens) < amt) return alert("Insufficient energy tokens");

      setEnergyTokens((prev) => (Number(prev) - amt).toString());
      alert(`Successfully sold ${amt} energy tokens!`);
      loadBalances();
      setEnergyAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to sell energy tokens");
    }
  };

  useEffect(() => {
    loadBalances();
  }, []);

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 p-8 flex flex-col space-y-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-neutral-900">Wallet</h1>
          </div>

          {/* Wallet + CmT Tokens + Energy Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wallet Balance */}
            <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200">
              <h2 className="text-lg font-semibold mb-3">Wallet Balance</h2>
              <p className="mb-3 text-gray-700 font-medium">Balance: ₹{wallet}</p>
              <input
                type="number"
                placeholder="Enter amount"
                value={walletAmount}
                onChange={(e) => setWalletAmount(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleTopUp(Number(walletAmount))}
                  className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
                >
                  Top-Up
                </button>
                {[100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleTopUp(amt)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* CmT Token Balance */}
            <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200">
              <h2 className="text-lg font-semibold mb-3">CmT Token Balance</h2>
              <p className="mb-3 text-gray-700 font-medium">Tokens: {tokens}</p>
              <input
                type="number"
                placeholder="Enter amount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleBuyTokens(Number(tokenAmount))}
                  className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleSellTokens(Number(tokenAmount))}
                  className="px-3 py-1 bg-red-200 rounded hover:bg-red-300"
                >
                  Sell
                </button>
                {[10, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleBuyTokens(amt)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Buy {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Token Balance */}
            <div className="p-8 shadow-md rounded-2xl bg-white border border-neutral-200">
              <h2 className="text-lg font-semibold mb-3">Energy Token Balance</h2>
              <p className="mb-3 text-gray-700 font-medium">
                Energy Tokens: {energyTokens} kWh
              </p>
              <input
                type="number"
                placeholder="Enter amount"
                value={energyAmount}
                onChange={(e) => setEnergyAmount(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleBuyEnergyTokens(Number(energyAmount))}
                  className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleSellEnergyTokens(Number(energyAmount))}
                  className="px-3 py-1 bg-orange-200 rounded hover:bg-orange-300"
                >
                  Sell
                </button>
                {[25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleBuyEnergyTokens(amt)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Buy {amt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default WalletPage;
