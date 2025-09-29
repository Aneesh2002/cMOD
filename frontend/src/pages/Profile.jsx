import React, { useEffect, useState } from "react";
import { getContract } from "../contract";

export const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("nameOption") || "Guest User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "user@example.com");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "+91");
  const [walletBalance, setWalletBalance] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contract = await getContract();
        const userAddress = window.ethereum.selectedAddress;

        // Fetch wallet balance
        const [wallet] = await contract.getBalances(userAddress);
        setWalletBalance(Number(wallet));

        // Fetch active subscription
        const [plan, expiryTimestamp] = await contract.getUserSubscription(userAddress);
        if (plan.id !== 0) { // 0 means no subscription
          setSubscription({
            name: plan.name,
            cost: plan.cost,
            validityMonths: plan.validityMonths,
            expiry: new Date(Number(expiryTimestamp) * 1000)
          });
        } else {
          setSubscription(null);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (window.ethereum) fetchData();
  }, []);

  const handleSave = () => {
    localStorage.setItem("nameOption", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    alert("Profile saved locally!");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <div className="rounded-lg border bg-white p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Wallet Balance</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={`₹${walletBalance}`}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Active Subscription</h2>
          {subscription ? (
            <div className="rounded-lg border p-3 mt-2 bg-green-50">
              <p><strong>Name:</strong> {subscription.name}</p>
              <p><strong>Cost:</strong> ₹{subscription.cost}</p>
              <p><strong>Validity:</strong> {subscription.validityMonths} month(s)</p>
              <p><strong>Expires:</strong> {subscription.expiry.toLocaleString()}</p>
            </div>
          ) : (
            <p className="mt-2 text-gray-600">No active subscription.</p>
          )}
        </div>

        <button
          className="mt-4 rounded bg-amber-600 text-white px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
