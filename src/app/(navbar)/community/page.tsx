import React from "react";
import Navbar from "@/app/_components/Navbar";
import { getServerAuthSession } from "@/server/auth";
import CreatePost from "./_components/CreatePost";
import SearchPost from "./_components/SearchPost";
import PostList from "./_components/PostList";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#EBF2FA] pt-32">
      <Navbar />
      <div className="flex w-full flex-col items-center justify-center gap-5 px-10">
        <CreatePost session={session} />
        <SearchPost />
        <PostList />
      </div>
    </div>
  );
};

export default Page;
