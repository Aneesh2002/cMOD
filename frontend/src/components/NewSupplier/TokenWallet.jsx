import React, { useMemo, useState } from "react";

export default function TokenWallet() {
  // --- Mocked wallet + market state (swap with API later) ---
  const [etBalance, setEtBalance] = useState(12_500); // ET
  const [fiatBalance, setFiatBalance] = useState(86_400); // in INR (₹)
  const etPrice = 12.5; // ₹ per ET (sample)
  const feeRate = 0.005; // 0.5%
  const minQty = 10;
  const maxQty = 100_000;

  // history (prepend on txn)
  const [history, setHistory] = useState([
    { id: "TX-1009", type: "Buy", qty: 1200, price: 12.4, fee: 7.44, total: 14887.44, date: "2025-09-18 15:33", status: "Confirmed" },
    { id: "TX-1008", type: "Sell", qty: 500, price: 12.7, fee: 3.18, total: 6331.82, date: "2025-09-17 10:22", status: "Confirmed" },
    { id: "TX-1007", type: "Buy", qty: 300, price: 12.6, fee: 1.89, total: 3781.89, date: "2025-09-16 09:11", status: "Confirmed" },
  ]);

  // --- Buy form ---
  const [buyQty, setBuyQty] = useState("");
  const buySub = useMemo(() => {
    const q = Number(buyQty || 0);
    const gross = q * etPrice;
    const fee = gross * feeRate;
    const total = gross + fee;
    return { q, gross, fee, total };
  }, [buyQty, etPrice]);

  // --- Sell form ---
  const [sellQty, setSellQty] = useState("");
  const sellSub = useMemo(() => {
    const q = Number(sellQty || 0);
    const gross = q * etPrice;
    const fee = gross * feeRate;
    const net = Math.max(0, gross - fee);
    return { q, gross, fee, net };
  }, [sellQty, etPrice]);

  // helpers
  const fmt = (n) => n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
  const genId = () => "TX-" + Math.floor(1000 + Math.random() * 9000);

  function validQty(q, max = Infinity) {
    if (!Number.isFinite(q) || q <= 0) return "Enter a valid quantity.";
    if (q < minQty) return `Minimum: ${minQty} ET`;
    if (q > Math.min(maxQty, max)) return `Maximum: ${fmt(Math.min(maxQty, max))} ET`;
    return "";
  }

  // --- Actions (mock) ---
  function handleBuy() {
    const err = validQty(buySub.q);
    if (err) return alert(err);
    if (buySub.total > fiatBalance) return alert("Insufficient INR balance.");
    // apply
    setFiatBalance((v) => v - buySub.total);
    setEtBalance((v) => v + buySub.q);
    setHistory((h) => [
      { id: genId(), type: "Buy", qty: buySub.q, price: etPrice, fee: buySub.fee, total: buySub.total, date: now(), status: "Confirmed" },
      ...h,
    ]);
    setBuyQty("");
  }

  function handleSell() {
    const err = validQty(sellSub.q, etBalance);
    if (err) return alert(err);
    // apply
    setEtBalance((v) => v - sellSub.q);
    setFiatBalance((v) => v + sellSub.net);
    setHistory((h) => [
      { id: genId(), type: "Sell", qty: sellSub.q, price: etPrice, fee: sellSub.fee, total: sellSub.net, date: now(), status: "Confirmed" },
      ...h,
    ]);
    setSellQty("");
  }

  function now() {
    const d = new Date();
    const pad = (x) => String(x).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  return (
    <div className="space-y-6">
      {/* Balances */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">ET Balance</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{fmt(etBalance)} <span className="text-sm font-normal text-gray-500">ET</span></p>
          <p className="mt-1 text-sm text-gray-500">≈ ₹{fmt(etBalance * etPrice)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500">INR Balance</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">₹{fmt(fiatBalance)}</p>
          <p className="mt-1 text-sm text-gray-500">ET Price: ₹{fmt(etPrice)} / ET • Fee: {(feeRate * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Buy / Sell */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Buy */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Buy ET</h3>
            <button
              onClick={() => setBuyQty(String(minQty))}
              className="text-xs text-emerald-700 hover:underline"
            >
              Min: {minQty}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Quantity (ET)</label>
              <input
                value={buyQty}
                onChange={(e) => setBuyQty(e.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                placeholder="e.g., 500"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <p className="mt-1 text-xs text-gray-500">Max: {fmt(maxQty)} ET</p>
            </div>
            <SummaryLine label="Cost (₹)" value={fmt(buySub.gross)} />
            <SummaryLine label="Fee (₹)" value={fmt(buySub.fee)} />
            <SummaryLine label="Total Payable (₹)" value={fmt(buySub.total)} bold />
          </div>

          <button
            onClick={handleBuy}
            className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            disabled={!buySub.q}
          >
            Buy ET
          </button>
        </div>

        {/* Sell */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">Sell ET</h3>
            <button
              onClick={() => setSellQty(String(Math.min(100, etBalance)))}
              className="text-xs text-emerald-700 hover:underline"
            >
              Quick: 100 ET
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Quantity (ET)</label>
              <input
                value={sellQty}
                onChange={(e) => setSellQty(e.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                placeholder="e.g., 300"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <p className="mt-1 text-xs text-gray-500">Available: {fmt(etBalance)} ET</p>
            </div>
            <SummaryLine label="Gross (₹)" value={fmt(sellSub.gross)} />
            <SummaryLine label="Fee (₹)" value={fmt(sellSub.fee)} />
            <SummaryLine label="Net Receivable (₹)" value={fmt(sellSub.net)} bold />
          </div>

          <button
            onClick={handleSell}
            className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            disabled={!sellSub.q}
          >
            Sell ET
          </button>
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
          <span className="text-xs text-gray-500">Latest 10 records</span>
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <Th>Txn ID</Th>
                  <Th>Type</Th>
                  <Th>Qty (ET)</Th>
                  <Th>Price (₹)</Th>
                  <Th>Fee (₹)</Th>
                  <Th>Total (₹)</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 10).map((r, i) => (
                  <tr key={r.id + i} className={i % 2 ? "bg-white" : "bg-gray-50/60"}>
                    <td className="px-4 py-3 font-mono text-xs text-gray-900">{r.id}</td>
                    <td className="px-4 py-3 text-gray-700">{r.type}</td>
                    <td className="px-4 py-3 text-gray-900">{fmt(r.qty)}</td>
                    <td className="px-4 py-3 text-gray-900">{fmt(r.price)}</td>
                    <td className="px-4 py-3 text-gray-900">{fmt(r.fee)}</td>
                    <td className="px-4 py-3 text-gray-900">{fmt(r.total)}</td>
                    <td className="px-4 py-3 text-gray-700">{r.date}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-medium text-emerald-700">
                        <span className="inline-block size-2 rounded-full bg-emerald-500" /> {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-gray-500">No activity yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable label/value line */
function SummaryLine({ label, value, bold }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      <div className={`rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ${bold ? "font-semibold text-gray-900" : "text-gray-800"}`}>
        {value}
      </div>
    </div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-2 font-medium">{children}</th>;
}
