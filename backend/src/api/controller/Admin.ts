import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userAdmin from "../models/Admin";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");
const saltRounds = 10;

const saverAdminUser = () => {
  bcrypt.hash("TestPass1234", saltRounds, (err, hash) => {
    const admin = new userAdmin({
      username: "hradmin@test.com",
      passwordHash: hash,
      role: "admin",
    });

    if (err) {
      console.error(err);
    } else {
      return admin.save();
    }
  });
};

const loginAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  // const createToken = (_id: string) => {
  //   return jwt.sign({ _id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });
  // };

  userAdmin
    .findOne({
      username: username,
    })
    // const token = createToken(username._id)
    .then(
      (
        user: {
          passwordHash: string;
          role: string;
          username: string;
          _id: any;
        } | null
      ) => {
        if (!user) {
          console.error("No user found!!!");
          res.status(401).json({
            message: "Login failed",
          });
        } else {
          bcrypt.compare(password, user.passwordHash, (err, result) => {
            if (err) {
              console.error(err);
              res.status(401).json({
                message: "Login failed",
              });
            } else if (result) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              });
              res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
                user: {
                  id: user._id,
                  username: username,
                  role: user.role,
                },
              });
            } else {
              res.status(401).json({
                message: "Login failed",
              });
            }
          });
        }
      }
    )
    .catch((err: any) => {
      console.error(err);
      res.status(401).json({
        message: "Login failed",
      });
    });
};

export default { loginAdmin };
