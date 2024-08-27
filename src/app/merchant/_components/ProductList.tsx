"use client";

import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { api } from "@/trpc/react";
import { Session } from "next-auth";
import { CatalogContext } from "@/app/_context/catalogContext";
import { redirect } from "next/navigation";

interface ProductListProp {
  session: Session;
}

const ProductList: React.FC<ProductListProp> = ({ session }) => {
  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }
  const { products, setProducts } = catalogContext;

  const merchantIdById = api.auth.getMerchantIdByUserId.useQuery(
    session.user.id,
  );
  const merchantIdByIdData = merchantIdById.data;

  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (merchantIdByIdData) {
      setQuery(merchantIdByIdData);
    }
  }, [merchantIdByIdData, setQuery]);

  const productByMerchantId =
    api.catalog.getProductByMerchantId.useQuery(query);
  useEffect(() => {
    if (productByMerchantId.data) setProducts(productByMerchantId.data);
  }, [setProducts, productByMerchantId.data]);

  const handleEditOnClick = () => {
    redirect("/merchant/edit-products");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#a7b997] p-5">
      <div className="text-3xl font-bold text-[#EBF2FA]">My Products</div>
      <div className="max-w-screen mx-auto flex flex-wrap items-center justify-center">
        {products.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
      <div>
        <button
          className="h-10 rounded-2xl bg-[#679436] px-3 py-2 font-medium text-white focus:ring-1 focus:ring-inset focus:ring-green-800"
          onClick={handleEditOnClick}
        >
          Edit Products
        </button>
      </div>
    </div>
  );
};

export default ProductList;
