import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  isLoggedIn: boolean;
  role?: "customer" | "merchant"; 
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn, role = "customer" }) => {
  const isAdmin = role === "merchant";

  return (
    <nav className="bg-[#16a34a] text-white px-6 py-3 flex items-center justify-between rounded-2xl border border-transparent h-16 fixed top-0 left-0 right-0 z-50 mx-4 mt-4">
      <div className="flex items-center space-x-4">
        {isAdmin ? (
          <div className="flex space-x-4">
            <Link href="/" className="text-lg hover:text-green-800">Home</Link>
            <Link href="/product" className="text-lg hover:text-green-800">Product</Link>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/" className="text-lg hover:text-green-800">Home</Link>
            <Link href="/leftover" className="text-lg hover:text-green-800">LeftOver</Link>
            <Link href="/community" className="text-lg hover:text-green-800">Community</Link>
            <Link href="/about-us" className="text-lg hover:text-green-800">About Us</Link>
          </div>
        )}
      </div>

      {isAdmin ? (
        <div className="flex-1 text-center text-lg font-semibold">
          Nobazir Seller Center
        </div>
      ) : null}

      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <>
                <button className="p-1 hover:bg-green-700 rounded-full">
                  <img src="/navbar/person.svg" alt="User" width={32} height={32} />
                </button>
              </>
            ) : (
              <>
                <button className="p-1 hover:bg-green-700 rounded-full">
                  <img src="/navbar/cart.svg" alt="Cart" width={32} height={32} />
                </button>
                <button className="p-1 hover:bg-green-700 rounded-full">
                  <img src="/navbar/person.svg" alt="User" width={32} height={32} />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <Link href="/login" className="p-3 hover:bg-green-700 rounded-full border border-yellow-500 bg-white text-yellow-500 w-32 h-10 flex items-center justify-center">
              Log In
            </Link>
            <Link href="/business-signup" className="p-3 hover:bg-green-700 rounded-full bg-yellow-500 text-white h-10 flex items-center justify-center">
              Business Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
