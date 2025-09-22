import React, { useState } from "react";
import {
  LayoutDashboard,
  MapPin,
  ReceiptText,
  User2,
  BadgeDollarSign,
  Gift,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard,path:'/consumer-dashboard' },
    { label: "Stations", icon: MapPin, path: "/stations" },
    { label: "Transactions", icon: ReceiptText,path: "/transactions-page" },
    { label: "Account", icon: User2, path: "/consumer-profile" },
    { label: "Subscription Plan", icon: BadgeDollarSign,path: "/subscriptions" },
    { label: "Redeem", icon: Gift,path:"/redeem" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 fixed top-0 left-0 z-40 overflow-auto`}
      >
        {/* Header with logo & toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open && <h1 className="text-xl font-bold"> charge<span className="text-amber-600">MOD</span> </h1>}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon,path }) => (
            <NavLink
              key={label}
           to={path}
className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                }`
              }            >
              <Icon size={20} />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content wrapper */}
      <div className={`${open ? "ml-64" : "ml-16"} flex-1 transition-all`}>
        {/* Children content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
