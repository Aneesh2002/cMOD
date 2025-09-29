import React from "react";
import { NavLink } from "react-router-dom";
import {
  OverviewIcon,
  ReceiptIcon,
  WalletIcon,
  ZapIcon,
  ToolIcon,
  Logo,
  LogOutIcon,
} from "./icons.jsx";

const links = [
  { to: "/overview", label: "Overview", icon: OverviewIcon },
  { to: "/transactions", label: "Transactions", icon: ReceiptIcon },
  { to: "/wallet", label: "Token Wallet", icon: WalletIcon },
  { to: "/energy-requests", label: "Energy Requests", icon: ZapIcon },
  { to: "/services", label: "Services", icon: ToolIcon },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/20 lg:hidden ${open ? "block" : "hidden"}`}
      />

      {/* Fixed sidebar sits below the fixed topbar (top: 4rem) with its own scroll */}
      <aside
        className={`fixed left-0 z-30 w-72 top-16 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white
                    transition-transform duration-300 flex flex-col overflow-y-auto
                    ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex h-14 items-center gap-3 px-4">
          {/* <Logo /> */}
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 px-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`inline-flex size-6 items-center justify-center rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                    }`}
                  >
                    <Icon />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Small footer inside sidebar (logout at left bottom) */}
        <div className="mt-auto border-t border-gray-200 p-3">
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-gray-50">
            <LogOutIcon /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
