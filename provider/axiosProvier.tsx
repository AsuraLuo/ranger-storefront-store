import React, { createContext, useContext } from "react";
import { AxiosInstance } from "axios";

const AxiosContext = createContext<AxiosInstance | null>(null);

type AxiosProviderType = {
  children: React.ReactNode;
  axiosInstance: AxiosInstance;
};

export const AxiosProvider: React.FC<AxiosProviderType> = ({
  axiosInstance,
  children,
}) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);

  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
