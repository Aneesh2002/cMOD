export const Profile = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="rounded-lg border bg-white p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Guest User"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="w-full rounded border px-3 py-2"
              placeholder="+91"
            />
          </div>
        </div>
        <button className="mt-4 rounded bg-amber-600 text-white px-4 py-2">
          Save
        </button>
      </div>
    </div>
  );
};
