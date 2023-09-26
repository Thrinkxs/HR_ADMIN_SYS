import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.patch("api/update/:employeeId", controller.updateEmployee);

export = router;
