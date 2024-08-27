import React from 'react';
import Navbar from "@/app/_components/Navbar";
import GoalCard from './components/GoalCard';
import OurTeam from './components/OurTeam';

const Page = () => {
  
  const isLoggedIn = true;

  const goals = [
    {
      path: "navbar/aboutus/eco.svg",
      desc: "Build an Eco-Conscious Community",
    },
    {
      path: "/navbar/aboutus/industry.svg",
      desc: "Reduce Carbon Footprints",
    },
    {
      path: "/navbar/aboutus/cash-coin.svg",
      desc: "Provide Economic Benefits",
    },
    {
      path: "navbar/aboutus/fast-food-outline.svg",
      desc: "Promote Responsible Consumption",
    },
  ];

  const ourTeam = [
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Zheannetta Apple",
      role: "Project Manager",
    },
    {
      path: "/navbar/ourteam/naura.jpg",
      name: "Naura Ayurachmani",
      role: "UI/UX Designer",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Zulfaqqar Nayaka",
      role: "Game Developer",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Andi Farhan Hidayat",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/radhi.jpg",
      name: "Azfa Radhiyya Hakim",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/faiz.jpg",
      name: "Muh. Faiz Alfikrona",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Muh. Rusmin Nurwadin",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Muh. Farhan",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Salman Hanif",
      role: "Data Scientist",
    },
    {
      path: "/navbar/ourteam/anthony.jpg",
      name: "Fityatul Haq Rosyidi",
      role: "Data Scientist",
    },

  ]

  return (
    <div className='flex flex-col'>
      <div className='bg-[#A5BE00] flex flex-col rounded-b-3xl'>
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="p-4 mt-28 mb-16 flex justify-center items-center">
          <div className='flex flex-col justify-center items-center w-3/4'>
            <h1 className='font-montserrat font-black text-[50px] text-[#EBF2FA]'>About Us</h1>
            <p className='font-source-sans font-semibold text-[24px] text-center text-[#EBF2FA]'>
              Welcome to NoBazir, your go-to marketplace for buying and selling food with a focus on responsible consumption. 
              Our mission is to reduce food waste by connecting individuals and businesses who want to make a positive impact on the environment.</p>
          </div>
        </div>
      </div>
      <div className='mt-10 mx-6 text-[#679436] font-montserrat font-extrabold text-[40px]'>
        Our Goals
      </div>
      <div className='flex justify-center items-center mx-6 my-4'>
      <div className='flex flex-row justify-center items-center'>
        {goals.map((item,index) => (
          <GoalCard
            key={index}
            link={item.path}
            des={item.desc}/>
        ))}
      </div>
      </div>
      <div className='mt-10 mx-6 text-[#679436] font-montserrat font-extrabold text-[30px]'>
        Meet Our Team
      </div>

      <div className='flex justify-center items-center mx-6 mt-2 mb-10'>
      <div className='grid grid-cols-5 mt-2'>
        {ourTeam.map((item,index) => (
          <OurTeam
            key={index}
            foto={item.path}
            name={item.name}
            role={item.role}/>
        ))}
      </div>
      </div>

    </div>
  );
};

export default Page;
