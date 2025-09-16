import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Zap } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || "consumer");
  const [nameOption, setNameOption] = useState(
    localStorage.getItem("nameOption") || "1"
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, name: nameOption, email, password }),
    credentials: "include",
  });
  const data = await res.json();
  if (res.ok) navigate(`/${role}-dashboard`);
  else alert(data.error);
};


  

  const accent =
    role === "consumer" ? "amber" : role === "supplier" ? "green" : "indigo";

  return (
    <div className="min-h-dvh grid place-items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            chargeMOD
          </h1>
        </div>
        <p className="text-center text-sm text-gray-600 mb-4">
          Login to dashboard
        </p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Role
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

      

     <form className="space-y-4" onSubmit={handleSubmit}>
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Name
    </label>
    <input
      type="text"
      value={nameOption}
      onChange={(e) => setNameOption(e.target.value)}
      placeholder="Enter your name"
      className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-gray-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Email
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="you@example.com"
      className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-gray-400"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Password
    </label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-gray-400"
      required
    />
  </div>
  <button
    type="submit"
    className="w-full rounded-xl text-white font-semibold py-3 transition bg-neutral-900 hover:bg-neutral-800"
  >
    Continue
  </button>
</form>



        <p className="text-center text-sm mt-5 text-gray-600">
          No account?{" "}
          <NavLink to="/register" className="text-amber-600 font-semibold">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};
