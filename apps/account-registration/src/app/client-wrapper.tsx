"use client";

import React from "react";
import { RegistrationProvider } from "./context/RegistrationContext";

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return <RegistrationProvider>{children}</RegistrationProvider>;
};
