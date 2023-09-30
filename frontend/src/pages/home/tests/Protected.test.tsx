import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Protected from "../Protected";
import { LoginProvider } from "../../context/LoginContext";


const MockOutlet = () => <div data-testid="outlet">Outlet Content</div>;

test("renders the Outlet when user is authenticated", () => {
  const { getByTestId } = render(
    <LoginProvider auth={true}>
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/protected" element={<Protected />} />
          <Route path="*" element={<MockOutlet />} />
        </Routes>
      </MemoryRouter>
    </LoginProvider>
  );

  const outlet = getByTestId("outlet");
  expect(outlet).toBeInTheDocument();
});

test("redirects to the login page when user is not authenticated", () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route path="/protected" element={<Protected />} />
        <Route path="/" element={<AdminLogin />} />
      </Routes>
    </MemoryRouter>
  );

  const loginPage = getByTestId("admin-login-page");
  expect(loginPage).toBeInTheDocument();
});

test("redirects to the login page when user is not authenticated (alternative test)", () => {
  const { getByTestId, location } = render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route path="/protected" element={<Protected />} />
        <Route path="/" element={<AdminLogin data-testid="admin-login-page" />} />
      </Routes>
    </MemoryRouter>
  );

  const loginPage = getByTestId("admin-login-page");
  expect(loginPage).toBeInTheDocument();


  expect(location.pathname).toBe("/");
});
