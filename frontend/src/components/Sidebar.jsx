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

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Stations", icon: MapPin },
    { label: "Transactions", icon: ReceiptText },
    { label: "Account", icon: User2 },
    { label: "Subscription Plan", icon: BadgeDollarSign },
    { label: "Redeem", icon: Gift },
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
          {navItems.map(({ label, icon: Icon }) => (
            <a
              key={label}
              href="#"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700"
            >
              <Icon size={20} />
              {open && <span>{label}</span>}
            </a>
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
