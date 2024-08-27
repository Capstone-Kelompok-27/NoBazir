import Navbar from "@/app/_components/Navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import EditProducts from "../_components/EditProducts";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  if (session?.user.role === "customer") {
    redirect("/leftover");
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-[#EBF2FA]">
      <Navbar />
      <EditProducts />
    </main>
  );
}
