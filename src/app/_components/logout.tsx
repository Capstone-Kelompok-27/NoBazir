"use client";

import React from "react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Log Out</button>
    </div>
  );
};

export default Logout;
