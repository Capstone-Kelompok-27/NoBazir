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
            <div className="mx-5 mt-10 flex flex-col justify-center sm:mx-10 md:mx-20 md:mt-36 md:flex-row">
              <div className="my-5 flex w-full flex-col items-center justify-center md:w-7/12">
                <h1 className="text-center font-montserrat text-[20px] font-black text-[#05668D] sm:text-[28px] md:text-[36px]">
                  Every Bite Counts: Reduce Waste with NoBazir
                </h1>
                <h1 className="my-4 text-center font-source-sans text-[16px] font-semibold text-[#427AA1] sm:my-6 sm:text-[20px] md:my-8 md:text-[24px]">
                  NoBazir is a web app that features a marketplace for buying
                  and selling food based on the principle of responsible
                  consumption, along with educational content related to
                  environmental issues.
                </h1>
                <a href="/">
                  <button className="my-5 transform rounded-full bg-[#A5BE00] px-4 py-2 text-base text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl">
                    Get Started
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="mx-5 my-10 flex flex-col sm:mx-10 md:mx-20 md:my-20">
            <div className="mt-10 flex flex-col justify-between md:flex-col lg:flex-row">
              <div className="mx-2 flex w-full flex-col justify-start md:mx-4 lg:mx-8 lg:w-7/12">
                <h1 className="text-center font-montserrat text-[24px] font-extrabold text-[#EBF2FA] sm:text-[36px] md:text-[40px] lg:text-left lg:text-[48px]">
                  What Is LeftOver?
                </h1>
                <p className="mt-4 text-center font-source-sans text-[14px] font-semibold text-[#EBF2FA] sm:mt-6 sm:text-[18px] md:mt-8 md:text-[20px] lg:text-left lg:text-[22px]">
                  Try a next-level experience of food purchase with LeftOver.
                  Buyers can view and access detailed information of all
                  available food items.
                </p>
                <a
                  href="/leftover"
                  className="flex justify-center lg:justify-start"
                >
                  <button className="my-5 transform rounded-full bg-[#A5BE00] px-4 py-2 text-base text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl">
                    View More
                  </button>
                </a>
              </div>
              <div className="mx-auto mt-5 w-full md:mt-8 lg:mx-40 lg:mt-0 lg:w-5/12">
                <Image
                  src={"/navbar/landing/sayureuy.png"}
                  width={150}
                  height={250}
                  alt="sayureuy"
                  className="mx-auto object-contain md:w-[80%] lg:w-[70%]"
                />
              </div>
            </div>

            <div className="sm:mt-15 mt-10 rounded-2xl bg-[#A5BE00] px-4 md:mt-20 md:px-8">
              <div className="my-10 flex flex-col md:flex-col lg:flex-row">
                <div className="flex w-full justify-center lg:w-5/12 lg:justify-start">
                  <img
                    src="navbar/landing/discuss.png"
                    alt="Discussion"
                    className="mx-4 w-full scale-90 object-contain md:w-[80%] lg:w-[70%]"
                  />
                </div>
                <div className="mx-2 mt-5 flex w-full flex-col justify-start md:mx-4 md:mt-8 lg:mx-8 lg:mt-0 lg:w-7/12">
                  <h1 className="mt-10 text-center font-montserrat text-[24px] font-extrabold text-[#EBF2FA] sm:text-[36px] md:text-[40px] lg:text-left lg:text-[48px]">
                    Discuss What&apos;s <br className="hidden lg:block" />{" "}
                    Happening on Community
                  </h1>
                  <p className="mt-4 text-center font-source-sans text-[14px] font-semibold text-[#EBF2FA] sm:mt-6 sm:text-[18px] md:mt-8 md:text-[20px] lg:text-left lg:text-[22px]">
                    Users can view posts from others and create their own posts.
                    It also features a list of environmentally-themed events,
                    like Car-Free Day, organized by tags.
                  </p>
                  <a
                    href="/community"
                    className="flex justify-center lg:justify-start"
                  >
                    <button className="my-5 transform rounded-full bg-[#679436] px-4 py-2 text-base text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl">
                      View More
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="my-10 flex flex-col md:my-20 md:flex-row">
              <div className="flex w-full flex-col md:w-1/2">
                <h1 className="font-montserrat text-[28px] font-extrabold text-[#EBF2FA] sm:text-[40px] md:text-[48px]">
                  All <br /> About <br />
                  Rewards
                </h1>
                <h1 className="mt-5 w-full font-source-sans text-[14px] font-semibold text-[#EBF2FA] sm:mt-7 sm:text-[18px] md:mt-10 md:text-[22px]">
                  Users can earn rewards when their posts achieve high
                  engagement. These rewards can be exchanged for various
                  exciting benefits.
                </h1>
                <a href="/">
                  <button className="my-5 transform rounded-full bg-[#A5BE00] px-4 py-2 text-base text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl">
                    View More
                  </button>
                </a>
              </div>
              <div className="mx-auto mt-5 md:mx-20 md:mt-0">
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
              <h1 className="font-montserrat text-[28px] font-extrabold text-[#05668D] sm:text-[32px] md:text-[40px]">
                Why Use NoBazir?
              </h1>
              <div className="flex w-full flex-col items-center p-4 text-center font-source-sans text-[14px] font-bold text-[#05668D] sm:text-[18px] md:text-[22px]">
                <h1 className="my-2 w-full rounded-full border-2 border-[#427AA1] p-2 sm:w-3/4 md:w-1/2">
                  Help the environment by reducing food waste{" "}
                </h1>
                <h1 className="my-2 w-full rounded-full border-2 border-[#427AA1] p-2 sm:w-3/4 md:w-1/2">
                  Rescue food near you
                </h1>
                <h1 className="my-2 w-full rounded-full border-2 border-[#427AA1] p-2 sm:w-3/4 md:w-1/2">
                  Enjoy good food at 1/2 price or less
                </h1>
                <h1 className="my-2 w-full rounded-full border-2 border-[#427AA1] p-2 sm:w-3/4 md:w-1/2">
                  Find environmental events and seek new friends
                </h1>
              </div>
            </div>
          </div>
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/navbar/landing/imagebawah.png')" }}
          >
            <div className="mx-5 my-20 flex flex-col items-center justify-between sm:mx-10 md:mx-20 md:flex-row">
              <div className="flex flex-col items-start justify-center text-left md:w-1/2">
                <h1 className="font-montserrat text-[28px] font-extrabold text-[#EBF2FA] sm:text-[40px] md:text-[48px]">
                  Have any Question?
                </h1>
                <p className="mt-4 font-source-sans text-[14px] font-semibold text-[#EBF2FA] sm:mt-6 sm:text-[18px] md:mt-10 md:text-[22px]">
                  We&apos;re here to help! Reach out to us anytime through our
                  contact
                </p>
              </div>
              <div className="sm:mt-10">
                <a href="hhttps://www.instagram.com/sparta_hmif/">
                  <button className="my-5 transform rounded-full bg-[#A5BE00] px-4 py-2 text-base text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-3 md:text-xl">
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
