import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ViewDepartment from "../ViewDepartment";
import { useDepartmentData } from "../../hooks/useDepartmentData";


const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const departments = [
  {
    _id: "1",
    name: "Department 1",
    manager: "Manager 1",
    status: "Active",
  },
  {
    _id: "2",
    name: "Department 2",
    manager: "Manager 2",
    status: "Inactive",
  },
];

test("renders ViewDepartment component", () => {
  render(
    <MemoryRouter>
      <DepartmentProvider departmentData={departments}>
        <ViewDepartment />
      </DepartmentProvider>
    </MemoryRouter>
  );

  const header = screen.getByText("Departments");
  expect(header).toBeInTheDocument();
});

test("displays department data in the table", () => {
  render(
    <MemoryRouter>
      <DepartmentProvider departmentData={departments}>
        <ViewDepartment />
      </DepartmentProvider>
    </MemoryRouter>
  );

  const departmentName = screen.getByText("Department 1");
  const managerName = screen.getByText("Manager 1");
  const status = screen.getByText("Active");

  expect(departmentName).toBeInTheDocument();
  expect(managerName).toBeInTheDocument();
  expect(status).toBeInTheDocument();
});

test("navigates to edit department page when edit button is clicked", () => {
  render(
    <MemoryRouter>
      {/* <DepartmentProvider departmentData={departments}>
        <ViewDepartment />
      </DepartmentProvider> */}
    </MemoryRouter>
  );

  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  expect(mockNavigate).toHaveBeenCalledWith("/departments/1/edit");
});

test("navigates to edit department page when deactivate button is clicked", () => {
  render(
    <MemoryRouter>
      {/* <DepartmentProvider departmentData={departments}>
        <ViewDepartment />
      </DepartmentProvider> */}
    </MemoryRouter>
  );

  const deactivateButton = screen.getByText("Deactivate");
  fireEvent.click(deactivateButton);

  expect(mockNavigate).toHaveBeenCalledWith("/departments/1/edit");
});
