"use client";

import { CommunityContext } from "@/app/_context/communityContext";
import React, { useContext } from "react";
import PostItem from "./PostItem";

const PostList = () => {
  const communityContext = useContext(CommunityContext);
  if (!communityContext) {
    throw new Error(
      "page component must be used within a CommunityContextProvider",
    );
  }

  const { posts } = communityContext;

  return (
    <div className="max-w-screen m-10 flex flex-wrap items-center justify-center">
      {posts.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default PostList;
