import Navbar from "@/app/_components/Navbar";
import React from "react";
import OrderItem from "../components/OrderItem";
import Footer from "@/app/_components/Footer";

const page = () => {
  return (
    <div className="w-full">
      <Navbar />
      <OrderItem />
      <Footer />
    </div>
  );
};

export default page;
