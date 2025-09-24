import React from "react";
import { Menu, Search, Bell } from "lucide-react";

const Header = ({ onMenuClick, title, notificationCount, onNotificationsClick }) => {
  return (
    <header className="p-4 flex items-center justify-between bg-white border-b border-gray-200 sticky top-0 z-20">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-600" onClick={onMenuClick}>
          <Menu />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">{title}</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <button
          onClick={onNotificationsClick}
          className="relative text-gray-600 p-2 rounded-full hover:bg-gray-100"
        >
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold border border-green-300">
          P
        </div>
        <span className="font-semibold text-gray-700 hidden md:block">Provider</span>
      </div>
    </header>
  );
};

export default Header;
