import React from "react";
import Navbar from "@/app/_components/Navbar";
import SearchBar from "./components/SearchBar";
import RecommendCatalog from "./components/RecommendCatalog";
import ProductList from "./components/ProductList";

const Page = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center bg-[#EBF2FA] pt-32">
      <Navbar />
      <RecommendCatalog />
      <SearchBar />
      <ProductList />
    </div>
  );
};

export default Page;
