"use client";

import React, { createContext, useContext, useState } from "react";

export type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  company: string;
  title: string;
  kloudliteDomain: string;
  country: string;
};

const RegistrationContext = createContext<{
  data: RegistrationData | null;
  setData: (data: RegistrationData) => void;
} | null>(null);

export const RegistrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<RegistrationData | null>(null);

  return (
    <RegistrationContext.Provider value={{ data, setData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error("useRegistration must be used within a RegistrationProvider");
  return context;
};
