"use client";

import Image from "next/image";
import React from "react";
import { type Session } from "next-auth";
import { api } from "@/trpc/react";

interface MerchantInfoProp {
  session: Session;
}

const MerchantInfo: React.FC<MerchantInfoProp> = ({ session }) => {
  const merchant = api.auth.getMerchantByUserId.useQuery(session.user.id);

  return (
    <div className="mt-32 flex h-24 w-10/12 items-center justify-between rounded-3xl bg-[#508bb5] px-8">
      <div className="flex gap-5">
        <div className="w-fit rounded-full bg-white p-2">
          <Image
            alt="building-store icon"
            src="/merchant/building-store.png"
            width={50}
            height={50}
          ></Image>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <div className="text-xl font-bold text-[#EBF2FA]">
            {merchant.data?.merchantName}
          </div>
          <button className="w-40 rounded-lg bg-[#EBF2FA] px-3 text-center text-[#508bb5]">
            Contact
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="font-semibold text-[#EBF2FA]">
          {merchant.data?.merchantType}
        </div>
        <div className="font-semibold text-[#EBF2FA]">
          {merchant.data?.location}
        </div>
      </div>
    </div>
  );
};

export default MerchantInfo;
