import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import DeptModel from "../models/Department";
import bcrypt from "bcrypt";

//Create department
const createDepartment = (req: Request, res: Response, next: NextFunction) => {
  const { name, manager } = req.body;

  const department = new DeptModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    manager,
    status: "active",
  });

  return department
    .save()
    .then((newDepartment) => {
      return res.status(201).json({
        success: true,
        message: "New department created successfully",
        Department: newDepartment,
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

// Update an existing department
const updateDepartment = (req: Request, res: Response, next: NextFunction) => {
  const departmentId = req.params.departmentId;
  return DeptModel.findById(departmentId)
    .exec()
    .then((department) => {
      if (!department) {
        res.status(404).json({
          message: "This department does not exist",
        });
      } else {
        department
          .set(req.body)
          .save()
          .then((department) => {
            res.status(200).json({
              success: true,
              message: "Department updated",
              Department: department,
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
};

const readAllDepartment = (req: Request, res: Response, next: NextFunction) => {
  return DeptModel.find({})
    .exec()
    .then((department) => {
      res.status(200).json({
        success: true,
        message: "A list of all departments",
        Department: department,
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

export default { createDepartment, updateDepartment, readAllDepartment };
