import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeList from "../EmployeeList";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));


jest.mock("../../Axios", () => ({
  patch: jest.fn(() => Promise.resolve({ data: { success: true } })),
}));

describe("EmployeeList", () => {
  const employees = [
    {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "john@example.com",
      manager: "Manager 1",
      status: "active",
    },
 
  ];

  test("renders EmployeeList component", () => {
    render(<EmployeeList />);

    const titleElement = screen.getByText("Employees");
    expect(titleElement).toBeInTheDocument();
  });

  test("displays a list of employees", () => {
    render(<EmployeeList />);

    jest.spyOn(require("../../hooks/useEmployeeData"), "useEmployeeData").mockReturnValue({ employeeData: employees });


    const employeeNames = employees.map((employee) => screen.getByText(employee.firstName));
    expect(employeeNames).toHaveLength(employees.length);
  });

  test("clicking the Edit button navigates to the edit page", () => {
    const navigateMock = jest.fn();
    render(<EmployeeList />);
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigateMock);


    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);


    expect(navigateMock).toHaveBeenCalledWith(`/employees/${employees[0]._id}/edit`);
  });

  test("clicking the Deactivate button deactivates an employee", async () => {
    render(<EmployeeList />);
    

    jest.spyOn(require("../../hooks/useEmployeeData"), "useEmployeeData").mockReturnValue({ employeeData: employees });


    const deactivateButton = screen.getByText("Deactivate");
    fireEvent.click(deactivateButton);


    await Promise.resolve();


    expect(require("../../Axios").patch).toHaveBeenCalledWith(
      `/api/employees/${employees[0]._id}`,
      { status: "inactive" },
      { withCredentials: true }
    );
  });

  test("displays the employee's status in the data grid", () => {
    render(<EmployeeList />);

    jest.spyOn(require("../../hooks/useEmployeeData"), "useEmployeeData").mockReturnValue({ employeeData: employees });


    const employeeStatuses = employees.map((employee) => screen.getByText(employee.status));
    expect(employeeStatuses).toHaveLength(employees.length);
  });

  test("displays the correct number of rows per page", () => {
    render(<EmployeeList />);

    jest.spyOn(require("../../hooks/useEmployeeData"), "useEmployeeData").mockReturnValue({ employeeData: employees });


    const rowsPerPageSelector = screen.getByRole("combobox");
    fireEvent.change(rowsPerPageSelector, { target: { value: "10" } });

    const visibleRows = screen.getAllByRole("row").filter((row) => !row.getAttribute("aria-rowindex").startsWith("head"));
    expect(visibleRows).toHaveLength(employees.length); 
  });
});
