// components/DashboardFooter.jsx
import React from "react";

export const DashboardFooter = () => {
  return (
    <footer className="mx-2 my-5  rounded-2xl bg-neutral-900 text-neutral-300"> {/* removed mt-10 */}
      <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-semibold text-white">
            charge<span className="text-amber-500">MOD</span>
          </div>
          <p className="mt-3 text-sm">© 2025 chargeMOD. All rights reserved.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Get in Touch</div>
          <p className="mt-2 text-sm">hello@chargemod.com</p>
          <p className="text-sm">+91 0806 9161 180</p>
        </div>
        <div>
          <div className="font-semibold text-white">Quick Links</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="#">Products</a></li>
            <li><a href="#">Company</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Learn More</div>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
