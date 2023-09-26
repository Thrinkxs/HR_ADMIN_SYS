import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbconfig } from "./config/dbconfig";
import UserRoutes from "./api/routes/UserRouter";
import LoginRoutes from "./api/routes/Login";
import CreateEmployee from "./api/routes/CreateEmployee";
import readEmployee from "./api/routes/getSingleEmployee";
import readAllEmployee from "./api/routes/getAllEmployees";
import routeArray from "./api/routes/UserRouter";
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
//login route
app.use("/api/login", LoginRoutes);

//create employee route
app.use("/api/create", CreateEmployee);

//read single employee
app.use("/api/get/employees/", readEmployee);

//read all employee
app.use("/api/get/employees", readAllEmployee);

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
