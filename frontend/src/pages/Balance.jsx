export const Balance = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Balance</h1>
      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm text-neutral-600">Your current wallet balance.</p>
        <div className="mt-3 text-3xl font-bold text-emerald-700">₹0.00</div>
      </div>
    </div>
  );
};
