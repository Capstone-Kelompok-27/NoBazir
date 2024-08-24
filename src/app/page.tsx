import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Test from "./_components/test";

export default async function Home() {
  const session = await getServerAuthSession();


  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Test />
      </main>
    </HydrateClient>
  );
}
