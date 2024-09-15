"use client";

import React, { useContext, useState } from "react";
import { RoleContext } from "../_context/roleContext";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "./logout";

interface LoginByRoleProp {
  session: Session | null;
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
    if (session) {
      setRole(session.user.role);
      router.push("/");
    } else {
      setRole("customer");
      router.push("/login");
    }
  };

  const handleMerchantLogin = async () => {
    if (session) {
      setRole(session.user.role);
      router.push("/");
    } else {
      setRole("merchant");
      router.push("/login");
    }
  };

  const [profileClicked, setProfileClicked] = useState<boolean>(false);

  if (session) {
    return (
      <>
        <button
          className="rounded-full p-1 hover:bg-green-700"
          onClick={() => setProfileClicked((prev) => !prev)}
        >
          <Image src="/navbar/person.svg" alt="User" width={32} height={32} />
        </button>
        {profileClicked && (
          <div className="absolute right-5 top-10">
            <Logout />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={handleCustomerLogin}
          className="flex h-10 w-auto items-center justify-center rounded-full border border-yellow-500 bg-white p-3 text-yellow-500 hover:bg-green-700 md:w-32"
        >
          Sign Up
        </button>
        <button
          onClick={handleMerchantLogin}
          className="flex h-10 items-center justify-center rounded-full bg-yellow-500 p-3 text-white hover:bg-green-700"
        >
          Business Sign Up
        </button>
      </>
    );
  }
};

export default LoginByRole;
