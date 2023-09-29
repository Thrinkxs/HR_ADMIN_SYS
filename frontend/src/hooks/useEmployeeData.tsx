import { useState, useEffect } from "react";
import { Axios } from "../Axios";

type Employee = {
  _id: string;
  firstName: string;
  lastName: string;
  tel: number;
  email: string;
  employeeManager: string;
  status: string;
  password: string;
  role: string;
};

const useEmployeeData = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  // Function to fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await Axios.get("/api/get/employees");
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data: { Employee: Employee[] } = await response.data;
      setEmployeeData(data.Employee);
      console.log(data);

      console.log(employeeData);
      localStorage.setItem("employeeData", JSON.stringify(data.Employee));
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    // Check if data is available in local storage
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      setEmployeeData(JSON.parse(storedData));
    }

    //updates the local storage every 5 mins 5 * 60 * 1000
    const fetchInterval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return { employeeData };
};

export default useEmployeeData;
