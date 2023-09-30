import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateEmployees from "../CreateEmployees";
import { DataProvider } from "../../context/FormDataContext"; 

describe("CreateEmployees", () => {
  test("renders CreateEmployees component", () => {
    render(<CreateEmployees />);

    // screen.debug();
  });

  test("displays a form with required fields", () => {
    render(<CreateEmployees />);
    

    const nameInput = screen.getByLabelText("Name");
    const surnameInput = screen.getByLabelText("Surname");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    
    expect(nameInput).toBeInTheDocument();
    expect(surnameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    render(
      <DataProvider>
        <CreateEmployees />
      </DataProvider>
    );
    
  
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Surname"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "1234567890" },
    });


    fireEvent.click(screen.getByText("No"));


    fireEvent.click(screen.getByText("Save"));


    await waitFor(() => {
      const successMessage = screen.getByText("Employee Created Successfully");
      expect(successMessage).toBeInTheDocument();
    });
  });

  test("displays an error message for invalid email", async () => {
    render(<CreateEmployees />);
    

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });


    fireEvent.click(screen.getByText("Save"));


    await waitFor(() => {
      const errorMessage = screen.getByText("Invalid email address");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays an error message for invalid phone number", async () => {
    render(<CreateEmployees />);
    

    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "123" },
    });


    fireEvent.click(screen.getByText("Save"));


    await waitFor(() => {
      const errorMessage = screen.getByText("Phone number must be 10 digits long");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("cancels the form", () => {
    render(<CreateEmployees />);
    

    fireEvent.click(screen.getByText("Cancel"));

   
  });
  
  test("displays manager selection when 'No' is selected", () => {
    render(<CreateEmployees />);
    

    fireEvent.click(screen.getByText("No"));


    const managerDropdown = screen.getByLabelText("Manager");
    expect(managerDropdown).toBeInTheDocument();
  });

  test("does not display manager selection when 'Yes' is selected", () => {
    render(<CreateEmployees />);
    

    fireEvent.click(screen.getByText("Yes"));

  
    const managerDropdown = screen.queryByLabelText("Manager");
    expect(managerDropdown).not.toBeInTheDocument();
  });
});
