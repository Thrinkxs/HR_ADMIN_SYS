import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeLogin from "../EmployeeLogin"; 
import userEvent from "@testing-library/user-event"; 

describe("EmployeeLogin", () => {
  test("renders EmployeeLogin component", () => {
    render(<EmployeeLogin />);
 
    screen.debug();
  });

  test("renders login form", () => {
    render(<EmployeeLogin />);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  test("displays 'Login as Employee' button", () => {
    render(<EmployeeLogin />);
    const employeeLoginButton = screen.getByText("Login as Employee");
    expect(employeeLoginButton).toBeInTheDocument();
  });

  test("navigates to the Employee dashboard after clicking 'Login as Employee'", () => {
    render(<EmployeeLogin />);
    const employeeLoginButton = screen.getByText("Login as Employee");


    fireEvent.click(employeeLoginButton);


    const employeeDashboard = screen.getByText("Employee ");
    expect(employeeDashboard).toBeInTheDocument();
  });
});
