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
    <div className="flex w-full -translate-x-5 justify-center md:w-8/12">
      <div className="flex shrink-0 items-start justify-center px-3">
        <Image
          src={session?.user.image ?? ""}
          alt="user profile image"
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
      <div className="flex w-10/12 flex-col gap-2">
        <input
          type="text"
          name="postTitle"
          placeholder="Post title?"
          value={postTitle}
          onChange={handlePostTitleChange}
          className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 focus:outline-[#A5BE00]"
        />
        <input
          type="text"
          name="postTag"
          placeholder="Post tag?"
          value={postTag}
          onChange={handlePostTagChange}
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
        <div className="flex w-full items-center justify-between gap-5">
          <div className="flex w-full flex-col items-start justify-center gap-2">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Product Image"
                className="w-1/3 shrink-0 py-2"
                width={600}
                height={300}
              />
            )}
            <div className="flex w-full flex-wrap justify-between gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="flex min-w-32 max-w-52 flex-shrink rounded-3xl bg-[#A5BE00] px-3 py-2 text-sm text-gray-100"
              />
              <button
                onClick={postOnClick}
                className="flex w-16 justify-center rounded-3xl bg-[#A5BE00] px-2 py-2 font-bold text-gray-100 md:w-20"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
