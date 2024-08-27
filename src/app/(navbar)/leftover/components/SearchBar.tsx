"use client";

import { CatalogContext } from "@/app/_context/catalogContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }

  // Hold search value
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { setProducts } = catalogContext;
  const allProducts = api.catalog.getAllProducts.useQuery();
  useEffect(() => {
    if (allProducts.data) {
      setProducts(allProducts.data);
    }
  }, [allProducts.data, setProducts]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  // Handle search button
  const handleSearch = () => {
    setQuery(searchInput);
  };

  const productsByName = api.catalog.getProductByName.useQuery(query);
  useEffect(() => {
    if (productsByName.data) {
      setProducts(productsByName.data);
    }
  }, [productsByName.data, setProducts]);

  return (
    <div className="flex h-[48px] w-1/2 items-start justify-between rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#679436] bg-opacity-[0.28] px-4 py-3">
      <input
        type="text"
        name="searchInput"
        placeholder="Insert Name"
        value={searchInput}
        onChange={handleInputChange}
        className="h-10 w-full rounded-2xl bg-white p-2 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
      ></input>
      <button
        className="h-10 w-4/12 rounded-2xl bg-gray-800 p-2 text-white ring-1 ring-[#A8A8A8] focus:ring-gray-800"
        onClick={handleSearch}
      >
        <IoMdSearch className="text-xl text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar;
