import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const FoodCatalog = ({
  imagesSRC,
  distance,
  time,
  name,
  description,
  rating,
}) => {
  return (
    <div className="flex w-5/6 flex-col rounded-2xl bg-white">
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={imagesSRC}
          style={{ objectFit: "cover" }}
          alt="name"
        />
      </div>
      <div className="mx-2 font-source-sans text-[#679436]">
        {distance} | {time}
      </div>
      <div className="mx-2 font-montserrat text-[23px] font-bold text-[#A5BE00]">
        {name}
      </div>
      <div className="mx-2 text-justify font-source-sans text-[17px] text-[#679436]">
        {description}
      </div>
      <div className="flex justify-center">
        <button className="mb-2 mt-2 w-5/6 rounded-2xl bg-[#679436] p-2 font-montserrat text-[20px] font-semibold text-white">
          Order
        </button>
      </div>
    </div>
  );
};

export default FoodCatalog;
