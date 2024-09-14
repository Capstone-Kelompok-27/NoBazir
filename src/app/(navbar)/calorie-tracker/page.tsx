import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import React from "react";
import CalorieTracker from "./components/CalorieTracker";

const page = () => {
  return (
    <div>
      <Navbar />
      <CalorieTracker />
      <Footer />
    </div>
  );
};

export default page;
