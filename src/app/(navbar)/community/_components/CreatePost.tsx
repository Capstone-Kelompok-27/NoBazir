"use client";

import { api } from "@/trpc/react";
import { type Session } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";

interface CreatePostProp {
  session: Session;
}

const CreatePost: React.FC<CreatePostProp> = ({ session }) => {
  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [postContent, setPostContent] = useState<string>("");
  const [postTag, setPostTag] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");

  // API Calls
  const createProductPictureUrl =
    api.catalog.createProductPictureUrl.useMutation();
  const createPost = api.community.createPost.useMutation();

  // Post Content
  const handlePostContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    event.preventDefault();
    setPostContent(event.target.value);
  };

  // Post Title
  const handlePostTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setPostTitle(event.target.value);
  };

  // Post Tag
  const handlePostTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPostTag(event.target.value);
  };

  // Handle image
  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      console.log("File is empty");
    }
  };

  // Image upload
  const handleImageUpload = async (): Promise<string | null> => {
    if (!selectedFile) {
      console.error("Please select an image file to upload.");
      return null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    return new Promise((resolve) => {
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const cbImageUrl = await createProductPictureUrl.mutateAsync({
            name: selectedFile.name,
            type: selectedFile.type,
            base64Data,
          });
          resolve(cbImageUrl);
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      };
    });
  };

  const postOnClick = async () => {
    const uploadedImageUrl = await handleImageUpload();
    await createPost.mutateAsync({
      createdById: session.user.id,
      postTitle: postTitle,
      postPictureUrl: uploadedImageUrl ?? undefined,
      postContent: postContent,
      postTag: postTag,
    });
    window.location.reload();
  };

  return (
    <div className="flex w-full">
      <div className="flex w-1/12 items-start justify-center">
        <Image
          src={session?.user.image ?? ""}
          alt="user profile image"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <div className="flex w-9/12 flex-col gap-2">
        <input
          type="text"
          name="postTitle"
          placeholder="Post title?"
          value={postTitle}
          onChange={handlePostTitleChange}
          className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 focus:outline-[#A5BE00]"
        />
        <textarea
          name="postContent"
          value={postContent}
          rows={5}
          cols={30}
          onChange={handlePostContentChange}
          placeholder="What is happening?"
          className="w-full rounded-xl p-5 focus:outline-[#A5BE00]"
        ></textarea>
        <div className="flex w-full items-center gap-5">
          <div className="flex w-4/5 flex-col items-start justify-center gap-2">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Product Image"
                className="w-1/3 shrink-0 py-2"
                width={600}
                height={300}
              />
            )}
            <div className="flex gap-5">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="flex max-w-[80%] flex-shrink rounded-3xl bg-[#A5BE00] px-3 py-2 text-sm text-gray-100"
              />
              <input
                type="text"
                name="postTag"
                placeholder="Post tag?"
                value={postTag}
                onChange={handlePostTagChange}
                className="flex h-10 w-2/6 flex-shrink rounded-xl px-3 py-2 focus:outline-[#A5BE00]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-2/12 items-end justify-center">
        <button
          onClick={postOnClick}
          className="mt-7 flex w-3/6 justify-center rounded-3xl bg-[#A5BE00] px-3 py-2 font-bold text-gray-100"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
