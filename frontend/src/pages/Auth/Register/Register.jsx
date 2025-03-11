import React from "react";
import AuthSideImage from '../../../components/AuthSideImage/AuthSideImage';
import SignUp from '../../../components/SignUp/SignUp';
import questionCircle from '../../../assets/question-circle.png';
import libraryLogo from '../../../assets/library-logo.jpg'; // Import your logo image

const Register = () => {
  return (
    <div className="flex flex-col w-screen h-screen mx-4">
      {/* Header Section */}
      <header className="flex items-center justify-between w-full px-4 py-4 md:px-[112px] md:py-[16px]">
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Logo */}
          <img
            src={libraryLogo}
            alt="Logo"
            className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" // Adjust width and height for mobile and desktop
          />
          {/* Logo Name */}
          <p className="text-[20px] md:text-[32px] font-sf-pro-rounded font-semibold text-center">
            Online Library
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex-1 flex justify-center items-center">
          <SignUp/>
        </div>
        <div className="hidden md:flex flex-1 justify-center items-center">
          <AuthSideImage />
        </div>
      </div>

      {/* Footer Area */}
      <footer className="flex flex-col md:flex-row justify-between items-center w-full px-4 py-4 md:px-[112px] md:py-[32px]">
        {/* Copyright Text */}
        <p className="text-[12px] md:text-[14px] font-sf-pro-rounded text-[#666D80] mb-2 md:mb-0">
          © 2024 Daycaresystem. All rights reserved.
        </p>
        {/* Help Section */}
        <div className="flex items-center space-x-1">
          <img
            src={questionCircle}
            alt="question-circle"
            className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]"
          />
          <p className="text-[12px] md:text-[14px] font-sf-pro-rounded text-[#666D80]">
            Get Help
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
