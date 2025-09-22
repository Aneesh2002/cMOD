import React from "react";
import Sidebar from "../components/Sidebar";
import ConsumerDashboard from "../pages/ConsumerDashboard";

export const ConsumerLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
      <ConsumerDashboard/>
      </main>
    </div>
  );
};
