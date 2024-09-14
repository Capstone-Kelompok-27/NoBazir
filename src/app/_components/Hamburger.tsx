"use client";

import Link from "next/link";
import React, { useState } from "react";
import { type Session } from "next-auth";

const HamburgerMenu: React.FC<{
  session: Session | null;
}> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative left-0 top-0">
      <input
        type="checkbox"
        className="absolute z-20 h-8 w-10 cursor-pointer opacity-0"
        checked={isOpen}
        onChange={toggleMenu}
      />

      <span
        className={`mb-1 block h-1 w-8 transform rounded bg-white transition-transform duration-500 ${
          isOpen ? "translate-y-2 rotate-45" : ""
        }`}
      ></span>
      <span
        className={`mb-1 block h-1 w-8 transform rounded bg-white transition-opacity duration-500 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`mb-1 block h-1 w-8 transform rounded bg-white transition-transform duration-500 ${
          isOpen ? "-translate-y-2 -rotate-45" : ""
        }`}
      ></span>

      <div
        className={`fixed bottom-0 left-0 top-0 -z-10 flex min-h-screen w-64 transform list-none flex-col items-start justify-start gap-5 bg-[#A5BE00] px-8 pt-28 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="text-2xl font-semibold hover:text-green-800">
          Home
        </Link>
        <Link
          href="/leftover"
          className="text-2xl font-semibold hover:text-green-800"
        >
          LeftOver
        </Link>
        {session && (
          <>
            <Link
              href="/community"
              className="text-2xl font-semibold hover:text-green-800"
            >
              Community
            </Link>
            <Link
              href="/calorie-tracker"
              className="text-2xl font-semibold hover:text-green-800"
            >
              Calorie Tracker
            </Link>
          </>
        )}
        <Link
          href="/about-us"
          className="text-2xl font-semibold hover:text-green-800"
        >
          About Us
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
