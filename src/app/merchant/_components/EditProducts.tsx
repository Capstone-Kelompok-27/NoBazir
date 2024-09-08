"use client";

import React, { useState, useContext, useEffect } from "react";
import ProductItemEdit from "./ProductItemEdit";
import { CatalogContext } from "@/app/_context/catalogContext";
import { api } from "@/trpc/react";
import { type Session } from "next-auth";
import Image from "next/image";
import addProductIcon from "public/merchant/add-product-icon.png";
import ProductItemCreate from "./ProductItemCreate";

interface EditProductsProp {
  session: Session;
}

const EditProducts: React.FC<EditProductsProp> = ({ session }) => {
  const [addClicked, setAddClicked] = useState<boolean>(false);

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

  const addOnClick = () => {
    setAddClicked(!addClicked);
  };

  return (
    <div className="mt-28 flex w-full flex-col px-8">
      <div className="w-full text-start text-3xl font-bold text-[#679436]">
        Edit Products
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {products.map((item) => (
          <ProductItemEdit key={item.id} {...item} />
        ))}
        {addClicked && <ProductItemCreate merchantId={query} />}
      </div>
      <div className="flex w-full items-center justify-center">
        <button
          onClick={addOnClick}
          className="m-5 flex items-center justify-center"
        >
          {addClicked && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-[#679436] ring-offset-1 text-[#679436]  text-3xl">
              -
            </div>
          )}
          {!addClicked && (
            <Image
              src={addProductIcon}
              alt="Add Product Icon"
              width={42}
              height={42}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProducts;
