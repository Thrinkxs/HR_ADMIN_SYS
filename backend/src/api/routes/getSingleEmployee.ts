import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.get("/:employeeId", controller.readEmployee);

export = router;

// 650f91f7a40e02534a25a46b id for employee
// 650f91f7a40e02534a25a46b
