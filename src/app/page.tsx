import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import LoginByRole from "./_components/loginByRole";
import Logout from "./_components/logout";

// import TestUlploadImage from "./_components/testUploadImage";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {session?.user.name}
        <LoginByRole session={session} />

        {/* <TestUlploadImage /> */}
        <Logout />
      </main>
    </HydrateClient>
  );
}
