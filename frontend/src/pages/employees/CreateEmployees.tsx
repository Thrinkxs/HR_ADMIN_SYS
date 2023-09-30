import React, { useState, useEffect } from "react";
import { stateProps, useData } from "../../context/FormDataContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, Select } from "@mui/material";
import { Axios } from "../../Axios";
import Backdrop from "@mui/material/Backdrop";
import useEmployeeData from "../../hooks/useEmployeeData";
import { useNavigate } from "react-router-dom";

const CreateEmployees = () => {
  const { data, setData } = useData();
  const { employeeData } = useEmployeeData();
  const Employees = employeeData;
  const [selection, setSelection] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [manager, setManager] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<stateProps>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    employeeManager: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  //Schema
  const schema: z.ZodType<stateProps> = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(30, { message: "Name should not be longer than 30 characters" }),
    surname: z
      .string()
      .min(2, { message: "Surname must be at least 2 characters long" })
      .max(30, { message: "Surname should not be longer than 30 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().refine((value) => value.length === 10, {
      message: "Phone number must be 10 digits long",
    }),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<stateProps>({
    // defaultValues: { name: data.name, email: data.email },
    resolver: zodResolver(schema),
  });

  //handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectionChange = (event) => {
    // setSelection(event.target.value);
    const { name, value } = event.target;
    setSelection(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //handle submit/post to api
  const onSubmit = async () => {
    let updatedData = { ...formData };

    if (selection === "yes") {
      updatedData = {
        ...updatedData,
        role: "manager",
        status: "active",
      };
    } else {
      updatedData = {
        ...updatedData,
        role: "employee",
        status: "active",
        employeeManager: manager,
      };
    }
    // Update the state once with the modified data
    setData(updatedData);
    setSubmitting(true);
    console.log("data submitted", updatedData);
    try {
      const response = await Axios.post("/api/create", updatedData);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setSelection("");
        setSuccess(true);
        reset();
        handleOpen();
        setSubmitting(false);
      }
      // else (response.data.message) {
      //   setSubmitting(false);
      //   setMessage(response.data.message);
      // }
    } catch (error) {
      setMessage("User already exists");
      setSelection("");
      reset();
      console.log("Failed to create employee", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl py-6 mx-10">Create Employee</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-10 flex flex-col justify-center gap-5"
      >
        <div className="">
          <label htmlFor="name" className="w-60 inline-block">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.name && (
            <span className="mx-4 italic text-red-400">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="surname" className="w-60 inline-block">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            {...register("surname")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.surname && (
            <span className="mx-4 italic text-red-400">
              {errors.surname.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="w-60 inline-block">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="eg. 0821111111"
            {...register("phone")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.phone && (
            <span className="mx-4 italic text-red-400">
              {errors.phone.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className="w-60 inline-block">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="test@test.com"
            {...register("email")}
            onChange={handleInputChange}
            className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
          />
          {errors.email && (
            <span className="mx-4 italic text-red-400">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="manager" className="w-60 inline-block">
            Manager
          </label>
          <Select
            value={selection}
            onChange={handleSelectionChange}
            displayEmpty
            className="mr-3"
            name="manager"
          >
            <MenuItem value="">
              <em>-Select-</em>
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>

          {selection === "no" && (
            <Select
              value={manager}
              name="manager"
              displayEmpty
              onChange={(e) => {
                setManager(e.target.value);
              }}
            >
              <MenuItem value="">
                <em>-Select Manager-</em>
              </MenuItem>
              {Employees.filter((employee) => employee.role === "manager").map(
                (employee) => {
                  return (
                    <MenuItem key={employee._id} value={employee.firstName}>
                      {employee.firstName}
                    </MenuItem>
                  );
                }
              )}
              {/* Render the list of employees with role "manager" here */}
              {/* <MenuItem value="manager1">Manager 1</MenuItem>
              <MenuItem value="manager2">Manager 2</MenuItem> */}
            </Select>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="border p-1 px-2 rounded bg-green-400"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="border p-1 px-2 rounded bg-red-400"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      {success && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <h1>Employee Created Successfully</h1>
        </Backdrop>
      )}
      {message && (
        <h1 className="text-red-400 italic text-center text-xl">
          User already exists
        </h1>
      )}
    </div>
  );
};

export default CreateEmployees;
