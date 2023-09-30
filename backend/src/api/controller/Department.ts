import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import DeptModel from "../models/Department";
import bcrypt from "bcrypt";

//Create department
/**
 * The function creates a new department with the given name and manager, saves it to the database, and
 * returns a success message with the created department.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * HTTP request made by the client. It includes properties such as the request headers, request body,
 * request method, request URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this code, it is used to send the response back to the client with the
 * appropriate status
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used when there is an error
 * or when the current middleware function has completed its task and wants to pass control to the next
 * middleware function.
 * @returns The function `createDepartment` returns a Promise.
 */
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
/**
 * The function updates a department in a database based on the provided department ID and request
 * body.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant information.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this code, it is used to send JSON responses with appropriate status codes and
 * messages.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used when there is an error
 * or when the current middleware function has completed its task and wants to pass control to the next
 * middleware function.
 * @returns The function `updateDepartment` returns a Promise.
 */
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

/**
 * The function `readAllDepartment` retrieves all departments from the database and sends a JSON
 * response with the list of departments.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used when there is an error
 * or when the current middleware function has completed its task and wants to pass control to the next
 * middleware function.
 * @returns The function `readAllDepartment` returns a Promise that resolves to a JSON response. The
 * response includes a success flag, a message, and an array of department objects.
 */
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
