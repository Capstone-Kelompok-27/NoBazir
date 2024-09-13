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
        <Link href="/merchant" className="flex text-lg font-semibold">
          Seller Center
        </Link>
        <div className="flex items-center justify-center gap-4 md:gap-5">
          <Link href="/" className="text-md hover:text-green-800">
            Home
          </Link>
          <Link href="/merchant" className="text-md hover:text-green-800">
            My Products
          </Link>
          <Link href="/community" className="text-md hover:text-green-800">
            Community
          </Link>
        </div>

        <div className="flex space-x-4">
          <LoginByRole session={session} />
        </div>
      </nav>
    );
  }

  // Customer
  else {
    return (
      <div className="max-w-screen fixed left-0 right-0 top-0 z-50 h-28 w-full p-5">
        <nav className="flex h-16 w-full min-w-40 items-center justify-between rounded-2xl bg-[#679436] px-6 py-3 text-white shadow-md">
          <div className="flex gap-4">
            <Link href="/" className="text-lg hover:text-green-800">
              Home
            </Link>
            <Link href="/leftover" className="text-lg hover:text-green-800">
              LeftOver
            </Link>
            {session && (
              <Link href="/community" className="text-lg hover:text-green-800">
                Community
              </Link>
            )}
            <Link href="/about-us" className="text-lg hover:text-green-800">
              About Us
            </Link>
          </div>
          <div className="flex gap-2 md:gap-4">
            <LoginByRole session={session} />
          </div>
        </nav>
      </div>
    );
  }
};

export default Navbar;
