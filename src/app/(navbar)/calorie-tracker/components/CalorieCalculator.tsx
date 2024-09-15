"use client";

import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";

const CalorieCalculator = () => {
  // States
  const [userCalorieNeeds, setUserCalorieNeeds] = useState<number | undefined>(
    0,
  );
  const [modalClicked, setModalClicked] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<{
    age: number;
    height: number;
    weight: number;
    sex: string;
  }>({ age: 0, height: 0, weight: 0, sex: "male" });

  const userCalorieNeedsApi = api.calorieTracker.getUserCalorieNeeds.useQuery();

  const createUserCalorieNeeds =
    api.calorieTracker.createUserCalorieNeeds.useMutation();

  const updateUserCalorieNeeds =
    api.calorieTracker.updateUserCalorieNeeds.useMutation();

  useEffect(() => {
    if (userCalorieNeedsApi.isSuccess) {
      setUserCalorieNeeds(userCalorieNeedsApi.data?.calorieNeeds ?? 0);
    }
  }, [userCalorieNeedsApi.data?.calorieNeeds, userCalorieNeedsApi.isSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    let calorieNeeds = 0;

    if (formValues.sex === "male") {
      calorieNeeds =
        66 +
        Math.round(13.7 * formValues.weight) +
        5 * formValues.height -
        Math.round(6.8 * formValues.age);
    } else {
      calorieNeeds =
        655 +
        Math.round(9.6 * formValues.weight) +
        Math.round(1.8 * formValues.height) -
        Math.round(4.7 * formValues.age);
    }

    if (userCalorieNeeds === 0) {
      await createUserCalorieNeeds.mutateAsync(calorieNeeds);
    } else {
      await updateUserCalorieNeeds.mutateAsync(calorieNeeds);
    }
  };

  return (
    <div className="mb-8 flex w-full items-center justify-center">
      <div className="flex w-fit items-center justify-center rounded-2xl bg-[#A5BE00] px-4 py-3">
        {userCalorieNeeds !== 0 && (
          <div className="font-semibold text-white">
            Your Calorie Needs: {userCalorieNeeds}
          </div>
        )}
        {userCalorieNeeds === 0 && (
          <div
            onClick={() => setModalClicked((prev) => !prev)}
            className="font-semibold text-white"
          >
            Click to Set Calorie Needs!
          </div>
        )}
      </div>

      {modalClicked && (
        <div className="fixed top-0 flex h-screen w-screen items-center justify-center bg-gray-400/50">
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
                value={formValues?.age}
                onChange={handleChange}
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
                value={formValues?.height}
                onChange={handleChange}
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
                value={formValues?.weight}
                onChange={handleChange}
                className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
              />
            </div>
            <div className="flex w-full flex-shrink items-center gap-3">
              <div className="min-w-[56px] font-semibold text-white">Sex:</div>
              <select
                name="sex"
                className="w-fit overflow-hidden rounded-2xl px-2 py-1"
                value={formValues?.sex}
                onChange={handleChange}
              >
                <option value={"male"}>male</option>
                <option value={"female"}>female</option>
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
