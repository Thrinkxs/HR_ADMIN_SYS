import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import EmployeeModel from "../models/Employee";
import bcrypt from "bcrypt";

const filterEmployee = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // (https:localhost/status=active&role=employee)
  const { status } = req.query; // Get status from query parameters

  // Create a query object to filter employees based on status
  const query: any = {};
  if (status) {
    query.status = status;
  }

  // Use the query object to filter employees
  EmployeeModel.find(query)
    .then((employees) => {
      res.json(employees); // Return the filtered employees as JSON response
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" }); // Handle errors appropriately
    });
};

export default {
  filterEmployee,
};
