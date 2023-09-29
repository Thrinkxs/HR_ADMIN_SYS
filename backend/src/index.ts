import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbconfig } from "./config/dbconfig";
import AdminLogin from "./api/routes/AdminLogin";
import EmployeeLogin from "./api/routes/EmployeeLogin";
import CreateEmployee from "./api/routes/CreateEmployee";
import readEmployee from "./api/routes/getSingleEmployee";
import readAllEmployee from "./api/routes/getAllEmployees";
import updateEmployee from "./api/routes/UpdateEmployee";
// import deleteEmployee from "./api/routes/DeleteEmployee";
import filterEmployee from "./api/routes/FliterEmployees";
import createDepartment from "./api/routes/CreateDepartment";
import updateDepartment from "./api/routes/UpdateDepartment";
import readAllDepartment from "./api/routes/ReadDepartments";
// import db from "./api/models";

const app = express();
const router = express();
const PORT: Number = 3001;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Connect to MongoDB
mongoose
  .connect(dbconfig.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

//Routes
//admin login route
app.use("/api/login/admin", AdminLogin);

//admin login route
app.use("/api/login/employee", EmployeeLogin);

//create employee route
app.use("/api/create", CreateEmployee);

//read single employee
app.use("/api/get/employees/", readEmployee);

//read all employee
app.use("/api/get/employees", readAllEmployee);

//update  employee
app.use("/api/update/employees", updateEmployee);

// //delete  employee
// app.use("/api/delete/employees", deleteEmployee);

//filter  employee
app.use("/api/get/employees?", filterEmployee);

//create department route
app.use("/api/create-department", createDepartment);

//update  department
app.use("/api/update/departments", updateDepartment);

//read all departments
app.use("/api/get/departments", readAllDepartment);

//Health check

// app.get("/", (req, res, next) => {
//     res.send("Hello");
//     next();
//   });

// app.get("/", (req, res, next) => {
//   res.write("World");
//   res.end();
// });

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
