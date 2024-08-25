"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { RoleContext } from "@/app/_context/roleContext";
import { redirect } from "next/navigation";

const Page = () => {
  const roleContext = useContext(RoleContext);
  if (!roleContext) {
    throw new Error(
      "searcBar component must be used within a RoleContextProvider",
    );
  }
  const { role } = roleContext;
  if (role === "") {
    redirect("/");
  }

  return (
    <div className="flex flex-row">
      <div className="h-screen w-1/2 border-2 bg-[#EBF2FA]">
        <div className="mt-32 flex flex-col items-center justify-center text-[#679436]">
          <h1 className="font-montserrat text-[38px] font-bold">
            Welcome to NoBazir
          </h1>
          <h1 className="font-source-sans text-[27px]">
            {" "}
            Select service to continue login as {role}
          </h1>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center font-sans text-[#679436]">
          <div className="flex flex-col justify-center gap-4">
            <button
              onClick={() => signIn("google", { callbackUrl: `/login/${role}` })}
              className="flex w-full max-w-xs flex-row rounded-3xl border-2 border-[#679436] p-2"
            >
              <Image
                src={"/login/google.svg"}
                alt=""
                width={24}
                height={48}
                className="mx-4"
              />

              <h1 className="relative font-source-sans text-[20px] font-semibold">
                Log in with Google
              </h1>
            </button>

            <div className="flex w-full max-w-xs flex-row rounded-3xl border-2 border-[#679436] p-2">
              <Image
                src={"/login/facebook.svg"}
                alt=""
                width={24}
                height={48}
                className="mx-4"
              />
              <h1 className="text-center font-source-sans text-[20px] font-semibold">
                Log in with Facebook
              </h1>
            </div>
            <div className="flex w-full max-w-xs flex-row rounded-3xl border-2 border-[#679436] p-2">
              <Image
                src={"/login/apple.svg"}
                alt=""
                width={24}
                height={48}
                className="mx-4"
              />
              <h1 className="text-center font-source-sans text-[20px] font-semibold">
                Log in with Apple
              </h1>
            </div>
            <div className="flex w-full max-w-xs flex-row rounded-3xl border-2 border-[#679436] p-2">
              <Image
                src={"/login/github.svg"}
                alt=""
                width={24}
                height={48}
                className="mx-4"
              />
              <h1 className="text-center font-source-sans text-[20px] font-semibold">
                Log in with Github
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-1/2">
        <img src="/login/salad.png" className="h-full w-full" alt="salad" />
      </div>
    </div>
  );
};

export default Page;
