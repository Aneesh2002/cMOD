
// import React, { useMemo, useState } from "react";

// /** Small status chip to match the rest of the app */
// function StatusChip({ status }) {
//   const map = {
//     Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     Pending: "bg-amber-50 text-amber-700 border-amber-200",
//     Failed: "bg-rose-50 text-rose-700 border-rose-200",
//   };
//   const dot =
//     status === "Confirmed" ? "bg-emerald-500" : status === "Pending" ? "bg-amber-500" : "bg-rose-500";
//   return (
//     <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-medium ${map[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
//       <span className={`inline-block size-2 rounded-full ${dot}`} />
//       {status}
//     </span>
//   );
// }

// /** --- Sample data (you can swap with API data later) --- */
// const SAMPLE = [
//   { id: "0x9af...101", type: "Grid Export",       amount: 1500, unit: "TKN", date: "2025-09-18", status: "Confirmed" },
//   { id: "0x9af...102", type: "Renewable Supply",  amount: 2200, unit: "TKN", date: "2025-09-18", status: "Confirmed" },
//   { id: "0x9af...103", type: "Bulk Energy Sale",  amount: 3500, unit: "TKN", date: "2025-09-16", status: "Pending"   },
//   { id: "0x9af...104", type: "Grid Import",       amount:  820, unit: "TKN", date: "2025-09-15", status: "Failed"    },
//   { id: "0x9af...105", type: "Renewable Supply",  amount: 1680, unit: "TKN", date: "2025-09-14", status: "Confirmed" },
//   { id: "0x9af...106", type: "Grid Export",       amount: 1420, unit: "TKN", date: "2025-09-13", status: "Confirmed" },
//   { id: "0x9af...107", type: "Bulk Energy Sale",  amount: 2800, unit: "TKN", date: "2025-09-12", status: "Pending"   },
//   { id: "0x9af...108", type: "Grid Import",       amount:  950, unit: "TKN", date: "2025-09-11", status: "Confirmed" },
//   { id: "0x9af...109", type: "Renewable Supply",  amount: 1995, unit: "TKN", date: "2025-09-10", status: "Failed"    },
//   { id: "0x9af...10A", type: "Grid Export",       amount: 1330, unit: "TKN", date: "2025-09-09", status: "Confirmed" },
//   { id: "0x9af...10B", type: "Bulk Energy Sale",  amount: 3100, unit: "TKN", date: "2025-09-08", status: "Confirmed" },
//   { id: "0x9af...10C", type: "Renewable Supply",  amount: 2400, unit: "TKN", date: "2025-09-07", status: "Pending"   },
// ];

// export default function Transactions() {
//   const [query, setQuery] = useState("");
//   const [status, setStatus] = useState("All");
//   const [sortBy, setSortBy] = useState({ key: "date", dir: "desc" as "asc" | "desc" });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(6);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     let rows = SAMPLE.filter(r => {
//       const matchesQ =
//         !q ||
//         r.id.toLowerCase().includes(q) ||
//         r.type.toLowerCase().includes(q) ||
//         String(r.amount).includes(q) ||
//         r.date.includes(q) ||
//         r.status.toLowerCase().includes(q);
//       const matchesStatus = status === "All" || r.status === status;
//       return matchesQ && matchesStatus;
//     });
//     rows.sort((a, b) => {
//       const dir = sortBy.dir === "asc" ? 1 : -1;
//       if (sortBy.key === "amount") return (a.amount - b.amount) * dir;
//       if (sortBy.key === "type") return a.type.localeCompare(b.type) * dir;
//       if (sortBy.key === "status") return a.status.localeCompare(b.status) * dir;
//       // date (default)
//       return (a.date.localeCompare(b.date)) * dir;
//     });
//     return rows;
//   }, [query, status, sortBy]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const start = (safePage - 1) * pageSize;
//   const pageRows = filtered.slice(start, start + pageSize);

//   function setSort(key: "date" | "amount" | "type" | "status") {
//     setSortBy(prev => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
//   }

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>

//         {/* Controls */}
//         <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
//           <div className="relative w-full sm:w-64">
//             <input
//               value={query}
//               onChange={(e) => { setPage(1); setQuery(e.target.value); }}
//               type="text"
//               placeholder="Search by ID / type / date"
//               className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
//             />
//             <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               🔎
//             </span>
//           </div>

//           <select
//             value={status}
//             onChange={(e) => { setPage(1); setStatus(e.target.value); }}
//             className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
//           >
//             <option>All</option>
//             <option>Confirmed</option>
//             <option>Pending</option>
//             <option>Failed</option>
//           </select>

//           <select
//             value={pageSize}
//             onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}
//             className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
//           >
//             <option value={5}>5 / page</option>
//             <option value={6}>6 / page</option>
//             <option value={10}>10 / page</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
//         <table className="min-w-full text-left text-sm">
//           <thead className="bg-gray-50 text-gray-600">
//             <tr>
//               <Th label="Transaction ID" />
//               <Th label="Type" sortable onClick={() => setSort("type")} active={sortBy.key === "type"} dir={sortBy.dir} />
//               <Th label="Amount" sortable onClick={() => setSort("amount")} active={sortBy.key === "amount"} dir={sortBy.dir} />
//               <Th label="Date" sortable onClick={() => setSort("date")} active={sortBy.key === "date"} dir={sortBy.dir} />
//               <Th label="Status" sortable onClick={() => setSort("status")} active={sortBy.key === "status"} dir={sortBy.dir} />
//             </tr>
//           </thead>
//           <tbody>
//             {pageRows.length === 0 && (
//               <tr>
//                 <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//             {pageRows.map((r, idx) => (
//               <tr key={r.id} className={idx % 2 ? "bg-white" : "bg-gray-50/60"}>
//                 <td className="px-4 py-3 font-mono text-xs text-gray-900">{r.id}</td>
//                 <td className="px-4 py-3 text-gray-700">{r.type}</td>
//                 <td className="px-4 py-3 text-gray-900">{r.amount.toLocaleString()} {r.unit}</td>
//                 <td className="px-4 py-3 text-gray-700">{r.date}</td>
//                 <td className="px-4 py-3"><StatusChip status={r.status} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
//         <p className="text-xs text-gray-500">
//           Showing <span className="font-medium text-gray-700">{filtered.length === 0 ? 0 : start + 1}</span>–
//           <span className="font-medium text-gray-700">{Math.min(start + pageSize, filtered.length)}</span> of{" "}
//           <span className="font-medium text-gray-700">{filtered.length}</span>
//         </p>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={safePage === 1}
//             className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="text-sm text-gray-700">
//             Page <span className="font-medium">{safePage}</span> / {totalPages}
//           </span>
//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={safePage === totalPages}
//             className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /** simple TH with optional sorting caret */
// function Th({ label, sortable, onClick, active, dir }) {
//   return (
//     <th
//       className={`px-4 py-2 font-medium ${sortable ? "cursor-pointer select-none hover:text-gray-800" : ""}`}
//       onClick={sortable ? onClick : undefined}
//     >
//       <span className="inline-flex items-center gap-1">
//         {label}
//         {sortable && (
//           <svg
//             viewBox="0 0 20 20"
//             className={`size-3.5 transition ${active ? "text-gray-800" : "text-gray-400"}`}
//             aria-hidden
//           >
//             {/* up/down caret combined */}
//             <path d="M6 12l4 4 4-4H6zM6 8l4-4 4 4H6z" fill="currentColor" />
//           </svg>
//         )}
//       </span>
//     </th>
//   );
// }

import React, { useMemo, useState } from "react";

/* --- Sample data (replace with API data later) --- */
const TRANSACTIONS = [
  { id: "0x9af...101", type: "Grid Export",      amount: 1500, unit: "TKN", date: "2025-09-18", status: "Confirmed" },
  { id: "0x9af...102", type: "Renewable Supply", amount: 2200, unit: "TKN", date: "2025-09-18", status: "Confirmed" },
  { id: "0x9af...103", type: "Bulk Energy Sale", amount: 3500, unit: "TKN", date: "2025-09-16", status: "Pending"   },
  { id: "0x9af...104", type: "Grid Import",      amount:  820, unit: "TKN", date: "2025-09-15", status: "Failed"    },
  { id: "0x9af...105", type: "Renewable Supply", amount: 1680, unit: "TKN", date: "2025-09-14", status: "Confirmed" },
  { id: "0x9af...106", type: "Grid Export",      amount: 1420, unit: "TKN", date: "2025-09-13", status: "Confirmed" },
  { id: "0x9af...107", type: "Bulk Energy Sale", amount: 2800, unit: "TKN", date: "2025-09-12", status: "Pending"   },
  { id: "0x9af...108", type: "Grid Import",      amount:  950, unit: "TKN", date: "2025-09-11", status: "Confirmed" },
  { id: "0x9af...109", type: "Renewable Supply", amount: 1995, unit: "TKN", date: "2025-09-10", status: "Failed"    },
  { id: "0x9af...10A", type: "Grid Export",      amount: 1330, unit: "TKN", date: "2025-09-09", status: "Confirmed" },
  { id: "0x9af...10B", type: "Bulk Energy Sale", amount: 3100, unit: "TKNê", date: "2025-09-08", status: "Confirmed" }, // deliberate stray unit to show search robustness
  { id: "0x9af...10C", type: "Renewable Supply", amount: 2400, unit: "TKN", date: "2025-09-07", status: "Pending"   },
];

/* Small status chip */
function StatusChip({ status }) {
  const map = {
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending:   "bg-amber-50 text-amber-700 border-amber-200",
    Failed:    "bg-rose-50 text-rose-700 border-rose-200",
  };
  const dot =
    status === "Confirmed" ? "bg-emerald-500" :
    status === "Pending"   ? "bg-amber-500"   : "bg-rose-500";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-medium ${map[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
      <span className={`inline-block size-2 rounded-full ${dot}`} />
      {status}
    </span>
  );
}

function Th({ children }) {
  return <th className="px-4 py-2 font-medium">{children}</th>;
}

export default function Transactions() {
  // Search + filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmt, setMinAmt] = useState("");
  const [maxAmt, setMaxAmt] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Dynamic options for Type dropdown (from data)
  const typeOptions = useMemo(() => {
    const set = new Set(TRANSACTIONS.map(t => t.type));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return TRANSACTIONS.filter(row => {
      // Search across multiple fields
      const matchesQuery =
        !query ||
        row.id.toLowerCase().includes(query) ||
        row.type.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        String(row.amount).includes(query) ||
        String(row.unit || "").toLowerCase().includes(query) ||
        row.date.includes(query);

      // Status filter
      const matchesStatus = status === "All" || row.status === status;

      // Type filter
      const matchesType = type === "All" || row.type === type;

      // Date range (inclusive)
      const fromOk = !dateFrom || row.date >= dateFrom;
      const toOk   = !dateTo   || row.date <= dateTo;

      // Amount range
      const minOk = !minAmt || row.amount >= Number(minAmt);
      const maxOk = !maxAmt || row.amount <= Number(maxAmt);

      return matchesQuery && matchesStatus && matchesType && fromOk && toOk && minOk && maxOk;
    });
  }, [q, status, type, dateFrom, dateTo, minAmt, maxAmt]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  function resetFilters() {
    setQ(""); setStatus("All"); setType("All");
    setDateFrom(""); setDateTo("");
    setMinAmt(""); setMaxAmt("");
    setPage(1);
  }

  // When any filter changes, go back to page 1
  function onFilterChange(fn) {
    return (e) => { fn(e.target.value); setPage(1); };
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
        <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm">
          <span className="text-gray-600">Total Transactions:</span>
          <span className="font-semibold text-gray-900">{total}</span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {/* Search */}
          <div className="relative">
            <input
              value={q}
              onChange={onFilterChange(setQ)}
              type="text"
              placeholder="Search id / type / status / date / amount"
              className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              aria-label="Search"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={onFilterChange(setStatus)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            <option>All</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>

          {/* Type */}
          <select
            value={type}
            onChange={onFilterChange(setType)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          >
            {typeOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>

          {/* Date from */}
          <input
            value={dateFrom}
            onChange={onFilterChange(setDateFrom)}
            type="date"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            aria-label="Date from"
          />

          {/* Date to */}
          <input
            value={dateTo}
            onChange={onFilterChange(setDateTo)}
            type="date"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            aria-label="Date to"
          />

          {/* Amount range */}
          <div className="flex items-center gap-2">
            <input
              value={minAmt}
              onChange={onFilterChange(setMinAmt)}
              type="number"
              min="0"
              placeholder="Min"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              aria-label="Minimum amount"
            />
            <span className="text-gray-400">—</span>
            <input
              value={maxAmt}
              onChange={onFilterChange(setMaxAmt)}
              type="number"
              min="0"
              placeholder="Max"
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              aria-label="Maximum amount"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={resetFilters}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Reset filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
        <div className="w-full overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>Transaction ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Date</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((r, idx) => (
                <tr key={`${r.id}-${idx}`} className={idx % 2 ? "bg-white" : "bg-gray-50/60"}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-900">{r.id}</td>
                  <td className="px-4 py-3 text-gray-700">{r.type}</td>
                  <td className="px-4 py-3 text-gray-900">{r.amount.toLocaleString()} {r.unit}</td>
                  <td className="px-4 py-3 text-gray-700">{r.date}</td>
                  <td className="px-4 py-3"><StatusChip status={r.status} /></td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No transactions match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {total === 0 ? 0 : start + 1}
          </span>
          –
          <span className="font-medium text-gray-700">
            {Math.min(start + pageSize, total)}
          </span>{" "}
          of <span className="font-medium text-gray-700">{total}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
