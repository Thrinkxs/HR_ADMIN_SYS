import React from "react";
import { render, screen } from "@testing-library/react";
import AdminLogin from "../AdminLogin";

describe("AdminLogin", () => {
  test("renders AdminLogin component", () => {
    render(<AdminLogin />);
    screen.debug();
  });
  test("renders login form", () => {
    render(<AdminLogin />);
    const loginForm = screen.getByText("Login");
    expect(loginForm).toBeTruthy();
  });
  test("Route to employee", () => {
    render(<AdminLogin />);
    const routeButton = screen.getByText("Login as Employee");
    userEvent.click(routeButton)
    const messageElement = screen.getByText('Admin')
    expect(messageElement).toBeInTheDocument();
  })
});
