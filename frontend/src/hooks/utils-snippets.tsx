// import { useState, useEffect } from "react";
// import { Axios } from "../Axios";

// type Employee = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   tel: number;
//   email: string;
//   employeeManager: string;
//   status: string;
//   password: string;
//   role: string;
// };

// const useEmployeeData = () => {
//   const [employeeData, setEmployeeData] = useState<Employee[]>([]);
//   // const [dataVersion, setDataVersion] = useState<number>(0);
//   useEffect(() => {
//     // Function to fetch data from the API endpoint
//     const fetchData = async () => {
//       try {
//         const response = await Axios.get("/api/get/employees");
//         if (!response) {
//           throw new Error("Network response was not ok");
//         }
//         const data: { Employee: Employee[] } = await response.data;
//         setEmployeeData(data.Employee);
//         console.log(data);
//         console.log(employeeData);
//         localStorage.setItem("employeeData", JSON.stringify(employeeData));
//          // Update data version with a new timestamp
//         //  const newVersion = Date.now();
//         //  localStorage.setItem("dataVersion", newVersion.toString());
//         // setDataVersion(newVersion);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     // Check if data is available in local storage  and if the version matches
//     const storedData = localStorage.getItem("employeeData");
//     // const storedVersion = localStorage.getItem("dataVersion");
//     // if (storedData && storedVersion && parseInt(storedVersion, 10) === dataVersion) {
//     //   setEmployeeData(JSON.parse(storedData));
//     // }
//     if (storedData) {
//       setEmployeeData(JSON.parse(storedData));
//     } else {
//       // If not in local storage, fetch it from the API
//       fetchData();
//     }
//   }, []);

//   return employeeData;
// };

// export default useEmployeeData;

// if (Array.isArray(employeeData)) {
//   employeeData.map((employee: Employee[]) => {
//     if (employee.email === updatedData.email) {
//       setMessage("User already exists");
//       setSubmitting(false);
//     }
//   });
// }

//check user
// if (!success) {
//     {
//       employeeData.map((employee) => {
//         if (employee.email === updatedData.email) {
//           setMessage("User already exists");
//           setSubmitting(false);
//           setSelection("");
//           reset();
//         }
//       });
//     }
//   }

//login context
// import {
//   createContext,
//   useState,
//   useContext,
//   ReactNode,
//   Dispatch,
//   SetStateAction,
// } from "react";

// export type Auth = {
// auth: boolean
// }

// export interface LoginContextProps {
//     auth: Auth,
//     setUser: Dispatch<SetStateAction<Auth>>;
// }
// const defaultValue = {
//   auth: false,
//   setUser: () => { }
// } as unknown as LoginContextProps

// const LoginContext = createContext<LoginContextProps>(defaultValue);

// // const LoginContext = createContext({});
// type Props = {
//   children: ReactNode;
// };

// export const LoginProvider = ({ children }: Props) => {
//   const [auth, setAuth] = useState<Auth>(false)

//   return (
//     <LoginContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// const useAuth = () => useContext(LoginContext);
{
  /* <TableCell align="right">{employee.status}</TableCell>

{Departments.map(
  (department) => (
    <TableCell align="right">{department.name} </TableCell> */
}

// {
//   field: "fullName",
//   headerName: "Full name",
//   description: "This column has a value getter and is not sortable.",
//   sortable: false,
//   width: 160,
//   valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
// },
