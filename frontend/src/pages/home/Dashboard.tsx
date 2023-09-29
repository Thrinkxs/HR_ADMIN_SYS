// Example Dashboard component
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useEmployeeData from "../../hooks/useEmployeeData";
import useDepartmentData from "../../hooks/useDepartmentData";

//MUI Table Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const { employeeData } = useEmployeeData();
  const { departmentData } = useDepartmentData();
  const Employees = employeeData;
  const Departments = departmentData;
  const totalEmployees = Employees.length;
  const totalDepartments = Departments.length;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!employeeData && !departmentData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Employees</h2>
            <p className="text-3xl font-bold">
              {isLoading ? <p>Loading...</p> : totalEmployees}
            </p>
          </div>
          <div className="p-4 bg-green-200 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Departments</h2>
            <p className="text-3xl font-bold">
              {" "}
              {isLoading ? <p>Loading...</p> : totalDepartments}
            </p>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Employees.map((employee) => (
                  <TableRow
                    key={employee.firstName}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {employee.firstName}
                    </TableCell>
                    <TableCell align="right">{employee.lastName}</TableCell>
                    <TableCell align="right">{employee.status}</TableCell>
                    {/* 
                {Departments.map((department) => {
                  if (department.manager === employee.firstName) {
                    return (
                      <TableCell align="right" key={department._id}>
                        {department.name}{" "}
                      </TableCell>
                    );
                  }
                  return null;
                })} */}
                    <TableCell align="right">
                      {Departments.map((department) => {
                        if (department.manager === employee.firstName) {
                          return (
                            <span key={department._id}>{department.name}</span>
                          );
                        }
                        return null;
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
