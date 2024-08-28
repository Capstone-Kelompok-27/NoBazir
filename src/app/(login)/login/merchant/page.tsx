import FormLoginMerchant from "@/app/_components/formLoginMerchant";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
const page = async () => {
  const session = await getServerAuthSession();
  if (!session || session.user.role) {
    redirect("/");
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col justify-center p-8 w-1/2 rounded-lg mx-4 jus">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-600 text-center">Welcome to NoBazir</h1>
          <p className="text-green-500 mt-2 text-center">Please provide your business details below</p>
        </div>
        <FormLoginMerchant session={session} />
      </div>
      <div className="w-1/2 flex justify-center items-center">
      <Image
          src="/navbar/landing/merchant.png"
          alt="Merchant"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
              </div>
    </div>
  );
};

export default page;
