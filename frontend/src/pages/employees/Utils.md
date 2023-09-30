# This File contains my thought process and How I went about solving the problems in different ways.

# I keep it as a refrence in case i might need to implement something similar

// let updatedData = { ...data }; // Create a copy of the data object

// if (selection === "yes") {
// updatedData = {
// ...updatedData,
// role: "manager",
// status: "active",
// };
// } else {
// updatedData = {
// ...updatedData,
// role: "employee",
// status: "active",
// employeeManager: manager,
// };
// }
// setData(updatedData);
// handleFormSubmit();
// console.log("Submitted", updatedData);
// setSubmitting(true);

// const handleFormSubmit = () => {
// console.log("The best data to use", data);
// };

//handle data save
// const handleDataSave = () => {
// let updatedData = { ...data }; // Create a copy of the data object

// if (selection === "yes") {
// updatedData = {
// ...updatedData,
// role: "manager",
// status: "active",
// };
// } else {
// updatedData = {
// ...updatedData,
// role: "employee",
// status: "active",
// employeeManager: manager,
// };
// }

// Now, update the state once with the modified data
// setData(updatedData);
// console.log("this is coming from handle save", updatedData);
// };
// useEffect(() => {
// handleDataSave();
// setData(data);
// console.log("Data updated:", data);
// }, [data]);
// setData((prevData) => ({
// ...prevData,
// [name]: value,
// }));

//Updated working one
// import React, { useState, useEffect } from "react";
// import { stateProps, useData } from "../../context/FormDataContext";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MenuItem, Select } from "@mui/material";

// const CreateEmployees = () => {
// const { data, setData } = useData();
// const [selection, setSelection] = useState("");
// const [submitting, setSubmitting] = useState(false);
// const [manager, setManager] = useState("");
// const [formData, setFormData] = useState<stateProps>({
// name: "",
// surname: "",
// email: "",
// phone: "",
// role: "",
// status: "",
// employeeManager: "",
// });

// //Schema
// const schema: z.ZodType<stateProps> = z.object({
// name: z
// .string()
// .min(2, { message: "Name must be at least 2 characters long" })
// .max(30, { message: "Name should not be longer than 30 characters" }),
// surname: z
// .string()
// .min(2, { message: "Surname must be at least 2 characters long" })
// .max(30, { message: "Surname should not be longer than 30 characters" }),
// email: z.string().email({ message: "Invalid email address" }),
// phone: z.string().refine((value) => value.length === 10, {
// message: "Phone number must be 10 digits long",
// }),
// });

// const {
// register,
// handleSubmit,
// formState: { errors },
// } = useForm<stateProps>({
// // defaultValues: { name: data.name, email: data.email },
// resolver: zodResolver(schema),
// });

// //handle input change in form
// const handleInputChange = (e) => {
// const { name, value } = e.target;

// setFormData((prevFormData) => ({
// ...prevFormData,
// [name]: value,
// }));
// };
// const handleSelectionChange = (event) => {
// // setSelection(event.target.value);
// const { name, value } = event.target;
// setSelection(value);
// setFormData((prevFormData) => ({
// ...prevFormData,
// [name]: value,
// }));
// };

// //handle submit/post to api
// const onSubmit = async (data: stateProps) => {
// let updatedData = { ...formData };

// if (selection === "yes") {
// updatedData = {
// ...updatedData,
// role: "manager",
// status: "active",
// };
// } else {
// updatedData = {
// ...updatedData,
// role: "employee",
// status: "active",
// employeeManager: manager,
// };
// }

// // Update the state once with the modified data
// setData(updatedData);
// console.log("This is also data", data);

// console.log("Submitted", updatedData);

// setSubmitting(true);
// };

// return (
// <div className="">
// <h1 className="text-3xl py-6 mx-10">Create Employee</h1>
// <form
// onSubmit={handleSubmit(onSubmit)}
// className="mx-10 flex flex-col justify-center gap-5"
// >
// <div className="">
// <label htmlFor="name" className="w-60 inline-block">
// Name
// </label>
// <input
// type="text"
// id="name"
// {...register("name")}
// onChange={handleInputChange}
// className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
// />
// {errors.name && (
// <span className="mx-4 italic text-red-400">
// {errors.name.message}
// </span>
// )}
// </div>
// <div>
// <label htmlFor="surname" className="w-60 inline-block">
// Surname
// </label>
// <input
// type="text"
// id="surname"
// {...register("surname")}
// onChange={handleInputChange}
// className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
// />
// {errors.surname && (
// <span className="mx-4 italic text-red-400">
// {errors.surname.message}
// </span>
// )}
// </div>
// <div>
// <label htmlFor="phone" className="w-60 inline-block">
// Phone
// </label>
// <input
// type="tel"
// id="phone"
// placeholder="eg. 0821111111"
// {...register("phone")}
// onChange={handleInputChange}
// className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
// />
// {errors.phone && (
// <span className="mx-4 italic text-red-400">
// {errors.phone.message}
// </span>
// )}
// </div>
// <div>
// <label htmlFor="email" className="w-60 inline-block">
// Email
// </label>
// <input
// type="email"
// id="email"
// placeholder="test@test.com"
// {...register("email")}
// onChange={handleInputChange}
// className="md:border md:p-2 md:w-80 md:rounded md:outline-none "
// />
// {errors.email && (
// <span className="mx-4 italic text-red-400">
// {errors.email.message}
// </span>
// )}
// </div>

// <div>
// <label htmlFor="manager" className="w-60 inline-block">
// Manager
// </label>
// <Select
// value={selection}
// onChange={handleSelectionChange}
// displayEmpty
// className="mr-3"
// name="manager"
// >
// <MenuItem value="">
// <em>-Select-</em>
// </MenuItem>
// <MenuItem value="yes">Yes</MenuItem>
// <MenuItem value="no">No</MenuItem>
// </Select>

// {selection === "no" && (
// <Select
// value={manager}
// name="manager"
// displayEmpty
// onChange={(e) => {
// setManager(e.target.value);
// }}
// >
// <MenuItem value="">
// <em>-Select Manager-</em>
// </MenuItem>
// {/_ Render the list of employees with role "manager" here _/}
// <MenuItem value="manager1">Manager 1</MenuItem>
// <MenuItem value="manager2">Manager 2</MenuItem>
// {/_ Add more employees as needed _/}
// </Select>
// )}
// </div>

// <div className="flex gap-2 justify-end">
// <button
// type="submit"
// disabled={submitting}
// className="border p-1 px-2 rounded bg-green-400"
// >
// {submitting ? "Saving..." : "Save"}
// </button>
// <button type="button" className="border p-1 px-2 rounded bg-red-400">
// Cancel
// </button>
// </div>
// </form>
// </div>
// );
// };

// export default CreateEmployees;

// try {
// const response = await Axios.post("/api/create", updatedData);
// console.log("API Response:", response.data);
// } catch (error) {
// console.log("Failed to create employee", error);
// setSubmitting(false);
// }

// axios.defaults.baseURL = "http://localhost:3001/";
// const crypto = require("crypto");
// const id = crypto.randomBytes(16).toString("hex");

//Routes
{
/\* <Routes>
{!auth && <Route path="/login/admin" element={<AdminLogin />} />}
{!auth && (
<Route path="/login/employee" element={<EmployeeLogin />} />
)}

{auth && (
<Route element={<Protected />}>
<Route
path="/dashboard"
element={
<Home>
<Route path="/dashboard" element={<Dashboard />} />
<Route
path="/view-all-employees"
element={<EmployeeList />}
/>
<Route
path="/create-employee"
element={<CreateEmployees />}
/>
<Route
path="/employees/:id/edit"
element={<EditEmployee />}
/>
<Route path="/settings" element={<Settings />} />
</Home>
}
/>
</Route>
)}

<Route
path="/"
element={
auth ? (
<Navigate to="/dashboard" />
) : (
<Navigate to="/login/admin" />
)
}
/>
</Routes> \*/
// }
// ;//This to protect and allow only admin users
// useEffect(() => {

// })
// if (auth && userRole === "admin") {
// return <Outlet />;
// } else {
// return <Navigate to="/" />; //<AdminLogin/>
// }

// <AdminLogin />
// {/_ <CreateDepartment /> _/}
// {/_ <Home> _/}
// <Routes>
// <Route path="/login/employee" element={<EmployeeLogin />} />
// <Route element={<Protected />}>
// <Route path="/" element={<AdminLogin />} />
// {/_ <Route path="/login/employee" element={<EmployeeLogin />} /> _/}
// <Route path="/dashboard" element={<Dashboard />} />
// <Route path="/view-all-employees" element={<EmployeeList />} />
// <Route path="/create-employee" element={<CreateEmployees />} />
// <Route path="/employees/:id/edit" element={<EditEmployee />} />
// <Route path="/settings" element={<Settings />} />
// </Route>
// <Route path="/" element={<Dashboard />} />
// </Routes>
// {/_ </Home> _/}

// <Routes>
// {/_ Always render these routes _/}
// <Route path="/login/admin" element={<AdminLogin />} />
// <Route path="/login/employee" element={<EmployeeLogin />} />

// {/_ Protected route _/}
// <Routes>
// <Route element={<Protected />}>
// <Route
// path="/dashboard"
// element={
// auth ? (
// <Home>
// <Route path="/" element={<Dashboard />} />
// <Route
// path="/view-all-employees"
// element={<EmployeeList />}
// />
// <Route
// path="/create-employee"
// element={<CreateEmployees />}
// />
// <Route
// path="/employees/:id/edit"
// element={<EditEmployee />}
// />
// <Route path="/settings" element={<Settings />} />
// </Home>
// ) : (
// // Redirect to login if not authenticated
// <Navigate to="/login/admin" />
// )
// }
// />
// </Route>
// </Routes>
// {/_ Redirect to dashboard if authenticated _/}
// <Route
// path="/"
// element={
// auth ? (
// <Navigate to="/dashboard" />
// ) : (
// <Navigate to="/login/admin" />
// )
// }
// />
// </Routes>
