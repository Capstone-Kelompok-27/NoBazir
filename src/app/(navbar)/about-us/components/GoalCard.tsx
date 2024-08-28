const GoalCard = ({ link, des }) => (
  <div className="flex flex-col w-1/2 border-2 bg-[#A5BE00] rounded-2xl border-[#679436] mx-6">
    <div className="flex justify-center items-center my-2">
      <img src={link} alt={des} className="w-24"/>
    </div>
    <div className="my-1">
      <p className="text-[#EBF2FA] text-center font-source-sans font-bold text-[24px]">{des}</p>
    </div>
  </div>
  );

export default GoalCard