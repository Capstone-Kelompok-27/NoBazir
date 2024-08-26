import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  isLoggedIn: boolean;
  role?: "customer" | "merchant";
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn, role = "customer" }) => {
  const isAdmin = role === "merchant";

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 m-5 flex h-16 items-center justify-between rounded-2xl border border-transparent bg-[#16a34a] px-6 py-3 text-white">
      <div className="flex items-center space-x-4">
        {isAdmin ? (
          <div className="flex space-x-4">
            <Link href="/" className="text-lg hover:text-green-800">
              Home
            </Link>
            <Link href="/product" className="text-lg hover:text-green-800">
              Product
            </Link>
          </div>
        ) : (
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
                <button className="rounded-full p-1 hover:bg-green-700">
                  <img
                    src="/navbar/person.svg"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </button>
              </>
            ) : (
              <>
                <button className="rounded-full p-1 hover:bg-green-700">
                  <img
                    src="/navbar/cart.svg"
                    alt="Cart"
                    width={32}
                    height={32}
                  />
                </button>
                <button className="rounded-full p-1 hover:bg-green-700">
                  <img
                    src="/navbar/person.svg"
                    alt="User"
                    width={32}
                    height={32}
                  />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex h-10 w-32 items-center justify-center rounded-full border border-yellow-500 bg-white p-3 text-yellow-500 hover:bg-green-700"
            >
              Log In
            </Link>
            <Link
              href="/business-signup"
              className="flex h-10 items-center justify-center rounded-full bg-yellow-500 p-3 text-white hover:bg-green-700"
            >
              Business Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
