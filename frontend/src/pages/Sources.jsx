export const Sources = () => {
  const sources = [
    { id: "s1", name: "BPM Power Pvt Ltd", type: "Solar", status: "Active" },
    { id: "s2", name: "Grid Supplier A", type: "Grid", status: "Active" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Linked Energy Sources</h1>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.type}</td>
                <td className="px-4 py-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
