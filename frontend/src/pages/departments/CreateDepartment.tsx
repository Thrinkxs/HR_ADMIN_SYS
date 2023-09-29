import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, Select, Backdrop } from "@mui/material";
import { Axios } from "../../Axios";
import useEmployeeData from "../../hooks/useEmployeeData";

type stateProps = {
  name: string;
  manager: string;
};

const CreateDepartment = () => {
  const [formData, setFormData] = useState<stateProps>({
    name: "",
    manager: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [manager, setManager] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const { employeeData } = useEmployeeData();
  const Employees = employeeData;

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
      .min(2, { message: "Name must be at least 2 characters long" }),
    manager: z.string(),
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
  const handleManagerChange = (event) => {
    const selectedManager = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      manager: selectedManager,
    }));
    setManager(selectedManager);
  };
  const handleDebug = () => {
    console.log(formData);
  };
  //handle submit/post to api
  const onSubmit = async () => {
    const updatedData = { ...formData };
    console.log("Department data", updatedData);
    console.log("other data", formData);
    setSubmitting(true);
    Axios.interceptors.request.use((config) => {
      console.log("Request:", config);
      return config;
    });

    Axios.interceptors.response.use((response) => {
      console.log("Response:", response);
      return response;
    });
    try {
      const response = await Axios.post("/api/create-department", updatedData);
      console.log("API Response:", response.data);

      setSuccess(true);
      reset();

      handleOpen();
      if (response.data.message) {
        setSubmitting(false);
      }
    } catch (error) {
      console.log("Failed to create department", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl py-6 mx-10">Create Department</h1>
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
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="manager" className="w-60 inline-block">
            Manager
          </label>
          <Select
            onChange={handleManagerChange}
            displayEmpty
            className="mr-3"
            name="manager"
            value={manager}
          >
            <MenuItem value="">
              <em>-Select-</em>
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
            {/* <MenuItem value="manager 1">Manager 1</MenuItem>
            <MenuItem value="manager 2">Manager 2</MenuItem> */}
          </Select>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="border p-1 px-2 rounded bg-green-400 hover:text-white hover:bg-opacity-60 transition-all duration-200"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleDebug}
            type="button"
            className="border p-1 px-2 rounded bg-red-400"
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
          <h1>Department Created Successful</h1>
        </Backdrop>
      )}
    </div>
  );
};

export default CreateDepartment;
