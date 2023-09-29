import express from "express";
import controller from "../controller/Department";

const router = express.Router();

router.post("/", controller.createDepartment);

export = router;
