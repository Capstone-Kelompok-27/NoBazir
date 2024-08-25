"use client";

import React, { createContext, useState, type ReactNode } from "react";

export interface RoleContextType {
  role: string | null;
  setRole: (value: string | null) => void;
}

export const RoleContext = createContext<RoleContextType | undefined>(
  undefined,
);

export const RoleContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<string | null>("");

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
