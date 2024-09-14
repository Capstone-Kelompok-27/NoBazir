import React from "react";
import Logout from "./logout";

const Footer = () => {
  return (
    <div className="w-full bg-[#679436] text-[#EBF2FA]">
      <div className="flex flex-col items-center py-8">
        <div className="flex w-full max-w-6xl flex-col items-center justify-between px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <div className="text-[20px] sm:text-[24px] font-black">NoBazir.</div>
            <div className="flex flex-wrap justify-center text-[14px] sm:text-[16px] font-semibold mt-2 sm:mt-0">
              <a href="/" className="mx-2 sm:mx-4">Home</a>
              <a href="/leftover" className="mx-2 sm:mx-4">Leftover</a>
              <a href="/community" className="mx-2 sm:mx-4">Community</a>
              <a href="/about-us" className="mx-2 sm:mx-4">About Us</a>
            </div>
          </div>
          <hr className="mt-6 border-t-2 border-[#C1C7CD]" />
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full">
            <div className="text-[12px] sm:text-[14px]">NoBazir @ 2024. All rights reserved.</div>
            <Logout />
            <div className="flex items-center mt-2 sm:mt-0">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="mx-2 sm:mx-4">
                <img src="./navbar/youtube.svg" alt="YouTube" className="w-6 sm:w-8" />
              </a>
              <a href="https://www.instagram.com/sparta_hmif/" target="_blank" rel="noopener noreferrer" className="mx-2 sm:mx-4">
                <img src="./navbar/instagram.svg" alt="Instagram" className="w-6 sm:w-8" />
              </a>
              <a href="https://www.youtube.com/watch?v=T4DFKOlrXCQ" target="_blank" rel="noopener noreferrer" className="mx-2 sm:mx-4">
                <img src="./navbar/facebook.svg" alt="Facebook" className="w-6 sm:w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
