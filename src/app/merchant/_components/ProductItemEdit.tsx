"use client";

import React, { useEffect, useState } from "react";
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
  const createProductPictureUrl =
    api.catalog.createProductPictureUrl.useMutation();
  const updateProduct = api.catalog.updateProduct.useMutation();

  // States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    props.pictureUrl ??
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
  );

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
      const cbImageUrl = await createProductPictureUrl.mutateAsync({
        name: selectedFile.name,
        type: selectedFile.type,
        base64Data,
      });
      setImageUrl(cbImageUrl);
    };
  };

  // Handle text input
  // States
  const [nameInput, setNameInput] = useState<string>(props.productName);
  const [expireDateInput, setExpireDateInput] = useState<string>(
    props.expireDate,
  );
  const [expireTimeInput, setExpireTimeInput] = useState<number>(
    props.expireHour,
  );
  const [typeInput, setTypeInput] = useState<string | undefined>(
    props.productType ?? undefined,
  );
  const [priceInput, setPriceInput] = useState<number>(props.price);
  const [stockInput, setStockInput] = useState<number>(props.stock);
  const [calorieInput, setCalorieInput] = useState<number | undefined>(
    props.totalCalorie ?? undefined,
  );

  // Name
  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setNameInput(event.target.value);
  };

  // Expire Date
  const handleExpireDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setExpireDateInput(event.target.value);
  };

  // Expire Time
  const handleExpireTimeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setExpireTimeInput(parseInt(event.target.value));
  };

  // Type
  const handleTypeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setTypeInput(event.target.value);
  };

  // Price
  const handlePriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setPriceInput(parseInt(event.target.value));
  };

  // Stock
  const handleStockInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setStockInput(parseInt(event.target.value));
  };

  // Calorie
  const handleCalorieInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setCalorieInput(parseInt(event.target.value));
  };

  // Handle Edit Button -- If something changed
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  useEffect(() => {
    if (
      nameInput !== props.productName ||
      expireDateInput !== props.expireDate ||
      expireTimeInput !== props.expireHour ||
      priceInput !== props.price ||
      stockInput !== props.stock ||
      calorieInput !== props.totalCalorie ||
      typeInput !== props.productType
    ) {
      if (
        !(props.totalCalorie === null && calorieInput === undefined) ||
        !(props.productType === null && typeInput === undefined)
      ) {
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  });

  // Handle Edit Button On Click
  const editOnClick = async () => {
    await handleImageUpload();
    await updateProduct.mutateAsync({
      id: props.id,
      productName: nameInput,
      productType: typeInput,
      expireDate: expireDateInput,
      expireHour: expireTimeInput,
      price: priceInput,
      stock: stockInput,
      totalCalorie: calorieInput,
      pictureUrl: imageUrl,
    });
    window.location.reload();
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
          {/* Expire Input */}
          <div className="flex w-full gap-5">
            {/* Expire Date Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Expire Date</div>
              <div>
                <input
                  type="text"
                  name="expireDateInputt"
                  placeholder="Insert Expire Date"
                  value={expireDateInput}
                  onChange={handleExpireDateInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
            {/* Expire Time Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Expire Time</div>
              <div>
                <input
                  type="number"
                  name="expireTimeInput"
                  placeholder="Insert Expire Time"
                  value={expireTimeInput}
                  onChange={handleExpireTimeInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <div className="flex w-full gap-5">
            {/* Type Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Type</div>
              <div>
                <input
                  type="text"
                  name="typeInput"
                  placeholder="Insert Product Type"
                  value={typeInput}
                  onChange={handleTypeInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
            {/* Price Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Price</div>
              <div>
                <input
                  type="number"
                  name="priceInput"
                  placeholder="Insert Price"
                  value={priceInput}
                  onChange={handlePriceInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-5">
            {/* Stock Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Stock</div>
              <div>
                <input
                  type="number"
                  name="stockInput"
                  placeholder="Insert Stock"
                  value={stockInput}
                  onChange={handleStockInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
            {/* Calorie Input */}
            <div className="flex w-1/2 flex-col gap-1">
              <div className="text-xl text-[#A5BE00]">Calorie (Kcal)</div>
              <div>
                <input
                  type="number"
                  name="calorieInput"
                  placeholder="Insert Calorie (Kcal)"
                  value={calorieInput}
                  onChange={handleCalorieInputChange}
                  className="h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
                ></input>
              </div>
            </div>
          </div>
        </div>
        {dataChanged && (
          <div className="flex items-center justify-center">
            <button
              onClick={editOnClick}
              className="mt-7 rounded-3xl bg-[#A5BE00] px-3 py-2 text-gray-100"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full border-[1px] border-[#679436]"></div>
    </div>
  );
};

export default ProductItemEdit;
