import React from "react";
import Navbar from "@/app/_components/Navbar";
import SearchBar from "./components/SearchBar";
import RecommendCatalog from "./components/RecommendCatalog";
import ProductList from "./components/ProductList";

const Page = () => {
  return (
    <div className="flex w-full flex-col justify-center bg-[#EBF2FA]">
      <Navbar />
      <RecommendCatalog />
      <div className="mt-10 flex items-center justify-center">
        <SearchBar />
      </div>
      <ProductList />
    </div>
  );
};

export default Page;
