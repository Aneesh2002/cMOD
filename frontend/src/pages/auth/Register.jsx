import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

export const Register = () => {
  const [role, setRole] = useState("consumer");
  const [nameOption, setNameOption] = useState("1");
  const navigate = useNavigate();

  const roleLabel =
    role === "consumer"
      ? "Consumer"
      : role === "supplier"
      ? "Supplier"
      : "Provider";
  const tagline = `Create a ${roleLabel} account`;

  const containerGradient =
    role === "consumer"
      ? "from-amber-500 to-orange-500"
      : role === "supplier"
      ? "from-green-500 to-emerald-500"
      : "from-indigo-500 to-blue-600";

  const onSubmit = (e) => {
    e.preventDefault();
    // Fake signup: store chosen role and name, then go to dashboard
    localStorage.setItem("role", role);
    localStorage.setItem("nameOption", nameOption);
    if (role === "consumer") navigate("/consumer-dashboard", { replace: true });
    else if (role === "supplier")
      navigate("/supplier-dashboard", { replace: true });
    else navigate("/provider-dashboard", { replace: true });
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-8 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div
            className={`bg-gradient-to-r ${containerGradient} p-3 rounded-2xl animate-pulse`}
          >
            <Zap className="h-8 w-8 text-white animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            chargeMOD
          </h1>
        </div>

        {/* Tagline */}
        <p
          className={`text-center font-medium mb-6 animate-slide-down ${
            role === "consumer" ? "text-amber-600" : "text-green-600"
          }`}
        >
          {tagline}
        </p>

        {/* Role Selector */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400"
          >
            <option value="consumer">Consumer</option>
            <option value="supplier">Supplier</option>
            <option value="provider">Provider</option>
          </select>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name
            </label>
            <select
              value={nameOption}
              onChange={(e) => setNameOption(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-gray-400"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl text-white font-semibold py-3 transition bg-neutral-900 hover:bg-neutral-800"
          >
            Sign up and go to dashboard
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-amber-600 font-semibold hover:underline"
          >
            Login as {roleLabel}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

