import Link from "next/link";
import React from "react";
import LoginByRole from "./loginByRole";
import { getServerAuthSession } from "@/server/auth";

const Navbar = async () => {
  const session = await getServerAuthSession();

  // Merchant
  if (session?.user.role === "merchant") {
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 m-5 flex h-16 items-center justify-between rounded-2xl border border-transparent bg-[#679436] px-6 py-3 text-white shadow-md">
        <div className="flex items-center justify-center gap-5">
          <Link href="/" className="text-lg hover:text-green-800">
            Home
          </Link>
          <Link href="/merchant" className="text-md hover:text-green-800">
            My Products
          </Link>
        </div>
        <Link href="/merchant" className="flex text-lg font-semibold">
          Nobazir Seller Center
        </Link>
        <div className="flex space-x-4">
          <LoginByRole session={session} />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed left-0 right-0 top-0 z-50 m-5 flex h-16 items-center justify-between rounded-2xl border border-transparent bg-[#679436] px-6 py-3 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-4">
            <Link href="/" className="text-lg hover:text-green-800">
              Home
            </Link>
            <Link href="/leftover" className="text-lg hover:text-green-800">
              LeftOver
            </Link>
            <Link href="/community" className="text-lg hover:text-green-800">
              Community
            </Link>
            <Link href="/about-us" className="text-lg hover:text-green-800">
              About Us
            </Link>
          </div>
        </div>
        <div className="flex space-x-4">
          <LoginByRole session={session} />
        </div>
      </nav>
    );
  }
};

export default Navbar;
