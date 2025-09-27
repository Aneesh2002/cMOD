import React, { useMemo, useState } from "react";
import {
  Wallet2,
  Search,
  ShoppingCart,
  Building2,
  PlugZap,
  Filter,
  Coins,
  CheckCircle2,
  CircleDot,
  MapPin,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/************************************
 * Minimal inline UI (JS, no aliases)
 * These mimic shadcn/ui pieces so the
 * page works even if ../ui/* files are
 * missing in your environment.
 ************************************/
const cn = (...a) => a.filter(Boolean).join(" ");

export function Card({ className = "", children }) {
  return <div className={cn("rounded-xl border border-gray-200 bg-white shadow-sm", className)}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={cn("p-4 border-b border-gray-100", className)}>{children}</div>;
}
export function CardContent({ className = "", children }) {
  return <div className={cn("p-4", className)}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h3 className={cn("text-lg font-semibold tracking-tight", className)}>{children}</h3>;
}

export function Button({ className = "", variant = "default", size = "sm", type = "button", ...props }) {
  const variants = {
    default: "bg-gray-900 text-white hover:bg-black",
    outline: "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm" };
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant] || variants.default,
        sizes[size] || sizes.sm,
        className
      )}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-50",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className = "", children, ...props }) {
  return (
    <label className={cn("text-sm text-gray-600", className)} {...props}>
      {children}
    </label>
  );
}

export function Badge({ className = "", variant = "default", children }) {
  const variants = {
    default: "bg-emerald-50 text-emerald-700",
    secondary: "bg-gray-100 text-gray-700",
    outline: "border border-gray-200 text-gray-700",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", variants[variant] || variants.default, className)}>
      {children}
    </span>
  );
}

export function Separator({ orientation = "horizontal", className = "" }) {
  return (
    <div className={cn(orientation === "vertical" ? "h-8 w-px" : "h-px w-full", "bg-gray-200", className)} />
  );
}

/************************************
 * Lightweight <Select> shim
 * API-compatible with shadcn usage in
 * this page. Renders a native <select>.
 ************************************/
function Select({ value, onValueChange, disabled, children, className = "" }) {
  // gather items from <SelectContent><SelectItem/></SelectContent>
  const items = [];
  React.Children.forEach(children, (child) => {
    if (!child) return;
    if (child.type && child.type.displayName === "SelectContent") {
      React.Children.forEach(child.props.children, (item) => {
        if (item && item.type && item.type.displayName === "SelectItem") {
          items.push({ value: item.props.value, label: item.props.children });
        }
      });
    }
  });
  return (
    <select
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-50",
        className
      )}
    >
      {items.map((it) => (
        <option key={String(it.value)} value={it.value}>
          {it.label}
        </option>
      ))}
    </select>
  );
}
function SelectContent({ children }) { return null; }
SelectContent.displayName = "SelectContent";
function SelectItem({ children }) { return null; }
SelectItem.displayName = "SelectItem";
function SelectTrigger({ children }) { return <div className="hidden">{children}</div>; }
SelectTrigger.displayName = "SelectTrigger";
function SelectValue() { return null; }
SelectValue.displayName = "SelectValue";

/************************************
   Small UI bits
*************************************/
function StatusChip({ status }) {
  const styles = {
    Listed: "bg-sky-50 text-sky-700 border-sky-200",
    Sold: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const dot = {
    Listed: "bg-sky-500",
    Sold: "bg-emerald-500",
  }[status] || "bg-gray-400";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium", styles[status] || "bg-gray-50 text-gray-700 border-gray-200")}> 
      <span className={cn("inline-block size-2 rounded-full", dot)} />
      {status}
    </span>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={htmlFor} className="text-xs text-muted-foreground">
          {label}
        </Label>
      )}
      {children}
    </div>
  );
}

/************************************
   Reusable Packet Card
*************************************/
function PacketCard({ packet, currentUserAddress, onBuy }) {
  const fmt = (n) => n.toLocaleString("en-IN");
  const isOwner = packet.supplierAddress === currentUserAddress;
  const isSold = packet.status === "Sold";
  const canBeBought = !isOwner && !isSold;

  return (
    <Card className={cn("transition-all", isSold ? "opacity-60" : "hover:shadow-md")}> 
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold tracking-tight text-foreground">
            {packet.orgName}
          </CardTitle>
          <p className="font-mono text-xs text-muted-foreground" title={packet.supplierAddress}>
            Supplier: {packet.supplierAddress.slice(0, 6)}...{packet.supplierAddress.slice(-4)}
          </p>
        </div>
        <StatusChip status={packet.status} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <PlugZap className="h-4 w-4" />
              <span>Capacity</span>
            </div>
            <div className="mt-1 text-base font-semibold text-foreground">
              {fmt(packet.capacityKWh)} kWh
            </div>
          </div>
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coins className="h-4 w-4" />
              <span>Price</span>
            </div>
            <div className="mt-1 text-base font-semibold text-foreground">
              {fmt(packet.priceET)} ET
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {packet.region}
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" /> Listed {packet.createdAt}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {canBeBought ? (
            <Button size="sm" onClick={() => onBuy(packet)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Buy Packet
            </Button>
          ) : isOwner && !isSold ? (
            <Badge variant="secondary" className="rounded-md">Your Listing</Badge>
          ) : (
            <Badge variant="outline" className="rounded-md"><CheckCircle2 className="mr-1 h-3.5 w-3.5"/> Sold</Badge>
          )}

          <Badge variant="outline" className="rounded-md">
            <Building2 className="mr-1 h-3.5 w-3.5" /> {packet.id}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

/************************************
   Main Page Component
*************************************/
export default function EnergyMarketplace() {
  const [user, setUser] = useState({ address: null, etBalance: 0 });

  const [allPackets, setAllPackets] = useState([
    {
      id: "EP-24001",
      orgName: "Solar South Zone",
      capacityKWh: 2500,
      priceET: 1800,
      region: "South",
      status: "Listed",
      createdAt: "2025-09-18 10:10",
      supplierAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    },
    {
      id: "EP-24002",
      orgName: "Wind West Co.",
      capacityKWh: 3200,
      priceET: 2400,
      region: "West",
      status: "Listed",
      createdAt: "2025-09-17 15:05",
      supplierAddress: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    },
    {
      id: "EP-24003",
      orgName: "North Grid Exports",
      capacityKWh: 1800,
      priceET: 1500,
      region: "North",
      status: "Sold",
      createdAt: "2025-09-16 12:30",
      supplierAddress: "0x78731D3Ca6b7E34aC0F824c42a7Cc18A495cabaB",
    },
  ]);

  const [orgName, setOrgName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("South");

  const [q, setQ] = useState("");
  const [regionF, setRegionF] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Derived: my packets
  const myPackets = useMemo(() => {
    if (!user.address) return [];
    return allPackets.filter((p) => p.supplierAddress === user.address);
  }, [allPackets, user.address]);

  const regionOptions = useMemo(
    () => ["All", ...Array.from(new Set(allPackets.map((p) => p.region)))],
    [allPackets]
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allPackets.filter((p) => {
      const matchesQ =
        !query ||
        p.id.toLowerCase().includes(query) ||
        p.orgName.toLowerCase().includes(query) ||
        p.region.toLowerCase().includes(query);
      const matchesRegion = regionF === "All" || p.region === regionF;
      return matchesQ && matchesRegion;
    });
  }, [allPackets, q, regionF]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIdx = (safePage - 1) * pageSize;
  const pageRows = filtered.slice(startIdx, startIdx + pageSize);

  /* ------------------------
     Mock blockchain actions
  -------------------------*/
  function connectWallet() {
    setUser({
      address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b", // mock address
      etBalance: 10000,
    });
  }

  function listEnergyPacket() {
    if (!user.address) return alert("Please connect your wallet first.");
    if (!orgName.trim() || !(Number(capacity) > 0) || !(Number(price) > 0))
      return alert("Please fill out all fields with valid values.");

    const newPacket = {
      id: "EP-" + Math.floor(24000 + Math.random() * 1000),
      orgName: orgName.trim(),
      capacityKWh: Number(capacity),
      priceET: Number(price),
      region,
      status: "Listed",
      createdAt: new Date().toLocaleString(),
      supplierAddress: user.address,
    };
    setAllPackets((p) => [newPacket, ...p]);
    setOrgName("");
    setCapacity("");
    setPrice("");
    setPage(1);
  }

  function handleBuyPacket(packet) {
    if (!user.address) return alert("Please connect your wallet to buy.");
    if (user.etBalance < packet.priceET)
      return alert("Insufficient ET token balance.");
    if (packet.supplierAddress === user.address)
      return alert("You cannot buy your own packet.");

    // 1. Decrease buyer's balance
    setUser((prev) => ({ ...prev, etBalance: prev.etBalance - packet.priceET }));

    // 2. Mark the packet as 'Sold'
    setAllPackets((prevPackets) =>
      prevPackets.map((p) => (p.id === packet.id ? { ...p, status: "Sold" } : p))
    );

    // 3. Simulate transfer (console only)
    console.log(
      `Transaction successful! Simulating transfer of ${packet.priceET} ET to seller ${packet.supplierAddress}`
    );
  }

  /* ------------------------
     Render
  -------------------------*/
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">
      {/* Header / Wallet */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-4 sm:flex-row">
          {user.address ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50">
                  <Wallet2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Connected as</p>
                  <p className="font-mono text-sm" title={user.address}>
                    {user.address.slice(0, 10)}...{user.address.slice(-8)}
                  </p>
                </div>
              </div>
              <Separator className="hidden h-8 sm:block" orientation="vertical" />
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Your Balance</p>
                <div className="mt-0.5 flex items-center justify-end gap-2 text-lg font-semibold text-emerald-600">
                  <Coins className="h-5 w-5" />
                  {user.etBalance.toLocaleString()} ET
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center gap-2 p-2 text-center">
              <p className="font-medium text-foreground">Connect your wallet to get started</p>
              <Button onClick={connectWallet} className="gap-2">
                <Wallet2 className="h-4 w-4" /> Connect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* List Energy Form */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <PlugZap className="h-5 w-5 text-emerald-600" />
            List Your Energy for Sale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label="Organisation Name" htmlFor="orgName">
              <Input
                id="orgName"
                placeholder="e.g., Solar South Co."
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                disabled={!user.address}
              />
            </Field>

            <Field label="Region" htmlFor="region">
              <Select value={region} onValueChange={(v) => setRegion(v)} disabled={!user.address}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {["South", "North", "East", "West", "Central"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Amount of Energy (kWh)" htmlFor="capacity">
              <Input
                id="capacity"
                type="number"
                min="0"
                placeholder="e.g., 2500"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                disabled={!user.address}
              />
            </Field>

            <Field label="Price (ET)" htmlFor="price">
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g., 1800"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={!user.address}
              />
            </Field>
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={listEnergyPacket} disabled={!user.address} className="gap-2">
              <CircleDot className="h-4 w-4" /> List Energy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Listed Packets */}
      {user.address && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">My Listed Packets</h2>
            <Badge variant="secondary" className="rounded-md">
              <Building2 className="mr-1 h-3.5 w-3.5" /> {myPackets.length} listed
            </Badge>
          </div>

          {myPackets.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {myPackets.map((p) => (
                <PacketCard key={p.id} packet={p} currentUserAddress={user.address} onBuy={handleBuyPacket} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                You haven't listed any energy yet.
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* Energy Marketplace */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Energy Marketplace (All Listings)</h2>
          <Badge variant="outline" className="rounded-md">
            <Filter className="mr-1 h-3.5 w-3.5" /> {filtered.length} results
          </Badge>
        </div>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Field label="Search">
                <div className="relative">
                  <Input
                    placeholder="Search by ID / name / region..."
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    className="pr-9"
                  />
                  <Search className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </Field>

              <Field label="Region">
                <Select value={regionF} onValueChange={(v) => { setRegionF(v); setPage(1); }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Rows">
                <Select value={String(pageSize)} onValueChange={(v) => { setPage(1); setPageSize(Number(v)); }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[6, 9, 12].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pageRows.map((p) => (
            <PacketCard key={p.id} packet={p} currentUserAddress={user.address} onBuy={handleBuyPacket} />
          ))}

          {pageRows.length === 0 && (
            <Card className="md:col-span-2 xl:col-span-3">
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                No energy packets found with the current filters.
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + pageSize, filtered.length)} of {filtered.length}
          </p>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePage === 1} className="gap-1">
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-sm">
              Page <span className="font-medium">{safePage}</span> / {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePage === totalPages} className="gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


// import React, { useMemo, useState } from "react";

// /* ---------- Small UI bits ---------- */
// function StatusChip({ status }) {
//   const map = {
//     Open: "bg-sky-50 text-sky-700 border-sky-200",
//     Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     Denied: "bg-rose-50 text-rose-700 border-rose-200",
//     Archived: "bg-gray-50 text-gray-700 border-gray-200",
//     Filled: "bg-indigo-50 text-indigo-700 border-indigo-200",
//     Expired: "bg-amber-50 text-amber-700 border-amber-200",
//   };
//   const dot = {
//     Open: "bg-sky-500",
//     Approved: "bg-emerald-500",
//     Denied: "bg-rose-500",
//     Archived: "bg-gray-400",
//     Filled: "bg-indigo-500",
//     Expired: "bg-amber-500",
//   }[status] || "bg-gray-400";
//   return (
//     <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-xs font-medium ${map[status] || "bg-gray-50 text-gray-700 border-gray-200"}`}>
//       <span className={`inline-block size-2 rounded-full ${dot}`} />
//       {status}
//     </span>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-4">
//       <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
//       <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <label className="block">
//       <span className="mb-1 block text-xs font-medium text-gray-600">{label}</span>
//       {children}
//     </label>
//   );
// }

// function Input(props) {
//   return (
//     <input
//       {...props}
//       className={"w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 " + (props.className || "")}
//     />
//   );
// }

// function Select(props) {
//   return (
//     <select
//       {...props}
//       className={"w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 " + (props.className || "")}
//     />
//   );
// }

// /* ---------- Page ---------- */
// export default function EnergyRequests() {
//   // sample seed data
//   const [packets, setPackets] = useState([
//     {
//       id: "EP-24001",
//       name: "Solar South Zone – Morning",
//       capacityKWh: 2500,
//       priceET: 1800,
//       minStakeET: 200,
//       region: "South",
//       windowStart: "2025-09-20T06:00",
//       windowEnd: "2025-09-20T12:00",
//       status: "Open",
//       createdAt: "2025-09-18 10:10",
//     },
//     {
//       id: "EP-24002",
//       name: "Wind West – Night Slot",
//       capacityKWh: 3200,
//       priceET: 2400,
//       minStakeET: 300,
//       region: "West",
//       windowStart: "2025-09-22T22:00",
//       windowEnd: "2025-09-23T06:00",
//       status: "Approved",
//       createdAt: "2025-09-17 15:05",
//     },
//     {
//       id: "EP-24003",
//       name: "Grid Export – Evening Peak",
//       capacityKWh: 1800,
//       priceET: 1500,
//       minStakeET: 150,
//       region: "North",
//       windowStart: "2025-09-19T17:00",
//       windowEnd: "2025-09-19T21:00",
//       status: "Denied",
//       createdAt: "2025-09-16 12:30",
//     },
//   ]);

//   // new packet form state
//   const [name, setName] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [price, setPrice] = useState("");
//   const [minStake, setMinStake] = useState("");
//   const [region, setRegion] = useState("South");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");

//   // filters
//   const [q, setQ] = useState("");
//   const [status, setStatus] = useState("All");
//   const [regionF, setRegionF] = useState("All");

//   // pagination
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(6);

//   // derived stats
//   const stats = useMemo(() => {
//     const open = packets.filter(p => p.status === "Open").length;
//     const approved = packets.filter(p => p.status === "Approved").length;
//     const denied = packets.filter(p => p.status === "Denied").length;
//     return { open, approved, denied, total: packets.length };
//   }, [packets]);

//   const regionOptions = useMemo(() => ["All", ...Array.from(new Set(packets.map(p => p.region)))], [packets]);

//   const filtered = useMemo(() => {
//     const query = q.trim().toLowerCase();
//     return packets.filter(p => {
//       const matchesQ =
//         !query ||
//         p.id.toLowerCase().includes(query) ||
//         p.name.toLowerCase().includes(query) ||
//         p.region.toLowerCase().includes(query) ||
//         String(p.capacityKWh).includes(query) ||
//         String(p.priceET).includes(query);

//       const matchesStatus = status === "All" || p.status === status;
//       const matchesRegion = regionF === "All" || p.region === regionF;

//       return matchesQ && matchesStatus && matchesRegion;
//     });
//   }, [packets, q, status, regionF]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const startIdx = (safePage - 1) * pageSize;
//   const pageRows = filtered.slice(startIdx, startIdx + pageSize);

//   // helpers
//   const fmt = (n) => n.toLocaleString("en-IN");
//   const now = () => {
//     const d = new Date();
//     const pad = (x) => String(x).padStart(2, "0");
//     return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
//   };
//   const genId = () => "EP-" + Math.floor(24000 + Math.random() * 1000);

//   function resetForm() {
//     setName(""); setCapacity(""); setPrice(""); setMinStake("");
//     setRegion("South"); setStart(""); setEnd("");
//   }

//   function addPacket() {
//     // basic validation
//     if (!name.trim()) return alert("Please enter a packet name.");
//     const cap = Number(capacity), pr = Number(price), ms = Number(minStake);
//     if (!cap || cap <= 0) return alert("Enter a valid Capacity (kWh).");
//     if (!pr || pr <= 0) return alert("Enter a valid Price (ET).");
//     if (!ms || ms < 0) return alert("Enter a valid Min Stake (ET).");
//     if (!start || !end) return alert("Select a valid delivery window.");
//     if (new Date(start) >= new Date(end)) return alert("End time must be after start time.");

//     const packet = {
//       id: genId(),
//       name: name.trim(),
//       capacityKWh: cap,
//       priceET: pr,
//       minStakeET: ms,
//       region,
//       windowStart: start,
//       windowEnd: end,
//       status: "Open",
//       createdAt: now(),
//     };
//     setPackets((p) => [packet, ...p]);
//     resetForm();
//     setPage(1);
//   }

//   function setStatusFor(id, next) {
//     setPackets((ps) => ps.map(p => (p.id === id ? { ...p, status: next } : p)));
//   }

//   return (
//     <div className="space-y-6">
//       {/* Top stats */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <Stat label="Open" value={stats.open} />
//         <Stat label="Approved" value={stats.approved} />
//         <Stat label="Denied" value={stats.denied} />
//         <Stat label="Total Packets" value={stats.total} />
//       </div>

//       {/* Create Packet */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-sm font-semibold text-gray-800">Create Energy Packet</h3>
//           <button onClick={resetForm} className="text-xs text-emerald-700 hover:underline">Reset</button>
//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <Field label="Organisation Name">
//             <Input placeholder="e.g., Solar South – Morning Slot" value={name} onChange={(e)=>setName(e.target.value)} />
//           </Field>

//           <Field label="Region">
//             <Select value={region} onChange={(e)=>setRegion(e.target.value)}>
//               <option>South</option>
//               <option>North</option>
//               <option>East</option>
//               <option>West</option>
//               <option>Central</option>
//             </Select>
//           </Field>
//            <Field label="EOA">
//             <Input type="number" min="0" placeholder="e.g., Wallet Address" value={capacity} onChange={(e)=>setEOA(e.target.value)} />
//           </Field>
//           <Field label="Capacity (kWh)">
//             <Input type="number" min="0" placeholder="e.g., 2500" value={capacity} onChange={(e)=>setCapacity(e.target.value)} />
//           </Field>

//           <Field label="Price (ET)">
//             <Input type="number" min="0" placeholder="e.g., 1800" value={price} onChange={(e)=>setPrice(e.target.value)} />
//           </Field>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <Field label="Window Start">
//               <Input type="datetime-local" value={start} onChange={(e)=>setStart(e.target.value)} />
//             </Field>
//             <Field label="Window End">
//               <Input type="datetime-local" value={end} onChange={(e)=>setEnd(e.target.value)} />
//             </Field>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-end">
//           <button
//             onClick={addPacket}
//             className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
//           >
//             Add Packet
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="rounded-xl border border-gray-200 bg-white p-4">
//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
//           <Field label="Search">
//             <div className="relative">
//               <Input
//                 placeholder="Search by ID / name / region / price / kWh"
//                 value={q}
//                 onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
//               />
//               <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
//             </div>
//           </Field>
//           <Field label="Status">
//             <Select value={status} onChange={(e)=>{ setStatus(e.target.value); setPage(1); }}>
//               <option>All</option>
//               <option>Open</option>
//               <option>Approved</option>
//               <option>Denied</option>
//               <option>Archived</option>
//               <option>Filled</option>
//               <option>Expired</option>
//             </Select>
//           </Field>
//           <Field label="Region">
//             <Select value={regionF} onChange={(e)=>{ setRegionF(e.target.value); setPage(1); }}>
//               {regionOptions.map(r => <option key={r}>{r}</option>)}
//             </Select>
//           </Field>
//           <div className="hidden lg:block"></div>
//           <div className="hidden lg:block"></div>
//         </div>
//       </div>

//       {/* Packet Grid */}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//         {pageRows.map((p) => (
//           <div key={p.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
//             <div className="mb-3 flex items-start justify-between">
//               <div>
//                 <h4 className="text-sm font-semibold text-gray-900">{p.name}</h4>
//                 <p className="mt-0.5 text-xs text-gray-500">{p.id} • {p.region}</p>
//               </div>
//               <StatusChip status={p.status} />
//             </div>

//             <dl className="grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <dt className="text-gray-500">Capacity</dt>
//                 <dd className="font-medium text-gray-900">{fmt(p.capacityKWh)} kWh</dd>
//               </div>
//               <div>
//                 <dt className="text-gray-500">Price</dt>
//                 <dd className="font-medium text-gray-900">{fmt(p.priceET)} ET</dd>
//               </div>
//               <div>
//                 <dt className="text-gray-500">Min Stake</dt>
//                 <dd className="font-medium text-gray-900">{fmt(p.minStakeET)} ET</dd>
//               </div>
//               <div>
//                 <dt className="text-gray-500">Window</dt>
//                 <dd className="font-medium text-gray-900">
//                   {p.windowStart.replace("T", " ")} → {p.windowEnd.replace("T", " ")}
//                 </dd>
//               </div>
//             </dl>

//             <div className="mt-4 flex items-center justify-between">
//               <p className="text-xs text-gray-500">Created {p.createdAt}</p>
//               <div className="flex items-center gap-2">
//                 {p.status === "Open" && (
//                   <>
//                     <button onClick={()=>setStatusFor(p.id, "Approved")}
//                       className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
//                       Approve
//                     </button>
//                     <button onClick={()=>setStatusFor(p.id, "Denied")}
//                       className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100">
//                       Deny
//                     </button>
//                   </>
//                 )}
//                 {p.status !== "Archived" && (
//                   <button onClick={()=>setStatusFor(p.id, "Archived")}
//                     className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
//                     Archive
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//         {pageRows.length === 0 && (
//           <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
//             No packets found with the current filters.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
//         <p className="text-xs text-gray-500">
//           Showing{" "}
//           <span className="font-medium text-gray-700">{filtered.length === 0 ? 0 : startIdx + 1}</span>–
//           <span className="font-medium text-gray-700">{Math.min(startIdx + pageSize, filtered.length)}</span>{" "}
//           of <span className="font-medium text-gray-700">{filtered.length}</span>
//         </p>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-600">Rows</span>
//           <Select value={pageSize} onChange={(e)=>{ setPage(1); setPageSize(Number(e.target.value)); }} className="w-24">
//             <option value={6}>6</option>
//             <option value={9}>9</option>
//             <option value={12}>12</option>
//           </Select>
//           <button
//             onClick={()=>setPage(p => Math.max(1, p-1))}
//             disabled={safePage === 1}
//             className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 enabled:hover:bg-gray-50 disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <span className="text-sm text-gray-700">
//             Page <span className="font-medium">{safePage}</span> / {totalPages}
//           </span>
//           <button
//             onClick={()=>setPage(p => Math.min(totalPages, p+1))}
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
