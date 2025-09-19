import { Coins, Zap, Activity, Sun, Layers, Wind } from "lucide-react";

// --- MOCK DATA (Revised for a Decentralized, Token-based System) ---
const mockData = {
  supplierName: "EcoPower Solutions",
  kpis: [
    { title: "Token Earnings", value: "12,500 TKN", trend: "+12.5%", icon: Coins, color: "blue" },
    { title: "Energy Supplied", value: "15,420 kWh", trend: "+8.2%", icon: Zap, color: "green" },
    { title: "Total Transactions", value: "25", trend: "+5.8%", icon: Activity, color: "amber" },
  ],
  transactions: [ // For Overview
    { id: "0xabc...def", type: "Renewable Supply", amount: "2,200 TKN", date: "2025-09-18", status: "Confirmed", icon: Sun },
    { id: "0x123...456", type: "Grid Export", amount: "1,500 TKN", date: "2025-09-17", status: "Confirmed", icon: Layers },
    { id: "0x789...abc", type: "Bulk Energy Sale", amount: "3,500 TKN", date: "2025-09-16", status: "Pending", icon: Wind },
  ],
  allTransactions: [ // For Total Transactions section
      ...Array(25).fill(null).map((_, i) => {
          const statuses = ["Confirmed", "Pending", "Failed"];
          const types = [{name: "Renewable Supply", icon: Sun}, {name: "Grid Export", icon: Layers}, {name: "Bulk Energy Sale", icon: Wind}];
          const randomType = types[i % types.length];
          return {
            id: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
            type: randomType.name,
            amount: `${(Math.random() * 5000).toFixed(0)} TKN`,
            date: `2025-09-${18 - (i % 18)}`,
            status: statuses[i % statuses.length],
            icon: randomType.icon
          }
      })
  ],
  tokenWallet: {
      summary: { totalEarned: "85,000 TKN", pendingPayout: "14,234 TKN", nextPayoutDate: "2025-10-05" },
      payoutHistory: [
          { txHash: "0xfa...ce6", date: "2025-09-15", amount: "12,500 TKN", method: "On-Chain Transfer", status: "Success"},
          { txHash: "0xec...a1b", date: "2025-08-15", amount: "15,000 TKN", method: "On-Chain Transfer", status: "Success"},
          { txHash: "0xd3...b2c", date: "2025-07-15", amount: "11,000 TKN", method: "On-Chain Transfer", status: "Success"},
      ]
  },
  energyRequests: [
      { id: "REQ-001", from: "Tech Park Grid", amount: "500 kWh", rate: "2.5 TKN/kWh", requestedAt: "2 hours ago", status: "Pending"},
      { id: "REQ-002", from: "Industrial Zone A", amount: "1,200 kWh", rate: "2.8 TKN/kWh", requestedAt: "8 hours ago", status: "Pending"},
      { id: "REQ-003", from: "Community Solar Farm", amount: "750 kWh", rate: "2.4 TKN/kWh", requestedAt: "1 day ago", status: "Approved"},
  ],
  services: [
      { name: "Real-time Monitoring", description: "Track your energy output and grid status live.", active: true },
      { name: "Smart Contract Mgmt", description: "Manage and deploy automated energy contracts.", active: true },
      { name: "Demand Forecasting", description: "Predict future energy demand with AI.", active: false },
      { name: "Decentralized ID", description: "Securely manage your supplier identity on-chain.", active: true },
  ]
};

export default mockData;