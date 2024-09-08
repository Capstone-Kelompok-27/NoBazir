"use client";

import { CommunityContext } from "@/app/_context/communityContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import DropdownSearch from "../../leftover/components/DropdownSearch";

interface SearchPostInputs {
  input: string;
  type: string;
}

const SearchPost = () => {
  const communityContext = useContext(CommunityContext);
  if (!communityContext) {
    throw new Error(
      "page component must be used within a CommunityContextProvider",
    );
  }

  const { setPosts } = communityContext;

  // States
  const [findType, setFindType] = useState<string>("All");
  const [formValues, setFormValues] = useState<SearchPostInputs>({
    input: "",
    type: "All",
  });

  // Dropdown types
  const findTypeOptions = [
    { value: "All" },
    { value: "Title" },
    { value: "Tag" },
    { value: "Content" },
  ];

  // Handler find type
  const handlerFindType = (value: string) => {
    setFindType(value);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFormValues({
      input: formData.get("searchInput") as string,
      type: findType,
    });
  };

  // Fetch Data
  const allPosts = api.community.getAllPosts.useQuery();
  useEffect(() => {
    if (allPosts.data) {
      setPosts(allPosts.data);
    }
  }, [setPosts, allPosts.data]);

  const postByAll = api.community.getPostByInput.useQuery(formValues.input, {
    enabled: formValues.type === "All",
  });
  useEffect(() => {
    if (postByAll.data) {
      setPosts(postByAll.data);
    }
  });

  const postByTitle = api.community.getPostByTitle.useQuery(formValues.input, {
    enabled: formValues.type === "Title",
  });
  useEffect(() => {
    if (postByTitle.data) {
      setPosts(postByTitle.data);
    }
  });

  const postByContent = api.community.getPostByContent.useQuery(
    formValues.input,
    {
      enabled: formValues.type === "Content",
    },
  );
  useEffect(() => {
    if (postByContent.data) {
      setPosts(postByContent.data);
    }
  });

  const postByTag = api.community.getPostsByTag.useQuery(formValues.input, {
    enabled: formValues.type === "Tag",
  });
  useEffect(() => {
    if (postByTag.data) {
      setPosts(postByTag.data);
    }
  });

  return (
    <div className="mt-10 flex h-20 w-1/2 flex-col items-start justify-center gap-x-5">
      <div className="text-xl font-bold text-[#679436]">Search Post:</div>
      <form
        onSubmit={handleSubmit}
        className="flex w-4/5 items-center justify-between gap-3"
      >
        <input
          type="text"
          name="searchInput"
          placeholder="Insert Name"
          className="z-20 h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
        ></input>
        <div className="rounded-2xl bg-gray-100 p-2 px-2 ring-1 ring-[#679436] ring-opacity-50">
          <DropdownSearch
            options={findTypeOptions}
            onChange={handlerFindType}
            selectedValue={findType}
          />
        </div>
        <button
          type="submit"
          className="h-10 w-24 rounded-2xl bg-[#679436] p-2 text-white focus:ring-1 focus:ring-inset focus:ring-green-800"
        >
          Explore
        </button>
      </form>
    </div>
  );
};

export default SearchPost;
