


// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

// Layout
import { AppLayout } from "./layout/AppLayout";

// Pages
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Units } from "./pages/Units";
import { Balance } from "./pages/Balance";
import { Topup } from "./pages/Topup";
import { Sources } from "./pages/Sources";
import { Transactions } from "./pages/Transactions";
import { Issues } from "./pages/Issues";
import { Profile } from "./pages/Profile";
import { Notifications } from "./pages/Notifications";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import { Providers } from "./pages/Providers";
import AddSupplier from "./pages/AddSupplier";
import TransactionsPage from "./pages/TransactionsPage";
import ConsumerProfile from "./pages/Consumer-Profile";
import Subscriptions from "./pages/Subscriptions";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Standalone Dashboards */}
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
        <Route path="/add-supplier" element={<AddSupplier />} />
        <Route path="/consumer-profile" element={<ConsumerProfile />} />
        <Route path="/subscriptions" element={<Subscriptions />} /> 
        <Route path="transactions-page" element={<TransactionsPage />} />

        {/* App Layout with Nested Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="units" element={<Units />} />
          <Route path="balance" element={<Balance />} />
          <Route path="topup" element={<Topup />} />
          <Route path="sources" element={<Sources />} />
          <Route path="providers" element={<Providers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="issues" element={<Issues />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="transactions-page" element={<TransactionsPage />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./index.css";

// // import SplashScreen from "./components/SplashScreen";
// import { AppLayout } from "./layout/AppLayout";
// import { Dashboard } from "./pages/Dashboard";
// import { Login } from "./pages/auth/Login";
// import { Register } from "./pages/auth/Register";
// import { Units } from "./pages/Units";
// import { Balance } from "./pages/Balance";
// import { Topup } from "./pages/Topup";
// import { Sources } from "./pages/Sources";
// import { Transactions } from "./pages/Transactions";
// import { Issues } from "./pages/Issues";
// import { Profile } from "./pages/Profile";
// import { Notifications } from "./pages/Notifications";
// import ConsumerDashboard from "./pages/ConsumerDashboard";
// import SupplierDashboard from "./pages/SupplierDashboard";
// import ProviderDashboard from "./pages/ProviderDashboard";
// import { Providers } from "./pages/Providers";
// import AddSupplier from "./pages/AddSupplier";

// function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   const handleSplashComplete = () => {
//     setShowSplash(false);
//   };

//   if (showSplash) {
//     return <SplashScreen onComplete={handleSplashComplete} />;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
//         <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
//         <Route path="/provider-dashboard" element={<ProviderDashboard />} />
//         <Route path="/add-supplier" element={<AddSupplier />} />
//         <Route path="/" element={<AppLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="units" element={<Units />} />
//           <Route path="balance" element={<Balance />} />
//           <Route path="topup" element={<Topup />} />
//           <Route path="sources" element={<Sources />} />
//           <Route path="providers" element={<Providers />} />
//           <Route path="transactions" element={<Transactions />} />
//           <Route path="issues" element={<Issues />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="notifications" element={<Notifications />} />
//         </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
