import express from "express";
import controller from "../controller/Department";

const router = express.Router();

router.patch("/:departmentId", controller.updateDepartment);

export = router;
