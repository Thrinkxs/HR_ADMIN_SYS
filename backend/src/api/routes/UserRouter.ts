import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.post("/create", controller.createEmployee);
router.get("/get/:employeeId", controller.readEmployee);
router.get("/get/employees", controller.readAllEmployee);
router.patch("/update/:employeeId", controller.updateEmployee);
router.delete("/delete/:employeeId", controller.deleteEmployee);

export = router;
