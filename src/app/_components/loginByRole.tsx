"use client";

import React, { useContext } from "react";
import { RoleContext } from "../_context/roleContext";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";

interface LoginByRoleProp {
  session: Session;
}

const LoginByRole: React.FC<LoginByRoleProp> = ({ session }) => {
  const router = useRouter();
  const roleContext = useContext(RoleContext);
  if (!roleContext) {
    throw new Error(
      "searcBar component must be used within a RoleContextProvider",
    );
  }
  const { setRole } = roleContext;

  const handleCustomerLogin = async () => {
    console.log(session?.user.role);
    if (session) {
      setRole(session.user.role);
      router.push("/leftover");
    } else {
      setRole("customer");
      router.push("/login");
    }
  };

  const handleMerchantLogin = async () => {
    if (session) {
      setRole(session.user.role);
      router.push("/leftover");
    } else {
      setRole("merchant");
      router.push("/login");
    }
  };
  return (
    <div className="flex w-full justify-center gap-5">
      <button onClick={handleCustomerLogin}>Log In</button>
      <button onClick={handleMerchantLogin}>Business Sign Up</button>
    </div>
  );
};

export default LoginByRole;
