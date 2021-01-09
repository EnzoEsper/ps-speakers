import React, { createContext } from "react";
import useRequest from "../components/hooks/useRequest";
const DataContext = createContext();

const DataProvider = ({ children, baseUrl, routeName }) => {
  
  const state = useRequest(baseUrl, routeName);

  return (
    <DataContext.Provider value={state}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
