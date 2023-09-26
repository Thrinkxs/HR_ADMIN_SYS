import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import EmployeeModel from "../models/Employee";
import bcrypt from "bcrypt";

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, tel, email, employeeManager, status } = req.body;

  const saltRounds = 10;
  bcrypt.hash("Password123#", saltRounds, (err, hash) => {
    const employee = new EmployeeModel({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      tel,
      email,
      employeeManager,
      status,
      password: hash,
      role: "employee",
    });
    if (err) {
      console.error(err);
    } else {
      return employee
        .save()
        .then((newEmployee) => {
          return res.status(201).json({
            success: true,
            message: "New employee created successfully",
            Employee: newEmployee,
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
          res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
            error: error.message,
          });
        });
    }
  });
};

const readEmployee = (req: Request, res: Response, next: NextFunction) => {
  const employeeId: string = req.params.employeeId;
  return EmployeeModel.findById(employeeId)
    .exec()
    .then((employee) => {
      employee
        ? res.status(200).json({
            success: true,
            message: `Employee with ID = ${employeeId}`,
            Employee: employee,
          })
        : res.status(404).json({
            message: "This employee does not exist",
          });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({
        success: false,
        message: "This employee does not exist",
        error: error.message,
      });
    });
};

const readAllEmployee = (req: Request, res: Response, next: NextFunction) => {
  return EmployeeModel.find({})
    .exec()
    .then((employees) => {
      res.status(200).json({
        success: true,
        message: "A list of all employees",
        Employee: employees,
      });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};
// Update an existing employee by its Id in the database
const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.employeeId;
  return EmployeeModel.findById(employeeId)
    .exec()
    .then((employee) => {
      if (!employee) {
        res.status(404).json({
          message: "This employee does not exist",
        });
      } else {
        employee
          .set(req.body)
          .save()
          .then((employee) => {
            res.status(200).json({
              success: true,
              message: "Employee updated",
              Employee: employee,
            });
          });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
  // // Get id from params and body request
  // const employeeId: string = req.params.employeeId;
  // const { firstName, lastName, tel, email, employeeManager } = req.body;
  // // Find employee and update it
  // return EmployeeModel.findByIdAndUpdate(
  //     employeeId,
  //     {
  //         firstName,
  //         lastName,
  //         tel,
  //         email,
  //         employeeManager,
  //     },
  //     { new: true }
  // )
  //     .exec()
  //     .then((updatedEmployee) => {
  //         res.status(200).json({
  //             success: true,
  //             message: "Employee updated",
  //             Employee: updatedEmployee,
  //         });
  //     })
  //     .catch((error) => {
  //         console.log("Error: ", error);
  //         res.status(500).json({
  //             success: false,
  //             message: "Server error. Please try again.",
  //             error: error.message,
  //         });
  //     });
};

// delete an existing employee by its Id in the database
const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
  const employeeId = req.params.employeeId;
  return EmployeeModel.findByIdAndRemove(employeeId)
    .exec()
    .then((deletedEmployee) => {
      deletedEmployee
        ? res.status(200).json({
            success: true,
            message: `Employee with ID = ${deletedEmployee} deleted`,
            Employee: deletedEmployee,
          })
        : res.status(404).json({
            message: "Employee Not Found!!!",
          });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({
        success: false,
        message: "This employee does not exist",
        error: error.message,
      });
    });
};

export default {
  createEmployee,
  readEmployee,
  readAllEmployee,
  updateEmployee,
  deleteEmployee,
};
