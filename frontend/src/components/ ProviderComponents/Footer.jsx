import React from "react";

const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-300 flex-shrink-0 rounded-2xl mt-4 mx-[1cm] p-6">
    <div className="max-w-full grid md:grid-cols-4 gap-8">
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
          <li><a href="#" className="hover:text-white">Products</a></li>
          <li><a href="#" className="hover:text-white">Company</a></li>
          <li><a href="#" className="hover:text-white">Blogs</a></li>
          <li><a href="#" className="hover:text-white">Careers</a></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold text-white">Learn More</div>
        <ul className="mt-2 space-y-1 text-sm">
          <li><a href="#" className="hover:text-white">Contact us</a></li>
          <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
