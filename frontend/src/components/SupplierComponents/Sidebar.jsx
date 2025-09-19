import React from 'react';
import { Home, Activity, Wallet, Zap, FileText, LogOut } from 'lucide-react';
const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }) => {
    const sidebarItems = [
        { id: "overview", label: "Overview", icon: Home },
        { id: "total_transactions", label: "Transactions", icon: Activity },
        { id: "token_wallet", label: "Token Wallet", icon: Wallet },
        { id: "energy_req", label: "Energy Requests", icon: Zap },
        { id: "services", label: "Services", icon: FileText },
    ];
    return (
        <aside className={`w-64 bg-white flex flex-col border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 fixed inset-y-0 left-0 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <nav className="mt-20 px-3 flex-1 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <button key={item.id} onClick={() => { setActiveSection(item.id); if (sidebarOpen) setSidebarOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 mb-2 ${activeSection === item.id ? "bg-green-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}>
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};


export default Sidebar;
