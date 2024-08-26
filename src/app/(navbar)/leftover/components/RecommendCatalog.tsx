import React from "react";
import recommend from "public/catalog/Green Fresh Fruit Promotion Offer Banner 1@3x.png";
import Image from "next/image";

const RecommendCatalog = () => {
  return (
    <div className="container mb-24 mt-10 flex max-h-[300px] shrink-1 w-5/6 items-center justify-center">
      <Image
        src={recommend}
        width={800}
        height={200}
        alt="Recommend"
        className="w-fit"
      />
    </div>
  );
};

export default RecommendCatalog;
