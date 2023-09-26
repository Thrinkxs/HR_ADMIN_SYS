import express from "express";
import controller from "../controller/Employee";

const router = express.Router();

router.post("/", controller.createEmployee);

export = router;
