import Navbar from "@/app/_components/Navbar";
import { HydrateClient } from "@/trpc/server";
import Footer from "./_components/Footer";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex flex-col bg-[#679436]">
          <div className="rounded-b-2xl bg-[#EBF2FA]">
            <Navbar />
            <div className="mx-5 mt-10 sm:mx-10 md:mx-20 md:mt-36 flex flex-col md:flex-row justify-center">
              <div className="my-5 flex w-full md:w-7/12 flex-col items-center justify-center">
                <h1 className="text-center font-montserrat text-[20px] sm:text-[28px] md:text-[36px] font-black text-[#05668D]">
                  Every Bite Counts: Reduce Waste with NoBazir
                </h1>
                <h1 className="my-4 sm:my-6 md:my-8 text-center font-source-sans text-[16px] sm:text-[20px] md:text-[24px] font-semibold text-[#427AA1]">
                  NoBazir is a web app that features a marketplace for buying
                  and selling food based on the principle of responsible
                  consumption, along with educational content related to
                  environmental issues.
                </h1>
                <a href="/">
                  <button className="my-5 rounded-full bg-[#A5BE00] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-base sm:text-lg md:text-xl text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    Get Started
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="mx-5 sm:mx-10 md:mx-20 my-10 md:my-20 flex flex-col">

          <div className="mt-10 flex flex-col md:flex-col lg:flex-row justify-between">
            <div className="flex flex-col justify-start w-full lg:w-7/12 mx-2 md:mx-4 lg:mx-8">
              <h1 className="font-montserrat text-[24px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-extrabold text-[#EBF2FA] text-center lg:text-left">
                What Is LeftOver?
              </h1>
              <p className="mt-4 sm:mt-6 md:mt-8 font-source-sans text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#EBF2FA] text-center lg:text-left">
                Try a next-level experience of food purchase with LeftOver. Buyers can view and access detailed information of all available food items.
              </p>
              <a href="/leftover" className="flex justify-center lg:justify-start">
                <button className="my-5 rounded-full bg-[#A5BE00] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-base sm:text-lg md:text-xl text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                  View More
                </button>
              </a>
            </div>
            <div className="mx-auto lg:mx-40 mt-5 md:mt-8 lg:mt-0 w-full lg:w-5/12">
              <Image
                src={"/navbar/landing/sayureuy.png"}
                width={150}
                height={250}
                alt="sayureuy"
                className="object-contain mx-auto md:w-[80%] lg:w-[70%]"
              />
            </div>
          </div>

            <div className="mt-10 sm:mt-15 md:mt-20 rounded-2xl bg-[#A5BE00] px-4 md:px-8">
              <div className="my-10 flex flex-col md:flex-col lg:flex-row">
                <div className="flex justify-center lg:justify-start w-full lg:w-5/12">
                  <img
                    src="navbar/landing/discuss.png"
                    alt="Discussion"
                    className="mx-4 scale-90 w-full md:w-[80%] lg:w-[70%] object-contain"
                  />
                </div>
                <div className="mt-5 md:mt-8 lg:mt-0 flex flex-col justify-start w-full lg:w-7/12 mx-2 md:mx-4 lg:mx-8">
                  <h1 className="font-montserrat text-[24px] sm:text-[36px] md:text-[40px]  mt-10 lg:text-[48px] font-extrabold text-[#EBF2FA] text-center lg:text-left">
                    Discuss What's <br className="hidden lg:block" /> Happening on Community
                  </h1>
                  <p className="mt-4 sm:mt-6 md:mt-8 font-source-sans text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[#EBF2FA] text-center lg:text-left">
                    Users can view posts from others and create their own posts. It also
                    features a list of environmentally-themed events, like Car-Free Day,
                    organized by tags.
                  </p>
                  <a href="/community" className="flex justify-center lg:justify-start">
                    <button className="my-5 rounded-full bg-[#679436] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-base sm:text-lg md:text-xl text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                      View More
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="my-10 md:my-20 flex flex-col md:flex-row">
              <div className="flex w-full md:w-1/2 flex-col">
                <h1 className="font-montserrat text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-[#EBF2FA]">
                  All <br /> About <br />
                  Rewards
                </h1>
                <h1 className="mt-5 sm:mt-7 md:mt-10 w-full font-source-sans text-[14px] sm:text-[18px] md:text-[22px] font-semibold text-[#EBF2FA]">
                  Users can earn rewards when their posts achieve high
                  engagement. These rewards can be exchanged for various
                  exciting benefits.
                </h1>
                <a href="/">
                  <button className="my-5 rounded-full bg-[#A5BE00] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-base sm:text-lg md:text-xl text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    View More
                  </button>
                </a>
              </div>
              <div className="mx-auto md:mx-20 mt-5 md:mt-0">
                <Image
                  src={"/navbar/landing/college.png"}
                  width={600}
                  height={400}
                  alt="sayueuy"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="rounded-t-2xl bg-[#EBF2FA]">
            <div className="my-10 flex flex-col items-center">
              <h1 className="font-montserrat text-[28px] sm:text-[32px] md:text-[40px] font-extrabold text-[#05668D]">
                Why Use NoBazir?
              </h1>
              <div className="flex w-full flex-col items-center p-4 text-center font-source-sans text-[14px] sm:text-[18px] md:text-[22px] font-bold text-[#05668D]">
                <h1 className="my-2 w-full sm:w-3/4 md:w-1/2 rounded-full border-2 border-[#427AA1] p-2">
                  Help the environment by reducing food waste{" "}
                </h1>
                <h1 className="my-2 w-full sm:w-3/4 md:w-1/2 rounded-full border-2 border-[#427AA1] p-2">
                  Rescue food near you
                </h1>
                <h1 className="my-2 w-full sm:w-3/4 md:w-1/2 rounded-full border-2 border-[#427AA1] p-2">
                  Enjoy good food at 1/2 price or less
                </h1>
                <h1 className="my-2 w-full sm:w-3/4 md:w-1/2 rounded-full border-2 border-[#427AA1] p-2">
                  Find environmental events and seek new friends
                </h1>
              </div>
            </div>
          </div>
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/navbar/landing/imagebawah.png')" }}
          >

          <div className="mx-5 sm:mx-10 md:mx-20 my-20 flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col justify-center items-start text-left md:w-1/2">
                <h1 className="font-montserrat text-[28px] sm:text-[40px] md:text-[48px] font-extrabold text-[#EBF2FA]">
                  Have any Question?
                </h1>
                <p className="mt-4 sm:mt-6 md:mt-10 font-source-sans text-[14px] sm:text-[18px] md:text-[22px] font-semibold text-[#EBF2FA]">
                We're here to help! Reach out to us anytime through our contact
                </p>
              </div>
              <div className="sm:mt-10">
                <a href="hhttps://www.instagram.com/sparta_hmif/">
                  <button className="my-5 rounded-full bg-[#A5BE00] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 text-base sm:text-lg md:text-xl text-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                    Learn More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </HydrateClient>
  );
}
