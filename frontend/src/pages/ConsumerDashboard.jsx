// import React, { useEffect, useState } from "react";
// import { Card } from "../components/Card";
// import Map from "../components/Map";
// import Graph from "../components/ConsumerComponents/Graph";
// import { ethers } from "ethers";
// import { contractAddress, abi } from "../contract";

// const ConsumerDashboard = () => {
//   const [wallet, setWallet] = useState("0");
//   const [tokens, setTokens] = useState("0");
//   const [amount, setAmount] = useState("");
//   const [transactions, setTransactions] = useState([]);
//   const [energyPackets, setEnergyPackets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load balances
//   const loadBalances = async () => {
//     try {
//       if (!window.ethereum) return alert("MetaMask not installed");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const addr = await signer.getAddress();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const [walletBalance, tokenBalance] = await contract.getBalances(addr);
//       setWallet(walletBalance.toString());
//       setTokens(tokenBalance.toString());
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Load transaction history
//   const loadTransactions = async () => {
//     try {
//       if (!window.ethereum) return;

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const addr = await signer.getAddress();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const txs = await contract.getUserTransactions(addr);
//       const formatted = txs.map((tx) => ({
//         type: tx.transactionType,
//         amount: tx.amount.toString(),
//         time: new Date(Number(tx.timestamp) * 1000).toLocaleString(),
//       }));
//       setTransactions(formatted);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Load energy packets from suppliers
//   const loadEnergyPackets = async () => {
//     try {
//       setLoading(true);
//       if (!window.ethereum) return;

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       // This will be implemented later - for now showing mock data
//       const mockPackets = [
//         {
//           id: 1,
//           supplier: "GreenPower Co.",
//           energy: "50 kWh",
//           price: "₹500",
//           pricePerUnit: "₹10/kWh",
//           available: true,
//           renewable: true
//         },
//         {
//           id: 2,
//           supplier: "Solar Energy Ltd.",
//           energy: "100 kWh",
//           price: "₹900",
//           pricePerUnit: "₹9/kWh",
//           available: true,
//           renewable: true
//         },
//         {
//           id: 3,
//           supplier: "Wind Power Inc.",
//           energy: "75 kWh",
//           price: "₹675",
//           pricePerUnit: "₹9/kWh",
//           available: false,
//           renewable: true
//         }
//       ];

//       // TODO: Replace with actual contract call
//       // const packets = await contract.getAvailableEnergyPackets();
//       setEnergyPackets(mockPackets);
//     } catch (err) {
//       console.error("Error loading energy packets:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Purchase energy packet
//   const handlePurchasePacket = async (packetId, price) => {
//     try {
//       if (!window.ethereum) return alert("MetaMask not installed");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       // TODO: Implement actual contract call
//       // const tx = await contract.purchaseEnergyPacket(packetId);
//       // await tx.wait();
      
//       alert(`Energy packet ${packetId} purchased successfully!`);
//       loadBalances();
//       loadEnergyPackets();
//       loadTransactions();
//     } catch (err) {
//       console.error("Error purchasing packet:", err);
//       alert("Failed to purchase energy packet");
//     }
//   };

//   const handleTopUp = async (amt) => {
//     try {
//       if (!amt || amt <= 0) return alert("Enter a valid amount");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const tx = await contract.topUpFiat(amt);
//       await tx.wait();
//       loadBalances();
//       loadTransactions();
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleBuyTokens = async (amt) => {
//     try {
//       if (!amt || amt <= 0) return alert("Enter a valid amount");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const tx = await contract.buyTokens(amt);
//       await tx.wait();
//       loadBalances();
//       loadTransactions();
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSellTokens = async (amt) => {
//     try {
//       if (!amt || amt <= 0) return alert("Enter a valid amount");

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = await provider.getSigner();
//       const contract = new ethers.Contract(contractAddress, abi, signer);

//       const tx = await contract.sellTokens(amt);
//       await tx.wait();
//       loadBalances();
//       loadTransactions();
//       setAmount("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadBalances();
//     loadTransactions();
//     loadEnergyPackets();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-3xl font-bold">Consumer Dashboard</h1>
//       </div>

//       {/* Banner */}
//       <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-gray-900 rounded-3xl p-8 border border-gray-100 mb-6">
//         <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
//         <p className="text-sm">
//           Manage your wallet, tokens, and purchase energy packets from suppliers.
//         </p>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Wallet Balance */}
//         <Card title="Wallet Balance">
//           <p className="mb-3 text-gray-700 font-medium">Balance: ₹{wallet}</p>
//           <input
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-2 border rounded mb-3"
//           />
//           <div className="flex gap-3 flex-wrap">
//             <button
//               onClick={() => handleTopUp(Number(amount))}
//               className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
//             >
//               Top-Up
//             </button>
//             {[100, 200, 500].map((amt) => (
//               <button
//                 key={amt}
//                 onClick={() => handleTopUp(amt)}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 +{amt}
//               </button>
//             ))}
//           </div>
//         </Card>

//         {/* CmT Tokens */}
//         <Card title="CmT Token Balance">
//           <p className="mb-3 text-gray-700 font-medium">Tokens: {tokens}</p>
//           <input
//             type="number"
//             placeholder="Enter amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="w-full p-2 border rounded mb-3"
//           />
//           <div className="flex gap-3 flex-wrap">
//             <button
//               onClick={() => handleBuyTokens(Number(amount))}
//               className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
//             >
//               Buy
//             </button>
//             <button
//               onClick={() => handleSellTokens(Number(amount))}
//               className="px-3 py-1 bg-red-200 rounded hover:bg-red-300"
//             >
//               Sell
//             </button>
//             {[10, 50, 100].map((amt) => (
//               <button
//                 key={amt}
//                 onClick={() => handleBuyTokens(amt)}
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Buy {amt}
//               </button>
//             ))}
//           </div>
//         </Card>

//         {/* Energy Packets */}
//         <Card title="Available Energy Packets">
//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {loading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                 <span className="ml-2 text-sm text-gray-600">Loading...</span>
//               </div>
//             ) : energyPackets.length > 0 ? (
//               energyPackets.map((packet) => (
//                 <div
//                   key={packet.id}
//                   className={`p-3 rounded-lg border ${
//                     packet.available 
//                       ? "border-green-200 bg-green-50" 
//                       : "border-gray-200 bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <p className="font-medium text-sm">{packet.supplier}</p>
//                       <p className="text-xs text-gray-600">{packet.energy}</p>
//                     </div>
//                     {packet.renewable && (
//                       <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
//                         🌱 Green
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-bold text-sm">{packet.price}</p>
//                       <p className="text-xs text-gray-500">{packet.pricePerUnit}</p>
//                     </div>
//                     <button
//                       onClick={() => handlePurchasePacket(packet.id, packet.price)}
//                       disabled={!packet.available}
//                       className={`px-3 py-1 text-xs rounded ${
//                         packet.available
//                           ? "bg-blue-600 text-white hover:bg-blue-700"
//                           : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       }`}
//                     >
//                       {packet.available ? "Buy" : "Sold Out"}
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-4 text-gray-500 text-sm">
//                 No energy packets available
//               </div>
//             )}
//           </div>
//           <button
//             onClick={loadEnergyPackets}
//             className="mt-3 w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-950 text-sm"
//           >
//             Refresh Packets
//           </button>
//         </Card>
//       </div>

//       {/* Map & Graph */}
//       <div className="flex flex-row gap-4 mt-4 h-[450px]">
//         {/* Left card */}
       
//         {/* Right card */}
//         <div className="basis-2/3">
//           <Card title="Active hours" className="h-full">
//             <div className="h-full">
//               <Graph />
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConsumerDashboard;


import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import Map from "../components/Map";
import Graph from "../components/ConsumerComponents/Graph";
import { ethers } from "ethers";
import { contractAddress, abi } from "../contract";

const ConsumerDashboard = () => {
  const [wallet, setWallet] = useState("0");
  const [tokens, setTokens] = useState("0");
  const [energyTokens, setEnergyTokens] = useState("0");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [energyPackets, setEnergyPackets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sellRequestSent, setSellRequestSent] = useState(false);
  const [sellRequestApproved, setSellRequestApproved] = useState(false);

  const MINIMUM_ENERGY_TO_SELL = 50; // Minimum energy tokens required to sell

  // Load balances
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
      
      // TODO: Replace with actual contract call for energy tokens
      // For now, using mock data
      setEnergyTokens("75"); // Mock energy token balance
    } catch (err) {
      console.error(err);
    }
  };

  // Load transaction history
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

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // This will be implemented later - for now showing mock data
      const mockPackets = [
        {
          id: 1,
          supplier: "GreenPower Co.",
          energy: "50 kWh",
          price: "₹500",
          pricePerUnit: "₹10/kWh",
          available: true,
          renewable: true
        },
        {
          id: 2,
          supplier: "Solar Energy Ltd.",
          energy: "100 kWh",
          price: "₹900",
          pricePerUnit: "₹9/kWh",
          available: true,
          renewable: true
        },
        {
          id: 3,
          supplier: "Wind Power Inc.",
          energy: "75 kWh",
          price: "₹675",
          pricePerUnit: "₹9/kWh",
          available: false,
          renewable: true
        }
      ];

      // TODO: Replace with actual contract call
      // const packets = await contract.getAvailableEnergyPackets();
      setEnergyPackets(mockPackets);
    } catch (err) {
      console.error("Error loading energy packets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Purchase energy packet
  const handlePurchasePacket = async (packetId, price) => {
    try {
      if (!window.ethereum) return alert("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // TODO: Implement actual contract call
      // const tx = await contract.purchaseEnergyPacket(packetId);
      // await tx.wait();
      
      alert(`Energy packet ${packetId} purchased successfully!`);
      loadBalances();
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

      // TODO: Replace with actual contract call to send request to provider
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.requestToSellEnergy();
      // await tx.wait();

      setSellRequestSent(true);
      alert("Your request to sell energy has been sent to the provider. You will be notified once it's approved.");
      
      // Mock approval after 3 seconds for demo
      setTimeout(() => {
        setSellRequestApproved(true);
        alert("Great news! Your request to sell energy has been approved. Check the sidebar for the 'Sell Energy' option.");
      }, 3000);
    } catch (err) {
      console.error("Error sending sell request:", err);
      alert("Failed to send sell energy request");
    }
  };

  // Handle energy token transactions
  const handleBuyEnergyTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");

      // TODO: Implement actual contract call
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.buyEnergyTokens(amt);
      // await tx.wait();

      // Mock update for now
      setEnergyTokens((prev) => (Number(prev) + amt).toString());
      alert(`Successfully purchased ${amt} energy tokens!`);
      loadBalances();
      loadTransactions();
      setAmount("");
    } catch (err) {
      console.error("Error buying energy tokens:", err);
      alert("Failed to buy energy tokens");
    }
  };

  const handleSellEnergyTokens = async (amt) => {
    try {
      if (!amt || amt <= 0) return alert("Enter a valid amount");
      if (Number(energyTokens) < amt) return alert("Insufficient energy tokens");

      // TODO: Implement actual contract call
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await provider.getSigner();
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.sellEnergyTokens(amt);
      // await tx.wait();

      // Mock update for now
      setEnergyTokens((prev) => (Number(prev) - amt).toString());
      alert(`Successfully sold ${amt} energy tokens!`);
      loadBalances();
      loadTransactions();
      setAmount("");
    } catch (err) {
      console.error("Error selling energy tokens:", err);
      alert("Failed to sell energy tokens");
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
      loadTransactions();
      setAmount("");
    } catch (err) {
      console.error(err);
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
      loadTransactions();
      setAmount("");
    } catch (err) {
      console.error(err);
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
      loadTransactions();
      setAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBalances();
    loadTransactions();
    loadEnergyPackets();
  }, []);

  // Store sell request approval status in localStorage for persistence across components
  useEffect(() => {
    if (sellRequestApproved) {
      localStorage.setItem('sellEnergyApproved', 'true');
    }
  }, [sellRequestApproved]);

  // Check for existing approval status on component mount
  useEffect(() => {
    const approvalStatus = localStorage.getItem('sellEnergyApproved');
    if (approvalStatus === 'true') {
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <Card title="Wallet Balance">
          <p className="mb-3 text-gray-700 font-medium">Balance: ₹{wallet}</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleTopUp(Number(amount))}
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
        </Card>

        {/* CmT Tokens */}
        <Card title="CmT Token Balance">
          <p className="mb-3 text-gray-700 font-medium">Tokens: {tokens}</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleBuyTokens(Number(amount))}
              className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
            >
              Buy
            </button>
            <button
              onClick={() => handleSellTokens(Number(amount))}
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
        </Card>

        {/* Energy Tokens */}
        <Card title="Energy Token Balance">
          <p className="mb-3 text-gray-700 font-medium">Energy Tokens: {energyTokens} kWh</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleBuyEnergyTokens(Number(amount))}
              className="px-3 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
            >
              Buy
            </button>
            <button
              onClick={() => handleSellEnergyTokens(Number(amount))}
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
        </Card>

        {/* Want to Sell Energy Card */}
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
                  : `Need ${MINIMUM_ENERGY_TO_SELL - Number(energyTokens)} more kWh`
                }
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

      {/* Map & Graph */}
      <div className="flex flex-row gap-4 mt-4 h-[450px]">
        {/* Right card */}
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