import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
// import TestUlploadImage from "./_components/testUploadImage";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Link href="/login">Sign-In NOW!</Link>
        {/* <TestUlploadImage /> */}
      </main>
    </HydrateClient>
  );
}
