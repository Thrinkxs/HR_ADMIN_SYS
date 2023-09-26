import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import userAdmin from "../models/Admin";
import bcrypt from "bcrypt";

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
  //
  userAdmin
    .findOne({
      username: username,
    })
    .then((user: { passwordHash: string } | null) => {
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
            res.status(200).json({
              message: "Login successful",
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

export default { loginAdmin };
