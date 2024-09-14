"use client";

import { CalorieContext } from "@/app/_context/calorieContext";
import { api } from "@/trpc/react";
import React, { useContext, useState, useEffect } from "react";

interface trackDataInputType {
  calorie: number;
  date: string;
  time: string;
  note: string;
}

const CreateCalorie = () => {
  const calorieContext = useContext(CalorieContext);
  if (!calorieContext) {
    throw new Error(
      "Page component must be used within a CalorieContextProvider",
    );
  }
  const { setUserCalorie } = calorieContext;

  // Date placeholder
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  // Time placeholder
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const defaultTime = `${hours}:${minutes}`;

  const createTrack = api.calorieTracker.createUserCalorie.useMutation();

  const [formValues, setFormValues] = useState<trackDataInputType>({
    calorie: 0,
    date: "",
    time: "",
    note: "",
  });

  const getUserCalorieByDate =
    api.calorieTracker.getUserCalorieByDate.useQuery("");
  useEffect(() => {
    if (getUserCalorieByDate.isSuccess) {
      setUserCalorie(getUserCalorieByDate.data);
    }
  }, [getUserCalorieByDate.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTrack.mutateAsync(formValues, {
      onSuccess: async () => {
        setFormValues({
          calorie: 0,
          date: "",
          time: "",
          note: "",
        });
      },
      onError: (error) => {
        console.error("Error creating calorie track: ", error.message);
      },
    });
    await getUserCalorieByDate.refetch();
  };

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-4/5 flex-col gap-3 rounded-xl bg-gray-200/50 p-6 shadow-md lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3">
          <div className="flex w-full flex-shrink flex-col items-start gap-1">
            <div className="font-semibold text-slate-600">Date:</div>
            <input
              type="text"
              name="date"
              placeholder={defaultDate}
              onChange={handleChange}
              value={formValues.date}
              className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
            />
          </div>
          <div className="flex w-full flex-shrink flex-col items-start gap-1">
            <div className="font-semibold text-slate-600">Time:</div>
            <input
              type="text"
              name="time"
              placeholder={defaultTime}
              onChange={handleChange}
              value={formValues.time}
              className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
            />
          </div>
          <div className="hidden w-full flex-shrink flex-col items-start gap-1 sm:flex">
            <div className="font-semibold text-slate-600">Calorie:</div>
            <input
              type="number"
              name="calorie"
              placeholder="Calorie:"
              onChange={handleChange}
              value={formValues.calorie}
              className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
            />
          </div>
        </div>
        <div className="flex w-full flex-shrink flex-col items-start gap-1 sm:hidden">
          <div className="font-semibold text-slate-600">Calorie:</div>
          <input
            type="number"
            name="calorie"
            placeholder="Calorie:"
            onChange={handleChange}
            value={formValues.calorie}
            className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
          />
        </div>
        <input
          type="text"
          name="note"
          placeholder="Note:"
          onChange={handleChange}
          value={formValues.note}
          className="flex h-10 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
        />
        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="flex w-36 justify-center rounded-3xl bg-[#A5BE00] px-2 py-2 font-bold text-gray-100"
          >
            Add Track
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCalorie;
