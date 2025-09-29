import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout page holding Topbar + Sidebar and rendering children via <Outlet />
const SupplierDashboard = lazy(() => import('../pages/SupplierDashboard.jsx'));

// Child pages
const Overview = lazy(() => import("../components/NewSupplier/Overview.jsx"));
const Transactions = lazy(() => import("../components/NewSupplier/Transactions.jsx"));
const TokenWallet = lazy(() => import('../components/NewSupplier/TokenWallet.jsx'));
const EnergyRequests = lazy(() => import("../components/NewSupplier/EnergyRequests.jsx"));
const Services = lazy(() => import("../components/NewSupplier/Services.jsx"));

function NotFound() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-gray-800">Page not found</p>
      <p className="mt-1 text-sm text-gray-500">
        Check the URL or use the sidebar to navigate.
      </p>
    </div>
  );
}

export default function SupplierRoutes() {
  return (
    <Suspense
      fallback={<div className="p-6 text-sm text-gray-500">Loading…</div>}
    >
      <Routes>
        <Route path="/" element={<SupplierDashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallet" element={<TokenWallet />} />
          <Route path="energy-requests" element={<EnergyRequests />} />
          <Route path="services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
