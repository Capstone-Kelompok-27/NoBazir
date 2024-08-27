"use client";

import React, { useState } from "react";
import { api } from "@/trpc/react";
import Image from "next/image";

interface FoodCatalogProps {
  id: string;
  createdByMerchantId: string;
  productName: string;
  productType?: string | null;
  price: number;
  expireDate: string;
  expireHour: number;
  stock: number;
  pictureUrl: string | null;
  totalCalorie?: number | null;
  likeCount: number;
  customerIdLikeList?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

const ProductItemEdit: React.FC<FoodCatalogProps> = (props) => {
  // API Calls
  const { mutateAsync } = api.catalog.createProductPictureUrl.useMutation();

  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(props.pictureUrl);
  // States for text input
  const [nameInput, setNameInput] = useState<string>("");

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

  const handleImageUpload = async () => {
    if (!selectedFile) {
      console.error("Please select an image file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const cbImageUrl = await mutateAsync({
        name: selectedFile.name,
        type: selectedFile.type,
        base64Data,
      });
      setImageUrl(cbImageUrl);
    };
  };

  // Handle text input
  // Name
  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setNameInput(event.target.value);
  };

  return (
    <div className="relative flex w-11/12 items-center justify-center gap-5 px-5 py-6">
      {/* Image Input */}
      <div className="relative flex w-1/5 justify-center overflow-hidden rounded-xl py-5">
        <Image
          src={
            imageUrl ??
            "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96"
          }
          alt="Product Image"
          className="mx-auto w-full shrink-0 rounded-xl"
          width={600}
          height={300}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          className="absolute bottom-8 flex max-w-[80%] flex-shrink rounded-3xl bg-[#A5BE00] px-3 py-2 text-sm text-gray-100"
        />
      </div>

      {/* Text Input */}
      <div className="flex w-4/5 gap-5">
        <div className="flex w-1/2 flex-col gap-2">
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <div className="text-xl text-[#A5BE00]">Name</div>
            <div>
              <input
                type="text"
                name="nameInput"
                placeholder="Insert Name"
                value={nameInput}
                onChange={handleNameInputChange}
                className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
              ></input>
            </div>
          </div>
          {/* Expire Date Input */}
          <div className="flex flex-col gap-1">
            <div className="text-xl text-[#A5BE00]">Expire Date</div>
            <div>
              <input
                type="text"
                name="nameInput"
                placeholder="Insert Name"
                value={nameInput}
                onChange={handleNameInputChange}
                className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
              ></input>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          {/* Price Input */}
          <div className="flex flex-col gap-1">
            <div className="text-xl text-[#A5BE00]">Price</div>
            <div>
              <input
                type="text"
                name="nameInput"
                placeholder="Insert Name"
                value={nameInput}
                onChange={handleNameInputChange}
                className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
              ></input>
            </div>
          </div>
          <div className="flex w-full gap-5">
            {/* Stock Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Stock</div>
              <div>
                <input
                  type="text"
                  name="nameInput"
                  placeholder="Insert Name"
                  value={nameInput}
                  onChange={handleNameInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
            {/* Calorie Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Calorie (Kcal)</div>
              <div>
                <input
                  type="text"
                  name="nameInput"
                  placeholder="Insert Name"
                  value={nameInput}
                  onChange={handleNameInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="mt-7 rounded-3xl bg-[#A5BE00] px-3 py-2 text-gray-100">
            Edit
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full border-[1px] border-[#679436]"></div>
      {/* <div className="m-7 flex flex-col gap-2 rounded-2xl bg-white p-5">
        <div className="mx-2 font-source-sans text-[#679436]">
          Expire: {props.expireDate} | {props.expireHour}.00
        </div>
        <div className="mx-2 font-montserrat text-[23px] font-bold text-[#A5BE00]">
          {props.productName}
        </div>
        <div className="mx-2 text-justify font-source-sans text-[17px] text-[#679436]">
          | {props.productType} | Stock: {props.stock} | Price: {props.price} |
          Total Calorie: {props.totalCalorie} | Like: {props.likeCount} |
        </div>
      </div> */}
    </div>
  );
};

export default ProductItemEdit;
