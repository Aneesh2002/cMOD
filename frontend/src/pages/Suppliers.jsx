import React, { useState } from "react";
import { Sun, Wind, Grid3X3, Zap } from "lucide-react";

export const Suppliers = () => {
  const [quantityKwh, setQuantityKwh] = useState(10);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [note, setNote] = useState("");

  const suppliers = [
    { id: 1, name: "GreenPower Solar", type: "Solar", tariff: 4.5, rating: 4.7 },
    { id: 2, name: "WindEnergy Co.", type: "Wind", tariff: 4.2, rating: 4.5 },
    { id: 3, name: "Grid Supplier A", type: "Grid", tariff: 5.1, rating: 4.2 },
  ];

  const renderTypeIcon = (type) => {
    if (type === "Solar") return <Sun className="h-4 w-4 text-yellow-600" />;
    if (type === "Wind") return <Wind className="h-4 w-4 text-blue-600" />;
    return <Grid3X3 className="h-4 w-4 text-gray-600" />;
  };

  const handleRequest = (supplierId) => {
    setSelectedSupplierId(supplierId);
  };

  const submitRequest = () => {
    const supplier = suppliers.find((s) => s.id === selectedSupplierId);
    if (!supplier) return;
    const request = {
      supplierId: supplier.id,
      supplierName: supplier.name,
      quantityKwh,
      note,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("energyRequests") || "[]");
    existing.push(request);
    localStorage.setItem("energyRequests", JSON.stringify(existing));
    alert(`Request sent to ${supplier.name} for ${quantityKwh} kWh`);
    setSelectedSupplierId(null);
    setQuantityKwh(10);
    setNote("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <div className="inline-flex items-center gap-2 text-amber-700 font-medium">
          <Zap className="h-4 w-4" /> Buy clean energy from listed suppliers
        </div>
      </div>
      <div className="space-y-3">
        {suppliers.map((s) => (
          <div key={s.id} className="rounded-xl border bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  s.type === "Solar" ? "bg-yellow-100" : s.type === "Wind" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {renderTypeIcon(s.type)}
              </div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-neutral-500">
                  {s.type} • ₹{s.tariff}/kWh • {s.rating} ★
                </div>
              </div>
            </div>
            <button
              className="rounded-lg border px-3 py-1.5 hover:bg-amber-50 hover:border-amber-300"
              onClick={() => handleRequest(s.id)}
            >
              Request Energy
            </button>
          </div>
        ))}
      </div>

      {selectedSupplierId && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Request Energy</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Quantity (kWh)</label>
                <input
                  type="number"
                  min={1}
                  value={quantityKwh}
                  onChange={(e) => setQuantityKwh(Number(e.target.value))}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Note (optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded border px-3 py-2 min-h-24"
                  placeholder="Any instruction for provider"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button className="px-3 py-1.5 rounded border" onClick={() => setSelectedSupplierId(null)}>
                  Cancel
                </button>
                <button
                  className="px-3 py-1.5 rounded bg-amber-600 text-white hover:bg-amber-700"
                  onClick={submitRequest}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


