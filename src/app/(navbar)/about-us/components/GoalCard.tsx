import React from "react";

interface GoalCardProps {
  link: string;
  des: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ link, des }) => (
  <div className="mx-6 flex w-1/2 flex-col rounded-2xl border-2 border-[#679436] bg-[#A5BE00]">
    <div className="my-2 flex items-center justify-center">
      <img src={link} alt={des} className="w-24" />
    </div>
    <div className="my-1">
      <p className="text-center font-source-sans text-[24px] font-bold text-[#EBF2FA]">
        {des}
      </p>
    </div>
  </div>
);

export default GoalCard;
