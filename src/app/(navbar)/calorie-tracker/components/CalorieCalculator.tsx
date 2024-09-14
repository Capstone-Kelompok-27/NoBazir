"use client";

import { api } from "@/trpc/react";
import React, { useState } from "react";

const CalorieCalculator = () => {
  // States
  const [userCalorieNeeds, setUserCalorieNeeds] = useState<number | undefined>(
    0,
  );
  const [modalClicked, setModalClicked] = useState<boolean>(false);

  const userCalorieNeedsApi = api.calorieTracker.getUserCalorieNeeds.useQuery();

  if (userCalorieNeedsApi.isSuccess) {
    setUserCalorieNeeds(userCalorieNeedsApi.data?.calorieNeeds ?? 0);
  }

  const handleSubmit = () => {
    pass;
  };

  return (
    <div className="mb-8 flex w-full items-center justify-center">
      <div className="flex w-fit items-center justify-center rounded-2xl bg-[#A5BE00] px-4 py-3">
        {userCalorieNeeds !== 0 && (
          <div className="font-semibold text-white">
            Your Calorie Needs: {userCalorieNeeds}
          </div>
        )}
        <div
          onClick={() => setModalClicked((prev) => !prev)}
          className="font-semibold text-white"
        >
          Click to Set Calorie Needs!
        </div>
      </div>

      {modalClicked && (
        <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-gray-100/50">
          <form
            className="relative flex w-4/5 flex-col gap-3 rounded-xl bg-[#A5BE00] p-6 shadow-md lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <div
              onClick={() => setModalClicked(false)}
              className="absolute right-3 top-2 font-bold text-gray-100"
            >
              X
            </div>
            <div className="text-center text-xl font-bold text-white">
              Calorie Calculator
            </div>
            <div className="mt-3 flex w-full flex-shrink items-center gap-3">
              <div className="min-w-[56px] font-semibold text-white">Age:</div>
              <input
                type="number"
                name="age"
                placeholder="your age"
                className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
              />
            </div>
            <div className="flex w-full flex-shrink items-center gap-3">
              <div className="min-w-[56px] font-semibold text-white">
                Height:
              </div>
              <input
                type="number"
                name="height"
                placeholder="in centimeters"
                className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
              />
            </div>
            <div className="flex w-full flex-shrink items-center gap-3">
              <div className="min-w-[56px] font-semibold text-white">
                Weight:
              </div>
              <input
                type="number"
                name="weight"
                placeholder="in kilograms"
                className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
              />
            </div>
            <div className="flex w-full flex-shrink items-center gap-3">
              <div className="min-w-[56px] font-semibold text-white">Sex:</div>
              <select className="w-fit overflow-hidden rounded-2xl px-2 py-1">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="mt-5 flex w-36 justify-center rounded-3xl bg-gray-100 px-2 py-2 font-bold text-gray-800"
              >
                Set Calorie!
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
