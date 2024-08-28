import Navbar from "@/app/_components/Navbar";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Logout from "@/app/_components/logout";
import { redirect } from "next/navigation";

import TestUlploadImage from "@/app/_components/testUploadImage";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Navbar />
        {session?.user.name}

        <TestUlploadImage />
        <Logout />
      </main>
    </HydrateClient>
  );
}
