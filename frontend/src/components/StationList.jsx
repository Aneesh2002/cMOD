import React from "react";

/**
 * StationList — reusable list of charging stations.
 *
 * Props:
 * - stations: Array<{
 *     id, name, address, ports, types: string[],
 *     parkingFee, perKwh, arrive, depart, rating
 *   }>
 * - title?: string ("Stations list")
 * - showFavorite?: boolean (true)
 * - onFavorite?: () => void
 * - onBook?: (station) => void
 * - onSupport?: (station) => void
 * - emptyText?: string ("No stations found nearby.")
 * - className?: string — extra classes for the outer card (e.g., "lg:col-span-2")
 */
const StationList = ({
  stations = [],
  title = "Stations list",
  showFavorite = true,
  onFavorite,
  onBook,
  onSupport,
  emptyText = "No stations found nearby.",
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {showFavorite && (
          <button
            className="text-sm text-amber-700 hover:underline"
            onClick={onFavorite}
            type="button"
          >
            Favorite
          </button>
        )}
      </div>

      <div className="space-y-4">
        {Array.isArray(stations) && stations.length > 0 ? (
          stations.map((s) => (
            <div key={s.id ?? s.name} className="rounded-xl border p-4 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                {/* Left: info */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{s.name}</div>
                    {typeof s.rating === "number" && (
                      <span className="text-xs text-white bg-emerald-500 rounded px-1.5 py-0.5">
                        {s.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {s.address && (
                    <div className="text-xs text-gray-500">{s.address}</div>
                  )}
                  {typeof s.ports !== "undefined" && (
                    <div className="mt-2 text-xs text-gray-600">
                      Ports Available: <span className="font-semibold">{s.ports}</span>
                    </div>
                  )}
                  {Array.isArray(s.types) && s.types.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.types.map((t, i) => (
                        <span key={i} className="text-xs border rounded-full px-2 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: pricing/timing + CTAs */}
                <div className="flex flex-col items-end gap-2">
                  {s.parkingFee && (
                    <div className="text-xs text-gray-600">
                      Parking Fee: <span className="font-semibold">{s.parkingFee}</span>
                    </div>
                  )}
                  {s.perKwh && (
                    <div className="text-xs text-gray-600">
                      Per kWh: <span className="font-semibold">{s.perKwh}</span>
                    </div>
                  )}
                  {s.arrive && (
                    <div className="text-xs text-gray-600">
                      Arrive: <span className="font-semibold">{s.arrive}</span>
                    </div>
                  )}
                  {s.depart && (
                    <div className="text-xs text-gray-600">
                      Depart: <span className="font-semibold">{s.depart}</span>
                    </div>
                  )}

                  <div className="mt-1 flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 hover:bg-emerald-700"
                      onClick={() => onBook?.(s)}
                    >
                      Book
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-1.5 hover:bg-neutral-50"
                      onClick={() => onSupport?.(s)}
                    >
                      Support
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">{emptyText}</div>
        )}
      </div>
    </div>
  );
};

export default StationList;
