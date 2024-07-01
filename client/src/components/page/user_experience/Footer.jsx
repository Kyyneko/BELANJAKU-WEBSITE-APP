import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
            <p className="mb-4">
              Follow us on social media for updates and promotions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-2xl hover:text-gray-400 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-gray-400 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-2xl hover:text-gray-400 transition-colors"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/produk" className="hover:text-gray-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-600 pt-8 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
