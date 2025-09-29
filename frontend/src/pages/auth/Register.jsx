import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setWallet(account);
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, wallet }),
    });
    const data = await res.json();
    alert("Signup successful. Nonce: " + data.nonce);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Signup</h2>
      <button onClick={connectWallet} className="p-2 bg-blue-500 text-white rounded">
        Connect Wallet
      </button>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter username"
          className="border p-2 mr-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSignup} className="p-2 bg-green-500 text-white rounded">
          Signup
        </button>
      </div>
      <p className="mt-2">Connected wallet: {wallet}</p>
    </div>
  );
}

export default Signup;
