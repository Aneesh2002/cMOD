import React, { useState } from "react";
// import Header from "../components/SupplierComponents/header";
import mockData from '../components/SupplierComponents/MockData';
import Sidebar from "../components/SupplierComponents/Sidebar";
import Footer from "../components/SupplierComponents/Footer";
import OverviewSection from '../components/SupplierComponents/Overview';
// import TokenWalletSection from "../components/SupplierComponents/TokenWalletsection";
import EnergyRequestSection from "../components/SupplierComponents/EnergyRequests";
import ServicesSection from "../components/SupplierComponents/Services";
import {
    Wallet,
    Zap,
    Activity,
    Home,
    FileText,
    Menu,
    LogOut,
    Search,
    Bell,
    ArrowUpRight,
    Coins,
    Sun,
    Layers,
    Wind,
    ChevronDown,
    Filter,
    Download,
    CheckCircle,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Share2
} from "lucide-react";



const TotalTransactionsSection = ({ transactions }) => {
        return (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">All Transactions</h2>
                                <div className="flex space-x-2">
                                        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-lg hover:bg-gray-50">
                                                <Filter className="h-4 w-4" /><span>Filter</span>
                                        </button>
                                        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border rounded-lg hover:bg-green-700">
                                                <Download className="h-4 w-4" /><span>Export</span>
                                        </button>
                                </div>
                        </div>
                        <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                        <th scope="col" className="px-6 py-3">Transaction Hash</th>
                                                        <th scope="col" className="px-6 py-3">Type</th>
                                                        <th scope="col" className="px-6 py-3">Amount</th>
                                                        <th scope="col" className="px-6 py-3">Date</th>
                                                        <th scope="col" className="px-6 py-3">Status</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {transactions.map(tx => {
                                                        const statusColor = tx.status === 'Confirmed' ? 'bg-green-100 text-green-800' : tx.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800';
                                                        return (
                                                                <tr key={tx.id} className="bg-white border-b hover:bg-gray-50">
                                                                        <td className="px-6 py-4 font-mono text-xs text-gray-900">{tx.id}</td>
                                                                        <td className="px-6 py-4 flex items-center space-x-2"><tx.icon className="h-5 w-5 text-gray-400" /><span>{tx.type}</span></td>
                                                                        <td className="px-6 py-4 font-semibold">{tx.amount}</td>
                                                                        <td className="px-6 py-4">{tx.date}</td>
                                                                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{tx.status}</span></td>
                                                                </tr>
                                                        );
                                                })}
                                        </tbody>
                                </table>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                                <span className="text-sm text-gray-600">Showing 1 to 10 of {transactions.length} results</span>
                                <div className="flex space-x-1">
                                        <button className="p-2 rounded-md hover:bg-gray-100"><ChevronLeft className="h-5 w-5"/></button>
                                        <button className="p-2 rounded-md hover:bg-gray-100"><ChevronRight className="h-5 w-5"/></button>
                                </div>
                        </div>
                </div>
        )
};

const SupplierDashboard = () => {
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [activeSection, setActiveSection] = useState("overview");

        const renderActiveSection = () => {
                switch (activeSection) {
                        case "overview": return <OverviewSection data={mockData} />;
                        case "total_transactions": return <TotalTransactionsSection transactions={mockData.allTransactions} />;
                        case "token_wallet": return <TokenWalletSection wallet={mockData.tokenWallet} />;
                        case "energy_req": return <EnergyRequestSection requests={mockData.energyRequests} />;
                        case "services": return <ServicesSection services={mockData.services}/>;
                        default: return <OverviewSection data={mockData} />;
                }
        };

        return (
                <div className="min-h-screen bg-gray-100 flex flex-col">
                        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} supplierName={mockData.supplierName} />
                        <div className="flex flex-1 overflow-hidden">
                                <Sidebar 
                                        sidebarOpen={sidebarOpen} 
                                        setSidebarOpen={setSidebarOpen} 
                                        activeSection={activeSection} 
                                        setActiveSection={setActiveSection} 
                                />
                                <div className="flex flex-col flex-1 overflow-hidden">
                                        <main className="flex-1 p-6 overflow-y-auto">
                                                {renderActiveSection()}
                                        </main>
                                        <Footer />
                                </div>
                        </div>
                        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
                </div>
        );
};

export default SupplierDashboard;
