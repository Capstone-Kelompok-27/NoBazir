"use client";

import React, { useContext } from "react";
import Navbar from "@/app/_components/Navbar";
import SearchBar from "./components/SearchBar";
import RecommendCatalog from "./components/RecommendCatalog";
import FoodCatalog from "./components/FoodCatalog";
import { CatalogContext } from "@/app/_context/catalogContext";

const Page = () => {
  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }

  const { products } = catalogContext;
  if (products?.length === 0) {
    return <div>No product available</div>;
  }

  return (
    <div className="bg-[#EBF2FA]">
      <div className="mx-20">
        <div className="flex flex-col justify-center">
          <Navbar isLoggedIn={true} />
          <RecommendCatalog />
          <div className="mt-10 flex items-center justify-center">
            <SearchBar />
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 p-4">
            {products.map((item) => (
              <FoodCatalog
                key={item.id}
                imagesSRC={item.prictureUrl}
                distance={10}
                time={item.expireDate}
                name={item.productName}
                description={item.productType}
                rating={item.likeCount}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
