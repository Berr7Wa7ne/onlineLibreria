import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import FooterLogo from '../../assets/library-logo.png';

const ReaderFooter = () => {
  return (
    <footer className="py-8 px-4 mt-14 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center">
        {/* Top Section with Three Boxes */}
        <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl text-center md:text-left">
          {/* Managed By Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-8 font-sf-pro-rounded">Managed By</h3>
            <div className="flex items-center justify-between space-x-2">
            <img
              src={FooterLogo} // Change to your actual logo path
              alt="Site Logo"
              className="w-16 h-16 mb-2"
            />
            <p className="text-3xl font-quicksand font-semibold">Online Library Inc.</p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-8 font-sf-pro-rounded">Social Media</h3>
            <div className="flex space-x-4 mt-2">
              <FaFacebook className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
              <FaTwitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
            </div>
          </div>

          {/* Slogan Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-center mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-8 font-sf-pro-rounded">Slogan</h3>
            <p className="text-sm italic font-quicksand">"Empowering knowledge, one book at a time."</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[blue] m-auto w-full py-10 mt-14">
        <div className="mt-6 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} Online Library. All rights reserved.
        </div>
        </div>
      </div>
    </footer>
  );
};

export default ReaderFooter;
