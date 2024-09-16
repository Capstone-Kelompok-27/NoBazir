import React from "react";
import Navbar from "@/app/_components/Navbar";
import GoalCard from "./components/GoalCard";
import OurTeam from "./components/OurTeam";
import Footer from "@/app/_components/Footer";

const Page = () => {
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
      path: "/navbar/ourteam/apple.jpg",
      name: "Zheannetta Apple",
      role: "Project Manager",
    },
    {
      path: "/navbar/ourteam/andi.jpg",
      name: "Andi Farhan Hidayat",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/naura.jpg",
      name: "Naura Ayurachmani",
      role: "UI/UX Designer",
    },
    {
      path: "/navbar/ourteam/radhi.jpeg",
      name: "Azfa Radhiyya Hakim",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/faiz.jpg",
      name: "Muh. Faiz Alfikrona",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/rusmin.jpg",
      name: "Muh. Rusmin Nurwadin",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/nayaka.jpg",
      name: "Zulfaqqar Nayaka",
      role: "Game Developer",
    },
    {
      path: "/navbar/ourteam/joel.jpg",
      name: "Joel Hotlan H S",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/furhun.jpeg",
      name: "Muh. Farhan",
      role: "Software Engineer",
    },
    {
      path: "/navbar/ourteam/salman.jpg",
      name: "Salman Hanif",
      role: "Data Scientist",
    },
    {
      path: "/navbar/ourteam/yayat.jpg",
      name: "Fityatul Haq Rosyidi",
      role: "Data Scientist",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col rounded-b-3xl bg-[#A5BE00]">
        <Navbar />
        <div className="mb-16 mt-28 flex items-center justify-center p-4">
          <div className="flex w-3/4 flex-col items-center justify-center">
            <h1 className="font-montserrat text-[50px] font-black text-[#EBF2FA]">
              About Us
            </h1>
            <p className="text-center font-source-sans text-[24px] font-semibold text-[#EBF2FA]">
              Welcome to NoBazir, your go-to marketplace for buying and selling
              food with a focus on responsible consumption. Our mission is to
              reduce food waste by connecting individuals and businesses who
              want to make a positive impact on the environment.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-6 mt-10 font-montserrat text-[40px] font-extrabold text-[#679436]">
        Our Goals
      </div>
      <div className="mx-6 my-4 flex items-center justify-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((item, index) => (
            <GoalCard key={index} link={item.path} des={item.desc} />
          ))}
        </div>
      </div>

      <div className="mx-6 mt-10 font-montserrat text-[30px] font-extrabold text-[#679436]">
        Meet Our Team
      </div>

      <div className="hidden flex-col items-center lg:flex">
        <div className="flex flex-row">
          <div className="mx-2 my-2 flex h-auto w-72 flex-col items-center rounded-2xl border-2 border-gray-500 bg-[#679436] bg-opacity-[0.28]">
            <img
              src="/navbar/ourteam/apple.jpg"
              alt="foto"
              className="my-4 h-32 w-32 rounded-full object-cover hover:scale-110 hover:shadow-2xl"
            />
            <div className="mb-4 flex w-11/12 flex-col rounded-2xl bg-white p-2 text-[#679436] hover:scale-105 hover:shadow-2xl">
              <p className="whitespace-nowrap text-center font-montserrat text-[22px] font-semibold">
                Zheannetta Apple
              </p>
              <p className="text-center font-source-sans text-[16px]">
                Project Manager
              </p>
            </div>
          </div>
          <div className="mx-2 my-2 flex h-auto w-72 flex-col items-center rounded-2xl border-2 border-gray-500 bg-[#679436] bg-opacity-[0.28]">
            <img
              src="/navbar/ourteam/andi.jpg"
              alt="foto"
              className="my-4 h-32 w-32 rounded-full object-cover hover:scale-110 hover:shadow-2xl"
            />
            <div className="mb-4 flex w-11/12 flex-col rounded-2xl bg-white p-2 text-[#679436] hover:scale-105 hover:shadow-2xl">
              <p className="whitespace-nowrap text-center font-montserrat text-[22px] font-semibold">
                Andi Farhan Hidayat
              </p>
              <p className="text-center font-source-sans text-[16px]">
                Software Engineer
              </p>
            </div>
          </div>
        </div>

        <div className="mx-6 mb-10 mt-2 flex items-center justify-center">
          <div className="mt-2 grid grid-cols-3">
            {ourTeam.map(
              (item, index) =>
                !(
                  item.name === "Zheannetta Apple" ||
                  item.name === "Andi Farhan Hidayat"
                ) && (
                  <OurTeam
                    key={index}
                    foto={item.path}
                    name={item.name}
                    role={item.role}
                  />
                ),
            )}
          </div>
        </div>
      </div>

      <div className="mx-6 mb-10 mt-2 flex justify-center lg:hidden">
        <div className="grid grid-cols-1 gap-6">
          {ourTeam.map((item, index) => (
            <OurTeam
              key={index}
              foto={item.path}
              name={item.name}
              role={item.role}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
