import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  ReceiptText,
  User2,
  BadgeDollarSign,
  Plus,
  Car,
} from "lucide-react";

const NavItem = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition
        ${active ? "bg-amber-100 text-amber-700" : "text-gray-700 hover:bg-neutral-50"}
      `}
    >
      <Icon className={`h-5 w-5 ${active ? "text-amber-600" : "text-gray-500"}`} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="hidden md:flex md:flex-col w-72 shrink-0 border-r bg-white/80 backdrop-blur">
      {/* Brand */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500 grid place-items-center">
            <span className="text-white font-bold">⚡</span>
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight">EV HUB</div>
            <div className="text-xs text-gray-500 -mt-0.5">chargeMOD</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <NavItem to="/consumer-dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/map" icon={MapPin} label="Stations" />
        <NavItem to="/transactions-page" icon={ReceiptText} label="Transactions" />
        <NavItem to="/consumer-profile" icon={User2} label="Account" />
        <NavItem to="/subscriptions" icon={BadgeDollarSign} label="Subscription plan" />
      </nav>

      {/* My Cars */}
      <div className="px-4 mt-2">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          My Cars
        </div>

        <div className="rounded-2xl border p-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-16 rounded-lg bg-neutral-100 grid place-items-center">
              <Car className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Tesla Model X</div>
              <div className="text-xs text-gray-500">Battery <span className="text-emerald-600 font-semibold">58%</span> • Range 260 miles</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-16 rounded-lg bg-neutral-100 grid place-items-center">
              <Car className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Nissan Leaf</div>
              <div className="text-xs text-gray-500">Battery <span className="text-red-600 font-semibold">18%</span> • Range 45 miles</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/add-car")}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-2 text-sm text-gray-600 hover:border-amber-400 hover:bg-amber-50"
        >
          <Plus className="h-4 w-4 text-amber-500" />
          Add car
        </button>
      </div>

      
      
    </aside>
  );
}
