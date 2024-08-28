import { type Session } from "next-auth";
import Image from "next/image";
import React from "react";

interface CreatePostProp {
  session: Session;
}

const CreatePost: React.FC<CreatePostProp> = ({ session }) => {
  return (
    <div className="flex w-full">
      <div className="flex w-1/12 items-start justify-center">
        <Image
          src={session?.user.image ?? ""}
          alt="user profile image"
          width={48}
          height={48}
        />
      </div>
      <div className="w-9/12">
        <textarea
          name="postContent"
          rows={5}
          cols={33}
          placeholder="What is happening?"
          className="w-full"
        ></textarea>
      </div>
      <div className="w-2/12"></div>
    </div>
  );
};

export default CreatePost;
