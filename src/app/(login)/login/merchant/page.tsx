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
    <div className="flex min-h-screen flex-row">
      <div className="jus mx-4 flex w-full flex-col justify-center rounded-lg p-8 md:w-1/2">
        <div className="mb-8">
          <h1 className="text-center text-3xl font-bold text-green-600">
            Welcome to NoBazir
          </h1>
          <p className="mt-2 text-center text-green-500">
            Please provide your business details below
          </p>
        </div>
        <FormLoginMerchant session={session} />
      </div>
      <div className="relative hidden w-1/2 md:flex">
        <Image
          src="/navbar/landing/merchant.png"
          alt="Merchant"
          layout="fill"
          objectFit="cover"
          className="rounded-l-xl"
        />
      </div>
    </div>
  );
};

export default page;
