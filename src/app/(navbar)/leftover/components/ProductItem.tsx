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
  pictureUrl: string;
  totalCalorie?: number | null;
  likeCount: number;
  customerIdLikeList?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

const ProductItem: React.FC<FoodCatalogProps> = (props) => {
  return (
    <div className="w-1/3">
      <div className="m-5 flex flex-col rounded-2xl bg-white">
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={props.pictureUrl}
            alt="Product Image"
            className="h-full w-full"
            width={500}
            height={500}
          />
        </div>
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
        <div className="flex justify-center">
          <button className="mb-2 mt-2 w-5/6 rounded-2xl bg-[#679436] p-2 font-montserrat text-[20px] font-semibold text-white">
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
