"use client";

import { CommunityContext } from "@/app/_context/communityContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect } from "react";

const SearchPost = () => {
  const communityContext = useContext(CommunityContext);
  if (!communityContext) {
    throw new Error(
      "page component must be used within a CommunityContextProvider",
    );
  }

  const { setPosts } = communityContext;

  const allPosts = api.community.getAllPosts.useQuery();
  useEffect(() => {
    if (allPosts.data) {
      setPosts(allPosts.data);
    }
  }, [setPosts, allPosts.data]);

  return <div></div>;
};

export default SearchPost;
