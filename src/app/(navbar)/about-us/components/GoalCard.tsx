import React from "react";
import Image from "next/image";
interface GoalCardProps {
  link: string;
  des: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ link, des }) => (
  <div className="flex flex-col items-center rounded-xl border-2 border-[#679436] bg-[#A5BE00] p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
    <div className="flex items-center justify-center">
    <Image
      src={link}
      alt={des}
      width={96}
      height={96} 
      className="object-contain"/>    
    </div>
    <div className="mt-4">
      <p className="text-center font-source-sans text-[24px] font-bold text-[#EBF2FA]">
        {des}
      </p>
    </div>
  </div>
);

export default GoalCard;
