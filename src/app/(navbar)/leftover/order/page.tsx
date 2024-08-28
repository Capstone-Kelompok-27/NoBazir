import Navbar from "@/app/_components/Navbar";
import React from "react";
import OrderItem from "../components/OrderItem";

const page = () => {
  return (
    <div className="w-full">
      <Navbar />
      <OrderItem />
    </div>
  );
};

export default page;
