"use client";

import { CatalogContext } from "@/app/_context/catalogContext";
import React, { useContext, useState } from "react";
import Image from "next/image";
import PlusCircle from "public/icons/plus-circle.svg";
import MinusCircle from "public/icons/minus-circle.svg";
import PaymentPopUp from "public/catalog/Payment pop up.png";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";

const OrderItem = () => {
  const router = useRouter();
  const updateProduct = api.catalog.updateProduct.useMutation();

  const catalogContext = useContext(CatalogContext);
  if (!catalogContext) {
    throw new Error(
      "page component must be used within a CatalogContextProvider",
    );
  }
  const { product } = catalogContext;

  const [quantity, setQuantity] = useState<number>(1);
  const [totalPayment, setTotalPayment] = useState<number>(product.price);
  const [paymentPopUp, setPaymentPopUp] = useState<boolean>(false);

  const purchaseOnClick = () => {
    setPaymentPopUp(true);
  };
  const donePaymentOnClick = async () => {
    setPaymentPopUp(false);
    await updateProduct.mutateAsync({
      id: product.id,
      stock: product.stock - quantity,
    });
    alert(
      `Payment successfull, ${product.productName} soon will arrive in front of you!!`,
    );
    router.push("/leftover");
  };
  const cancelPaymentOnClick = () => {
    setPaymentPopUp(false);
    alert(`Payment canceled`);
    router.push("/leftover");
  };

  return (
    <div className="max-w-screen relative mt-28 flex w-full flex-col pl-10">
      <div className="text-2xl font-bold text-[#679436]">Shopping Cart</div>
      <div className="flex gap-5">
        <div className="flex w-1/2 items-start justify-center">
          <div className="relative flex w-full items-center justify-center gap-3 px-5 py-6">
            <div className="flex w-2/6 justify-center overflow-hidden rounded-xl py-5">
              <Image
                src={
                  product.pictureUrl ??
                  "https://firebasestorage.googleapis.com/v0/b/nobazir-2852e.appspot.com/o/product-image-not-available.png-1724596226993?alt=media&token=061dfd41-d345-4cc3-b885-9594eaa42d96"
                }
                alt="Product Image"
                className="mx-auto w-full shrink-0 rounded-xl"
                width={600}
                height={300}
              />
            </div>
            <div className="flex w-4/6 flex-col items-start gap-3">
              <div className="text-xl font-semibold text-[#679436]">
                {product.productName}
              </div>
              <div className="text-[#A5BE00]">Rp{product.price}</div>
              <div className="flex -translate-x-1 items-center justify-center gap-2">
                <Image
                  src={MinusCircle}
                  alt="minus-cirle"
                  width={29}
                  height={29}
                  onClick={() => {
                    setQuantity((prev) => prev - 1);
                    setTotalPayment((prev) => prev - product.price);
                  }}
                />

                <div className="text-[#679436]">{quantity}</div>
                <Image
                  src={PlusCircle}
                  alt="plus-circle"
                  width={29}
                  height={29}
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                    setTotalPayment((prev) => prev + product.price);
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-8 w-5/6 border border-[#679436]/50"></div>
          </div>
        </div>
        <div className="mr-12 flex w-1/2 flex-col items-center justify-center gap-5">
          <div className="flex w-4/5 flex-col items-start justify-center rounded-xl p-3 ring-2 ring-[#679436]">
            <div className="text-xl font-semibold text-[#A5BE00]">
              Delivery to
            </div>
            <div className="font-semibold text-[#679436]">
              Your Current Location
            </div>
          </div>
          <div className="flex w-4/5 flex-col items-start justify-center rounded-xl p-3 ring-2 ring-[#679436]">
            <div className="mb-1 text-xl font-semibold text-[#679436]">
              Order Summary
            </div>
            <div className="flex w-full items-center justify-between font-medium text-[#A5BE00]">
              <div>Item(s) subtotal</div>
              <div>Rp{totalPayment}</div>
            </div>
            <div className="my-2 w-full border border-[#679436]/50"></div>
            <div className="flex w-full items-center justify-between font-medium text-[#679436]">
              <div>Total payment</div>
              <div>Rp{totalPayment}</div>
            </div>
          </div>
          <div className="flex w-4/5 flex-col items-start justify-center rounded-xl p-3 ring-2 ring-[#679436]">
            <div className="flex w-full items-center justify-between font-semibold text-[#679436]">
              <div>Coins:</div>
              <div>{0}</div>
            </div>
          </div>

          <button
            className="flex w-4/5 justify-center rounded-3xl bg-[#679436] px-3 py-2 text-gray-100"
            onClick={purchaseOnClick}
          >
            Purchase
          </button>
        </div>
      </div>

      {paymentPopUp && (
        <div className="absolute left-1/2 top-1/2 mt-8 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-xl bg-gray-200 p-6">
          <Image
            src={PaymentPopUp}
            width={300}
            height={300}
            alt="Payment Pop-Up"
          />
          <button
            className="mx-auto mt-5 flex w-40 justify-center rounded-3xl bg-[#679436] px-3 py-2 text-gray-100"
            onClick={donePaymentOnClick}
          >
            Done Payment
          </button>
          <button
            className="mx-auto mt-3 flex w-40 justify-center rounded-3xl bg-[#d92e41] px-3 py-2 text-gray-100"
            onClick={cancelPaymentOnClick}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
