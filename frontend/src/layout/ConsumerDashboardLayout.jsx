import React from "react";
import Sidebar from "../components/Sidebar";
import ConsumerDashboard from "../pages/ConsumerDashboard";
import { DashboardFooter } from "../components/DashboardFooter";

export const ConsumerLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
      <ConsumerDashboard/> 
      <DashboardFooter/>
      </main>
     
    </div>
  );
};
