import React from "react";
import { Bell, LogOut } from "lucide-react";
import { Card } from "../components/Card";
import Map from "../components/Map";

const ConsumerDashboard = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Consumer Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100  text-gray-900 rounded-3xl p-8 border border-gray-100 mb-6">
        <h2 className="text-xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-sm">Manage your wallet, tokens, and charging stations easily.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <Card title="Wallet Balance">
          <p className="mb-3 text-gray-700 font-medium">Balance: ₹500</p>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-3">
            {[100, 200, 500].map((amt) => (
              <button
                key={amt}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +{amt}
              </button>
            ))}
          </div>
        </Card>

        {/* CmT Tokens */}
        <Card title="CmT Token Balance">
          <p className="mb-3 text-gray-700 font-medium">Tokens: 50</p>
           <input
            type="number"
            placeholder="Enter amount to add token"
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-3">
            {[100, 200, 500].map((amt) => (
              <button
                key={amt}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +{amt}
              </button>
            ))}
          </div>
        
        </Card>

        {/* Favorite Stations */}
        <Card title="Favorite Stations">
          <input
            type="text"
            placeholder="Search station..."
            className="w-full p-2 border rounded mb-5 mt-3"
          />
          <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-950 w-full">
            Add Station
          </button>
        </Card>

        {/* Nearest Charging Stations Map */}
        <Card title="Nearest Charging Stations">
          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
            <Map/>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
