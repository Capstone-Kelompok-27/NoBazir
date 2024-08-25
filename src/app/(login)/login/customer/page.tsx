import FormLoginCustomer from "@/app/_components/formLoginCustomer";
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
        <FormLoginCustomer session={session} />
      </div>
    </div>
  );
};

export default page;
