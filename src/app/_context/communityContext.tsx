"use client";

import React, { createContext, useState, type ReactNode } from "react";

export interface CommunityContextType {
  posts: {
    id: string;
    createdById: string;
    postTitle: string;
    postTag?: string | null;
    postContent?: string | null;
    postPictureUrl?: string | null;
    likeCount: number;
    userIdLikeList?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
  }[];
  setPosts: (value: CommunityContextType["posts"]) => void;
}

export const CommunityContext = createContext<CommunityContextType | undefined>(
  undefined,
);

export const CommunityContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<CommunityContextType["posts"]>([
    {
      id: "000000",
      createdById: "000000",
      postTitle: "Product Name",
      postContent: "",
      postTag: null,
      postPictureUrl:
        "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
      likeCount: 0,
      userIdLikeList: "",
      createdAt: new Date(1724602793517),
      updatedAt: null,
    },
  ]);

  return (
    <CommunityContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
