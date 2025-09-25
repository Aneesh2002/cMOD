// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("consumer");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!window.ethereum) return alert("MetaMask not found");

    // Get wallet from MetaMask
    const [wallet] = await window.ethereum.request({ method: "eth_requestAccounts" });

    try {
      if (isLogin) {
        // --- LOGIN ---
        const { data } = await axios.post("http://localhost:5000/api/auth/login", {
          wallet,
          role,
        });
        alert("✅ Login successful");
        navigate(`/${data.role}-dashboard`);
      } else {
        // --- SIGNUP ---
        const { data } = await axios.post("http://localhost:5000/api/auth/signup", {
          wallet,
          username,
          role,
        });
        alert("✅ Signup successful");
        navigate(`/${data.role}-dashboard`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium">Role</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="consumer">Consumer</option>
            <option value="supplier">Supplier</option>
            <option value="provider">Provider</option>
          </select>
        </div>

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-center mt-4 text-blue-500 cursor-pointer"
        >
          {isLogin ? "Don’t have an account? Signup" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
