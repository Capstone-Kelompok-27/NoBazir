"use client";

import { CalorieContext } from "@/app/_context/calorieContext";
import { api } from "@/trpc/react";
import React, { useContext, useEffect } from "react";

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
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const defaultDate = `${year}-${month}-${day}`;

  const getUserCalorieByDate =
    api.calorieTracker.getUserCalorieByDate.useQuery(defaultDate);

  useEffect(() => {
    if (getUserCalorieByDate.isSuccess) {
      setUserCalorie(getUserCalorieByDate.data);
    }
  });

  return <div>SearchCalorie</div>;
};

export default SearchCalorie;
