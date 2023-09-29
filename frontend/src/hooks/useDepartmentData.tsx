import React, { useState, useEffect } from "react";
import { Axios } from "../Axios";

type Department = {
  _id: string;
  name: string;
  manager: string;
  status: number;
};
const useDepartmentData = () => {
  const [departmentData, setDepartmentData] = useState<Department[]>([]);

  // Function to fetch data from the API endpoint
  const fetchData = async () => {
    try {
      const response = await Axios.get("/api/get/departments");
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const data: { Department: Department[] } = await response.data;
      console.log("department response", data);
      setDepartmentData(data.Department);
      console.log(data);
      console.log(departmentData);
      localStorage.setItem("departmentData", JSON.stringify(data.Department)); //data.Department
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };
  useEffect(() => {
    // Check if data is available in local storage
    const storedData = localStorage.getItem("departmentData");
    if (storedData) {
      setDepartmentData(JSON.parse(storedData));
    }
    //updates the local storage every 5 mins 5 * 60 * 1000
    const fetchInterval = setInterval(fetchData, 5000);
    return () => clearInterval(fetchInterval);
  }, []);

  return { departmentData };
};

export default useDepartmentData;
