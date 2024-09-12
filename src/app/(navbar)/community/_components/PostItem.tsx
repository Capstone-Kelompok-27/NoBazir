"use client";

import { api } from "@/trpc/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface postType {
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
}

const PostItem: React.FC<postType> = (props) => {
  const [alreadyLike, setAlreadyLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [heartUrl, setHeartUrl] = useState<string>("/heart.svg");
  const [userList, setUserList] = useState<string | null | undefined>(
    props.userIdLikeList,
  );

  if (userList === undefined || userList === null) {
    setUserList("");
  }

  const likePostApi = api.community.updateLikePost.useQuery(
    {
      likeCount: likeCount,
      postId: props.id,
    },
    { enabled: likeCount != props.likeCount },
  );
  const likePostData = likePostApi.data;

  useEffect(() => {
    if (likePostData) {
      setUserList(likePostData.userIdLikeList ?? "");
      setLikeCount(likePostData.likeCount ?? props.likeCount);
    }
  }, [likePostData, props.likeCount]);

  const likeClicked = () => {
    if (!alreadyLike) {
      setLikeCount((prev) => prev + 1);
      setAlreadyLike(true);
      setHeartUrl("/heart_filled.svg");
    } else {
      setLikeCount((prev) => prev - 1);
      setAlreadyLike(false);
      setHeartUrl("/heart.svg");
    }
  };

  return (
    <div className="relative mx-10 my-5 flex w-9/12 items-start justify-center rounded-2xl bg-white p-8 pr-0">
      <div className="flex w-4/6 flex-col gap-2">
        <div className="text-2xl font-semibold text-[#679436]">
          {props.postTitle}
        </div>

        <div className="flex w-fit justify-center rounded-2xl bg-[#A5BE00] px-3 py-2 font-semibold text-gray-100">
          #{props.postTag}
        </div>
        <div className="text-[#A5BE00]">{props.postContent}</div>
        <div
          className="justify- flex items-center gap-0.5 text-[#679436]"
          onClick={likeClicked}
        >
          <Image src={heartUrl} width={25} height={25} alt="like" />
          <div className="flex translate-y-[1.3px] items-end justify-center text-xl">
            {likeCount}
          </div>
        </div>
      </div>
      <div className="flex w-2/6 items-center justify-center">
        <Image
          src={props.postPictureUrl ?? ""}
          width={150}
          height={150}
          alt="post image"
          className="min-h-fit w-4/5 shrink-0 rounded-2xl p-2 py-2"
        />
      </div>
    </div>
  );
};

export default PostItem;
