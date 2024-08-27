const OurTeam = ({ foto, name, role }) => (
  <div className="bg-[#679436] bg-opacity-[0.28] flex flex-col items-center w-72 h-auto border-gray-500 border-2 mx-2 my-2 rounded-2xl">
    <img src={foto} alt={`${name} ${role}`} className="w-32 h-32 object-cover rounded-full my-4" />
    <div className="w-11/12 flex flex-col bg-white text-[#679436] rounded-2xl mb-4 p-2">
      <p className="font-montserrat whitespace-nowrap font-semibold text-[22px] text-center">{name}</p>
      <p className="font-source-sans text-[16px] text-center">{role}</p>
    </div>
  </div>
);

export default OurTeam;
