import { NavLink, Outlet } from "react-router-dom";

export const AppLayout = () => {
  const hideGlobalChrome = typeof window !== 'undefined' && localStorage.getItem("hideGlobalChrome") === "true";
  return (
    <div className="min-h-dvh flex flex-col bg-neutral-50 text-neutral-900">
      {!hideGlobalChrome && (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <NavLink to="/" className="text-xl font-bold">
              <span className="text-neutral-800">charge</span>
              <span className="text-amber-600">MOD</span>
            </NavLink>
            {/* <nav className="hidden md:flex gap-6 text-sm">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-amber-600 ${
                    isActive ? "text-amber-600 font-semibold" : ""
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink
                to="/units"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Units
              </NavLink>
              <NavLink
                to="/balance"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Balance
              </NavLink>
              <NavLink
                to="/topup"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Top-up
              </NavLink>
              <NavLink
                to="/providers"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Providers
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Transactions
              </NavLink>
              <NavLink
                to="/issues"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Issues
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Notifications
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-amber-600 font-semibold" : ""
                }
              >
                Profile
              </NavLink>
            </nav> */}
            <div className="flex gap-3">
              <NavLink to="/login" className="px-3 py-1.5 rounded border">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-1.5 rounded bg-amber-600 text-white"
              >
                Register
              </NavLink>
            </div>
          </div>
        </header>
      )}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </div>
      </main>
      {!hideGlobalChrome && (
        <footer className="bg-neutral-900 text-neutral-300">
          <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-semibold text-white">
                charge<span className="text-amber-500">MOD</span>
              </div>
              <p className="mt-3 text-sm">
                © 2024 chargeMOD. All rights reserved.
              </p>
            </div>
            <div>
              <div className="font-semibold text-white">Get in Touch</div>
              <p className="mt-2 text-sm">hello@chargemod.com</p>
              <p className="text-sm">+91 0806 9161 180</p>
            </div>
            <div>
              <div className="font-semibold text-white">Quick Links</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">Blogs</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white">Learn More</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
