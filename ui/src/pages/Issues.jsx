export const Issues = () => {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Raise an Issue</h1>
      <form className="space-y-3 rounded-lg border bg-white p-4">
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Billing, session, etc."
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full rounded border px-3 py-2 min-h-32"
            placeholder="Describe your issue"
          />
        </div>
        <button
          type="button"
          className="rounded bg-amber-600 text-white px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
