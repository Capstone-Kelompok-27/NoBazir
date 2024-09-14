"use client";

import React, { createContext, useState, type ReactNode } from "react";

interface CalorieContextType {
  userCalorie: {
    calorie: number;
    date: string;
    time: string | null;
    note: string | null;
  }[];
  setUserCalorie: (value: CalorieContextType["userCalorie"]) => void;
}

export const CalorieContext = createContext<CalorieContextType | undefined>(
  undefined,
);

export const CalorieContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userCalorie, setUserCalorie] = useState<
    CalorieContextType["userCalorie"]
  >([
    {
      calorie: 0,
      date: "Loading...",
      time: "Loading...",
      note: "Loading...",
    },
  ]);

  return (
    <CalorieContext.Provider value={{ userCalorie, setUserCalorie }}>
      {children}
    </CalorieContext.Provider>
  );
};
