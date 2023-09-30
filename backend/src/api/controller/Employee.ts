import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import EmployeeModel from "../models/Employee";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const jwt = require("jsonwebtoken");

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { name, surname, phone, email, employeeManager, role, status } =
    req.body;

  const saltRounds = 10;
  bcrypt.hash("Password123#", saltRounds, (err, hash) => {
    const employee = new EmployeeModel({
      _id: new mongoose.Types.ObjectId(),
      firstName: name,
      lastName: surname,
      phone,
      email,
      employeeManager,
      status,
      password: hash,
      role,
    });

    if (err) {
      console.error(err);
    } else {
      return employee
        .save()
        .then((newEmployee) => {
          const token = jwt.sign(
            { id: newEmployee._id },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }
          );
          return res.status(201).json({
            success: true,
            message: "New employee created successfully",
            Employee: newEmployee,
            token: token,
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
      const token = jwt.sign({ id: employee?._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      employee
        ? res.status(200).json({
            success: true,
            message: `Employee with ID = ${employeeId}`,
            Employee: employee,
            token: token,
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
      const token = jwt.sign({ employees }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
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
        const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        employee

          .set(req.body)
          .save()
          .then((employee) => {
            res.status(200).json({
              success: true,
              message: "Employee updated",
              Employee: employee,
              token: token,
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
  // const { firstName, lastName, tel, email, employeeManager, status, role } =
  //   req.body;
  // // Find employee and update it
  // return EmployeeModel.findByIdAndUpdate(
  //   employeeId,
  //   {
  //     firstName,
  //     lastName,
  //     tel,
  //     email,
  //     employeeManager,
  //     status,
  //     role,
  //   },
  //   { new: true }
  // )
  //   .exec()
  //   .then((updatedEmployee) => {
  //     res.status(200).json({
  //       success: true,
  //       message: "Employee updated",
  //       Employee: updatedEmployee,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error: ", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error. Please try again.",
  //       error: error.message,
  //     });
  //   });
};
// delete an existing employee by its Id in the database
// const deleteEmployee = (req: Request, res: Response, next: NextFunction) => {
//   const employeeId = req.params.employeeId;
//   return EmployeeModel.findByIdAndRemove(employeeId)
//     .exec()
//     .then((deletedEmployee) => {
//       deletedEmployee
//         ? res.status(200).json({
//             success: true,
//             message: `Employee with ID = ${deletedEmployee} deleted`,
//             Employee: deletedEmployee,
//           })
//         : res.status(404).json({
//             message: "Employee Not Found!!!",
//           });
//     })
//     .catch((error) => {
//       console.log("Error: ", error);
//       res.status(500).json({
//         success: false,
//         message: "This employee does not exist",
//         error: error.message,
//       });
//     });
// };

const loginEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return EmployeeModel.findOne({ email: email })
    .exec()
    .then((employee) => {
      if (!employee) {
        console.error("No Employee found!!!");
        res.status(401).json({
          message: "Login failed",
        });
      } else {
        bcrypt.compare(password, employee.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(401).json({
              message: "Login failed",
            });
          } else if (result) {
            const token = jwt.sign(
              { id: employee._id },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
            );
            res.status(200).json({
              success: true,
              message: "Login successful",
              token: token,
              user: {
                id: employee._id,
                email: email,
                role: employee.role,
              },
            });
          } else {
            res.status(401).json({
              message: "Login failed",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(401).json({
        message: "Login failed",
      });
    });
};

export default {
  createEmployee,
  readEmployee,
  readAllEmployee,
  updateEmployee,
  loginEmployee,
};

//with the update API, we can change role from employee to manager, while deactivate will be to change the status from active to inactive
