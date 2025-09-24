import React from "react";
import { Home, Activity, Wallet, Zap, FileText, LogOut, Tag } from "lucide-react"; // Added Tag icon

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection, onLogout }) => {
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "total_transactions", label: "Transactions", icon: Activity },
    { id: "token_wallet", label: "Token Wallet", icon: Wallet },
    { id: "energy_req", label: "Energy Requests", icon: Zap },
    { id: "services", label: "Services", icon: FileText },
    { id: "add_plans", label: "Add plans", icon: Tag }, // New sidebar item
  ];

  return (
    <aside
      className={`w-64 bg-white flex flex-col border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 fixed inset-y-0 left-0 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          charge<span className="text-orange-500">MOD</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3 flex-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 mb-2 ${
              activeSection === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white group transition-colors"
        >
          <LogOut className="h-5 w-5 text-gray-700 group-hover:text-white" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
