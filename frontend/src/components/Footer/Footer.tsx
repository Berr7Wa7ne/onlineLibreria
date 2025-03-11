import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-4 mt-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 space-x-14">
        {/* Copyright Text (Left) */}
        <p className="text-sm">© 2025 Online Library. All rights reserved.</p>

        {/* Footer Links (Right) */}
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-500">Terms of Use</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
