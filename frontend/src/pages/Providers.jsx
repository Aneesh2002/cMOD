import React, { useState } from "react";
import { Sun, Wind, Grid3X3, Zap } from "lucide-react";

export const Providers = () => {
  const [quantityKwh, setQuantityKwh] = useState(10);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [note, setNote] = useState("");
  const costPerKwh = 5;

  const providers = [
    { id: 1, name: "ChargeGrid North", type: "Solar", tariff: 5.0, rating: 4.6 },
    { id: 2, name: "WindCharge Hub", type: "Wind", tariff: 4.7, rating: 4.4 },
    { id: 3, name: "City Grid Central", type: "Grid", tariff: 5.2, rating: 4.1 },
  ];

  const renderTypeIcon = (type) => {
    if (type === "Solar") return <Sun className="h-4 w-4 text-yellow-600" />;
    if (type === "Wind") return <Wind className="h-4 w-4 text-blue-600" />;
    return <Grid3X3 className="h-4 w-4 text-gray-600" />;
  };

  const handleRequest = (supplierId) => {
    setSelectedProviderId(supplierId);
  };

  const submitRequest = () => {
    const provider = providers.find((s) => s.id === selectedProviderId);
    if (!provider) return;
    const request = {
      id: Date.now(),
      providerId: provider.id,
      providerName: provider.name,
      kwh: quantityKwh,
      amountRs: +(quantityKwh * costPerKwh).toFixed(2),
      note,
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("energyRequests") || "[]");
    existing.push(request);
    localStorage.setItem("energyRequests", JSON.stringify(existing));
    alert(`Request sent to ${provider.name} for ${quantityKwh} kWh`);
    setSelectedProviderId(null);
    setQuantityKwh(10);
    setNote("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Providers</h1>
        <div className="inline-flex items-center gap-2 text-amber-700 font-medium">
          <Zap className="h-4 w-4" /> Send energy request to providers
        </div>
      </div>
      <div className="space-y-3">
        {providers.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  p.type === "Solar" ? "bg-yellow-100" : p.type === "Wind" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {renderTypeIcon(p.type)}
              </div>
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-neutral-500">
                  {p.type} • ₹{p.tariff}/kWh • {p.rating} ★
                </div>
              </div>
            </div>
            <button
              className="rounded-lg border px-3 py-1.5 hover:bg-amber-50 hover:border-amber-300"
              onClick={() => handleRequest(p.id)}
            >
              Request Energy
            </button>
          </div>
        ))}
      </div>

      {selectedProviderId && (
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
              <div className="text-sm text-neutral-600">Estimated cost: ₹{(quantityKwh * costPerKwh).toFixed(2)}</div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button className="px-3 py-1.5 rounded border" onClick={() => setSelectedProviderId(null)}>
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
