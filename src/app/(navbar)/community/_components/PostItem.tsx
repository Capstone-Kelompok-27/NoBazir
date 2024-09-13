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
  const [heartUrl, setHeartUrl] = useState<string>("/heart.svg");
  const [likeCount, setLikeCount] = useState<number>(props.likeCount);
  const [creatorData, setCreatorData] = useState<{
    name: string;
    image: string;
  }>({ name: "", image: "" });
  const [imageClick, setImageClick] = useState<boolean>(false);

  const likePostApi = api.community.updateLikePost.useMutation();
  const alreadyLikeApi = api.community.getUserLikePost.useQuery(props.id);
  const creator = api.auth.getByUserId.useQuery(props.createdById);

  // Check already like from db
  useEffect(() => {
    if (alreadyLikeApi.data !== undefined) {
      console.log(alreadyLikeApi.data);
      setAlreadyLike(alreadyLikeApi.data);
      setHeartUrl(alreadyLikeApi.data ? "/heart_filled.svg" : "/heart.svg");
    }
  }, [alreadyLikeApi.data]);

  // Fetch creator
  useEffect(() => {
    if (creator.isSuccess && creator.data[0]) {
      setCreatorData({
        name: creator.data[0].name ?? "",
        image: creator.data[0].image ?? "",
      });
    }
  }, [creator.data, creator.isSuccess]);

  const likeClicked = async () => {
    const newLikeCount = alreadyLike ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    setHeartUrl(!alreadyLike ? "/heart_filled.svg" : "/heart.svg");
    setAlreadyLike(!alreadyLike);

    await likePostApi.mutateAsync({
      likeCount: newLikeCount,
      postId: props.id,
    });

    await alreadyLikeApi.refetch();
  };

  return (
    <div className="relative mx-10 my-5 flex w-8/12 items-center justify-center rounded-2xl bg-white p-8 pr-0">
      <div className="flex w-8/12 flex-col gap-2">
        <div className="flex w-full items-end justify-start gap-1">
          <Image
            src={creatorData.image}
            alt="user profile image"
            width={48}
            height={48}
            className="w-[25px] rounded-full"
          />
          <div className="text-sm font-semibold text-slate-700">
            {creatorData.name}
          </div>
        </div>
        <div className="text-2xl font-semibold text-[#679436]">
          {props.postTitle}
        </div>

        {props.postTag && (
          <div className="flex w-fit justify-center rounded-2xl bg-[#A5BE00] px-3 py-2 font-semibold text-gray-100">
            #{props.postTag}
          </div>
        )}
        <div className="text-[#A5BE00]">{props.postContent}</div>
        <div className="justify- flex items-center gap-0.5 text-[#679436]">
          <Image
            src={heartUrl}
            width={25}
            height={25}
            alt="like"
            onClick={likeClicked}
          />
          <div className="flex translate-y-[1.3px] items-end justify-center text-xl">
            {likeCount}
          </div>
        </div>
      </div>
      <div className="flex w-4/12 items-center justify-center">
        <Image
          src={props.postPictureUrl ?? ""}
          width={150}
          height={150}
          onClick={() => setImageClick(true)}
          alt="post image"
          className="min-h-fit w-4/5 shrink-0 rounded-2xl p-2 py-2"
        />
      </div>

      {imageClick && (
        <div
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-500/50"
          onClick={() => setImageClick(false)}
        >
          <Image
            src={props.postPictureUrl ?? ""}
            width={150}
            height={150}
            alt="post image"
            className="max-w-screen max-h-screen w-2/5 shrink-0 rounded-2xl p-2"
          />
        </div>
      )}
    </div>
  );
};

export default PostItem;
