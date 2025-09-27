import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/NewSupplier/Topbar.jsx";
import Sidebar from "../components/NewSupplier/Sidebar.jsx";
import Footer from "../components/NewSupplier/Footer.jsx";


export default function SupplierDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // Pad the top by 4rem to avoid the fixed Topbar overlap
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-16">
      <Topbar onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Fixed sidebar (outside normal flow) */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content column offset to the right of the sidebar on lg+ */}
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8 lg:ml-72">
        <Outlet />
      </main>

      {/* Full-width dark footer AFTER the content, aligned with content area */}
      <div className="lg:ml-72">
        <Footer />
      </div>
    </div>
  );
}