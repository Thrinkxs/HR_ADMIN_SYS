import React from "react";
import { Pie } from "react-chartjs-2";
import useEmployeeData from "../../hooks/useEmployeeData";

const Chart = () => {
  const { Employee } = useEmployeeData;

  const chartData = {
    labels: ["Employees", "Managers", "Departments"],
    datasets: [
      {
        data: Employee,
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
  };

  return <Pie data={chartData} options={chartOptions} />;
};

export default Chart;
