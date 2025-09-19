import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

const Header = ({ onMenuClick, supplierName }) => (
    <header className="bg-white p-4 border-b border-gray-200 w-full flex-shrink-0 z-20">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>
                <div className="text-2xl font-bold text-gray-800">
                    charge<span className="text-amber-500">MOD</span>
                </div>
            </div>
            <div className="hidden md:block font-semibold text-lg text-gray-700">
                SUPPLIER DASHBOARD
            </div>
            <div className="flex items-center space-x-3">
                 <div className="relative w-full max-w-xs hidden sm:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input type="text" placeholder="Search by TxHash..." className="w-full pl-12 pr-4 py-2.5 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-full">
                    <Bell className="h-6 w-6 text-gray-600" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                 <div className="flex items-center space-x-2 p-1 pr-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <div className="w-9 h-9 bg-gradient-to-tr from-green-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                        {supplierName.charAt(0)}
                    </div>
                    <span className="hidden md:block font-medium text-sm">Profile</span>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
