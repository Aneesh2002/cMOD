// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   MapPin,
//   ReceiptText,
//   User2,
//   BadgeDollarSign,
//   Gift,
//   Menu,
//   X,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const [open, setOpen] = useState(true);

//   const navItems = [
//     { label: "Dashboard", icon: LayoutDashboard,path:'/consumer-dashboard' },
//     // { label: "Stations", icon: MapPin, path: "/stations" },
//     { label: "Transactions", icon: ReceiptText,path: "/transactions-page" },
//     { label: "Account", icon: User2, path: "/consumer-profile" },
//     { label: "Subscription Plan", icon: BadgeDollarSign,path: "/subscriptions" },
//     { label: "Redeem", icon: Gift,path:"/redeem" },
//   ];

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div
//         className={`${
//           open ? "w-64" : "w-16"
//         } h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 fixed top-0 left-0 z-40 overflow-auto`}
//       >
//         {/* Header with logo & toggle */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {open && <h1 className="text-xl font-bold"> charge<span className="text-amber-600">MOD</span> </h1>}
//           <button
//             onClick={() => setOpen(!open)}
//             className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
//           >
//             {open ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>

//         {/* Nav Links */}
//         <nav className="flex-1 overflow-y-auto">
//           {navItems.map(({ label, icon: Icon,path }) => (
//             <NavLink
//               key={label}
//            to={path}
// className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
//                   isActive ? "bg-gray-700 font-semibold" : ""
//                 }`
//               }            >
//               <Icon size={20} />
//               {open && <span>{label}</span>}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Content wrapper */}
//       <div className={`${open ? "ml-64" : "ml-16"} flex-1 transition-all`}>
//         {/* Children content goes here */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  MapPin,
  ReceiptText,
  User2,
  BadgeDollarSign,
  Gift,
  Menu,
  X,
  Wallet,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [showSellEnergy, setShowSellEnergy] = useState(false);

  // Check if sell energy option should be shown
  useEffect(() => {
    const checkSellEnergyApproval = () => {
      const approvalStatus = localStorage.getItem('sellEnergyApproved');
      setShowSellEnergy(approvalStatus === 'true');
    };

    // Check on component mount
    checkSellEnergyApproval();

    // Listen for localStorage changes (in case approval happens in another component)
    const handleStorageChange = (e) => {
      if (e.key === 'sellEnergyApproved') {
        setShowSellEnergy(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically in case localStorage is updated in the same tab
    const interval = setInterval(checkSellEnergyApproval, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const baseNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: '/consumer-dashboard' },
    // { label: "Stations", icon: MapPin, path: "/stations" },
    { label: "Transactions", icon: ReceiptText, path: "/transactions-page" },
    { label: "Account", icon: User2, path: "/consumer-profile" },
    { label: "Subscription Plan", icon: BadgeDollarSign, path: "/subscriptions" },
    { label: "wallet", icon: Wallet, path: "/redeem" },
  ];

  // Add Sell Energy option if approved
  const navItems = showSellEnergy 
    ? [
        ...baseNavItems.slice(0, 2), // Dashboard and Transactions
        { label: "Sell Energy", icon: Zap, path: "/sell-energy" },
        ...baseNavItems.slice(2), // Rest of the items
      ]
    : baseNavItems;

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
          {open && (
            <h1 className="text-xl font-bold">
              charge<span className="text-amber-600">MOD</span>
            </h1>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-gray-700 font-semibold" : ""
                } ${
                  label === "Sell Energy" ? "border-l-4 border-amber-500" : ""
                }`
              }
            >
              <Icon 
                size={20} 
                className={label === "Sell Energy" ? "text-amber-400" : ""}
              />
              {open && (
                <span className={label === "Sell Energy" ? "text-amber-300" : ""}>
                  {label}
                  {label === "Sell Energy" && (
                    <span className="ml-2 text-xs bg-amber-600 text-white px-2 py-1 rounded-full">
                      New!
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer info for Sell Energy */}
        {showSellEnergy && open && (
          <div className="p-4 border-t border-gray-700">
            <div className="bg-amber-900 bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Energy Selling Active
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Your request to sell energy has been approved!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className={`${open ? "ml-64" : "ml-16"} flex-1 transition-all`}>
        {/* Children content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;