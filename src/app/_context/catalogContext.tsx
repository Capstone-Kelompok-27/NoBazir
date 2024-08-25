"use client";

import React, { createContext, useState, type ReactNode } from "react";

export interface CatalogContextType {
  products: {
    id: string;
    createdByMerchantId: string;
    productName: string;
    productType?: string | null;
    price: string;
    expireDate: string;
    stock: string;
    prictureUrl?: string | null;
    totalCalorie?: string | null;
    likeCount: string;
    customerIdLikeList?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
  }[];
  setProducts: (value: CatalogContextType["products"]) => void;
}

export const CatalogContext = createContext<CatalogContextType | undefined>(
  undefined,
);

export const CatalogContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<CatalogContextType["products"]>([
    {
      id: "000000",
      createdByMerchantId: "000000",
      productName: "Product Name",
      productType: null,
      price: "0",
      expireDate: "2024-12-12",
      stock: "0",
      prictureUrl:
        "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96",
      totalCalorie: "0",
      likeCount: "0",
      customerIdLikeList: "",
      createdAt: new Date(1724602793517),
      updatedAt: null,
    },
  ]);

  return (
    <CatalogContext.Provider value={{ products, setProducts }}>
      {children}
    </CatalogContext.Provider>
  );
};
