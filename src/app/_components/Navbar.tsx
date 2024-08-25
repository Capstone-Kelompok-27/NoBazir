import Link from "next/link";
import { FC } from "react";

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn }) => {
  return (
    <nav className="bg-[#16a34a] text-white px-6 py-3 flex items-center justify-between rounded-2xl border border-transparent h-16 sticky top-0 z-50 mt-4 mx-4">
      {/* Kiri Atas: Menu Navigasi */}
      <div className="flex space-x-4"> 
        <Link href="/" className="flex items-center space-x-3 text-lg hover:text-green-800"> 
          <span>Home</span>
        </Link>
        <Link href="/leftover" className="flex items-center space-x-3 text-lg hover:text-green-800"> 
          <span>LeftOver</span>
        </Link>
        <Link href="/community" className="flex items-center space-x-3 text-lg hover:text-green-800"> 
          <span>Community</span>
        </Link>
        <Link href="/about-us" className="flex items-center space-x-3 text-lg hover:text-green-800"> 
          <span>About Us</span>
        </Link>
      </div>

      {/* Kanan Atas: Ikon atau Link */}
      <div className="flex space-x-4"> 
        {isLoggedIn ? (
          <>
            <button className="p-1 hover:bg-green-700 rounded-full">
              <img src="/navbar/cart.svg" alt="Cart" width={22} height={22} />
            </button>
            <button className="p-1 hover:bg-green-700 rounded-full">
              <img src="/navbar/person.svg" alt="User" width={22} height={22} />
            </button>
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
