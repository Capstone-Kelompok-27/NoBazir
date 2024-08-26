"use client";

import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { CatalogContext } from "@/app/_context/catalogContext";

const ProductList = () => {
  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }

  const { products } = catalogContext;

  return (
    <div className="max-w-screen m-10 flex flex-wrap items-center justify-center">
      {products.map((item) => (
        <ProductItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ProductList;

const productTesting = [
  {
    id: "000001",
    createdByMerchantId: "000000",
    productName: "Product Name",
    productType: "Product Type",
    price: 0,
    expireDate: "2024-12-12",
    expireHour: 23,
    stock: 0,
    pictureUrl:
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
    totalCalorie: 0,
    likeCount: 0,
    customerIdLikeList: "",
    createdAt: new Date(1724602793517),
    updatedAt: null,
  },
  {
    id: "000002",
    createdByMerchantId: "000000",
    productName: "Product Name",
    productType: "Product Type",
    price: 0,
    expireDate: "2024-12-12",
    expireHour: 23,
    stock: 0,
    pictureUrl:
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
    totalCalorie: 0,
    likeCount: 0,
    customerIdLikeList: "",
    createdAt: new Date(1724602793517),
    updatedAt: null,
  },
  {
    id: "000003",
    createdByMerchantId: "000000",
    productName: "Product Name",
    productType: "Product Type",
    price: 0,
    expireDate: "2024-12-12",
    expireHour: 23,
    stock: 0,
    pictureUrl:
      "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
    totalCalorie: 0,
    likeCount: 0,
    customerIdLikeList: "",
    createdAt: new Date(1724602793517),
    updatedAt: null,
  },
];
