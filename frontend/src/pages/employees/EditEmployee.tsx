import React, { useEffect, useState } from "react";
import { stateProps, useData } from "../../context/FormDataContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, MenuItem, Select } from "@mui/material";
import useEmployeeData from "../../hooks/useEmployeeData";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../Axios";
type stateProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  manager: string;
  employeeManager: string;
  status: string;
  role: string;
};
const EditEmployee = () => {
  const { data, setData } = useData();
  const employeeData = useEmployeeData();
  const Employees = employeeData;
  const [submitting, setSubmitting] = useState(false);
  const [selection, setSelection] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [manager, setManager] = useState("");
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState<stateProps>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    status: "",
    employeeManager: "",
    manager: "",
    role: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  //Schema
  const schema: z.ZodType<stateProps> = z.object({
    name: z.string().min(2).max(30),
    surname: z.string().min(2).max(30),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    status: z.string().min(2).max(30),
    manager: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<stateProps>({
    // defaultValues: { name: data.name, email: data.email },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Fetch employee data using the ID
    Axios.get(`/api/get/employees/${id}`).then((response) => {
      const employeeData = response.data.Employee;
      setEmployee(employeeData);
      setFormData({
        name: employeeData?.firstName || "",
        surname: employeeData?.lastName || "",
        email: employeeData?.email || "",
        phone: employeeData?.phone || "",
        status: employeeData?.status || "",
        employeeManager: employeeData?.employeeManager || "",
        manager: employeeData?.role || "",
        role: employeeData?.role || "",
      });
      console.log("a single employee", response);
    });
  }, [id]);

  //handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDebug = () => {
    console.log("checking", employeeData.employeeData);
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

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit = async () => {
    let updatedData = { ...formData };
    setSubmitting(true);

    if (selection === "yes") {
      updatedData = {
        ...updatedData,
        role: "manager",
      };
    } else {
      updatedData = {
        ...updatedData,
        role: "employee",

        employeeManager: manager,
      };
    }
    try {
      await Axios.patch(`/api/employees/${id}`, updatedData, {
        withCredentials: true,
      });
      console.log("Employee detail updated successfully");
      handleOpen();
    } catch (error) {
      console.log("Failed to update employee");
    }
  };
  return (
    <div>
      {" "}
      <div className="">
        <h1 className="text-3xl py-6 mx-10">Edit Employee</h1>
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
              value={formData.name}
              onChange={handleInputChange}
              className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="surname" className="w-60 inline-block">
              Surname
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname")}
              value={formData.surname}
              onChange={handleInputChange}
              className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
            />
            {errors.surname && <span>{errors.surname.message}</span>}
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
              value={formData.phone}
              onChange={handleInputChange}
              className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
            />
            {errors.phone && <span>{errors.phone.message}</span>}
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
              value={formData.email}
              onChange={handleInputChange}
              className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
            />
            {errors.email && <span>{errors.email.message}</span>}
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
                value={formData.employeeManager}
                name="manager"
                displayEmpty
                // onChange={(e) => {
                //   setManager(e.target.value);
                // }}
              >
                <MenuItem value="">
                  <em>-Select Manager-</em>
                </MenuItem>
                {/* Render the list of employees with role "manager" here */}
                {/* <MenuItem value="manager1">Manager 1</MenuItem>
                <MenuItem value="manager2">Manager 2</MenuItem> */}
                {employeeData.employeeData
                  .map((employee) => employee.role === "manager")
                  .map((employee) => {
                    return (
                      <MenuItem
                        key={employee.employee._id}
                        value={employee.firstName}
                      >
                        {employee.firstName}
                      </MenuItem>
                    );
                  })}
              </Select>
            )}
          </div>

          <div>
            <label htmlFor="status" className="w-60 inline-block">
              Status
            </label>

            <Select
              value={formData.status}
              displayEmpty
              name="status"
              onChange={handleSelectionChange}
            >
              <MenuItem value="">
                <em>-Select-</em>
              </MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
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
              // onClick={(e) => {
              //   e.preventDefault();
              //   navigate(-1);
              // }}
              onClick={handleDebug}
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
            <h1>Employee Updated Successfully</h1>
          </Backdrop>
        )}
        {message && (
          <h1 className="text-red-400 italic text-center text-xl">
            User already exists
          </h1>
        )}
      </div>
    </div>
  );
};

export default EditEmployee;
