"use client";

import { CatalogContext } from "@/app/_context/catalogContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";
import DropdownSearch from "./DropdownSearch";

const SearchBar = () => {
  // Catalog Context Initiation
  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }

  // Hold search value
  const [searchInput, setSearchInput] = useState<string>("");
  const [nameQuery, setNameQuery] = useState<string>("");

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
    setNameQuery(searchInput);
  };

  //Handle search by name
  const productsByName = api.catalog.getProductByName.useQuery(nameQuery, {
    enabled: !!nameQuery,
  });
  useEffect(() => {
    if (productsByName.data && nameQuery !== "") {
      setProducts(productsByName.data);
    }
  }, [productsByName.data, setProducts, nameQuery]);

  //-----Filter Feature-----
  // Variables
  const searchByOptions = [
    { value: "Expire" },
    { value: "Price" },
    { value: "Like" },
    { value: "Calorie" },
  ];

  const expireMethodOptions = [
    { value: "Fresh First to Lasting Longest" },
    { value: "Lasting Longest to Frest First" },
  ];

  const priceMethodOptions = [
    { value: "Below Rp15.000" },
    { value: "Rp15.000 to Rp40.000" },
    { value: "Rp40.000 to Rp100.000" },
    { value: "Over Rp100.000" },
  ];

  const likeMethodOptions = [
    { value: "From Highest to Lowest" },
    { value: "From Lowest to Highest" },
  ];

  const calorieMethodOptions = [
    { value: "From Highest to Lowest" },
    { value: "From Lowest to Highest" },
  ];

  const findTypeOptions = [{ value: "Product" }, { value: "Merchant" }];

  // states
  const [searchMethod, setSearchMethod] = useState<string>("Expire");
  const [expireMethod, setExpireMethod] = useState<string>(
    "Fresh First to Lasting Longest",
  );
  const [priceMethod, setPriceMethod] = useState<string>("Below Rp15.000");
  const [likeMethod, setLikeMethod] = useState<string>(
    "From Highest to Lowest",
  );
  const [calorieMethod, setCalorieMethod] = useState<string>(
    "From Highest to Lowest",
  );
  const [findType, setFindType] = useState<string>("Product");

  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  // Handle Dropdown Change
  const handleSearchMethodChange = (value: string) => {
    setSearchMethod(value);
  };
  const handleExpireMethodChange = (value: string) => {
    setExpireMethod(value);
  };
  const handlePriceMethodChange = (value: string) => {
    setPriceMethod(value);
  };
  const handleLikeMethodChange = (value: string) => {
    setLikeMethod(value);
  };
  const handleCalorieMethodChange = (value: string) => {
    setCalorieMethod(value);
  };
  // Handler find type
  const handlerFindType = (value: string) => {
    setFindType(value);
  };

  // Toggle filter
  const toggleFilterChange = () => {
    setToggleFilter(!toggleFilter);
  };

  // -----Get Filtered Data Procedures-----
  // states
  const [toggleApply, setToggleApply] = useState<boolean>(false);
  const [expireQuery, setExpireQuery] = useState<"asc" | "desc">("desc");
  const [priceQuery, setPriceQuery] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({ minPrice: 0, maxPrice: 15000 });
  const [likeQuery, setLikeQuery] = useState<"asc" | "desc">("desc");

  // Filter data by expire
  const productSortedByExpire = api.catalog.getProductSortedByExpire.useQuery(
    expireQuery,
    { enabled: searchMethod === "Expire" && toggleApply },
  );
  useEffect(() => {
    if (productSortedByExpire.data && toggleApply) {
      setProducts(productSortedByExpire.data);
      setToggleApply(false);
    }
  }, [productSortedByExpire.data, toggleApply, setProducts]);

  // Filter data by price
  const productSortedByPrice = api.catalog.getProductByPriceRange.useQuery(
    priceQuery,
    { enabled: searchMethod === "Price" && toggleApply },
  );
  useEffect(() => {
    if (productSortedByPrice.data && toggleApply) {
      setProducts(productSortedByPrice.data);
      setToggleApply(false);
    }
  }, [productSortedByPrice.data, setProducts, setToggleApply, toggleApply]);

  // Filter data by like
  const productSortedByLike = api.catalog.getProductByLikeCount.useQuery(
    likeQuery,
    { enabled: searchMethod === "Like" && toggleApply },
  );
  useEffect(() => {
    if (productSortedByLike.data && toggleApply) {
      setProducts(productSortedByLike.data);
      setToggleApply(false);
    }
  }, [productSortedByLike.data, toggleApply, setProducts]);

  // Filter data by calorie
  // const productSortedByCalorie = api.catalog.getProductByCalorie.useQuery(
  //   calorieQuery,
  //   { enabled: searchMethod === "Calorie" && toggleApply },
  // );
  // useEffect(() => {
  //   if (productSortedByCalorie.data && toggleApply) {
  //     setProducts(productSortedByCalorie.data);
  //     setToggleApply(false);
  //   }
  // });

  // Handle apply filter on click
  const handleApplyFilter = () => {
    if (searchMethod === "Expire") {
      if (expireMethod === "Fresh First to Lasting Longest") {
        setExpireQuery("desc");
      } else if (expireMethod === "Lasting Longest to Frest First") {
        setExpireQuery("asc");
      }
    } else if (searchMethod === "Price") {
      if (priceMethod === "Below Rp15.000") {
        setPriceQuery({ minPrice: 0, maxPrice: 15000 });
      } else if (priceMethod === "Rp15.000 to Rp40.000") {
        setPriceQuery({ minPrice: 15000, maxPrice: 40000 });
      } else if (priceMethod === "Rp40.000 to Rp100.000") {
        setPriceQuery({ minPrice: 40000, maxPrice: 100000 });
      } else if (priceMethod === "Over Rp100.000") {
        setPriceQuery({ minPrice: 100000, maxPrice: 10000000 });
      }
    } else if (searchMethod === "Like") {
      if (likeMethod === "From Highest to Lowest") {
        setLikeQuery("desc");
      } else if (likeMethod === "From Lowest to Highest") {
        setLikeQuery("asc");
      }
    }

    setToggleApply(true);
  };

  return (
    <div className="flex h-20 w-1/2 items-center justify-center gap-5">
      <div className="relative flex w-4/5 items-center justify-between">
        <input
          type="text"
          name="searchInput"
          placeholder="Insert Name"
          value={searchInput}
          onChange={handleInputChange}
          className="absolute z-20 h-10 w-full rounded-lg border-2 border-[#679436] border-opacity-50 bg-[#d5e3c7] p-2 text-[#679436] placeholder:text-[#679436] focus:outline-[#679436]"
        ></input>

        {findType === "Product" && (
          <button
            className="absolute right-3 z-20 text-[#679436]"
            onClick={toggleFilterChange}
          >
            |||
          </button>
        )}

        {toggleFilter && (
          <div className="ring:inset absolute right-0 top-3 z-10 flex w-fit -translate-x-1 flex-col items-start justify-center gap-2 bg-white p-5 ring-1 ring-gray-300">
            <div className="mb-1 text-xl font-bold text-[#679436]">
              Filter By:
            </div>
            <div className="flex gap-5">
              <div className="rounded-2xl bg-gray-100 px-2 py-1">
                <DropdownSearch
                  options={searchByOptions}
                  onChange={handleSearchMethodChange}
                  selectedValue={searchMethod}
                />
              </div>
              {searchMethod === "Expire" && (
                <div className="rounded-2xl bg-gray-100 px-2 py-1">
                  <DropdownSearch
                    options={expireMethodOptions}
                    onChange={handleExpireMethodChange}
                    selectedValue={expireMethod}
                  />
                </div>
              )}
              {searchMethod === "Price" && (
                <div className="rounded-2xl bg-gray-100 px-2 py-1">
                  <DropdownSearch
                    options={priceMethodOptions}
                    onChange={handlePriceMethodChange}
                    selectedValue={priceMethod}
                  />
                </div>
              )}
              {searchMethod === "Like" && (
                <div className="rounded-2xl bg-gray-100 px-2 py-1">
                  <DropdownSearch
                    options={likeMethodOptions}
                    onChange={handleLikeMethodChange}
                    selectedValue={likeMethod}
                  />
                </div>
              )}
              {searchMethod === "Calorie" && (
                <div className="rounded-2xl bg-gray-100 px-2 py-1">
                  <DropdownSearch
                    options={calorieMethodOptions}
                    onChange={handleCalorieMethodChange}
                    selectedValue={calorieMethod}
                  />
                </div>
              )}
            </div>
            <div className="z-10 mt-3 flex w-full justify-center">
              <button
                onClick={handleApplyFilter}
                className="text-md rounded-2xl bg-[#8db600] px-6 py-2 font-semibold text-gray-100"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="rounded-2xl bg-gray-100 p-2 px-2 ring-1 ring-[#679436] ring-opacity-50">
        <DropdownSearch
          options={findTypeOptions}
          onChange={handlerFindType}
          selectedValue={findType}
        />
      </div>

      <button
        className="h-10 w-24 rounded-2xl bg-[#679436] p-2 text-white focus:ring-1 focus:ring-inset focus:ring-green-800"
        onClick={handleSearch}
      >
        Explore
      </button>
    </div>
  );
};

export default SearchBar;
