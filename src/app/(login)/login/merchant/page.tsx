import FormLoginMerchant from "@/app/_components/formLoginMerchant";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();
  if (!session || session.user.role) {
    redirect("/");
  }

  return (
    <div>
      <div>
        <FormLoginMerchant session={session} />
      </div>
    </div>
  );
};

export default page;
