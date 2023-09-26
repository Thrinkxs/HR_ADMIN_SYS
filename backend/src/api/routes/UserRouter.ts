import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.delete("api/delete/:employeeId", controller.deleteEmployee);

export = router;
