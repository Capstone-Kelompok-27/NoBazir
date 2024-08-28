import React from "react";
import Logout from "./logout";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center bg-[#679436]">
        <div className="mt-20 flex w-11/12 flex-col justify-between">
          <div className="flex flex-row justify-between font-montserrat text-[#EBF2FA]">
            <div className="text-[24px] font-black">NoBazir.</div>
            <div className="flex flex-row text-[16px] font-semibold">
              <a href="/" className="mx-4">
                Home
              </a>
              <a href="/leftover" className="mx-4">
                Leftover
              </a>
              <a href="/community" className="mx-4">
                Community
              </a>
              <a href="/about-us" className="mx-4">
                About Us
              </a>
              <a href="/contact" className="mx-4">
                Contact
              </a>
            </div>
          </div>
          <hr className="mt-10 border-t-2 border-[#C1C7CD]" />
          <div className="mb-20 mt-10 flex flex-row items-center justify-between font-source-sans text-[#EBF2FA]">
            <div className="text-[14px]">
              NoBazir @ 2024. All rights reserved.
            </div>
            <Logout />
            <div className="flex flex-row items-center">
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4"
              >
                <img src="./navbar/youtube.svg" alt="" className="w-6" />
              </a>
              <a
                href="https://www.instagram.com/sparta_hmif/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4"
              >
                <img src="./navbar/instagram.svg" className="w-" alt="" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=T4DFKOlrXCQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-3"
              >
                <img src="./navbar/facebook.svg" alt="" className="w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
