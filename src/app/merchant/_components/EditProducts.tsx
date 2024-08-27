"use client";

import React, { useState, useContext, useEffect } from "react";
import ProductItemEdit from "./ProductItemEdit";
import { CatalogContext } from "@/app/_context/catalogContext";
import { api } from "@/trpc/react";
import { Session } from "next-auth";

interface EditProductsProp {
  session: Session;
}

const EditProducts: React.FC<EditProductsProp> = ({ session }) => {
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

  return (
    <div className="mt-28 flex w-full flex-col px-8">
      <div className="w-full text-start text-3xl font-bold text-[#679436]">
        Edit Products
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {products.map((item) => (
          <ProductItemEdit key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default EditProducts;
