import React from "react";
import Navbar from "@/app/_components/Navbar";
import SearchBar from "./components/SearchBar";
import RecommendCatalog from "./components/RecommendCatalog";
import ProductList from "./components/ProductList";
import Footer from "@/app/_components/Footer";

const Page = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#EBF2FA] pt-32">
      <Navbar />
      <RecommendCatalog />
      <SearchBar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default Page;
