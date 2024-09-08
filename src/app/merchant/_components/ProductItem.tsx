"use client";

import React from "react";
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

const ProductItem: React.FC<FoodCatalogProps> = (props) => {
  return (
    <div className="max-w-1/3 flex w-[425px]">
      <div className="m-7 flex flex-col gap-2 rounded-2xl bg-white p-5">
        <div className="relative h-36 overflow-hidden rounded-t-2xl">
          <Image
            src={
              props.pictureUrl ??
              "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96"
            }
            alt="Product Image"
            className="mx-auto w-fit shrink-0"
            width={500}
            height={300}
          />
        </div>
        <div className="mx-2 font-montserrat text-[23px] font-bold text-[#A5BE00]">
          {props.productName}
        </div>
        <div className="flex flex-row">
          <div className="mx-1 rounded-full border-2 border-[#679436] px-2 text-center font-montserrat font-semibold text-[#679436]">
            {props.productType}
          </div>
          <div className="mx-1 rounded-full border-2 border-[#679436] px-2 text-center font-montserrat font-semibold text-[#679436]">
            {props.stock} item
          </div>
          <div className="mx-1 rounded-full border-2 border-[#679436] px-2 text-center font-montserrat font-semibold text-[#679436]">
            {props.totalCalorie} kcal
          </div>
        </div>
        <div className="mx-2 font-source-sans text-[#679436]">
          Expire: {props.expireDate} | {props.expireHour}.00
        </div>
        <div className="mx-2 font-montserrat text-[23px] font-bold text-[#A5BE00]">
          Rp. {props.price}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
