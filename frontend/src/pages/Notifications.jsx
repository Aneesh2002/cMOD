import { FaBell } from "react-icons/fa";

export const Notifications = () => {
  const items = [
    { id: "n1", title: "Tariff Update – Green Plug", date: "16 Aug 2025" },
    { id: "n2", title: "New EV Station in Thrissur", date: "31 Jul 2025" },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-amber-600" />
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>
      <div className="space-y-3">
        {items.map((n) => (
          <div
            key={n.id}
            className="rounded-2xl border bg-white overflow-hidden"
          >
            <div className="h-28 bg-gradient-to-r from-emerald-100 via-white to-amber-100" />
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-xs text-neutral-500">{n.date}</div>
              </div>
              <button className="text-amber-600 text-sm">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
