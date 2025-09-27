// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="rounded-t-xl bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="text-lg font-bold">
              <span className="text-white">charge</span>
              <span className="text-orange-400">MOD</span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              © {new Date().getFullYear()} chargeMOD. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Get in Touch</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a className="hover:text-white" href="mailto:hello@chargemod.com">hello@chargemod.com</a></li>
              <li><a className="hover:text-white" href="tel:+918086940180">+91 8086 940 180</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a className="hover:text-white" href="#">Products</a></li>
              <li><a className="hover:text-white" href="#">Company</a></li>
              <li><a className="hover:text-white" href="#">Blogs</a></li>
              <li><a className="hover:text-white" href="#">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Learn More</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a className="hover:text-white" href="#">Contact us</a></li>
              <li><a className="hover:text-white" href="#">Terms &amp; Conditions</a></li>
              <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
