"use client";

import React from "react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })} className="my-5 rounded-full bg-gradient-to-r bg-[#A5BE00] px-6 py-3 text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">Log Out</button>
    </div>
  );
};

export default Logout;
