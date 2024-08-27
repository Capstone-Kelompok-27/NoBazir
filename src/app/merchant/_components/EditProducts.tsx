import React from "react";
import ProductItemEdit from "./ProductItemEdit";

const EditProducts = () => {
  return (
    <div className="mt-28 flex w-full flex-col px-8">
      <div className="w-full text-start text-3xl font-bold text-[#679436]">
        Edit Products
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        {productTesting.map((item) => (
          <ProductItemEdit key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default EditProducts;

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
