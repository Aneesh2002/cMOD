import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Map from "../components/Map";
import Graph from "../components/ConsumerComponents/Graph";
import { ethers } from "ethers";
import { contractAddress, abi } from "../contract";
import { Wallet, Bubbles, Zap } from "lucide-react";

const ConsumerDashboard = () => {
  const [wallet, setWallet] = useState("0");
const [tokens, setTokens] = useState("0");
const [energyTokens, setEnergyTokens] = useState("0");
  const [transactions, setTransactions] = useState([]);
  const [energyPackets, setEnergyPackets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sellRequestSent, setSellRequestSent] = useState(false);
  const [sellRequestApproved, setSellRequestApproved] = useState(false);

  const MINIMUM_ENERGY_TO_SELL = 50; // Minimum energy tokens required to sell

  // Keep transactions working
  const loadTransactions = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const txs = await contract.getUserTransactions(addr);
      const formatted = txs.map((tx) => ({
        type: tx.transactionType,
        amount: tx.amount.toString(),
        time: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
      }));
      setTransactions(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // Load energy packets from suppliers
  const loadEnergyPackets = async () => {
    try {
      setLoading(true);
      if (!window.ethereum) return;

      // Mock data for now
      const mockPackets = [
        {
          id: 1,
          supplier: "GreenPower Co.",
          energy: "50 kWh",
          price: "₹500",
          pricePerUnit: "₹10/kWh",
          available: true,
          renewable: true,
        },
        {
          id: 2,
          supplier: "Solar Energy Ltd.",
          energy: "100 kWh",
          price: "₹900",
          pricePerUnit: "₹9/kWh",
          available: true,
          renewable: true,
        },
        {
          id: 3,
          supplier: "Wind Power Inc.",
          energy: "75 kWh",
          price: "₹675",
          pricePerUnit: "₹9/kWh",
          available: false,
          renewable: true,
        },
      ];

      setEnergyPackets(mockPackets);
    } catch (err) {
      console.error("Error loading energy packets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load balances dynamically from contract
const loadBalances = async () => {
  try {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    // Fetch wallet + CmT token balances
    const [walletBalance, tokenBalance] = await contract.getBalances(addr);
    setWallet(walletBalance.toString());
    setTokens(tokenBalance.toString());

    // Fetch energy tokens (replace mock with actual contract call later)
    // Example: const energyBal = await contract.getEnergyBalance(addr);
    // setEnergyTokens(energyBal.toString());
    setEnergyTokens("75"); // mock until contract supports it
  } catch (err) {
    console.error("Error loading balances:", err);
  }
};


  // Purchase energy packet
  const handlePurchasePacket = async (packetId, price) => {
    try {
      alert(`Energy packet ${packetId} purchased successfully!`);
      loadEnergyPackets();
      loadTransactions();
    } catch (err) {
      console.error("Error purchasing packet:", err);
      alert("Failed to purchase energy packet");
    }
  };

  // Handle energy selling request
  const handleSellEnergyRequest = async () => {
    try {
      if (Number(energyTokens) < MINIMUM_ENERGY_TO_SELL) {
        alert(`You need at least ${MINIMUM_ENERGY_TO_SELL} energy tokens to sell energy.`);
        return;
      }

      setSellRequestSent(true);
      alert("Your request to sell energy has been sent to the provider.");

      // Mock approval after 3 seconds
      setTimeout(() => {
        setSellRequestApproved(true);
        alert("✅ Request approved! You can now sell energy.");
      }, 3000);
    } catch (err) {
      console.error("Error sending sell request:", err);
      alert("Failed to send sell energy request");
    }
  };

  useEffect(() => {
  loadBalances();
  loadTransactions();
  loadEnergyPackets();
}, []);


  // Persist approval status
  useEffect(() => {
    if (sellRequestApproved) {
      localStorage.setItem("sellEnergyApproved", "true");
    }
  }, [sellRequestApproved]);

  useEffect(() => {
    const approvalStatus = localStorage.getItem("sellEnergyApproved");
    if (approvalStatus === "true") {
      setSellRequestApproved(true);
    }
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900 rounded-3xl p-8 border border-gray-100 mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-sm">
          Manage your wallet, tokens, and purchase energy packets from suppliers.
        </p>
      </div>

      {/* Balance Cards Grid (Static only) */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Wallet Balance */}
  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-blue-200 text-blue-700">
        <Wallet className="h-7 w-7" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-blue-800">Wallet Balance</h2>
        <p className="text-2xl font-bold text-blue-900 mt-1">₹{wallet}</p>
      </div>
    </div>
  </div>

  {/* CmT Token Balance */}
  <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl shadow hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-amber-200 text-amber-700">
        <Bubbles className="h-7 w-7" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-amber-800">CmT Token Balance</h2>
        <p className="text-2xl font-bold text-amber-900 mt-1">{tokens} Tokens</p>
      </div>
    </div>
  </div>

  {/* Energy Token Balance */}
  <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl shadow hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full bg-green-200 text-green-700">
        <Zap className="h-7 w-7" />
      </div>
      <div>
        <h2 className="text-sm font-medium text-green-800">Energy Token Balance</h2>
        <p className="text-2xl font-bold text-green-900 mt-1">{energyTokens} kWh</p>
      </div>
    </div>
  </div>
</div>


      {/* Want to Sell Energy */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Want to sell energy?">
          <div className="text-center">
            <div className="mb-4">
              <div className="text-4xl mb-2">⚡</div>
              <p className="text-sm text-gray-600 mb-2">
                Have excess energy? Sell it back to the grid!
              </p>
              <p className="text-xs text-gray-500">
                Minimum required: {MINIMUM_ENERGY_TO_SELL} kWh
              </p>
            </div>

            {sellRequestSent ? (
              <div className="space-y-2">
                {!sellRequestApproved ? (
                  <div className="text-amber-600 text-sm font-medium">
                    ⏳ Request pending approval...
                  </div>
                ) : (
                  <div className="text-green-600 text-sm font-medium">
                    ✅ Request approved! Check sidebar for "Sell Energy"
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSellEnergyRequest}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  Number(energyTokens) >= MINIMUM_ENERGY_TO_SELL
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={Number(energyTokens) < MINIMUM_ENERGY_TO_SELL}
              >
                {Number(energyTokens) >= MINIMUM_ENERGY_TO_SELL
                  ? "Request to Sell Energy"
                  : `Need ${MINIMUM_ENERGY_TO_SELL - Number(energyTokens)} more kWh`}
              </button>
            )}
          </div>
        </Card>

        {/* Available Energy Packets */}
        <Card title="Available Energy Packets">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-gray-600">Loading...</span>
              </div>
            ) : energyPackets.length > 0 ? (
              energyPackets.map((packet) => (
                <div
                  key={packet.id}
                  className={`p-3 rounded-lg border ${
                    packet.available
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">{packet.supplier}</p>
                      <p className="text-xs text-gray-600">{packet.energy}</p>
                    </div>
                    {packet.renewable && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        🌱 Green
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{packet.price}</p>
                      <p className="text-xs text-gray-500">{packet.pricePerUnit}</p>
                    </div>
                    <button
                      onClick={() => handlePurchasePacket(packet.id, packet.price)}
                      disabled={!packet.available}
                      className={`px-3 py-1 text-xs rounded ${
                        packet.available
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {packet.available ? "Buy" : "Sold Out"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                No energy packets available
              </div>
            )}
          </div>
          <button
            onClick={loadEnergyPackets}
            className="mt-3 w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-950 text-sm"
          >
            Refresh Packets
          </button>
        </Card>
      </div>

      {/* Graph Section */}
      <div className="flex flex-row gap-4 mt-6 h-[450px]">
        <div className="basis-2/3">
          <Card title="Active hours" className="h-full">
            <div className="h-full">
              <Graph />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
