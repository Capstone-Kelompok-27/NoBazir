import React from "react";

interface OurTeamProps {
  foto: string;
  name: string;
  role: string;
}

const OurTeam: React.FC<OurTeamProps> = ({ foto, name, role }) => (
  <div className="mx-2 my-2 flex h-auto w-72 flex-col items-center rounded-2xl border-2 border-gray-500 bg-[#679436] bg-opacity-[0.28]">
    <img
      src={foto}
      alt={`${name} ${role}`}
      className="my-4 h-32 w-32 rounded-full object-cover hover:scale-110 hover:shadow-2xl"
    />
    <div className="mb-4 flex w-11/12 flex-col rounded-2xl bg-white p-2 text-[#679436] hover:scale-105 hover:shadow-2xl">
      <p className="whitespace-nowrap text-center font-montserrat text-[22px] font-semibold ">
        {name}
      </p>
      <p className="text-center font-source-sans text-[16px]">{role}</p>
    </div>
  </div>
);

export default OurTeam;
