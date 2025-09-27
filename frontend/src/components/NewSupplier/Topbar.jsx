import React from "react";
import {  BellIcon, Logo } from "./icons.jsx";

export default function Topbar({ onToggleSidebar }) {
  return (
    // Fixed topbar (height = 4rem). We’ll offset the page with pt-16 in the layout.
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile: open/close sidebar */}
          <button
            onClick={onToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo />
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
          
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <BellIcon />
            <span className="absolute -right-0.5 -top-0.5 inline-flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              •
            </span>
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="size-9 rounded-full bg-emerald-100" />
            <span className="text-sm font-medium text-gray-800">Profile</span>
          </div>
        </div>
      </div>
    </header>
  );
}
