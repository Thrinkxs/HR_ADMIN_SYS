import React, { createContext, useState, useContext } from "react";

export const DataContext = createContext({});
interface DataProviderProps {
  children: React.ReactNode;
}
export type stateProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  employeeManager: string;
  role: string;
  status: string;
};
// React.Dispatch<React.SetStateAction
export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<stateProps>({
    name: "",
    surname: "",
    phone: "",
    email: "",
    employeeManager: "",
    role: "",
    status: "",
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

//  firstName, lastName, tel, email, employeeManager, role
