// src/pages/MapPage.jsx
import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DashboardFooter } from "../components/DashboardFooter";
import Map from "../components/Map";

const MapPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("nameOption") || "User";

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Right pane: column layout, footer at bottom */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Main — use flex-col so the map card can grow */}
        <main className="flex-1 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Near by sations </h1>
            <div className="flex items-center gap-3">
              <button
                className="rounded-xl border px-3 py-2 hover:bg-neutral-50"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                className="relative rounded-xl border px-3 py-2 hover:bg-neutral-50"
                onClick={() => navigate("/notifications")}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Map card fills all remaining space */}
          <div className="flex-1">
            <div className="h-full w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* This wrapper ensures the map covers the whole block */}
              <div className="h-full w-full">
                <Map />
              </div>
            </div>
          </div>
        </main>

        {/* Footer at the bottom */}
        <DashboardFooter />
      </div>
    </div>
  );
};

export default MapPage;
