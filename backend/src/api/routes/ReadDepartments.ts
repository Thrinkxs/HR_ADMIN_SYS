import express from "express";
import controller from "../controller/Department";

const router = express.Router();

router.get("/", controller.readAllDepartment);

export = router;
