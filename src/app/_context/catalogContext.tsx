"use client";

import React, { createContext, useState, type ReactNode } from "react";

export interface CatalogContextType {
  products: {
    id: string;
    createdByMerchantId: string;
    productName: string;
    productType?: string | null;
    price: number;
    expireDate: string;
    expireHour: number;
    stock: number;
    pictureUrl: string | null;
    totalCalorie?: number | null;
    likeCount: number;
    customerIdLikeList?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
  }[];
  setProducts: (value: CatalogContextType["products"]) => void;

  merchants: {
    id: string;
    userId: string;
    merchantName: string;
    location?: string | null;
    merchantType?: string | null;
    phoneNumber?: string | null;
    socialMedia?: string | null;
    profilePictureUrl: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
  }[];
  setMerchants: (value: CatalogContextType["merchants"]) => void;

  product: {
    id: string;
    createdByMerchantId: string;
    productName: string;
    productType?: string | null;
    price: number;
    expireDate: string;
    expireHour: number;
    stock: number;
    pictureUrl: string | null;
    totalCalorie?: number | null;
    likeCount: number;
    customerIdLikeList?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
  };
  setProduct: (value: CatalogContextType["product"]) => void;
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
  ]);

  const [merchants, setMerchants] = useState<CatalogContextType["merchants"]>([
    {
      id: "000000",
      userId: "000000",
      merchantName: "Merchant Name",
      location: "Location",
      merchantType: "Cafe",
      phoneNumber: "000000",
      socialMedia: "Social Media",
      profilePictureUrl:
        "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/no-merchant-image.png-1724666448529?alt=media&token=a989466a-2f7c-4ad1-9fa4-afa4dcfe0c61",
      createdAt: new Date(1724602793517),
      updatedAt: null,
    },
  ]);

  const [product, setProduct] = useState<CatalogContextType["product"]>({
    id: "000000",
    createdByMerchantId: "000000",
    productName: "Product Name",
    productType: null,
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
  });

  return (
    <CatalogContext.Provider
      value={{
        products,
        setProducts,
        merchants,
        setMerchants,
        product,
        setProduct,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
