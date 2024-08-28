import React from "react";
import Navbar from "@/app/_components/Navbar";

const page = () => {
  return (
    <div className="flex flex-col bg-[#679436]">
      <div className="rounded-b-2xl bg-[#EBF2FA]">
        <Navbar />
        <div className="mx-20 mt-40 flex flex-row">
          <div className="my-5 flex w-7/12 flex-col items-center justify-center">
            <h1 className="text-center font-montserrat text-[36px] font-black text-[#05668D]">
              Every Bite Counts: Reduce Waste with NoBazir
            </h1>
            <h1 className="my-5 text-center font-source-sans text-[28px] font-semibold text-[#427AA1]">
              NoBazir is a web app that features a marketplace for buying and
              selling food based on the principle of responsible consumption,
              along with educational content related to environmental issues.
            </h1>
            <a href="/home">
              <button className="my-5 rounded-2xl bg-[#A5BE00] px-6 py-2 text-[#EBF2FA]">
                Get Started
              </button>
            </a>
          </div>
          <div>Kasih foto apa kek</div>
        </div>
      </div>
      <div className="mx-20 my-20 flex flex-col">
        <div className="w-1/2">
          <img
            src="navbar/landing/image1.png"
            className="flex scale-[0.70] justify-start"
            alt=""
          />
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-start">
            <h1 className="font-montserrat text-[44px] font-extrabold text-[#EBF2FA]">
              {" "}
              What Is LeftOver?
            </h1>
            <h1 className="mt-10 font-source-sans text-[22px] font-semibold text-[#EBF2FA]">
              Try a next level experience of food purchase with LeftOver. <br />
              Buyers can view and access detailed information of all <br />
              available food items.
            </h1>
            <a href="/leftover">
              <button className="my-5 w-1/3 rounded-2xl bg-[#A5BE00] px-6 py-2 text-[#EBF2FA]">
                View More
              </button>
            </a>
          </div>
          <div>kasih foto lek</div>
        </div>
        <div className="mt-10 rounded-2xl bg-[#A5BE00]">
          <div className="my-10 flex flex-row">
            <div className="w-7/12">kasi foto</div>
            <div className="flex flex-col justify-start">
              <h1 className="font-montserrat text-[44px] font-extrabold text-[#EBF2FA]">
                Discuss What&apos;s
                <br /> Happening on Community
              </h1>
              <h1 className="mt-10 font-source-sans text-[22px] font-semibold text-[#EBF2FA]">
                Users can view posts from others and create their own posts. It
                also features a list of environmentally-themed events, like
                Car-Free Day, organized by tags.
              </h1>
              <a href="/community">
                {" "}
                <button className="my-5 w-1/5 rounded-2xl bg-[#679436] px-6 py-2 text-[#EBF2FA]">
                  View More
                </button>{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="my-10 flex flex-row">
          <div className="flex w-1/2 flex-col">
            <h1 className="font-montserrat text-[44px] font-extrabold text-[#EBF2FA]">
              {" "}
              All <br /> About <br />
              Rewards
            </h1>
            <h1 className="mt-10 w-full font-source-sans text-[22px] font-semibold text-[#EBF2FA]">
              Users can earn rewards when their posts achieve high engagement.
              These rewards can be exchanged for various exciting benefits.
            </h1>
            <a href="/">
              <button className="my-5 w-1/5 rounded-2xl bg-[#A5BE00] px-6 py-2 text-[#EBF2FA]">
                View More
              </button>
            </a>
          </div>
          <div>kasih foto ye</div>
        </div>
      </div>
      <div className="rounded-t-2xl bg-[#EBF2FA]">
        <div className="my-10 flex flex-col items-center">
          <h1 className="font-montserrat text-[44px] font-extrabold text-[#05668D]">
            Why Use NoBazir?
          </h1>
          <div className="flex w-full flex-col items-center p-4 text-center font-source-sans text-[22px] font-bold text-[#05668D]">
            <h1 className="my-2 w-1/2 rounded-full border-2 border-[#427AA1] p-2">
              Help the environment by reducing food waste{" "}
            </h1>
            <h1 className="my-2 w-1/2 rounded-full border-2 border-[#427AA1] p-2">
              Rescue food near you
            </h1>
            <h1 className="my-2 w-1/2 rounded-full border-2 border-[#427AA1] p-2">
              Enjoy good food at 1/2 price or less
            </h1>
            <h1 className="my-2 w-1/2 rounded-full border-2 border-[#427AA1] p-2">
              Find environmental events and seek new friends
            </h1>
          </div>
        </div>
      </div>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/navbar/landing/imagebawah.png')" }}
      >
        <div className="mx-20 my-10 flex flex-row justify-between rounded-xl bg-opacity-50 p-10">
          <div className="flex flex-col">
            <h1 className="font-montserrat text-[36px] font-extrabold text-[#FFFFFF]">
              Have any Question?
            </h1>
            <h1 className="font-regular my-5 font-source-sans text-[24px] text-[#FFFFFF]">
              We&apos;re here to help! Reach out to us anytime through our
              contact
            </h1>
          </div>
          <div>
            <a href="https://www.instagram.com/sparta_hmif/">
              <button className="my-5 rounded-full bg-[#A5BE00] px-10 py-4 text-[24px] text-[#EBF2FA]">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
