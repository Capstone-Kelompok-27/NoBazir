import Image from "next/image";
import React from "react";

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
  return (
    <div className="relative mx-10 my-5 flex w-10/12 items-start justify-center rounded-2xl bg-white p-5">
      <div className="flex w-4/6 flex-col gap-2">
        <div className="text-2xl font-semibold text-[#679436]">
          {props.postTitle}
        </div>

        <div className="flex w-fit justify-center rounded-2xl bg-[#A5BE00] px-3 py-2 font-semibold text-gray-100">
          #{props.postTag}
        </div>
        <div className="text-[#A5BE00]">{props.postContent}</div>
        <div className="text-[#679436]">Like: {props.likeCount}</div>
      </div>
      <div className="flex w-2/6 items-center justify-center">
        <Image
          src={props.postPictureUrl ?? ""}
          width={300}
          height={300}
          alt="post image"
          className="min-h-fit w-4/5 shrink-0 rounded-2xl py-2"
        />
      </div>
    </div>
  );
};

export default PostItem;
