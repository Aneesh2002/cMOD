import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("hideGlobalChrome", "true");
    return () => {
      localStorage.removeItem("hideGlobalChrome");
    };
  }, []);

  return (
    <div className="min-h-[70vh] grid md:grid-cols-2 items-center gap-8">
      <div className="space-y-6">
        <div>
          <div className="text-3xl font-bold">
            <span className="text-neutral-800">charge</span>
            <span className="text-amber-600">MOD</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900">
          Driving Tomorrow,<br />
          Charging Today
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-xl">
          chargeMOD is the ENERGY EXCHANGE app that connects consumers, providers,
          and suppliers for fast, reliable, and transparent energy transactions.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-3 rounded-lg border border-neutral-300 hover:bg-neutral-100"
          >
            Register
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden border bg-neutral-100">
          {/* Reference hero image placeholder; replace with real asset if available */}
          <img
            src="/src/images/image0_large.jpg"
            alt="EV charging"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
