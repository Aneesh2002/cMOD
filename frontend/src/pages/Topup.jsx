import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Topup = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("hideGlobalChrome", "true");
    return () => {
      localStorage.removeItem("hideGlobalChrome");
    };
  }, []);

  const addFunds = () => {
    const value = Number(amount);
    if (!value || value <= 0) return alert("Enter a valid amount");
    const current = Number(localStorage.getItem("walletBalance") || "0");
    const updated = current + value;
    localStorage.setItem("walletBalance", String(updated));
    
    const transactionId = Date.now();
    const transactionDate = new Date().toISOString().slice(0, 10);
    
    // Consumer transaction
    const txns = JSON.parse(localStorage.getItem("transactions") || "[]");
    txns.unshift({
      id: transactionId,
      date: transactionDate,
      type: "Wallet Top-up",
      amount: value,
      status: "completed",
      role: "consumer"
    });
    localStorage.setItem("transactions", JSON.stringify(txns.slice(0, 20)));
    
    // Trigger storage event to update other dashboards
    window.dispatchEvent(new Event('storage'));
    
    alert(`Added ₹${value} to wallet`);
    setAmount("");
  };

  const setRecommended = (val) => setAmount(String(val));

  return (
    <div className="max-w-md">
      <div className="mb-4">
        <button
          type="button"
          className="text-sm text-neutral-600 hover:text-neutral-900"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Top-up Wallet</h1>
      <form
        className="rounded-lg border bg-white p-4 space-y-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label className="block text-sm font-medium">Amount (₹)</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min={1}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {[100, 200, 300, 500, 1000].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setRecommended(v)}
              className="px-3 py-1.5 rounded-full border text-sm hover:bg-amber-50 hover:border-amber-300"
            >
              ₹{v}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="rounded bg-amber-600 text-white px-4 py-2"
          onClick={addFunds}
        >
          Add Funds
        </button>
      </form>
    </div>
  );
};
