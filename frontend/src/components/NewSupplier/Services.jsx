
// import React from "react";
// export default function Services(){
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-6">
//       <h2 className="text-lg font-semibold text-gray-800">Services</h2>
//       <p className="mt-1 text-sm text-gray-600">Manage connected services and integrations.</p>
//     </div>
//   );
// }
import React from "react";

// Example ServiceCard Component
function ServiceCard({ name, description, onManage }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <button
        className="mt-6 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 self-end"
        onClick={onManage}
      >
        Manage
      </button>
    </div>
  );
}

// Main Services Page
export default function SupplierServices() {
  const services = [
    // { name: "Renewable Supply", description: "Manage renewable sources & contracts" },
    // { name: "Grid Export/Import", description: "Handle energy grid transactions" },
    // { name: "Bulk Sales & Auctions", description: "Set up and view bulk energy sales" },
    // { name: "Token Withdrawals", description: "Withdraw tokens, manage wallets" },
    // { name: "Integration Settings", description: "Manage platform integrations" },
    { name: "Maintenance Scheduling", description: "Schedule generator/device maintenance" },
    { name: "Reporting & Analytics", description: "View and download reports and analytics" },
    { name: "Compliance Management", description: "Manage KYC & compliance docs" },
    // { name: "Alerts & Notifications", description: "Set notification preferences" },
    { name: "Organization Profile", description: "Edit org and supplier profiles" },
  ];

  // You can connect these handlers to navigation/actions as needed
  const handleManage = (serviceName) => {
    // Replace this with navigation or open modal logic for each service
    alert(`Go to Manage: ${serviceName}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Supplier Services</h2>
        <p className="mt-1 text-gray-600">
          Manage integrations, operations, and key supplier features.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard
            key={service.name}
            name={service.name}
            description={service.description}
            onManage={() => handleManage(service.name)}
          />
        ))}
      </div>
    </div>
  );
}
