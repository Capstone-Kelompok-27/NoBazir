"use client";

import { CalorieContext } from "@/app/_context/calorieContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect, useState } from "react";

const SearchCalorie = () => {
  // Context
  const calorieContext = useContext(CalorieContext);
  if (!calorieContext) {
    throw new Error(
      "Page component must be used within a CalorieContextProvider",
    );
  }
  const { setUserCalorie } = calorieContext;

  // Default date
  const now = new Date();
  const defaultYear = String(now.getFullYear());
  const defaultMonth = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const defaultDate = `${defaultYear}-${defaultMonth}-${day}`;

  // States
  const [date, setDate] = useState<string>(defaultDate);
  const [formValues, setFormValues] = useState<{
    month: string;
    year: string;
  }>({ month: "", year: "" });

  const getUserCalorieByDate =
    api.calorieTracker.getUserCalorieByDate.useQuery(date);

  useEffect(() => {
    if (getUserCalorieByDate.isSuccess) {
      setUserCalorie(getUserCalorieByDate.data);
    }
  }, [getUserCalorieByDate.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.year !== "" && formValues.month !== "") {
      setDate(`${formValues.year}-${formValues.month}-00`);
    } else if (formValues.year === "") {
      setDate(`${defaultYear}-${formValues.month}-00`);
    } else if (formValues.month === "") {
      setDate(`${formValues.year}-${defaultMonth}-00`);
    } else {
      setDate("");
    }

    await getUserCalorieByDate.refetch();
    if (getUserCalorieByDate.isSuccess) {
      setFormValues({ month: "", year: "" });
    }
  };

  return (
    <div className="mb-5 mt-20 flex w-full items-center justify-center">
      <form
        className="flex w-4/5 flex-wrap items-center justify-center gap-4 lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex w-2/6 min-w-32 flex-shrink items-center gap-2">
          <div className="font-semibold text-slate-600">Month:</div>
          <input
            type="text"
            name="month"
            onChange={handleChange}
            placeholder={defaultMonth}
            value={formValues.month}
            className="flex h-8 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
          />
        </div>
        <div className="flex w-2/6 min-w-32 flex-shrink items-center gap-2">
          <div className="font-semibold text-slate-600">Year:</div>
          <input
            type="text"
            name="year"
            onChange={handleChange}
            placeholder={defaultYear}
            value={formValues.year}
            className="flex h-8 w-full flex-shrink rounded-xl px-5 py-2 ring-1 ring-gray-300 focus:outline-[#A5BE00]"
          />
        </div>
        <div className="flex w-1/6 min-w-20 flex-shrink items-center justify-center">
          <button
            type="submit"
            className="flex h-8 w-20 flex-shrink items-center justify-center rounded-3xl bg-[#A5BE00] font-bold text-gray-100"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchCalorie;
